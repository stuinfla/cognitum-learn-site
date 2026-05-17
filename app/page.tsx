import Link from "next/link";

const LEARN_RV_VERSION = "v0.2.22";
const INSTALL_CMD = "cargo install --git https://github.com/stuinfla/learner-rv learn-cli";

export default function Home() {
  return (
    <main className="min-h-screen text-slate-200">
      <SiteHeader />
      <Hero />
      <TwoDoors />
      <SovereigntyPanel />
      <SeedHardware />
      <HowItWorks />
      <Install />
      <FAQ />
      <CtaFooter />
      <SiteFooter />
    </main>
  );
}

// ── Site Header ────────────────────────────────────────────────────────────

function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-slate-950/80 border-b border-slate-800">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-12 h-16 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <BrandMark className="w-7 h-7 flex-none" />
          <span className="mono text-sm tracking-wider text-slate-100 whitespace-nowrap">learn-rv</span>
          <span className="mono text-[10px] text-slate-500 uppercase tracking-widest whitespace-nowrap hidden xs:inline sm:inline" data-version>{LEARN_RV_VERSION}</span>
        </div>
        <nav className="flex items-center gap-4 sm:gap-7 mono text-[11px] sm:text-[12px] uppercase tracking-widest">
          <a href="#what" className="text-slate-500 hover:text-sky-400 transition hidden md:inline">What</a>
          <a href="#why" className="text-slate-500 hover:text-sky-400 transition hidden md:inline">Why</a>
          <a href="#install" className="text-slate-500 hover:text-sky-400 transition hidden md:inline">Install</a>
          <Link href="/start" className="text-slate-200 hover:text-sky-400 transition whitespace-nowrap">
            <span className="hidden sm:inline">Open dashboard </span><span className="sm:hidden">Start </span><span className="text-sky-400">→</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={className} aria-hidden>
      <rect x="2" y="6" width="24" height="16" rx="1.5" fill="none" stroke="#38bdf8" strokeWidth="1.2" />
      <rect x="5" y="9" width="6" height="2" fill="#38bdf8" opacity="0.7" />
      <rect x="5" y="13" width="14" height="2" fill="#38bdf8" opacity="0.5" />
      <rect x="5" y="17" width="10" height="2" fill="#38bdf8" opacity="0.3" />
      <rect x="18" y="9" width="6" height="2" fill="#f97316" />
    </svg>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12 pt-24 pb-32">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 lg:pr-8">
            <Eyebrow>LOCAL · CITED · YOURS</Eyebrow>
            <h1 className="mt-6 text-[42px] sm:text-[54px] lg:text-[68px] leading-[1.08] font-bold tracking-[-0.025em] text-slate-50">
              <span className="block">Your own AI.</span>
              <span className="block">On a device <span className="text-sky-400 border-b-[3px] border-orange-500 pb-1">smaller than a deck of cards</span>.</span>
              <span className="block mt-3">Nothing ever leaves it.</span>
            </h1>
            <p className="mt-8 text-[17px] leading-[1.65] text-slate-400 max-w-[44ch]">
              <span className="mono text-sky-300">learn-rv</span> turns any video, podcast, or PDF into a private knowledge base that lives on your{" "}
              <a href="#what" className="text-orange-400 hover:text-orange-300 underline decoration-orange-500/40 underline-offset-2">Cognitum One Seed</a>
              {" "}— a tiny appliance that runs on your desk and answers questions from your content, with citations. No cloud account. No monthly fee. No surveillance.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/start" className="inline-flex items-center gap-2 px-6 py-3 bg-sky-400 text-slate-950 font-semibold text-[15px] hover:bg-sky-300 transition rounded-[4px]">
                I have my Seed — let&rsquo;s set it up <span aria-hidden>→</span>
              </Link>
              <a href="#what" className="inline-flex items-center gap-2 px-6 py-3 border border-slate-700 text-slate-200 font-medium text-[15px] hover:border-sky-400 hover:text-sky-300 transition rounded-[4px]">
                What is a Cognitum Seed?
              </a>
            </div>
            <div className="mt-12 flex items-center gap-2 mono text-[11px] uppercase tracking-widest text-slate-500">
              <span className="w-1.5 h-1.5 bg-emerald-400" />
              <span>open source · PolyForm Noncommercial · pure Rust</span>
            </div>
          </div>

          <div className="lg:col-span-6 relative lg:translate-x-6">
            <KnowledgeStackSVG />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Two doors ──────────────────────────────────────────────────────────────

