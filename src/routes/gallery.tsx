import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import heroAsset from "@/assets/drjoe-hero.jpg.asset.json";
import keynoteAsset from "@/assets/drjoe-keynote.jpg.asset.json";
import podcastAsset from "@/assets/drjoe-podcast.jpg.asset.json";
import thaifightAsset from "@/assets/drjoe-thaifight.jpg.asset.json";
import tvAsset from "@/assets/drjoe-tv.jpg.asset.json";
import onsetAsset from "@/assets/drjoe-onset.jpg.asset.json";
import muayogAsset from "@/assets/drjoe-muayog.jpg.asset.json";
import newsAsset from "@/assets/drjoe-news.jpg.asset.json";
import talkshowAsset from "@/assets/drjoe-talkshow.jpg.asset.json";
import upGreen from "@/assets/gallery-greenscreen.jpg.asset.json";
import upInterview from "@/assets/gallery-interview.jpg.asset.json";
import upMuayogStudio from "@/assets/gallery-muayog-studio.jpg.asset.json";
import upPress from "@/assets/gallery-press.jpg.asset.json";
import upDragon from "@/assets/gallery-dragon.jpg.asset.json";
import upGrad from "@/assets/gallery-graduation.jpg.asset.json";
import upPerf from "@/assets/gallery-performance.jpg.asset.json";
import upTvteam from "@/assets/gallery-tvteam.jpg.asset.json";
import upOnsetSmile from "@/assets/gallery-onset-smile.jpg.asset.json";
import upThreeManDown from "@/assets/gallery-threemandown.jpg.asset.json";
import upKrasae from "@/assets/gallery-krasae.jpg.asset.json";
import upTvPanel2 from "@/assets/gallery-tvpanel2.jpg.asset.json";
import upKmitl from "@/assets/gallery-kmitl.jpg.asset.json";
import upListener from "@/assets/gallery-listener.jpg.asset.json";
import upEditRoom from "@/assets/gallery-editroom.jpg.asset.json";
import upJump from "@/assets/gallery-jump.jpg.asset.json";
import upBtsBoxes from "@/assets/gallery-bts-boxes.jpg.asset.json";
import upTrio from "@/assets/gallery-trio.jpg.asset.json";
import upF16 from "@/assets/gallery-f16.jpg.asset.json";
import upPortrait2 from "@/assets/gallery-portrait2.jpg.asset.json";
import upKmitlStage from "@/assets/gallery-kmitl-stage.jpg.asset.json";
import upMaskedCrew from "@/assets/gallery-masked-crew.jpg.asset.json";
import upOnsetWood from "@/assets/gallery-onset-wood.jpg.asset.json";
import upBarInterview from "@/assets/gallery-bar-interview.jpg.asset.json";
import upThreeHosts from "@/assets/gallery-three-hosts.jpg.asset.json";
import upCh3Panel from "@/assets/gallery-ch3-panel.jpg.asset.json";
import upTeamGraffiti from "@/assets/gallery-team-graffiti.jpg.asset.json";
import upCeremony from "@/assets/gallery-ceremony.jpg.asset.json";
import upTfChiangrai from "@/assets/gallery-tf-chiangrai.jpg.asset.json";
import upTfRingInt from "@/assets/gallery-tf-ring-interview.jpg.asset.json";
import upTfCrowdRain from "@/assets/gallery-tf-crowd-rain.jpg.asset.json";
import upTfStageGreen from "@/assets/gallery-tf-stage-green.jpg.asset.json";
import upTfSunset from "@/assets/gallery-tf-sunset.jpg.asset.json";
import upTfVietnam from "@/assets/gallery-tf-vietnam.jpg.asset.json";
import upTfControl from "@/assets/gallery-tf-control.jpg.asset.json";
import upTfHosts from "@/assets/gallery-tf-hosts.jpg.asset.json";
import upTfBlessing from "@/assets/gallery-tf-blessing.jpg.asset.json";
import upTfWeighin from "@/assets/gallery-tf-weighin.jpg.asset.json";

