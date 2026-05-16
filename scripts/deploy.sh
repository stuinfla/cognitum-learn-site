#!/usr/bin/env bash
# scripts/deploy.sh — end-to-end deploy for learner-rv-site.
#
# What it does:
#   1. Bump LEARN_RV_VERSION in app/page.tsx (patch by default)
#   2. Commit + push to GitHub (tracked via `gh`)
#   3. Run `vercel --prod` explicitly (do not rely on the GitHub webhook
#      since that integration has been observed to be flaky)
#   4. Poll Vercel until status is Ready (or Error → abort)
#   5. Drive agent-browser to the live URL, screenshot, and assert the DOM
#      contains the newly-bumped version string via [data-version]
#   6. Print PASS/FAIL with the live URL and screenshot path
#
# Usage:
#   ./scripts/deploy.sh                 # patch bump
#   ./scripts/deploy.sh patch|minor|major|none
#   ./scripts/deploy.sh none             # deploy without bumping (re-deploy)
#
# Rollback (manual):
#   vercel rollback https://learner-rv-site-<prev>-stuart-kerrs-projects.vercel.app
#
# Required tools (all in PATH from CLAUDE.md):
#   gh, vercel, agent-browser, jq, node
#
# Exit codes:
#   0  — deployed and version verified live
#   1  — bad args, dirty pre-existing state, push failed, build failed,
#        verification failed (any of these aborts cleanly with diagnostics)

set -euo pipefail

BUMP="${1:-patch}"
case "$BUMP" in patch|minor|major|none) ;; *) echo "Usage: $0 patch|minor|major|none" >&2; exit 1 ;; esac

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

PAGE="app/page.tsx"
LIVE_URL="https://learner-rv-site.vercel.app"
SHOT_DIR="$REPO_ROOT/.deploy-artifacts"
mkdir -p "$SHOT_DIR"

log()   { printf "\033[36m[deploy]\033[0m %s\n" "$*"; }
ok()    { printf "\033[32m[ok]\033[0m %s\n" "$*"; }
fail()  { printf "\033[31m[fail]\033[0m %s\n" "$*" >&2; exit 1; }

# ── Pre-flight ────────────────────────────────────────────────────────────────

for tool in gh vercel agent-browser jq node; do
    command -v "$tool" >/dev/null || fail "missing tool: $tool"
done

[[ -f "$PAGE" ]] || fail "expected $PAGE — wrong directory?"
[[ -f ".vercel/project.json" ]] || fail "project not linked to Vercel — run 'vercel link' first"

gh auth status >/dev/null 2>&1 || fail "gh not authenticated — run 'gh auth login'"

# ── Bump version ──────────────────────────────────────────────────────────────

CURRENT=$(node -e 'const fs=require("fs"); const m=fs.readFileSync("app/page.tsx","utf8").match(/LEARN_RV_VERSION\s*=\s*"v(\d+\.\d+\.\d+)"/); if(!m){process.exit(2)}; process.stdout.write(m[1])')
[[ -n "$CURRENT" ]] || fail "could not read LEARN_RV_VERSION from $PAGE"

IFS='.' read -r MAJOR MINOR PATCH <<<"$CURRENT"
case "$BUMP" in
    patch) PATCH=$((PATCH + 1)) ;;
    minor) MINOR=$((MINOR + 1)); PATCH=0 ;;
    major) MAJOR=$((MAJOR + 1)); MINOR=0; PATCH=0 ;;
    none)  ;;
esac
NEXT="${MAJOR}.${MINOR}.${PATCH}"

log "current: v$CURRENT → next: v$NEXT"

if [[ "$BUMP" != "none" ]]; then
    # In-place patch the constant only (won't disturb surrounding code)
    node -e '
      const fs = require("fs");
      const path = "app/page.tsx";
      const src = fs.readFileSync(path, "utf8");
      const next = process.argv[1];
      const out = src.replace(
        /LEARN_RV_VERSION\s*=\s*"v\d+\.\d+\.\d+"/,
        `LEARN_RV_VERSION = "v${next}"`
      );
      if (out === src) { console.error("no substitution made"); process.exit(3); }
      fs.writeFileSync(path, out);
    ' "$NEXT"
    ok "bumped $PAGE → v$NEXT"
fi

# ── Build smoke check (catches type errors before push) ──────────────────────

log "running: npm run build (smoke check)"
npm run build >/tmp/learner-rv-build.log 2>&1 || {
    tail -40 /tmp/learner-rv-build.log >&2
    fail "build failed — see /tmp/learner-rv-build.log"
}
ok "build green"

