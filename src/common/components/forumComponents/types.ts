
export type Coment = {
  _id: string;
  idUser: string;
  idForo: string;
  createAt: string;
  content: string;
};

export type Foro = {
  _id: string;
  title: string;
  description: string;
  posts?: Coment[];  
};