import type { FullUser } from "./user";
export type Foro = {
  _id: string;
  title: string;
  description: string;
};
export type CommentUser = {
  _id: string;
  userName: string;
  avatar?: string;
};

export type Comment = {
  _id: string;
  idComent?: string;
  idForo: string;
  idUser: FullUser; // ⬅️ Cambiar acá
  content: string;
  createdAt?: string;
};

export type ForoExtendido = Foro & {
  posts: Comment[];        // comentarios normales (posts principales)
  comentarios: Comment[]; // comentarios secundarios / threaded si tenés
};