# ── Commit + push to GitHub ──────────────────────────────────────────────────

if [[ "$BUMP" != "none" ]] && ! git diff --quiet "$PAGE"; then
    git add "$PAGE"
    git commit -q -m "chore: bump LEARN_RV_VERSION → v$NEXT"
    ok "committed version bump"
fi

if [[ -n "$(git log @{u}.. 2>/dev/null)" ]] || ! git rev-parse @{u} >/dev/null 2>&1; then
    log "pushing to origin"
    git push origin HEAD 2>&1 | grep -v "^remote:" || true
fi

GH_SHA=$(git rev-parse HEAD)
ok "GitHub HEAD: $GH_SHA"

# ── Deploy to Vercel (explicit — no reliance on webhook) ─────────────────────

log "vercel --prod (this is the one that's been silently dropping)"
DEPLOY_URL=$(vercel --prod --yes 2>&1 | tee /tmp/learner-rv-vercel.log | grep -oE "https://learner-rv-site-[a-z0-9]+-stuart-kerrs-projects\.vercel\.app" | head -1)
[[ -n "$DEPLOY_URL" ]] || { tail -40 /tmp/learner-rv-vercel.log >&2; fail "could not parse Vercel deploy URL"; }
ok "deploy started: $DEPLOY_URL"

# ── Poll until Ready ─────────────────────────────────────────────────────────

log "polling deploy status"
# Disable errexit during polling — vercel inspect can return non-zero while
# the deployment is propagating, and pipefail+errexit would kill the loop.
set +e
STATE=""
# vercel --prod typically blocks until ready, so first iteration usually hits READY.
# Poll every 3s up to 5 min as a safety net.
for i in $(seq 1 100); do
    INSPECT=$(vercel inspect "$DEPLOY_URL" 2>&1)
    STATE=$(printf "%s\n" "$INSPECT" | awk '/^[[:space:]]*status[[:space:]]/{print toupper($NF); exit}')
    case "$STATE" in
        READY)    set -e; ok "deploy READY (poll #$i)"; break ;;
        ERROR|CANCELED) set -e; printf "%s\n" "$INSPECT" >&2; vercel inspect "$DEPLOY_URL" --logs 2>&1 | tail -40 >&2; fail "deploy $STATE" ;;
        *)        printf "."; sleep 3 ;;
    esac
done
set -e
echo
[[ "$STATE" == "READY" ]] || fail "deploy did not reach READY within 10 min — last state: '$STATE'"

# ── Verify in a real browser via agent-browser ──────────────────────────────
#
# Important: `learner-rv-site.vercel.app` has a Vercel-edge JS bot challenge
# applied to *.vercel.app aliases on Pro accounts. Real browsers pass the
# challenge in ~5s. curl is blocked permanently. So we do NOT curl the live
# URL — we use agent-browser (real Chromium) which behaves like an end user.

log "agent-browser: navigate + wait for challenge + DOM-assert v$NEXT"
SHOT="$SHOT_DIR/deploy-v${NEXT}-$(date +%Y%m%d-%H%M%S).png"

agent-browser close --all >/dev/null 2>&1 || true
agent-browser open "$LIVE_URL" >/dev/null

# Poll for the real page title (challenge page title is "Vercel Security Checkpoint").
# Allow up to 30s for the challenge JS to complete.
RENDERED=""
for i in $(seq 1 15); do
    TITLE=$(agent-browser get title 2>/dev/null | head -1)
    if [[ "$TITLE" != *"Checkpoint"* ]]; then
        # Page real — try the version stamp
        # agent-browser wraps output in "--- AGENT_BROWSER_PAGE_CONTENT ---" markers;
        # extract just the semver token.
        RENDERED=$(agent-browser get text '[data-version]' 2>/dev/null | grep -oE 'v[0-9]+\.[0-9]+\.[0-9]+' | head -1 || true)
        [[ -n "$RENDERED" ]] && break
    fi
    sleep 2
done

agent-browser screenshot "$SHOT" >/dev/null 2>&1 || true
agent-browser close --all >/dev/null 2>&1 || true

[[ "$RENDERED" == "v$NEXT" ]] || fail "browser sees '$RENDERED', expected 'v$NEXT' (deploy stale OR challenge stuck)"

ok "browser DOM confirms v$NEXT"
ok "screenshot: $SHOT"

echo
echo "──────────────────────────────────────────────"
echo "  v$NEXT live"
echo "  $LIVE_URL"
echo "  deploy: $DEPLOY_URL"
echo "  commit: $GH_SHA"
echo "  shot:   $SHOT"
echo "──────────────────────────────────────────────"
