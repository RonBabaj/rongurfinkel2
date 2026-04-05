import type { CareerJob } from "@/types/career";

/** Shared job list for the landing career section. */
export function getCareerJobs(t: (key: string) => string): CareerJob[] {
  return [
    {
      id: "netiot",
      detailKey: "home.careerNetiotDetail",
      company: t("home.careerNetiotCompany"),
      date: t("home.careerNetiotDate"),
      title: t("home.careerNetiotTitle"),
      line: t("home.careerNetiotLine"),
    },
    {
      id: "idvision",
      detailKey: "home.careerIdvDetail",
      company: t("home.careerIdvCompany"),
      date: t("home.careerIdvDate"),
      title: t("home.careerIdvTitle"),
      line: t("home.careerIdvLine"),
    },
    {
      id: "akita",
      detailKey: "home.careerAkitaDetail",
      company: t("home.careerAkitaCompany"),
      date: t("home.careerAkitaDate"),
      title: t("home.careerAkitaTitle"),
      line: t("home.careerAkitaLine"),
    },
  ];
}