function TwoDoors() {
  return (
    <section className="border-y border-slate-800">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid md:grid-cols-2 gap-px bg-slate-800">
          <DoorCard
            eyebrow="NEW HERE"
            title="What is a Cognitum Seed?"
            body="A pocket-sized AI appliance. We'll walk you through what it is, what it does, and why it exists."
            href="#what"
            cta="Take the 60-second tour"
            warm
          />
          <DoorCard
            eyebrow="ALREADY UNBOXED"
            title="Get my Seed running"
            body="Skip the marketing. Install learn-rv, pair your Seed, start building a knowledge base in five minutes."
            href="/start"
            cta="Open the dashboard"
          />
        </div>
      </div>
    </section>
  );
}

function DoorCard({ eyebrow, title, body, href, cta, warm = false }: {
  eyebrow: string; title: string; body: string; href: string; cta: string; warm?: boolean;
}) {
  return (
    <Link href={href} className="group bg-slate-950 p-8 lg:p-12 hover:bg-slate-900/60 transition relative">
      <div className={`mono text-[11px] uppercase tracking-widest ${warm ? "text-orange-400" : "text-sky-400"} flex items-center gap-2`}>
        <span className={`inline-block w-4 h-px ${warm ? "bg-orange-400" : "bg-sky-400"}`} />
        {eyebrow}
      </div>
      <h3 className="mt-4 text-[28px] font-bold text-slate-50 tracking-tight">{title}</h3>
      <p className="mt-3 text-slate-400 leading-relaxed">{body}</p>
      <div className={`mt-6 mono text-[12px] uppercase tracking-widest ${warm ? "text-orange-300" : "text-sky-300"} group-hover:translate-x-1 transition-transform inline-flex items-center gap-2`}>
        {cta} <span aria-hidden>→</span>
      </div>
    </Link>
  );
}

// ── Sovereignty & Longevity comparison ────────────────────────────────────

function SovereigntyPanel() {
  const rows = [
    { axis: "Runs offline",                  notebooklm: false, chatgpt: false, perplexity: false, learnRv: true },
    { axis: "No account required",           notebooklm: false, chatgpt: false, perplexity: false, learnRv: true },
    { axis: "Zero monthly fee",              notebooklm: false, chatgpt: false, perplexity: false, learnRv: true },
    { axis: "Your KB outlives the vendor",   notebooklm: false, chatgpt: false, perplexity: false, learnRv: true },
    { axis: "Hardware you can hold",         notebooklm: false, chatgpt: false, perplexity: false, learnRv: true },
    { axis: "Cited answers w/ timestamps",   notebooklm: true,  chatgpt: false, perplexity: true,  learnRv: true },
  ];
  return (
    <section id="why" className="pt-20 pb-24 border-b border-slate-800">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
        <div className="max-w-3xl">
          <Eyebrow>SOVEREIGNTY · LONGEVITY</Eyebrow>
          <h2 className="mt-5 text-[36px] sm:text-[44px] font-bold tracking-tight text-slate-50 leading-[1.1]">
            On the axes that <span className="text-sky-400">actually matter</span>, this is the only product on the chart.
          </h2>
          <p className="mt-6 text-slate-400 text-[17px] leading-[1.65] max-w-2xl">
            Everyone competes on model size, response speed, and integrations. Nobody competes on whether you can unplug the cord and still keep your knowledge base. We do.
          </p>
        </div>

        <div className="mt-14 border border-slate-800 rounded-[4px] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-900/60 border-b border-slate-800">
                <th className="text-left px-6 py-4 mono text-[11px] uppercase tracking-widest text-slate-500 font-normal">Capability</th>
                <th className="px-4 py-4 mono text-[11px] uppercase tracking-widest text-slate-500 font-normal">NotebookLM</th>
                <th className="px-4 py-4 mono text-[11px] uppercase tracking-widest text-slate-500 font-normal">ChatGPT</th>
                <th className="px-4 py-4 mono text-[11px] uppercase tracking-widest text-slate-500 font-normal">Perplexity</th>
                <th className="px-4 py-4 mono text-[11px] uppercase tracking-widest text-sky-400 font-medium">learn-rv</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.axis} className={i % 2 ? "bg-slate-950" : "bg-slate-900/20"}>
                  <td className="px-6 py-4 text-slate-200">{r.axis}</td>
                  <td className="px-4 py-4 text-center"><Mark on={r.notebooklm} /></td>
                  <td className="px-4 py-4 text-center"><Mark on={r.chatgpt} /></td>
                  <td className="px-4 py-4 text-center"><Mark on={r.perplexity} /></td>
                  <td className="px-4 py-4 text-center bg-sky-500/5"><Mark on={r.learnRv} highlight /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 mono text-[11px] uppercase tracking-widest text-slate-600 text-right">
          capabilities change · sovereignty does not
        </p>
      </div>
    </section>
  );
}

