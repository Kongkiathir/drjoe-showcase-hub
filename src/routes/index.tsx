import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import heroAsset from "@/assets/drjoe-hero.jpg.asset.json";
import keynoteAsset from "@/assets/drjoe-keynote.jpg.asset.json";
import podcastAsset from "@/assets/drjoe-podcast.jpg.asset.json";
import thaifightAsset from "@/assets/drjoe-thaifight.jpg.asset.json";
import tvAsset from "@/assets/drjoe-tv.jpg.asset.json";
import onsetAsset from "@/assets/drjoe-onset.jpg.asset.json";
import muayogAsset from "@/assets/drjoe-muayog.jpg.asset.json";
import talkshowAsset from "@/assets/drjoe-talkshow.jpg.asset.json";
import heroOnsetAsset from "@/assets/drjoe-hero-onset.jpg.asset.json";
import heroRingAsset from "@/assets/drjoe-hero-thaifight-ring.jpg.asset.json";
import heroCommentaryAsset from "@/assets/drjoe-hero-commentary.jpg.asset.json";
import heroPanelAsset from "@/assets/drjoe-hero-panel.jpg.asset.json";
import heroPortraitAsset from "@/assets/drjoe-hero-portrait.jpg.asset.json";

// Hero rotates through five signature frames every 3 seconds.
const HERO_SLIDES = [
  { src: heroPortraitAsset.url, label: "Dr. Joe · Studio Portrait", position: "center 25%" },
  { src: heroOnsetAsset.url, label: "Dr. Joe · On Set Directing", position: "center 30%" },
  { src: heroRingAsset.url, label: "Dr. Joe · THAI FIGHT Ringside", position: "center 25%" },
  { src: heroCommentaryAsset.url, label: "Dr. Joe · Live Commentary", position: "center 30%" },
  { src: heroPanelAsset.url, label: "Dr. Joe · Keynote Panel", position: "center 25%" },
];
const heroImg = HERO_SLIDES[0].src;
const portraitImg = heroAsset.url;
const keynoteImg = keynoteAsset.url;
const thaifightImg = thaifightAsset.url;
const tvImg = tvAsset.url;
const onsetImg = onsetAsset.url;
const muayogImg = muayogAsset.url;
const talkshowImg = talkshowAsset.url;


export const Route = createFileRoute("/")({
  component: Index,
});

const NAV = [
  { id: "hero", label: "Hero" },
  { id: "expertise", label: "Expertise" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "resume", label: "Resume" },
  { id: "works", label: "Works" },
  { id: "contact", label: "Contact" },
];

const EXPERTISE = [
  {
    n: "01",
    title: "Artificial Intelligence",
    body: "Generative AI, LLM Fine-tuning, Computer Vision และ Deep Learning สำหรับองค์กร",
  },
  {
    n: "02",
    title: "Innovation & Product",
    body: "ออกแบบผลิตภัณฑ์ดิจิทัลตั้งแต่แนวคิดจนถึงการเปิดตัวจริง (0 → 1)",
  },
  {
    n: "03",
    title: "Digital Transformation",
    body: "ที่ปรึกษาปรับโครงสร้างองค์กร ด้วยข้อมูลและระบบอัตโนมัติ",
  },
  {
    n: "04",
    title: "Education & Research",
    body: "ออกแบบหลักสูตร ฝึกอบรม และตีพิมพ์งานวิจัยด้านเทคโนโลยีการศึกษา",
  },
];

// Moments — one signature frame per pillar of Dr. Joe's practice
const MOMENTS = [
  { src: thaifightImg, label: "SAMUI FIGHT 2017 · THAI FIGHT Ringside", tall: true },
  { src: tvImg, label: "GMM25 · Prime-time Broadcast Panel" },
  { src: keynoteImg, label: "KMITL Family · Virtual Stage Keynote" },
  { src: onsetImg, label: "Directing · On-Set Production", tall: true },
  { src: talkshowImg, label: "Long-form TV Interview · Yellow Set" },
  { src: muayogImg, label: "MUAY O.G. · Crew & Brand Colors" },
  { src: portraitImg, label: "Between Takes · Studio Portrait" },
];


const SKILLS = [
  { name: "Generative AI & LLM", pct: 98 },
  { name: "Machine Learning / Deep Learning", pct: 94 },
  { name: "Product Strategy", pct: 92 },
  { name: "Computer Vision", pct: 88 },
  { name: "Cloud & Data Infra", pct: 86 },
  { name: "AR / VR / XR", pct: 80 },
];

