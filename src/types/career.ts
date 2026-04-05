export type CareerJobId = "netiot" | "idvision" | "akita";

export type CareerJob = {
  id: CareerJobId;
  /** Translation key for long-form modal copy, e.g. `home.careerNetiotDetail` */
  detailKey: string;
  company: string;
  date: string;
  title: string;
  line: string;
};
