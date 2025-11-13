export type AvatarImage = {
  url_secura: string;
  id_image: string;
};

export type Avatar = {
  _id: string;
  avatars: AvatarImage;
  gender: "masculino" | "femenino" | "otro";
  __v?: number;
};

export type CreateAvatarInput = {
  avatars: File;
  gender: "masculino" | "femenino" | "otro";
};

export type UpdateAvatarInput = {
  avatars?: File;
  gender?: "masculino" | "femenino" | string;
};

export function getAvatarUrl(a: AvatarImage | undefined): string | undefined {
  return a?.url_secura?.trim() || undefined;
}