const EDUCATION = [
  {
    year: "2015 — 2019",
    degree: "Ph.D. · Computer Science",
    school: "Chulalongkorn University",
    note: "Dissertation: Human-in-the-loop Machine Learning",
  },
  {
    year: "2011 — 2013",
    degree: "M.Sc. · Information Technology",
    school: "King Mongkut's Institute of Technology Ladkrabang",
    note: "First-class Honors",
  },
  {
    year: "2007 — 2011",
    degree: "B.Eng. · Computer Engineering",
    school: "Kasetsart University",
    note: "Dean's List",
  },
];

const EXPERIENCE = [
  {
    n: "01",
    role: "Teaching · Speaking · Workshop",
    items: [
      "อาจารย์พิเศษหลักสูตร AI · หลายสถาบันชั้นนำ",
      "วิทยากรรับเชิญ AI for Business · SET, DEPA, NIA",
      "ผู้ออกแบบหลักสูตร Generative AI ระดับผู้บริหาร",
    ],
  },
  {
    n: "02",
    role: "Research & Development",
    items: [
      "หัวหน้าโครงการ AI Vision สำหรับภาคเกษตรกรรม",
      "งานวิจัยตีพิมพ์นานาชาติกว่า 20 บทความ (Scopus / IEEE)",
      "ผู้ร่วมพัฒนา Thai Foundation Model ขนาดเล็ก",
    ],
  },
  {
    n: "03",
    role: "Industry & Consulting",
    items: [
      "ที่ปรึกษาด้าน AI Strategy ให้กับองค์กรระดับ SET50",
      "ผู้ก่อตั้งและ CEO สตาร์ทอัพด้าน Enterprise AI",
      "คณะทำงานยุทธศาสตร์ AI แห่งชาติ",
    ],
  },
  {
    n: "04",
    role: "Community & Impact",
    items: [
      "โครงการ AI for All — สอนเยาวชนกว่า 5,000 คน",
      "โครงการ Digital Literacy สำหรับผู้สูงอายุ",
      "Mentor สตาร์ทอัพในโครงการชั้นนำของไทย",
    ],
  },
];

const STATS = [
  { k: "20+", v: "ปีในวงการเทคโนโลยี" },
  { k: "150+", v: "โครงการที่ปรึกษา" },
  { k: "5,000+", v: "ผู้ผ่านการอบรม" },
  { k: "20+", v: "บทความวิชาการ" },
];

const LIGHTBOX_SLIDES = [
  ...HERO_SLIDES.map((s) => ({ src: s.src, label: s.label })),
  ...MOMENTS.map((m) => ({ src: m.src, label: m.label })),
];

function Index() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <Nav />
      <Hero onOpen={(i) => openLightbox(i)} />
      <Expertise />
      <Moments onOpen={(i) => openLightbox(i + HERO_SLIDES.length)} />
      <About />
      <Skills />
      <Resume />
      <Works />
      <Contact />
      <BrandStatement />
      <Footer />
      <Lightbox
        slides={LIGHTBOX_SLIDES}
        index={lightboxIndex}
        onClose={closeLightbox}
        onChange={setLightboxIndex}
      />
    </div>
  );
}

