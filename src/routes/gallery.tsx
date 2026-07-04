import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import upTempleGroup from "@/assets/gallery-temple-group.jpg.asset.json";
import upOhmxEvent from "@/assets/gallery-ohmx-event.jpg.asset.json";
import upFightersGroup from "@/assets/gallery-fighters-group.jpg.asset.json";
import upConiTeam from "@/assets/gallery-coni-team.jpg.asset.json";
import upConiPanel from "@/assets/gallery-coni-panel.jpg.asset.json";
import upStageGuests from "@/assets/gallery-stage-guests.jpg.asset.json";
import upStageTrio from "@/assets/gallery-stage-trio.jpg.asset.json";
import upThaifightTeamline from "@/assets/gallery-thaifight-teamline.jpg.asset.json";
import upOsenmaFriends from "@/assets/gallery-osenma-friends.jpg.asset.json";
import upCountdownStage from "@/assets/gallery-countdown-stage.jpg.asset.json";
import upTfSaraburiHosts from "@/assets/gallery-tf-saraburi-hosts.jpg.asset.json";
import upNakedShow from "@/assets/gallery-naked-show.jpg.asset.json";
import upTfThailand68 from "@/assets/gallery-tf-thailand68.jpg.asset.json";
import upTfPresser from "@/assets/gallery-tf-presser.jpg.asset.json";
import upTfMallFans from "@/assets/gallery-tf-mall-fans.jpg.asset.json";
import upTfKoratElder from "@/assets/gallery-tf-korat-elder.jpg.asset.json";
import upTfGiantSwing from "@/assets/gallery-tf-giantswing.jpg.asset.json";
import upTfMuangdonHandshake from "@/assets/gallery-tf-muangdon-handshake.jpg.asset.json";
import upTfPressMics from "@/assets/gallery-tf-press-mics.jpg.asset.json";
import upTfSpainMortatip from "@/assets/gallery-tf-spain-mortatip.jpg.asset.json";
import upMuaythaiDayGroup from "@/assets/gallery-muaythai-day-group.jpg.asset.json";
import upTfArenaCrowd from "@/assets/gallery-tf-arena-crowd.jpg.asset.json";
import upTfPyro from "@/assets/gallery-tf-pyro.jpg.asset.json";
import upTfFightersOutdoor from "@/assets/gallery-tf-fighters-outdoor.jpg.asset.json";
import upYellowTvshow from "@/assets/gallery-yellow-tvshow.jpg.asset.json";
import upTfPmFighters from "@/assets/gallery-tf-pm-fighters.jpg.asset.json";
import upMuaythaiDayOfficials from "@/assets/gallery-muaythai-day-officials.jpg.asset.json";
import upNightRunChiangrai from "@/assets/gallery-night-run-chiangrai.jpg.asset.json";
import upSitpalanKids from "@/assets/gallery-sitpalan-kids.jpg.asset.json";
import upTfNightCrowd from "@/assets/gallery-tf-night-crowd.jpg.asset.json";
import upTfRingSuit from "@/assets/gallery-tf-ring-suit.jpg.asset.json";
import upTfKoratStudio from "@/assets/gallery-tf-korat-studio.jpg.asset.json";
import upTfRingCamera from "@/assets/gallery-tf-ring-camera.jpg.asset.json";
import upTfBriefing from "@/assets/gallery-tf-briefing.jpg.asset.json";
import upTfChiangmaiDusk from "@/assets/gallery-tf-chiangmai-dusk.jpg.asset.json";
import upTfStudioRitual from "@/assets/gallery-tf-studio-ritual.jpg.asset.json";
import upTfVipFight from "@/assets/gallery-tf-vip-fight.jpg.asset.json";
import upTfPanelMic from "@/assets/gallery-tf-panel-mic.jpg.asset.json";
import upTfOvControl from "@/assets/gallery-tf-ov-control.jpg.asset.json";
import upTfNarathiwatRain from "@/assets/gallery-tf-narathiwat-rain.jpg.asset.json";
import upLecturePanel from "@/assets/gallery-lecture-panel.jpg.asset.json";
import upBoardroomGroup from "@/assets/gallery-boardroom-group.jpg.asset.json";
import upSeminarHall from "@/assets/gallery-seminar-hall.jpg.asset.json";
import upPanelMicClose from "@/assets/gallery-panel-mic-close.jpg.asset.json";
import upKeynoteScreen from "@/assets/gallery-keynote-screen.jpg.asset.json";
import upTrainingFists from "@/assets/gallery-training-fists.jpg.asset.json";
import upMuaySuvarnabhumi from "@/assets/gallery-muay-suvarnabhumi.jpg.asset.json";
import upAdvisorDesk from "@/assets/gallery-advisor-desk.jpg.asset.json";
import upCommitteeBlue from "@/assets/gallery-committee-blue.jpg.asset.json";
import upSatHandover from "@/assets/gallery-sat-handover.jpg.asset.json";
import upMyanmarLethwei from "@/assets/gallery-myanmar-lethwei.jpg.asset.json";
import upTrainingCerts from "@/assets/gallery-training-certs.jpg.asset.json";
import upKmitlAwards from "@/assets/gallery-kmitl-awards.jpg.asset.json";
import upTraining2564 from "@/assets/gallery-training-2564.jpg.asset.json";
import upSportEconomics from "@/assets/gallery-sport-economics.jpg.asset.json";
import upSatPanel4 from "@/assets/gallery-sat-panel4.jpg.asset.json";
import upMetaverseTalk from "@/assets/gallery-metaverse-talk.jpg.asset.json";
import upMontatipUdon from "@/assets/gallery-montatip-udon.jpg.asset.json";
import upMuaythaiReform from "@/assets/gallery-muaythai-reform.jpg.asset.json";
import upTrainingThumbsup from "@/assets/gallery-training-thumbsup.jpg.asset.json";

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
  { id: "s29", url: upTfChiangrai.url, caption: "THAI FIGHT เชียงราย · หลังเวที", category: "thai fight" },
  { id: "s30", url: upTfRingInt.url, caption: "สัมภาษณ์ข้างเวที THAI FIGHT", category: "thai fight" },
  { id: "s31", url: upTfCrowdRain.url, caption: "แฟนไทยไฟท์กลางสายฝน", category: "thai fight" },
  { id: "s32", url: upTfStageGreen.url, caption: "เวที THAI FIGHT · โปรดักชันเต็มรูปแบบ", category: "thai fight" },
  { id: "s33", url: upTfSunset.url, caption: "รอเวลาพระอาทิตย์ตก ก่อนเปิดเวที", category: "thai fight" },
  { id: "s34", url: upTfVietnam.url, caption: "THAI FIGHT ทัวร์เวียดนาม", category: "thai fight" },
  { id: "s35", url: upTfControl.url, caption: "ห้องคอนโทรลถ่ายทอดสด THAI FIGHT", category: "thai fight" },
  { id: "s36", url: upTfHosts.url, caption: "พิธีกรคู่ THAI FIGHT บนเวที", category: "thai fight" },
  { id: "s37", url: upTfBlessing.url, caption: "พิธีให้พรก่อนขึ้นชก", category: "thai fight" },
  { id: "s38", url: upTfWeighin.url, caption: "งานชั่งน้ำหนัก · นักมวยกับผู้ใหญ่", category: "thai fight" },
  { id: "s39", url: upTempleGroup.url, caption: "เยี่ยมชมวัดจีนกับคณะนักกีฬา", category: "milestone" },
  { id: "s40", url: upOhmxEvent.url, caption: "ถ่ายภาพในงานอีเวนต์ OHM X", category: "event" },
  { id: "s41", url: upFightersGroup.url, caption: "ภาพหมู่นักชกก่อนการแข่งขัน", category: "thai fight" },
  { id: "s42", url: upConiTeam.url, caption: "ทีม THAI FIGHT ที่ CONI อิตาลี", category: "milestone" },
  { id: "s43", url: upConiPanel.url, caption: "แถลงข่าว THAI FIGHT Italy", category: "broadcast" },
  { id: "s44", url: upStageGuests.url, caption: "แขกรับเชิญบนเวที THAI FIGHT", category: "thai fight" },
  { id: "s45", url: upStageTrio.url, caption: "พิธีกรบนเวทีกับศิลปินรับเชิญ", category: "performance" },
  { id: "s46", url: upThaifightTeamline.url, caption: "ประชุมทีมก่อนเริ่มโชว์", category: "thai fight" },
  { id: "s47", url: upOsenmaFriends.url, caption: "ภาพร่วมกับเพื่อนร่วมงาน", category: "archive" },
  { id: "s48", url: upCountdownStage.url, caption: "Thai Fight Countdown บนเวที", category: "thai fight" },
  { id: "s49", url: upTfSaraburiHosts.url, caption: "THAI FIGHT สระบุรี · พิธีกรคู่บนเวที", category: "thai fight" },
  { id: "s50", url: upNakedShow.url, caption: "The Naked Show · สัมภาษณ์ข้างเวที", category: "broadcast" },
  { id: "s51", url: upTfThailand68.url, caption: "THAI FIGHT Thailand 68 · โชว์นักชก", category: "thai fight" },
  { id: "s52", url: upTfPresser.url, caption: "แถลงข่าว THAI FIGHT ร่วมกับผู้ใหญ่", category: "thai fight" },
  { id: "s53", url: upTfMallFans.url, caption: "ทักทายแฟนคลับกลางห้าง", category: "event" },
  { id: "s54", url: upTfKoratElder.url, caption: "THAI FIGHT นครราชสีมา · ต้อนรับผู้ใหญ่", category: "thai fight" },
  { id: "s55", url: upTfGiantSwing.url, caption: "THAI FIGHT · เวทีเสาชิงช้า", category: "thai fight" },
  { id: "s56", url: upTfMuangdonHandshake.url, caption: "THAI FIGHT เมืองคอน · จับมือแขก VIP", category: "thai fight" },
  { id: "s57", url: upTfPressMics.url, caption: "ให้สัมภาษณ์สื่อมวลชนหลายสำนัก", category: "interview" },
  { id: "s58", url: upTfSpainMortatip.url, caption: "THAI FIGHT Spain · ที่มณฑาทิพย์ฮอลล์", category: "thai fight" },
  { id: "s59", url: upMuaythaiDayGroup.url, caption: "วันมวยไทย 2566 · ภาพหมู่นักชก", category: "milestone" },
  { id: "s60", url: upTfArenaCrowd.url, caption: "THAI FIGHT อารีนา · แสงไฟเต็มฮอลล์", category: "thai fight" },
  { id: "s61", url: upTfPyro.url, caption: "โชว์ pyro เปิดเวที THAI FIGHT", category: "thai fight" },
  { id: "s62", url: upTfFightersOutdoor.url, caption: "รวมนักชก THAI FIGHT กลางแจ้ง", category: "archive" },
  { id: "s63", url: upYellowTvshow.url, caption: "บันทึกรายการโทรทัศน์ · ทีมเสื้อเหลือง", category: "broadcast" },
  { id: "s64", url: upTfPmFighters.url, caption: "นักชก THAI FIGHT เข้าพบนายกฯ", category: "milestone" },
  { id: "s65", url: upMuaythaiDayOfficials.url, caption: "วันมวยไทย · ผู้ใหญ่ร่วมงาน", category: "milestone" },
  { id: "s66", url: upNightRunChiangrai.url, caption: "Night Run for Chiangrai Games", category: "event" },
  { id: "s67", url: upSitpalanKids.url, caption: "ค่ายมวยเด็ก ศิษย์พลัน อยุธยา", category: "archive" },
  { id: "s68", url: upTfNightCrowd.url, caption: "THAI FIGHT กลางคืน · ผู้ชมเต็มลาน", category: "thai fight" },
  { id: "s69", url: upTfRingSuit.url, caption: "สัมภาษณ์ข้างเวที THAI FIGHT · สูทดำแว่นดำ", category: "thai fight" },
  { id: "s70", url: upTfKoratStudio.url, caption: "THAI FIGHT Bangkok · เดินตรวจเวทีก่อนโชว์", category: "thai fight" },
  { id: "s71", url: upTfRingCamera.url, caption: "โต๊ะกรรมการ THAI FIGHT ภูเก็ต · ทีมงาน", category: "thai fight" },
  { id: "s72", url: upTfBriefing.url, caption: "ส่งใบคิวข้างเวที · เสียงหัวเราะกลางงาน", category: "thai fight" },
  { id: "s73", url: upTfChiangmaiDusk.url, caption: "พิธีกรและแขกรับเชิญบนเวที THAI FIGHT", category: "thai fight" },
  { id: "s74", url: upTfStudioRitual.url, caption: "ผู้เฒ่าขึ้นเวที · มอบนวมเป็นสิริมงคล", category: "milestone" },
  { id: "s75", url: upTfVipFight.url, caption: "แถลงข่าวรุมไมค์ · สื่อมวลชนหลายสำนัก", category: "interview" },
  { id: "s76", url: upTfPanelMic.url, caption: "THAI FIGHT BEGINS · ถ่ายทอดสดในสตูดิโอ", category: "broadcast" },
  { id: "s77", url: upTfOvControl.url, caption: "ห้องคอนโทรลถ่ายทอดสด · สั่งคิวหน้ามอนิเตอร์", category: "on set" },
  { id: "s78", url: upTfNarathiwatRain.url, caption: "แสนชัย ขึ้นเวที THAI FIGHT · พิธีกรร่วมโชว์", category: "thai fight" },
  { id: "s79", url: upLecturePanel.url, caption: "บรรยายวิชาการ · ดร.นพรัตน์ พุทธรัตนมณี", category: "milestone" },
  { id: "s80", url: upBoardroomGroup.url, caption: "ประชุมคณะกรรมการ · ห้องประชุมใหญ่", category: "milestone" },
  { id: "s81", url: upSeminarHall.url, caption: "บรรยายในสัมมนา · ผู้ฟังเต็มห้อง", category: "event" },
  { id: "s82", url: upPanelMicClose.url, caption: "เสวนาบนเวที · โคลสอัพหน้าไมค์", category: "interview" },
  { id: "s83", url: upKeynoteScreen.url, caption: "คีย์โน้ตหน้าจอโปรเจกเตอร์", category: "event" },
  { id: "s84", url: upTrainingFists.url, caption: "อบรมหลักสูตรกีฬามวย · ชูกำปั้น", category: "milestone" },
  { id: "s85", url: upMuaySuvarnabhumi.url, caption: "Muay Suvarnabhumi Conference · ภาพหมู่", category: "milestone" },
  { id: "s86", url: upAdvisorDesk.url, caption: "ที่ปรึกษาคณะกรรมาธิการ · โต๊ะประชุม", category: "milestone" },
  { id: "s87", url: upCommitteeBlue.url, caption: "ประชุมคณะกรรมาธิการ · ในสภา", category: "milestone" },
  { id: "s88", url: upSatHandover.url, caption: "การกีฬาแห่งประเทศไทย · ส่งมอบ Sports Industry", category: "milestone" },
  { id: "s89", url: upMyanmarLethwei.url, caption: "History of Myanmar Lethwei · เยือนพม่า", category: "milestone" },
  { id: "s90", url: upTrainingCerts.url, caption: "มอบใบประกาศ · หลักสูตรมาตรฐานมวย", category: "milestone" },
  { id: "s91", url: upKmitlAwards.url, caption: "KMITL Innovation Expo 2567 · รับโล่", category: "milestone" },
  { id: "s92", url: upTraining2564.url, caption: "อบรมหลักสูตรมาตรฐาน ปี 2564", category: "milestone" },
  { id: "s93", url: upSportEconomics.url, caption: "เสวนามูลค่าเศรษฐกิจอุตสาหกรรมกีฬา 2566", category: "event" },
  { id: "s94", url: upSatPanel4.url, caption: "SAT × CA · ประชุมเผยแพร่ครั้งที่ 4", category: "event" },
  { id: "s95", url: upMetaverseTalk.url, caption: "บรรยาย Metaverse × มวยไทย", category: "event" },
  { id: "s96", url: upMontatipUdon.url, caption: "Montatip Hall อุดรธานี · เสวนาบนเวที", category: "event" },
  { id: "s97", url: upMuaythaiReform.url, caption: "เสวนาปฏิรูปมาตรฐานมวยไทยอาชีพ", category: "milestone" },
  { id: "s98", url: upTrainingThumbsup.url, caption: "อบรมมาตรฐานมวย · ภาพหมู่ชูโป้ง", category: "milestone" },
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

