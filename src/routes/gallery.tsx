import { createFileRoute, Link } from "@tanstack/react-router";
import heroAsset from "@/assets/drjoe-hero.jpg.asset.json";
import keynoteAsset from "@/assets/drjoe-keynote.jpg.asset.json";
import podcastAsset from "@/assets/drjoe-podcast.jpg.asset.json";
import thaifightAsset from "@/assets/drjoe-thaifight.jpg.asset.json";
import tvAsset from "@/assets/drjoe-tv.jpg.asset.json";
import onsetAsset from "@/assets/drjoe-onset.jpg.asset.json";
import muayogAsset from "@/assets/drjoe-muayog.jpg.asset.json";
import newsAsset from "@/assets/drjoe-news.jpg.asset.json";
import talkshowAsset from "@/assets/drjoe-talkshow.jpg.asset.json";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery · Behind the Scenes | Dr. Joe" },
      {
        name: "description",
        content:
          "Behind-the-scenes gallery of Dr. Joe — TV broadcast, THAI FIGHT ring culture, MUAY O.G. podcast, keynote stage and production sets.",
      },
      { property: "og:title", content: "Gallery · Behind the Scenes | Dr. Joe" },
      {
        property: "og:description",
        content:
          "Visual archive across broadcast, THAI FIGHT, podcast, stage and production.",
      },
    ],
  }),
  component: GalleryPage,
});

type Shot = {
  src: string;
  title: string;
  caption: string;
  tall?: boolean;
  wide?: boolean;
};

type Category = {
  n: string;
  slug: string;
  title: string;
  thTitle: string;
  blurb: string;
  shots: Shot[];
};

const CATEGORIES: Category[] = [
  {
    n: "01",
    slug: "broadcast",
    title: "Broadcast & Television",
    thTitle: "งานโทรทัศน์ · สื่อกระแสหลัก",
    blurb:
      "Three decades of on-air work — talk shows, news desks and prime-time panels across GMM25, Thai PBS and national broadcasters.",
    shots: [
      {
        src: tvAsset.url,
        title: "GMM25 · Fist-Up Panel",
        caption: "TV studio group segment on Muay Thai as national soft power.",
        wide: true,
      },
      {
        src: talkshowAsset.url,
        title: "Talk Show · Yellow Set",
        caption: "Long-form interview on the future of combat sport in Thailand.",
      },
      {
        src: newsAsset.url,
        title: "News Round Table",
        caption: "Round-table interview: heritage, data and the next Muay Thai economy.",
      },
    ],
  },
  {
    n: "02",
    slug: "thaifight",
    title: "THAI FIGHT & Ring Culture",
    thTitle: "THAI FIGHT · วัฒนธรรมสังเวียน",
    blurb:
      "Field work with the THAI FIGHT organization — from Samui event weeks to international ring-side production.",
    shots: [
      {
        src: thaifightAsset.url,
        title: "SAMUI FIGHT 2017",
        caption: "Backstage during the THAI FIGHT · Samui edition — production line & fighter walk-in.",
        wide: true,
      },
    ],
  },
  {
    n: "03",
    slug: "podcast",
    title: "MUAY O.G. · Long-form Media",
    thTitle: "พอดแคสต์ · สื่อยาว",
    blurb:
      "MUAY O.G. and Originals Studio — long-form conversations that turn ring memory into structured knowledge.",
    shots: [
      {
        src: podcastAsset.url,
        title: "MUAY O.G. · Studio Session",
        caption: "Recording night: purple-lit set, two-mic conversation, deep archive.",
        tall: true,
      },
    ],
  },
  {
    n: "04",
    slug: "stage",
    title: "Stage & Keynote",
    thTitle: "เวที · Keynote",
    blurb:
      "Speaking to universities, corporates and public forums on Muay Thai Intelligence and sport-tech futures.",
    shots: [
      {
        src: keynoteAsset.url,
        title: "KMITL Family · Virtual Stage",
        caption: "Curved LED wall of hundreds of faces — a virtual stage for a hybrid keynote.",
        wide: true,
      },
    ],
  },
  {
    n: "05",
    slug: "brand",
    title: "MUAY O.G. · Brand & Community",
    thTitle: "แบรนด์ · คอมมูนิตี้",
    blurb:
      "Team, merchandise and the culture-first identity of the MUAY O.G. universe.",
    shots: [
      {
        src: muayogAsset.url,
        title: "MUAY O.G. · Team Colors",
        caption: "Signature white tees with the blue-green face graphic — the crew uniform.",
      },
    ],
  },
  {
    n: "06",
    slug: "bts",
    title: "Behind the Scenes · Production",
    thTitle: "เบื้องหลัง · กองถ่าย",
    blurb:
      "The unglamorous half — direction, blocking, hair-and-makeup, and the studio floor between takes.",
    shots: [
      {
        src: onsetAsset.url,
        title: "On Set · Directing",
        caption: "Grey shirt, hand-cue mid-take — directing a segment with the crew.",
      },
      {
        src: heroAsset.url,
        title: "Between Takes",
        caption: "A candid warm smile between takes — production lights still hot.",
        tall: true,
      },
    ],
  },
];

function GalleryPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <Hero />
      <main className="container-editorial pb-32">
        {CATEGORIES.map((cat) => (
          <CategoryBlock key={cat.slug} cat={cat} />
        ))}
      </main>
      <Footer />
    </div>
  );
}

function TopBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-background/60 border-b border-border">
      <div className="container-editorial flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-3">
          <span className="mono text-xs text-muted-foreground">← Back</span>
          <span className="font-display text-xl tracking-tight">
            Dr.<span className="italic text-primary">Joe</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          {CATEGORIES.map((c) => (
            <a
              key={c.slug}
              href={`#${c.slug}`}
              className="mono text-[11px] text-muted-foreground hover:text-foreground transition-colors"
            >
              {c.n} · {c.title.split(" ")[0]}
            </a>
          ))}
        </nav>
        <Link
          to="/timeline"
          className="mono text-xs px-3 py-2 border border-border rounded-full hover:border-foreground transition-colors"
        >
          Timeline →
        </Link>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="pt-32 pb-16 border-b border-border">
      <div className="container-editorial">
        <div className="mono text-xs text-primary tracking-widest mb-6">
          GALLERY · BEHIND THE SCENES
        </div>
        <h1 className="font-display text-5xl md:text-7xl leading-[1.05] tracking-tight max-w-4xl">
          Frames from the <span className="italic text-primary">work</span> — thirty
          years of studios, rings, stages and sets.
        </h1>
        <p className="mt-8 max-w-2xl text-muted-foreground text-lg leading-relaxed">
          คลังภาพเบื้องหลังของ ดร.โจ — จากห้องส่งทีวี ริมสังเวียน THAI FIGHT
          สตูดิโอพอดแคสต์ MUAY O.G. ไปจนถึงเวที Keynote และกองถ่ายจริง
          จัดหมวดหมู่ตามเส้นทางการทำงาน
        </p>
        <div className="mt-10 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <a
              key={c.slug}
              href={`#${c.slug}`}
              className="mono text-[11px] px-3 py-1.5 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
            >
              {c.n} · {c.title}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryBlock({ cat }: { cat: Category }) {
  return (
    <section id={cat.slug} className="pt-24 scroll-mt-24">
      <div className="flex items-baseline gap-4 mb-3">
        <span className="mono text-xs text-primary">{cat.n}</span>
        <span className="h-px flex-1 bg-border" />
        <span className="mono text-[10px] text-muted-foreground">
          {cat.shots.length} {cat.shots.length === 1 ? "frame" : "frames"}
        </span>
      </div>
      <h2 className="font-display text-3xl md:text-5xl tracking-tight">
        {cat.title}
      </h2>
      <div className="mt-2 text-muted-foreground">{cat.thTitle}</div>
      <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
        {cat.blurb}
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 md:auto-rows-[280px]">
        {cat.shots.map((s, i) => (
          <figure
            key={i}
            className={[
              "group relative overflow-hidden rounded-lg border border-border bg-card",
              s.wide ? "md:col-span-2" : "",
              s.tall ? "md:row-span-2" : "",
            ].join(" ")}
          >
            <img
              src={s.src}
              alt={s.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-5">
              <div className="mono text-[10px] text-primary tracking-widest">
                {cat.n} · {String(i + 1).padStart(2, "0")}
              </div>
              <div className="font-display text-xl mt-1">{s.title}</div>
              <div className="text-xs text-muted-foreground mt-1 leading-relaxed">
                {s.caption}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-12 mt-20">
      <div className="container-editorial flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="font-display text-2xl">
            Dr.<span className="italic text-primary">Joe</span>
          </div>
          <div className="mono text-xs text-muted-foreground mt-1">
            Muay Thai Intelligence Architect
          </div>
        </div>
        <div className="flex gap-4 mono text-xs">
          <Link to="/" className="text-muted-foreground hover:text-foreground">
            ← Home
          </Link>
          <Link
            to="/timeline"
            className="text-muted-foreground hover:text-foreground"
          >
            Timeline →
          </Link>
        </div>
      </div>
    </footer>
  );
}
