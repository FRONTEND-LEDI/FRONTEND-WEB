export type ProgressStatus = "reading" | "finished" | "abandoned" | "pending";

export interface BookProgress {
  _id: string;
  idUser: string;
  idBook: string;
  status: ProgressStatus;
  progress?: number; // numérico genérico (página/segundo)
  startDate?: string;
  updatedAt?: string;
  lastReadAt?: string;
  completedAt?: string | null;
  __v?: number;
}