type LightboxItem = {
  src: string;
  title?: string;
  caption?: string;
  category: string;
};

function GalleryPage() {
  const [uploaded, setUploaded] = useState<
    { id: string; url: string; caption: string | null; category: string }[]
  >(SEEDED_UPLOADS);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    supabase
      .from("gallery_images")
      .select("id,url,caption,category")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data && data.length) setUploaded([...data, ...SEEDED_UPLOADS]);
      });
  }, []);

  const flat = useMemo<LightboxItem[]>(() => {
    const up: LightboxItem[] = uploaded.map((u) => ({
      src: u.url,
      caption: u.caption ?? undefined,
      category: u.category,
    }));
    const cats: LightboxItem[] = CATEGORIES.flatMap((c) =>
      c.shots.map((s) => ({
        src: s.src,
        title: s.title,
        caption: s.caption,
        category: c.title,
      })),
    );
    return [...up, ...cats];
  }, [uploaded]);

  const uploadedCount = uploaded.length;
  const openAt = useCallback((i: number) => setLightboxIndex(i), []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <Hero />
      <main className="container-editorial pb-32">
        {uploaded.length > 0 && (
          <UploadedBlock images={uploaded} onOpen={(i) => openAt(i)} />
        )}
        {CATEGORIES.map((cat, catIdx) => {
          const offset =
            uploadedCount +
            CATEGORIES.slice(0, catIdx).reduce((n, c) => n + c.shots.length, 0);
          return (
            <CategoryBlock
              key={cat.slug}
              cat={cat}
              onOpen={(i) => openAt(offset + i)}
            />
          );
        })}
      </main>
      <Footer />
      {lightboxIndex !== null && (
        <Lightbox
          items={flat}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onChange={setLightboxIndex}
        />
      )}
    </div>
  );
}

function UploadedBlock({
  images,
  onOpen,
}: {
  images: { id: string; url: string; caption: string | null; category: string }[];
  onOpen: (i: number) => void;
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
        {images.map((img, i) => (
          <button
            type="button"
            key={img.id}
            onClick={() => onOpen(i)}
            className="group relative overflow-hidden rounded-lg border border-border bg-card aspect-square cursor-zoom-in text-left focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label={img.caption ?? "เปิดดูรูป"}
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
          </button>
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