function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-background/60 border-b border-border">
      <div className="container-editorial flex items-center justify-between h-16">
        <a href="#hero" className="flex items-center gap-3">
          <span className="mono text-xs text-muted-foreground">01 —</span>
          <span className="font-display text-xl tracking-tight">
            Dr.<span className="italic text-primary">Joe</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((n, i) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="group flex items-center gap-1.5 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="mono text-[10px] opacity-60">
                {String(i).padStart(2, "0")}
              </span>
              <span>{n.label}</span>
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/gallery"
            className="hidden sm:inline-block mono text-xs px-3 py-2 border border-border rounded-full hover:border-foreground transition-colors"
          >
            Gallery
          </Link>
          <Link
            to="/timeline"
            className="hidden sm:inline-block mono text-xs px-3 py-2 border border-border rounded-full hover:border-foreground transition-colors"
          >
            CV / Timeline
          </Link>
          <a
            href="#contact"
            className="mono text-xs px-3 py-2 border border-border rounded-full hover:border-primary hover:text-primary transition-colors"
          >
            Get in touch →
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero({ onOpen }: { onOpen: () => void }) {
  return (
    <section id="hero" className="relative min-h-screen pt-16 overflow-hidden">
      <button
        type="button"
        onClick={onOpen}
        aria-label="Open hero image"
        className="absolute inset-0 group cursor-zoom-in"
      >
        <img
          src={heroImg}
          alt="Dr.Joe portrait"
          width={1600}
          height={1200}
          className="w-full h-full object-cover opacity-45 transition-opacity duration-500 group-hover:opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background pointer-events-none" />
      </button>

      <div className="relative container-editorial min-h-[calc(100vh-4rem)] flex flex-col justify-end pb-20 pt-32 pointer-events-none">
        <div className="pointer-events-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-px bg-primary" />
          <span className="mono text-xs text-muted-foreground">
            Est. Bangkok · Portfolio MMXXVI
          </span>
        </div>
        <p className="mono text-sm text-muted-foreground mb-4">
          Dr. Joe · Nopparat Puttarattanamane
        </p>
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.9] mb-6">
          ดร.โจ<span className="italic text-primary">.</span>
        </h1>
        <p className="font-display italic text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl">
          Muay Thai Intelligence Architect · Sport Media Executive · Researcher
        </p>
        <p className="max-w-2xl text-base md:text-lg text-foreground/85 mb-4">
          Dr. Joe is the Muay Thai Intelligence Architect, decoding Thailand's
          combat heritage from archives into data, AI, sport technology, and
          future intellectual property.
        </p>
        <p className="max-w-2xl text-sm md:text-base text-muted-foreground mb-10">
          ดร.โจคือสถาปนิกแห่ง Muay Thai Intelligence
          ผู้ถอดรหัสมรดกการต่อสู้ของไทยจากคลังอดีต สู่ข้อมูล ปัญญาประดิษฐ์
          เทคโนโลยีกีฬา และทรัพย์สินทางปัญญาแห่งอนาคต
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="#works"
            className="mono text-sm px-6 py-3 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition"
          >
            View Works →
          </a>
          <a
            href="#about"
            className="mono text-sm px-6 py-3 border border-border rounded-full hover:border-foreground transition"
          >
            Scroll ↓
          </a>
        </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  index,
  label,
  title,
  sub,
}: {
  index: string;
  label: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mb-16">
      <div className="section-label mb-4">
        § {index} — {label}
      </div>
      <h2 className="font-display text-4xl md:text-6xl leading-tight max-w-4xl mb-4">
        {title}
      </h2>
      {sub && <p className="text-muted-foreground max-w-2xl text-lg">{sub}</p>}
    </div>
  );
}

