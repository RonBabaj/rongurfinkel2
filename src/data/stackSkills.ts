import type { Locale } from "@/data/translations";

export type StackSkillCardData = {
  titleKey:
    | "home.stackLangTitle"
    | "home.stackQaTitle"
    | "home.stack3dTitle"
    | "home.stackMobileTitle";
  /** Shown with cyan bullet + glow */
  highlights: string[];
  /** Shown with muted dash */
  other: string[];
};

const en: StackSkillCardData[] = [
  {
    titleKey: "home.stackLangTitle",
    highlights: ["JavaScript", "React"],
    other: ["Java", "Kotlin", "Go", "Dart", "HTML", "CSS"],
  },
  {
    titleKey: "home.stackQaTitle",
    highlights: ["Manual QA", "Firmware testing"],
    other: ["Web interface QA", "Production debugging"],
  },
  {
    titleKey: "home.stack3dTitle",
    highlights: ["3D printing", "CAD"],
    other: ["Onshape", "Plasticity", "Commercial prototyping"],
  },
  {
    titleKey: "home.stackMobileTitle",
    highlights: ["Flutter", "React"],
    other: ["Android", "WordPress", "Full-stack collaboration"],
  },
];

const he: StackSkillCardData[] = [
  {
    titleKey: "home.stackLangTitle",
    highlights: ["JavaScript", "React"],
    other: ["Java", "Kotlin", "Go", "Dart", "HTML", "CSS"],
  },
  {
    titleKey: "home.stackQaTitle",
    highlights: ["QA ידני", "בדיקות קושחה"],
    other: ["בדיקות ממשק web", "דיבוג פרודקשן"],
  },
  {
    titleKey: "home.stack3dTitle",
    highlights: ["הדפסה תלת־ממדית", "CAD"],
    other: ["Onshape", "Plasticity", "אבות טיפוס מסחריים"],
  },
  {
    titleKey: "home.stackMobileTitle",
    highlights: ["Flutter", "React"],
    other: ["Android", "WordPress", "שיתוף פעולה full-stack"],
  },
];

export function getStackSkills(locale: Locale): StackSkillCardData[] {
  return locale === "he" ? he : en;
}
