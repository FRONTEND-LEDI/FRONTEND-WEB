// src/types/progress.ts
export type ProgressStatus = "reading" | "finished" | "abandoned" | "pending";

export interface BookProgress {
  _id: string;
  idUser: string;
  idBook: string;
  unit: "page" | "second";
  position: number; //! página o segundo actual
  total: number;
  percent: number;
  status: ProgressStatus;
  startDate: string; // ISO
  __v?: number;
}