const SEEDED_UPLOADS = [
  { id: "s1", url: upGreen.url, caption: "เบื้องหลังถ่ายทำ กรีนสกรีน", category: "on set" },
  { id: "s2", url: upInterview.url, caption: "บันทึกเทปสัมภาษณ์", category: "interview" },
  { id: "s3", url: upMuayogStudio.url, caption: "รายการ MUAY O.G.", category: "podcast" },
  { id: "s4", url: upPress.url, caption: "งานแถลงข่าว", category: "event" },
  { id: "s5", url: upDragon.url, caption: "โปรโมตคาแรกเตอร์", category: "portrait" },
  { id: "s6", url: upGrad.url, caption: "รับปริญญา", category: "milestone" },
  { id: "s7", url: upPerf.url, caption: "การแสดงบนเวที", category: "performance" },
  { id: "s8", url: upTvteam.url, caption: "ทีมงานรายการโทรทัศน์", category: "on set" },
  { id: "s9", url: upOnsetSmile.url, caption: "บรรยากาศกองถ่าย", category: "on set" },
  { id: "s10", url: upThreeManDown.url, caption: "คอนเสิร์ต Three Man Down", category: "event" },
  { id: "s11", url: upKrasae.url, caption: "รายการกระแสแต่เช้า · เซียนแปะโรงสี", category: "broadcast" },
  { id: "s12", url: upTvPanel2.url, caption: "แขกรับเชิญรายการทอล์กโชว์", category: "broadcast" },
  { id: "s13", url: upKmitl.url, caption: "KMITL Family · ทีมงานเวที", category: "stage" },
  { id: "s14", url: upListener.url, caption: "The Listener EP.1 · 2.2M views", category: "podcast" },
  { id: "s15", url: upEditRoom.url, caption: "ห้องตัดต่อยุคแรก", category: "archive" },
  { id: "s16", url: upJump.url, caption: "แอ็กชันคาแรกเตอร์ กระโดดกลางเซ็ต", category: "portrait" },
  { id: "s17", url: upBtsBoxes.url, caption: "เบื้องหลังกองถ่าย เซ็ตกล่องกระดาษ", category: "on set" },
  { id: "s18", url: upTrio.url, caption: "แขกรับเชิญพอดแคสต์ 3 คน", category: "podcast" },
  { id: "s19", url: upF16.url, caption: "กองถ่ายที่ฐานทัพ F-16", category: "archive" },
  { id: "s20", url: upPortrait2.url, caption: "โปรไฟล์ภาพถ่ายทางการ", category: "portrait" },
  { id: "s21", url: upKmitlStage.url, caption: "KMITL Family · หลังเวทีคอนโทรล", category: "stage" },
  { id: "s22", url: upMaskedCrew.url, caption: "ถ่ายรูปกับทีมนักแสดง", category: "event" },
  { id: "s23", url: upOnsetWood.url, caption: "เบื้องหลังกองถ่ายในบ้านไม้", category: "on set" },
  { id: "s24", url: upBarInterview.url, caption: "สัมภาษณ์บรรยากาศบาร์", category: "interview" },
  { id: "s25", url: upThreeHosts.url, caption: "สามพิธีกรบันทึกรายการ", category: "podcast" },
  { id: "s26", url: upCh3Panel.url, caption: "รายการช่อง 3 · แขกรับเชิญไทยไฟท์", category: "broadcast" },
  { id: "s27", url: upTeamGraffiti.url, caption: "ทีมงาน 'ค้นคน' ยุคแรก", category: "archive" },
  { id: "s28", url: upCeremony.url, caption: "พิธีบวงสรวงเปิดกล้อง", category: "milestone" },
];

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
  const [uploaded, setUploaded] = useState<
    { id: string; url: string; caption: string | null; category: string }[]
  >(SEEDED_UPLOADS);

  useEffect(() => {
    supabase
      .from("gallery_images")
      .select("id,url,caption,category")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data && data.length) setUploaded([...data, ...SEEDED_UPLOADS]);
      });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <Hero />
      <main className="container-editorial pb-32">
        {uploaded.length > 0 && <UploadedBlock images={uploaded} />}
        {CATEGORIES.map((cat) => (
          <CategoryBlock key={cat.slug} cat={cat} />
        ))}
      </main>
      <Footer />
    </div>
  );
}

function UploadedBlock({
  images,
}: {
  images: { id: string; url: string; caption: string | null; category: string }[];
}) {
  return (
    <section id="latest" className="pt-24 scroll-mt-24">
      <div className="flex items-baseline gap-4 mb-3">
        <span className="mono text-xs text-primary">00</span>
        <span className="h-px flex-1 bg-border" />
        <span className="mono text-[10px] text-muted-foreground">
          {images.length} {images.length === 1 ? "frame" : "frames"}
        </span>
      </div>
      <h2 className="font-display text-3xl md:text-5xl tracking-tight">
        Latest Uploads
      </h2>
      <div className="mt-2 text-muted-foreground">อัปเดตล่าสุด</div>
      <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {images.map((img) => (
          <figure
            key={img.id}
            className="group relative overflow-hidden rounded-lg border border-border bg-card aspect-square"
          >
            <img
              src={img.url}
              alt={img.caption ?? ""}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {img.caption && (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <figcaption className="absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="mono text-[10px] text-primary tracking-widest">
                    {img.category}
                  </div>
                  <div className="text-xs mt-1 leading-relaxed">{img.caption}</div>
                </figcaption>
              </>
            )}
          </figure>
        ))}
      </div>
    </section>
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
