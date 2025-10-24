import type { FullUser } from "./user";

export type Coment = {
  _id: string;
  idUser: string | FullUser;
  idForo: string | {_id:string; title:string};
  createdAt: string;
  content: string;
  __v?:number;
  answers?:Coment[]
};

export type Foro = {
  _id: string;
  title: string;
  description: string;
  posts?: Coment[];  
};
