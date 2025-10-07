export type AuthorAvatar =
  | string
  | {
      id_image?: string;
      url_secura?: string; // viene así desde el back
      secure_url?: string;
      url?: string;
      [k: string]: any;
    };

export type Author = {
  _id: string;
  fullName: string;
  profession: string;
  birthdate: string;
  birthplace: string;
  nationality: string;
  writingGenre:string;
  biography: string;
  avatar: {
    id_image: string;
   url_secura: string;
  };
};

export function getAuthorAvatarUrl(a?: AuthorAvatar): string | undefined {
  if (!a) return undefined;
  if (typeof a === "string") return a;
  return a.url_secura || a.secure_url || a.url || undefined;
}
