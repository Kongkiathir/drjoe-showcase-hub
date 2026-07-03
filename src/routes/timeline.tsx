import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/timeline")({
  component: TimelinePage,
  head: () => ({
    meta: [
      { title: "CV & Timeline · Dr. Joe — Muay Thai Intelligence" },
      {
        name: "description",
        content:
          "เส้นทางสำคัญของ ดร.โจ — จากผู้กำกับภาพยนตร์และละครโทรทัศน์ สู่ผู้ขับเคลื่อน THAI FIGHT, MUAY O.G. และโครงการ Muay Thai Data & AI Platform",
      },
      { property: "og:title", content: "CV & Timeline · Dr. Joe" },
      {
        property: "og:description",
        content:
          "Selected timeline: film, TV, THAI FIGHT, MUAY O.G., UNESCO, Olympic movement, and Muay Thai Intelligence.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

type TimelineItem = {
  year: string;
  en: string;
  th: string;
  tag?: string;
};

const TIMELINE: TimelineItem[] = [
  {
    year: "1991",
    tag: "Education",
    en: "Bachelor of Laws, Ramkhamhaeng University",
    th: "นิติศาสตรบัณฑิต มหาวิทยาลัยรามคำแหง",
  },
  {
    year: "1992–1999",
    tag: "Television",
    en: "Production controller for television dramas and programs at Five Star Production",
    th: "ผู้ควบคุมการผลิตละครและรายการโทรทัศน์ บริษัท ไฟว์สตาร์ จำกัด",
  },
  {
    year: "1994",
    tag: "Live Broadcast",
    en: "Live broadcast controller for ISUZU CUP opening and closing ceremonies",
    th: "ผู้ควบคุมการถ่ายทอดสดพิธีเปิดและปิดการแข่งขันมวยรอบ ISUZU CUP",
  },
  {
    year: "1998",
    tag: "Film · Award",
    en: 'Director of "มัจจุราชตามล่าข้าไม่สน" and recipient of the Phra Surasawadi Award for Best Technical Achievement',
    th: 'ผู้กำกับภาพยนตร์เรื่อง "มัจจุราชตามล่าข้าไม่สน" และได้รับรางวัลพระสุรัสวดี สาขาเทคนิคยอดเยี่ยม',
  },
  {
    year: "2001–2007",
    tag: "Television",
    en: "Director of approximately 30 television dramas",
    th: "กำกับละครโทรทัศน์ประมาณ 30 เรื่อง",
  },
  {
    year: "2007",
    tag: "Film",
    en: 'Director of the film "คู่แรด"',
    th: 'ผู้กำกับภาพยนตร์เรื่อง "คู่แรด"',
  },
  {
    year: "2010 onward",
    tag: "THAI FIGHT",
    en: "Key role in THAI FIGHT production, marketing, event structure, and audience experience",
    th: "มีบทบาทสำคัญในการผลิต การตลาด โครงสร้างการแข่งขัน และประสบการณ์ผู้ชมของ THAI FIGHT",
  },
  {
    year: "2013",
    tag: "Live Broadcast",
    en: "Live broadcast production for CHANG CHAMPIONS CUP: Thailand National Team vs FC Barcelona",
    th: "ควบคุมการถ่ายทอดสดการแข่งขัน CHANG CHAMPIONS CUP ทีมชาติไทยพบทีมบาร์เซโลนา",
  },
  {
    year: "2018",
    tag: "Studio · Muay O.G.",
    en: "Founded Originals Studio and developed MUAY O.G. / Muay Thai Archives",
    th: "ก่อตั้ง Originals Studio และพัฒนา MUAY O.G. / Muay Thai Archives",
  },
  {
    year: "2020",
    tag: "Education",
    en: "MBA in Sports Media and Entertainment Management, KMITL",
    th: "บริหารธุรกิจมหาบัณฑิต สาขาการจัดการกีฬา สื่อ และบันเทิง สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",
  },
  {
    year: "2020 onward",
    tag: "Founder",
    en: "Founder of IDOL GAMES, IDOL FIGHT, and IDOL LEAGUE",
    th: "ผู้ก่อตั้ง IDOL GAMES, IDOL FIGHT และ IDOL LEAGUE",
  },
  {
    year: "2022",
    tag: "National",
    en: "Working group member for driving Muay Thai toward the Olympic movement",
    th: "คณะทำงานการขับเคลื่อนมวยไทยสู่โอลิมปิก",
  },
  {
    year: "2023",
    tag: "UNESCO",
    en: "Expert working group member for Muay Thai intangible cultural heritage data preparation for UNESCO submission",
    th: 'ผู้ทรงคุณวุฒิคณะทำงานจัดทำข้อมูลมรดกภูมิปัญญาทางวัฒนธรรม "มวยไทย" เพื่อเสนอยูเนสโก',
  },
  {
    year: "2024–2025",
    tag: "Advisory",
    en: "Advisor and contributor to national-level AI, culture, tourism, sport, influence, and marketing technology initiatives",
    th: "ที่ปรึกษาและผู้ร่วมงานในโครงการระดับชาติด้าน AI วัฒนธรรม การท่องเที่ยว กีฬา Influence และ Marketing Technology",
  },
  {
    year: "2026",
    tag: "Education",
    en: "Doctor of Philosophy, KMITL",
    th: "ปริญญาปรัชญาดุษฎีบัณฑิต สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",
  },
  {
    year: "2026 onward",
    tag: "Muay Thai Intelligence",
    en: "Developing Muay Thai Data & AI Platform and Muay Thai Intelligence initiatives",
    th: "พัฒนาโครงการ Muay Thai Data & AI Platform และแนวคิด Muay Thai Intelligence",
  },
];

function TimelinePage() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-background/60 border-b border-border">
        <div className="container-editorial flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <span className="mono text-xs text-muted-foreground">← Home</span>
            <span className="font-display text-xl tracking-tight">
              Dr.<span className="italic text-primary">Joe</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-4 mono text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span>·</span>
            <Link to="/timeline" className="text-foreground">CV / Timeline</Link>
          </nav>
          <a
            href="mailto:JOETHAIFIGHT@GMAIL.COM"
            className="mono text-xs px-3 py-2 border border-border rounded-full hover:border-primary hover:text-primary transition-colors"
          >
            Contact →
          </a>
        </div>
      </header>

      {/* Header */}
      <section className="pt-40 pb-20 border-b border-border">
        <div className="container-editorial">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-px bg-primary" />
            <span className="mono text-xs text-muted-foreground">
              § CV — Selected Timeline
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-8">
            Selected <span className="italic text-primary">Timeline</span>
          </h1>
          <p className="font-display italic text-xl md:text-2xl text-muted-foreground mb-4">
            เส้นทางสำคัญ
          </p>
          <p className="max-w-2xl text-base md:text-lg text-foreground/75">
            จากห้องตัดต่อภาพยนตร์และสตูดิโอละครโทรทัศน์ สู่เวที THAI FIGHT,
            การขับเคลื่อนมวยไทยสู่โอลิมปิกและ UNESCO และการพัฒนา
            Muay Thai Data & AI Platform
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24">
        <div className="container-editorial">
          <div className="relative">
            {/* vertical line */}
            <div
              aria-hidden
              className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border"
            />

            <ol className="space-y-16">
              {TIMELINE.map((item, i) => {
                const left = i % 2 === 0;
                return (
                  <li
                    key={item.year + i}
                    className="relative grid md:grid-cols-2 gap-8 md:gap-16 items-start"
                  >
                    {/* dot */}
                    <span
                      aria-hidden
                      className="absolute left-4 md:left-1/2 -translate-x-1/2 top-2 w-3 h-3 rounded-full bg-primary ring-4 ring-background"
                    />

                    {/* Year column */}
                    <div
                      className={`pl-12 md:pl-0 ${
                        left ? "md:pr-16 md:text-right" : "md:col-start-2 md:pl-16"
                      }`}
                    >
                      <div className="mono text-xs text-primary mb-2">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="font-display text-4xl md:text-5xl leading-none">
                        {item.year}
                      </div>
                      {item.tag && (
                        <div
                          className={`mt-3 inline-block mono text-[10px] uppercase tracking-widest px-2 py-1 border border-border rounded-full text-muted-foreground`}
                        >
                          {item.tag}
                        </div>
                      )}
                    </div>

                    {/* Content column */}
                    <div
                      className={`pl-12 md:pl-0 ${
                        left ? "md:col-start-2 md:pl-16" : "md:col-start-1 md:row-start-1 md:pr-16 md:text-right"
                      }`}
                    >
                      <p className="text-base md:text-lg leading-relaxed text-foreground/90 mb-3">
                        {item.en}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.th}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-border">
        <div className="container-editorial text-center">
          <div className="section-label mb-6">§ Next — Collaborate</div>
          <h2 className="font-display text-4xl md:text-6xl leading-tight max-w-3xl mx-auto mb-8">
            ร่วมสร้าง <span className="italic text-primary">Muay Thai Intelligence</span> ไปด้วยกัน
          </h2>
          <a
            href="mailto:JOETHAIFIGHT@GMAIL.COM"
            className="inline-block font-display italic text-2xl md:text-4xl text-primary hover:opacity-80 transition"
          >
            JOETHAIFIGHT@GMAIL.COM →
          </a>
          <div className="mt-6">
            <Link
              to="/"
              className="mono text-xs px-4 py-2 border border-border rounded-full hover:border-foreground transition inline-block"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-10">
        <div className="container-editorial flex flex-col md:flex-row justify-between items-center gap-4 mono text-xs text-muted-foreground">
          <div>© MMXXVI · Dr.Joe · Muay Thai Intelligence</div>
          <div>drjoe.site · MUAY O.G.</div>
        </div>
      </footer>
    </div>
  );
}
