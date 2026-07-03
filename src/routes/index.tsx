import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-drjoe.jpg";
import keynoteImg from "@/assets/moment-keynote.jpg";
import vrImg from "@/assets/moment-vr.jpg";
import awardImg from "@/assets/moment-award.jpg";
import droneImg from "@/assets/moment-drone.jpg";

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

const MOMENTS = [
  { src: keynoteImg, label: "Keynote · AI Summit 2025", tall: true },
  { src: vrImg, label: "R&D · VR / XR Lab" },
  { src: awardImg, label: "National Innovation Award" },
  { src: droneImg, label: "Autonomous Systems · KDX Series", tall: true },
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

function Index() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Expertise />
      <Moments />
      <About />
      <Skills />
      <Resume />
      <Works />
      <Contact />
      <Footer />
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
        <a
          href="#contact"
          className="mono text-xs px-3 py-2 border border-border rounded-full hover:border-primary hover:text-primary transition-colors"
        >
          Get in touch →
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="hero" className="relative min-h-screen pt-16 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Dr.Joe portrait"
          width={1600}
          height={1200}
          className="w-full h-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
      </div>

      <div className="relative container-editorial min-h-[calc(100vh-4rem)] flex flex-col justify-end pb-20 pt-32">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-px bg-primary" />
          <span className="mono text-xs text-muted-foreground">
            Est. Bangkok · Portfolio MMXXVI
          </span>
        </div>
        <p className="mono text-sm text-muted-foreground mb-4">
          Dr.Joe · Ph.D. Computer Science
        </p>
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.9] mb-6">
          ดร.โจ<span className="italic text-primary">.</span>
        </h1>
        <p className="font-display italic text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl">
          AI Researcher · Innovation Architect · Educator
        </p>
        <p className="max-w-xl text-base md:text-lg text-foreground/80 mb-10">
          สถาปนิกด้าน Artificial Intelligence และนวัตกรรมดิจิทัล
          ที่เชื่อมโลกงานวิจัยเข้ากับผลลัพธ์ทางธุรกิจและสังคมไทย
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

function Moments() {
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
              <img
                src={m.src}
                alt={m.label}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
              <figcaption className="absolute bottom-4 left-4 right-4 mono text-xs text-foreground/90">
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

function About() {
  return (
    <section id="about" className="py-32 border-t border-border">
      <div className="container-editorial grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <SectionHeader index="02" label="About" title="เกี่ยวกับ ดร.โจ" />
        </div>
        <div className="lg:col-span-7 space-y-6 text-foreground/85 leading-relaxed">
          <p className="text-xl font-display italic text-primary">
            "เทคโนโลยีที่ดีที่สุด คือเทคโนโลยีที่มองไม่เห็น
            แต่เปลี่ยนชีวิตผู้คนได้จริง"
          </p>
          <p>
            ดร.โจ คือนักวิจัยและนักปฏิบัติด้านปัญญาประดิษฐ์
            ผู้มีบทบาทสำคัญในการผลักดันการประยุกต์ใช้ AI ให้เกิดผลลัพธ์
            เชิงประจักษ์ในภาครัฐ ภาคเอกชน และวงการการศึกษาไทย
          </p>
          <p>
            ด้วยประสบการณ์กว่า 20 ปีในสายเทคโนโลยี
            เขาได้ก่อตั้งบริษัทสตาร์ทอัพหลายแห่ง
            เป็นที่ปรึกษาให้กับองค์กรระดับ SET50
            และเป็นผู้ออกแบบหลักสูตรด้าน AI ระดับผู้บริหาร
            ให้กับสถาบันชั้นนำของประเทศ
          </p>
          <p>
            งานที่เขาให้ความสำคัญที่สุด คือการถ่ายทอดความรู้สู่คนรุ่นใหม่
            ผ่านโครงการ "AI for All" ที่ได้อบรมเยาวชนไทยกว่า 5,000 คน
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
