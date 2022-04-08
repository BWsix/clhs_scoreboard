import { TimetableTable } from "src/components/Timebable/Timetable.table";
import { Section } from "../Shared/Section";
import { SectionTitle } from "../Shared/SectionTitle";

const data = [
  ["體育", "數學A", "選修生物-動物體的構造與功能", "英語文", "數學A"],
  ["數學A", "音樂", "英語文", "體育", "選修生物-動物體的構造與功能"],
  ["國語文", "英語文", "數學A", "公民與社會", "彈性學習時間"],
  ["國語文", "公民與社會", "音樂", "選修物理-力學二與熱學", "彈性學習時間"],
  [
    "化學-探究B",
    "團體活動時間",
    "國語文",
    "壢中小大學",
    "選修物理-力學二與熱學",
  ],
  [
    "化學-探究B",
    "團體活動時間",
    "地理",
    "壢中小大學",
    "選修化學-物質構造與反應速率",
  ],
  ["英語文", "彈性學習時間", "選修化學-物質構造與反應速率", "地理", "國語文"],
  ["化學輔", "英文輔", "物理輔", "數學輔", "國文輔"],
];

export const TimetableDemo = () => {
  return (
    <Section>
      <SectionTitle title="範例 - 課表查詢" />

      <TimetableTable data={data} />
    </Section>
  );
};