function Mark({ on, highlight = false }: { on: boolean; highlight?: boolean }) {
  if (on) return (
    <svg className={`w-4 h-4 mx-auto ${highlight ? "text-sky-400" : "text-emerald-400"}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
  return <span className="text-slate-700">—</span>;
}

// ── Seed Hardware ─────────────────────────────────────────────────────────

function SeedHardware() {
  return (
    <section id="what" className="py-28 border-b border-slate-800 bg-slate-950">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <SeedTechDrawing />
            <div className="mt-6 mono text-[11px] uppercase tracking-widest text-slate-600 leading-relaxed">
              Cognitum One Seed · Raspberry Pi Zero 2W class<br/>
              ~65 × 30 × 12 mm · ~2W typical draw
            </div>
          </div>
          <div className="lg:col-span-7">
            <Eyebrow warm>THE HARDWARE</Eyebrow>
            <h2 className="mt-5 text-[36px] sm:text-[44px] font-bold tracking-tight text-slate-50 leading-[1.1]">
              A matchbox-sized AI appliance that lives on <span className="text-orange-400">your</span> desk.
            </h2>
            <p className="mt-6 text-slate-400 text-[17px] leading-[1.65] max-w-2xl">
              The Cognitum One Seed is a small Linux device that runs <span className="text-sky-300 mono text-[15px]">cognitum-agent</span> — a vector database (RuVector, HNSW-indexed) and inference runtime, exposed over your local network or USB. It indexes what you give it, holds onto it forever, and answers cited questions from it.
            </p>
            <dl className="mt-10 space-y-5">
              <SpecRow label="Storage">Up to 32 GB on the included microSD. Hundreds of hours of transcribed video.</SpecRow>
              <SpecRow label="Networking">WiFi · mDNS discovery for plug-and-play pairing · USB gadget mode for travel.</SpecRow>
              <SpecRow label="Power">~2W typical. Plug it into a USB charger and forget it.</SpecRow>
              <SpecRow label="Software">Open. MCP server for Claude/Cursor. REST API. SDKs in Rust, Node, Python.</SpecRow>
            </dl>
            <a href="https://cognitum.one" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-10 mono text-[13px] uppercase tracking-widest text-orange-400 hover:text-orange-300 transition group">
              <span className="inline-block w-4 h-px bg-orange-400 group-hover:w-8 transition-all" />
              Get one at cognitum.one
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function SpecRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-6 items-start border-l border-slate-800 pl-5">
      <dt className="mono text-[11px] uppercase tracking-widest text-slate-500 pt-0.5">{label}</dt>
      <dd className="text-slate-300 text-[15px] leading-relaxed">{children}</dd>
    </div>
  );
}

// ── How it works ──────────────────────────────────────────────────────────

function HowItWorks() {
  const steps = [
    { n: "01", title: "Plug it in", body: "Connect your Seed via USB or join it to your WiFi. It broadcasts itself over mDNS — your laptop finds it automatically." },
    { n: "02", title: "Install learn-rv", body: "One cargo command. Starts a small local bridge on 127.0.0.1:7878 that pairs with your Seed and proxies the heavy lifting." },
    { n: "03", title: "Pick a topic, paste a source", body: "Name what you want to be an expert at. Paste a YouTube playlist, a podcast feed, a PDF — anything yt-dlp can fetch or your disk holds." },
    { n: "04", title: "Watch it learn, then ask", body: "Live progress as captions are pulled, embedded, indexed, pushed. When the dot turns green, your Seed knows the material. Ask anything, get cited answers." },
  ];
  return (
    <section className="py-28 border-b border-slate-800">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
        <div className="max-w-3xl">
          <Eyebrow>HOW IT WORKS</Eyebrow>
          <h2 className="mt-5 text-[36px] sm:text-[44px] font-bold tracking-tight text-slate-50 leading-[1.1]">
            Four steps. Then your Seed knows things you wish you remembered.
          </h2>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-800 border border-slate-800">
          {steps.map((s, i) => (
            <div key={s.n} className="bg-slate-950 p-8 relative">
              <div className="mono text-[11px] uppercase tracking-widest text-sky-400 flex items-center gap-2">
                <span className="inline-block w-4 h-px bg-sky-400" />
                STEP {s.n}
              </div>
              <h3 className="mt-4 text-[20px] font-semibold text-slate-50">{s.title}</h3>
              <p className="mt-3 text-slate-400 text-[14px] leading-[1.6]">{s.body}</p>
              {i < steps.length - 1 && (
                <div aria-hidden className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <svg width="24" height="12" viewBox="0 0 24 12" className="text-sky-500">
                    <path d="M0 6 L20 6" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                    <polygon points="18,2 24,6 18,10" fill="currentColor" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Install ───────────────────────────────────────────────────────────────

function Install() {
  return (
    <section id="install" className="py-28 border-b border-slate-800 bg-slate-950">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <Eyebrow>FIVE MINUTES</Eyebrow>
            <h2 className="mt-5 text-[36px] sm:text-[44px] font-bold tracking-tight text-slate-50 leading-[1.1]">
              Install once. Run forever.
            </h2>
            <p className="mt-6 text-slate-400 text-[17px] leading-[1.65]">
              <span className="mono text-sky-300">learn-rv</span> is a pure-Rust workspace. You need <a className="text-sky-400 hover:text-sky-300 underline decoration-sky-500/40 underline-offset-2" href="https://rustup.rs" target="_blank" rel="noreferrer">the Rust toolchain</a> on your machine. Pre-built binaries for non-Rust folks coming soon.
            </p>
            <p className="mt-6 mono text-[12px] uppercase tracking-widest text-slate-600 leading-relaxed">
              compiles in ~3-5 min · installs to ~/.cargo/bin/ · no system packages touched
            </p>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <InstallCard step="1" title="Install Rust (skip if you have it)">
              <CodeLine>curl --proto &apos;=https&apos; --tlsv1.2 -sSf https://sh.rustup.rs | sh</CodeLine>
            </InstallCard>
            <InstallCard step="2" title="Install learn-rv from source">
              <CodeLine>{INSTALL_CMD}</CodeLine>
            </InstallCard>
            <InstallCard step="3" title="Start the local bridge">
              <CodeLine>learn ui</CodeLine>
              <p className="mt-3 text-slate-400 text-[13px] leading-relaxed">
                Opens a browser at <span className="mono text-sky-300">http://127.0.0.1:7878</span>. Scans your network for your Seed automatically. From there, you can also drive everything from <Link href="/start" className="text-sky-400 hover:text-sky-300 underline decoration-sky-500/40 underline-offset-2">this site&rsquo;s dashboard</Link> — it talks to your bridge over localhost, never the cloud.
              </p>
            </InstallCard>
          </div>
        </div>
      </div>
    </section>
  );
}

function InstallCard({ step, title, children }: { step: string; title: string; children: React.ReactNode }) {
  return (
    <div className="border border-slate-800 bg-slate-900/30 p-5 rounded-[4px]">
      <div className="flex items-center gap-3 mb-3">
        <span className="mono text-[11px] text-slate-500 border border-slate-700 px-1.5 py-0.5 rounded-[2px]">{step}</span>
        <h3 className="text-[15px] font-semibold text-slate-100">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function CodeLine({ children }: { children: string }) {
  return (
    <div className="mono text-[13px] text-sky-300 bg-slate-950 border border-slate-800 px-4 py-3 rounded-[4px] overflow-x-auto whitespace-pre">
      <span className="text-slate-600 select-none">$ </span>{children}
    </div>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────

function FAQ() {
  const items = [
    {
      q: "I don't have a Cognitum Seed yet — can I still use this?",
      a: <>Yes, but the value is much smaller. <span className="mono text-sky-300">learn ui</span> works standalone — it stores your KB locally as a <span className="mono">.rvf</span> file on your laptop. Without a Seed you lose the always-on, sips-power, plug-and-share device. <a className="text-orange-400 hover:underline" href="https://cognitum.one">Get one →</a></>
    },
    {
      q: "What can I throw at it?",
      a: <>Anything <span className="mono text-sky-300">yt-dlp</span> can fetch — YouTube videos, playlists, channels (e.g. <span className="mono">@stanford</span>), search queries (<span className="mono">ytsearch:llm explained top:5</span>), plus local <span className="mono">.mp4 / .mkv / .webm</span>. Also: PDFs, podcast RSS feeds, web articles.</>
    },
    {
      q: "Does this need internet?",
      a: <>To ingest: yes — to fetch videos and run captioning. To query your Seed afterward: no. Set <span className="mono text-sky-300">LEARN_SYNTH_LOCAL=1</span> and answer synthesis runs locally too.</>
    },
    {
      q: "How does this page talk to my Seed?",
      a: <>It doesn&rsquo;t — directly. Browsers can&rsquo;t reach <span className="mono">169.254.x.x</span> from an HTTPS page (mixed-content blocking). The page&rsquo;s JavaScript talks to <span className="mono">127.0.0.1:7878</span> on <strong>your</strong> machine (browsers exempt localhost). That bridge talks to your Seed. Vercel serves bytes; your content never crosses the public internet.</>
    },
    {
      q: "Is my Seed pre-loaded with anything?",
      a: "Out of the box it knows nothing — that's the point. You decide what it learns. Start with a topic that matters to you: a course you're taking, a YouTube channel you follow, a stack of PDFs you keep meaning to read."
    },
    {
      q: "What's the licence?",
      a: <>PolyForm Noncommercial 1.0.0. Free for personal use, research, evaluation. Talk to <a className="text-orange-400 hover:underline" href="https://cognitum.one">cognitum.one</a> about commercial.</>
    },
  ];
  return (
    <section className="py-28 border-b border-slate-800">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <Eyebrow>QUESTIONS</Eyebrow>
            <h2 className="mt-5 text-[36px] font-bold tracking-tight text-slate-50 leading-[1.1]">
              The honest answers.
            </h2>
            <p className="mt-5 text-slate-400 text-[15px] leading-[1.65]">
              No pretending. Click any question.
            </p>
          </div>
          <div className="lg:col-span-8 space-y-3">
            {items.map((it) => (
              <details key={it.q} className="group border border-slate-800 hover:border-slate-700 bg-slate-900/20 rounded-[4px]">
                <summary className="cursor-pointer p-5 flex items-start justify-between gap-4 text-slate-100 font-medium text-[15px] list-none">
                  <span>{it.q}</span>
                  <span className="mono text-sky-400 transition-transform group-open:rotate-45 text-xl leading-none flex-none">+</span>
                </summary>
                <div className="px-5 pb-5 text-slate-400 text-[14px] leading-[1.7] border-t border-slate-800 pt-4">{it.a}</div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── CTA Footer band ───────────────────────────────────────────────────────

function CtaFooter() {
  return (
    <section className="py-24 border-b border-slate-800 bg-gradient-to-b from-slate-950 to-slate-900/60">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12 text-center">
        <Eyebrow>READY</Eyebrow>
        <h2 className="mt-5 text-[36px] sm:text-[48px] font-bold tracking-tight text-slate-50 leading-[1.05] max-w-3xl mx-auto">
          Stop renting your AI.<br />
          <span className="text-sky-400">Build one you own.</span>
        </h2>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/start" className="inline-flex items-center gap-2 px-7 py-3.5 bg-sky-400 text-slate-950 font-semibold hover:bg-sky-300 transition rounded-[4px]">
            Open the dashboard <span aria-hidden>→</span>
          </Link>
          <a href="https://cognitum.one" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-7 py-3.5 border border-orange-500 text-orange-400 font-semibold hover:bg-orange-500 hover:text-slate-950 transition rounded-[4px]">
            Buy a Cognitum Seed
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────

function SiteFooter() {
  return (
    <footer className="py-12 bg-slate-950">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <BrandMark className="w-5 h-5" />
          <span className="mono text-[11px] uppercase tracking-widest text-slate-500">
            learn-rv <span data-version-footer>{LEARN_RV_VERSION}</span> · open source
          </span>
        </div>
        <div className="flex items-center gap-6 mono text-[11px] uppercase tracking-widest text-slate-500">
          <a href="https://github.com/stuinfla/learner-rv" className="hover:text-sky-400 transition">GitHub</a>
          <a href="https://cognitum.one" className="hover:text-orange-400 transition">cognitum.one</a>
          <span className="text-slate-700">Built in public</span>
        </div>
      </div>
    </footer>
  );
}

// ── Building blocks ───────────────────────────────────────────────────────

function Eyebrow({ children, warm = false }: { children: React.ReactNode; warm?: boolean }) {
  return (
    <div className={`mono text-[11px] uppercase tracking-widest ${warm ? "text-orange-400" : "text-sky-400"} flex items-center gap-3`}>
      <span className={`inline-block w-4 h-px ${warm ? "bg-orange-400" : "bg-sky-400"}`} />
      {children}
    </div>
  );
}

// ── Hero illustration: KnowledgeStackSVG ──────────────────────────────────

function KnowledgeStackSVG() {
  const slabs = [
    { y: 80,  rot: -2, citedIdx: 14 },
    { y: 125, rot: 1,  citedIdx: 5 },
    { y: 170, rot: -1, citedIdx: 11 },
    { y: 215, rot: 0,  citedIdx: 8 },
    { y: 260, rot: 2,  citedIdx: 2 },
    { y: 305, rot: -1, citedIdx: 16 },
    { y: 350, rot: 1,  citedIdx: 7 },
  ];
  const queryTouches = [1, 3, 5];

  // Build the jittery query polyline points up front
  const startX = 440;
  const startY = 64;
  const targets = queryTouches.map((qi) => {
    const s = slabs[qi];
    return { x: 120 + 12 + s.citedIdx * 17 + 2, y: s.y + 14 };
  });
  const points: string[] = [`${startX},${startY}`];
  let cur = { x: startX, y: startY };
  targets.forEach((t) => {
    for (let i = 1; i <= 4; i++) {
      const fx = i / 5;
      const noise = ((i * 37) % 5) - 2;
      const x = cur.x + (t.x - cur.x) * fx + noise;
      const y = cur.y + (t.y - cur.y) * fx + noise;
      points.push(`${x},${y}`);
    }
    points.push(`${t.x},${t.y}`);
    cur = t;
  });

  return (
    <div className="relative">
      <svg viewBox="0 0 560 560" className="w-full" aria-hidden>
        <defs>
          <radialGradient id="fade" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="fadeMask">
            <rect width="560" height="560" fill="url(#fade)" />
          </mask>
        </defs>

        {/* Hairline grid */}
        <g mask="url(#fadeMask)">
          {Array.from({ length: 24 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 24} y1="0" x2={i * 24} y2="560" stroke="#1e293b" strokeWidth="0.5" />
          ))}
          {Array.from({ length: 24 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 24} x2="560" y2={i * 24} stroke="#1e293b" strokeWidth="0.5" />
          ))}
        </g>

        {/* Slabs */}
        {slabs.map((s, slabIdx) => (
          <g key={s.y} transform={`translate(120 ${s.y}) rotate(${s.rot} 160 14)`}>
            <rect width="320" height="28" rx="4" fill="#0b1220" stroke="#334155" strokeWidth="1" />
            {Array.from({ length: 18 }).map((_, sqIdx) => {
              const isCited = sqIdx === s.citedIdx;
              const opacity = 0.15 + ((sqIdx * 37 + slabIdx * 13) % 60) / 100;
              return (
                <rect
                  key={sqIdx}
                  x={12 + sqIdx * 17}
                  y={12}
                  width="4"
                  height="4"
                  fill={isCited ? "#f97316" : "#38bdf8"}
                  opacity={isCited ? 1 : opacity}
                />
              );
            })}
            <text x={302} y={18} textAnchor="end" fill="#475569" fontSize="7" fontFamily="ui-monospace" letterSpacing="0.05em">
              VID·{String(slabIdx + 1).padStart(2, "0")}
            </text>
          </g>
        ))}

        {/* Query glyph */}
        <g transform="translate(440 50)">
          <circle cx="0" cy="0" r="14" fill="#020617" stroke="#38bdf8" strokeWidth="1" />
          <text x="0" y="4" textAnchor="middle" fill="#38bdf8" fontSize="14" fontFamily="ui-monospace" fontWeight="700">?</text>
        </g>

        {/* Jittery query polyline */}
        <polyline
          points={points.join(" ")}
          stroke="#38bdf8"
          strokeWidth="1"
          fill="none"
          opacity="0.7"
          strokeLinejoin="round"
        />

        {/* Pulses on cited squares */}
        {queryTouches.map((qi) => {
          const s = slabs[qi];
          const x = 120 + 12 + s.citedIdx * 17;
          const y = s.y + 12;
          return (
            <rect key={qi} x={x - 2} y={y - 2} width="8" height="8" fill="none" stroke="#f97316" strokeWidth="1" opacity="0.6">
              <animate attributeName="opacity" values="0;0.8;0" dur="2.6s" begin={`${qi * 0.4}s`} repeatCount="indefinite" />
            </rect>
          );
        })}

        {/* Tiny Seed appliance corner anchor */}
        <g transform="translate(440 460)">
          <rect width="80" height="56" fill="none" stroke="#38bdf8" strokeWidth="1" />
          <rect x="6" y="6" width="44" height="32" fill="none" stroke="#334155" strokeWidth="1" />
          <text x="9" y="20" fill="#475569" fontSize="6" fontFamily="ui-monospace">cognitum-one</text>
          <text x="9" y="29" fill="#475569" fontSize="6" fontFamily="ui-monospace">seed</text>
          <circle cx="60" cy="14" r="2" fill="#38bdf8">
            <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="68" cy="14" r="2" fill="#10b981" opacity="0.5" />
          <rect x="10" y="44" width="60" height="3" fill="none" stroke="#1e293b" />
          <text x="40" y="68" textAnchor="middle" fill="#475569" fontSize="7" fontFamily="ui-monospace" letterSpacing="0.1em">YOUR HARDWARE</text>
        </g>
      </svg>
    </div>
  );
}

// ── Seed device technical drawing ─────────────────────────────────────────

function SeedTechDrawing() {
  return (
    <svg viewBox="0 0 420 320" className="w-full" aria-hidden>
      <g transform="translate(20 220)">
        <circle cx="32" cy="32" r="32" fill="none" stroke="#475569" strokeWidth="1" />
        <text x="32" y="36" textAnchor="middle" fill="#475569" fontSize="8" fontFamily="ui-monospace">25¢</text>
        <text x="32" y="86" textAnchor="middle" fill="#475569" fontSize="7" fontFamily="ui-monospace" letterSpacing="0.1em">FOR SCALE</text>
      </g>

      <g transform="translate(110 50)">
        <rect x="0" y="0" width="260" height="120" fill="none" stroke="#38bdf8" strokeWidth="1.2" />
        <rect x="6" y="6" width="248" height="108" fill="none" stroke="#1e293b" strokeWidth="0.5" />

        <rect x="90" y="35" width="50" height="50" fill="#0b1220" stroke="#38bdf8" strokeWidth="1" />
        <text x="115" y="64" textAnchor="middle" fill="#38bdf8" fontSize="8" fontFamily="ui-monospace">SoC</text>

        <rect x="200" y="20" width="40" height="14" fill="none" stroke="#475569" strokeWidth="1" />
        <text x="220" y="29" textAnchor="middle" fill="#475569" fontSize="6" fontFamily="ui-monospace">WiFi</text>
        <g transform="translate(245 20)" stroke="#38bdf8" strokeWidth="0.8" fill="none" opacity="0.6">
          <path d="M0 7 Q 5 3 10 7" />
          <path d="M-2 9 Q 5 0 12 9" opacity="0.5" />
        </g>

        <rect x="20" y="20" width="36" height="20" fill="none" stroke="#475569" strokeWidth="1" />
        <text x="38" y="33" textAnchor="middle" fill="#475569" fontSize="6" fontFamily="ui-monospace">μSD</text>

        <rect x="40" y="106" width="20" height="10" fill="none" stroke="#475569" strokeWidth="1" />
        <text x="50" y="114" textAnchor="middle" fill="#475569" fontSize="5" fontFamily="ui-monospace">USB</text>
        <rect x="70" y="106" width="20" height="10" fill="none" stroke="#475569" strokeWidth="1" />
        <text x="80" y="114" textAnchor="middle" fill="#475569" fontSize="5" fontFamily="ui-monospace">PWR</text>

        <g fill="#475569">
          {Array.from({ length: 20 }).map((_, i) => (
            <rect key={i} x={6 + i * 12} y="0" width="3" height="3" />
          ))}
        </g>

        <circle cx="170" cy="55" r="3" fill="#10b981">
          <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
        </circle>
        <text x="178" y="58" fill="#475569" fontSize="6" fontFamily="ui-monospace">PWR</text>
        <circle cx="170" cy="70" r="3" fill="#38bdf8">
          <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite" />
        </circle>
        <text x="178" y="73" fill="#475569" fontSize="6" fontFamily="ui-monospace">NET</text>

        <line x1="0" y1="-12" x2="260" y2="-12" stroke="#475569" strokeWidth="0.5" />
        <line x1="0" y1="-15" x2="0" y2="-9" stroke="#475569" strokeWidth="0.5" />
        <line x1="260" y1="-15" x2="260" y2="-9" stroke="#475569" strokeWidth="0.5" />
        <text x="130" y="-16" textAnchor="middle" fill="#475569" fontSize="7" fontFamily="ui-monospace">~65 mm</text>

        <line x1="-12" y1="0" x2="-12" y2="120" stroke="#475569" strokeWidth="0.5" />
        <line x1="-15" y1="0" x2="-9" y2="0" stroke="#475569" strokeWidth="0.5" />
        <line x1="-15" y1="120" x2="-9" y2="120" stroke="#475569" strokeWidth="0.5" />
        <text x="-18" y="63" textAnchor="middle" fill="#475569" fontSize="7" fontFamily="ui-monospace" transform="rotate(-90 -18 63)">~30 mm</text>
      </g>

      <text x="240" y="220" fill="#64748b" fontSize="9" fontFamily="ui-sans-serif" fontStyle="italic">
        Smaller than a credit card.
      </text>
      <text x="240" y="234" fill="#64748b" fontSize="9" fontFamily="ui-sans-serif" fontStyle="italic">
        Holds a hundred hours of you.
      </text>
    </svg>
  );
}