function Expertise() {
  return (
    <section id="expertise" className="py-32 border-t border-border">
      <div className="container-editorial">
        <SectionHeader
          index="01"
          label="Expertise"
          title="ความเชี่ยวชาญที่หลอมรวมงานวิจัย ธุรกิจ และการศึกษา"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {EXPERTISE.map((e) => (
            <div
              key={e.n}
              className="bg-background p-8 group hover:bg-card transition-colors"
            >
              <div className="mono text-xs text-primary mb-8">{e.n}</div>
              <h3 className="font-display text-2xl mb-4 group-hover:text-primary transition-colors">
                {e.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {e.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Moments({ onOpen }: { onOpen: (i: number) => void }) {
  return (
    <section className="py-32 border-t border-border">
      <div className="container-editorial">
        <SectionHeader
          index="00½"
          label="Moments"
          title="ช่วงเวลาแห่งการเดินทาง"
          sub="บันทึกภาพเส้นทางจากห้องวิจัย สู่เวทีระดับนานาชาติ และห้องเรียนของคนรุ่นใหม่"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {MOMENTS.map((m, i) => (
            <figure
              key={i}
              className={`relative group overflow-hidden bg-card ${
                m.tall ? "row-span-2 aspect-[3/4]" : "aspect-square"
              }`}
            >
              <button
                type="button"
                onClick={() => onOpen(i)}
                aria-label={`Open ${m.label}`}
                className="absolute inset-0 w-full h-full cursor-zoom-in"
              >
                <img
                  src={m.src}
                  alt={m.label}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
              </button>
              <figcaption className="absolute bottom-4 left-4 right-4 mono text-xs text-foreground/90 pointer-events-none">
                <span className="text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>{" "}
                — {m.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Lightbox({
  slides,
  index,
  onClose,
  onChange,
}: {
  slides: { src: string; label: string }[];
  index: number | null;
  onClose: () => void;
  onChange: (i: number) => void;
}) {
  const isOpen = index !== null;

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      const next = (index + delta + slides.length) % slides.length;
      onChange(next);
    },
    [index, slides.length, onChange],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose, go]);

  if (!isOpen || index === null) return null;
  const slide = slides[index];

  return (
    <div
      className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex items-center justify-center animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={slide.label}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close"
        className="absolute top-6 right-6 mono text-xs px-4 py-2 border border-border rounded-full hover:border-primary hover:text-primary transition-colors bg-background/60"
      >
        Close ✕
      </button>

      <div className="absolute top-6 left-6 mono text-xs text-muted-foreground">
        {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          go(-1);
        }}
        aria-label="Previous image"
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full border border-border bg-background/60 hover:border-primary hover:text-primary transition-colors flex items-center justify-center text-xl"
      >
        ←
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          go(1);
        }}
        aria-label="Next image"
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full border border-border bg-background/60 hover:border-primary hover:text-primary transition-colors flex items-center justify-center text-xl"
      >
        →
      </button>

      <figure
        className="relative max-w-[92vw] max-h-[86vh] flex flex-col items-center gap-4 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.label}
          className="max-w-[92vw] max-h-[78vh] object-contain rounded-sm shadow-2xl"
        />
        <figcaption className="mono text-xs md:text-sm text-foreground/90 text-center">
          <span className="text-primary">
            {String(index + 1).padStart(2, "0")}
          </span>{" "}
          — {slide.label}
        </figcaption>
      </figure>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="py-32 border-t border-border">
      <div className="container-editorial grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <SectionHeader
            index="02"
            label="About"
            title="เกี่ยวกับ ดร.โจ"
            sub="Nopparat Puttarattanamane — นพรัตน์ พุทธรัตนมณี"
          />
        </div>
        <div className="lg:col-span-7 space-y-6 text-foreground/85 leading-relaxed">
          <p className="text-xl font-display italic text-primary">
            "From fight archives to data, AI, and future intellectual
            property — decoding Thailand's combat heritage."
          </p>
          <p>
            Dr. Joe, Nopparat Puttarattanamane, is a Thai sport media
            executive, Muay Thai innovator, researcher, and founder of
            Muay Thai Intelligence initiatives. With more than 30 years of
            experience across television, film, live sport production,
            THAI FIGHT, IDOL FIGHT, IDOL LEAGUE, MUAY O.G., and Muay Thai
            Archives, he is leading the transformation of Muay Thai from
            fight archives into data, AI, sport technology, and digital
            intellectual property.
          </p>
          <p className="text-muted-foreground">
            ดร.โจ นพรัตน์ พุทธรัตนมณี คือผู้บริหารด้านสื่อกีฬา
            นักสร้างสรรค์นวัตกรรมมวยไทย นักวิจัย และผู้ริเริ่มแนวคิด
            Muay Thai Intelligence ด้วยประสบการณ์มากกว่า 30 ปีในวงการโทรทัศน์
            ภาพยนตร์ การผลิตกีฬาสด THAI FIGHT, IDOL FIGHT, IDOL LEAGUE,
            MUAY O.G. และ Muay Thai Archives
            เขากำลังผลักดันการเปลี่ยนมวยไทยจากคลังไฟต์ในอดีต ไปสู่ข้อมูล
            ปัญญาประดิษฐ์ เทคโนโลยีกีฬา และทรัพย์สินทางปัญญาดิจิทัล
          </p>

          <div className="grid grid-cols-2 gap-px bg-border mt-12">
            {STATS.map((s) => (
              <div key={s.v} className="bg-background p-6">
                <div className="font-display text-4xl text-primary mb-2">
                  {s.k}
                </div>
                <div className="text-sm text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="py-32 border-t border-border">
      <div className="container-editorial">
        <SectionHeader
          index="03"
          label="Profile & Skills"
          title="ทักษะ · ข้อมูลติดต่อ"
        />
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 space-y-6">
            <InfoRow k="Location" v="Bangkok, Thailand" />
            <InfoRow k="Email" v="joethaifight@gmail.com" />
            <InfoRow k="Phone" v="089-453-5252" />
            <InfoRow k="Focus" v="AI · Innovation · Education" />
            <InfoRow k="Languages" v="ไทย · English · 中文 (basic)" />

            <div className="pt-6">
              <div className="section-label mb-4">Scholarships</div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                ทุนพัฒนาอาจารย์ระดับปริญญาเอก · ทุนวิจัย สกสว. · Fulbright
                Visiting Scholar
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            {SKILLS.map((s) => (
              <div key={s.name}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">{s.name}</span>
                  <span className="mono text-xs text-primary">{s.pct}%</span>
                </div>
                <div className="h-px bg-border relative overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-primary"
                    style={{ width: `${s.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 py-3 border-b border-border">
      <span className="mono text-xs text-muted-foreground uppercase">{k}</span>
      <span className="text-sm text-right">{v}</span>
    </div>
  );
}

function Resume() {
  return (
    <section id="resume" className="py-32 border-t border-border">
      <div className="container-editorial">
        <SectionHeader index="04" label="Resume" title="การศึกษา & ความสนใจ" />
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-8">
            <div className="section-label">Education</div>
            {EDUCATION.map((e, i) => (
              <div
                key={i}
                className="grid grid-cols-12 gap-4 pb-8 border-b border-border"
              >
                <div className="col-span-12 md:col-span-4 mono text-xs text-primary">
                  {e.year}
                </div>
                <div className="col-span-12 md:col-span-8">
                  <div className="font-display text-2xl mb-1">{e.degree}</div>
                  <div className="text-sm text-muted-foreground">{e.school}</div>
                  <div className="text-xs mt-2 text-foreground/60 italic">
                    {e.note}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-5 space-y-6">
            <div className="section-label">Research Interests</div>
            <div className="flex flex-wrap gap-2">
              {[
                "Generative AI",
                "LLM Fine-tuning",
                "Computer Vision",
                "Reinforcement Learning",
                "Human-AI Interaction",
                "AI Ethics",
                "Edge Computing",
                "AR / VR / XR",
                "EdTech",
              ].map((t) => (
                <span
                  key={t}
                  className="mono text-xs px-3 py-1.5 border border-border rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="pt-6 section-label">Selected Committees</div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>· คณะกรรมการยุทธศาสตร์ AI แห่งชาติ</li>
              <li>· ที่ปรึกษาสมาคมปัญญาประดิษฐ์ประเทศไทย (AIAT)</li>
              <li>· กรรมการวิชาการหลักสูตรบัณฑิตศึกษาด้าน AI</li>
              <li>· Editorial Board · Journal of Applied AI</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Works() {
  return (
    <section id="works" className="py-32 border-t border-border">
      <div className="container-editorial">
        <SectionHeader
          index="05"
          label="Professional Experience"
          title="งานวิชาชีพและผลงาน"
        />
        <div className="grid md:grid-cols-2 gap-px bg-border">
          {EXPERIENCE.map((ex) => (
            <div key={ex.n} className="bg-background p-10">
              <div className="flex items-baseline gap-4 mb-6">
                <div className="mono text-xs text-primary">{ex.n}</div>
                <h3 className="font-display text-2xl">{ex.role}</h3>
              </div>
              <ul className="space-y-3">
                {ex.items.map((it) => (
                  <li
                    key={it}
                    className="text-sm text-muted-foreground flex gap-3"
                  >
                    <span className="text-primary mt-1.5">—</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const COLLAB_AREAS = [
  { en: "Government & policy initiatives", th: "โครงการภาครัฐและนโยบายระดับประเทศ" },
  { en: "Universities & research institutions", th: "มหาวิทยาลัยและสถาบันวิจัย" },
  { en: "Sport technology & AI companies", th: "บริษัท Sport Technology และปัญญาประดิษฐ์" },
  { en: "Media & broadcast platforms", th: "สื่อและแพลตฟอร์มการถ่ายทอดสด" },
  { en: "Muay Thai orgs, gyms & promoters", th: "องค์กรมวยไทย ค่ายมวย และโปรโมเตอร์" },
  { en: "Game, animation & digital studios", th: "สตูดิโอเกม แอนิเมชัน และคอนเทนต์ดิจิทัล" },
  { en: "Cultural & creative economy partners", th: "พันธมิตรด้านวัฒนธรรมและเศรษฐกิจสร้างสรรค์" },
  { en: "Investors & strategic partners", th: "นักลงทุนและพันธมิตรเชิงยุทธศาสตร์" },
];

function Contact() {
  return (
    <section
      id="contact"
      className="py-32 border-t border-border relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="container-editorial relative">
        <SectionHeader
          index="06"
          label="Contact & Collaboration"
          title="Work with Dr. Joe · ร่วมงานกับดร.โจ"
          sub="Dr. Joe welcomes collaboration with organizations and partners who share the vision of advancing Muay Thai through data, technology, media, culture, education, and intellectual property. — ดร.โจเปิดรับความร่วมมือกับองค์กรและพันธมิตรที่มีวิสัยทัศน์ร่วมกันในการยกระดับมวยไทยผ่านข้อมูล เทคโนโลยี สื่อ วัฒนธรรม การศึกษา และทรัพย์สินทางปัญญา"
        />

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Collaboration areas */}
          <div className="lg:col-span-7">
            <div className="section-label mb-6">Collaboration Areas · ขอบเขตความร่วมมือ</div>
            <div className="grid sm:grid-cols-2 gap-px bg-border">
              {COLLAB_AREAS.map((c, i) => (
                <div key={c.en} className="bg-background p-6">
                  <div className="mono text-[10px] text-primary mb-2">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="font-display text-lg mb-1">{c.en}</div>
                  <div className="text-xs text-muted-foreground">{c.th}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact details */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="section-label mb-4">Direct Contact · ติดต่อโดยตรง</div>
              <a
                href="mailto:JOETHAIFIGHT@GMAIL.COM"
                className="block font-display italic text-2xl md:text-3xl text-primary hover:opacity-80 transition break-all"
              >
                JOETHAIFIGHT@GMAIL.COM →
              </a>
              <a
                href="tel:+66894535252"
                className="mono text-sm text-foreground/80 hover:text-primary transition mt-3 inline-block"
              >
                ☎ 089-453-5252
              </a>
            </div>

            <div className="space-y-3 pt-6 border-t border-border">
              <InfoRow k="Website" v="drjoe.site" />
              <InfoRow k="YouTube" v="MUAY O.G." />
              <InfoRow k="Podcast" v="Muay Thai Intelligence" />
            </div>

            <div className="pt-6">
              <div className="section-label mb-4">Follow</div>
              <div className="flex flex-wrap gap-2">
                {["YouTube · MUAY O.G.", "Podcast · Muay Thai Intelligence", "drjoe.site"].map((s) => (
                  <span
                    key={s}
                    className="mono text-xs px-3 py-1.5 border border-border rounded-full"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="container-editorial flex flex-col md:flex-row justify-between items-center gap-4 mono text-xs text-muted-foreground">
        <div>© MMXXVI · Dr.Joe. All rights reserved.</div>
        <div>Crafted in Bangkok · Made with intent.</div>
      </div>
    </footer>
  );
}

function BrandStatement() {
  return (
    <section className="relative py-32 md:py-40 border-t border-border overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      <div className="container-editorial relative">
        <div className="section-label mb-10 text-center">Final Statement · บทสรุป</div>
        <div className="max-w-4xl mx-auto space-y-10 text-center">
          <p className="font-serif text-3xl md:text-5xl leading-tight tracking-tight text-foreground">
            Dr. Joe's work is not about looking back at Muay Thai with nostalgia. It is about using the past as raw material to build the future.
          </p>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            งานของดร.โจไม่ใช่การมองอดีตของมวยไทยด้วยความคิดถึงเท่านั้น แต่คือการใช้อดีตเป็นวัตถุดิบในการสร้างอนาคต
          </p>

          <div className="h-px w-24 bg-primary/40 mx-auto" />

          <div className="grid md:grid-cols-3 gap-6 mono text-sm uppercase tracking-widest text-foreground/80">
            <div>From fight archives <br /><span className="text-primary">to structured data</span></div>
            <div>From experience <br /><span className="text-primary">to intelligence</span></div>
            <div>From Muay Thai heritage <br /><span className="text-primary">to global sport tech</span></div>
          </div>
          <p className="text-base text-muted-foreground leading-relaxed">
            จากคลังไฟต์ สู่ข้อมูลเชิงโครงสร้าง · จากประสบการณ์ สู่ปัญญา · จากมรดกมวยไทย สู่เทคโนโลยีกีฬาระดับโลก
          </p>

          <div className="pt-8">
            <p className="font-serif italic text-2xl md:text-3xl text-foreground">
              This is the universe of Dr. Joe.
            </p>
            <p className="mt-2 text-muted-foreground">นี่คือจักรวาลของดร.โจ</p>
          </div>
        </div>
      </div>
    </section>
  );
}
