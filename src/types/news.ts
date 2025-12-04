export interface News {
  _id: string;
  title: string;
  description: string;
  date: string;
  img?: {
    url: string;
    public_id: string;
  };
  __v?: number;
}

export type AdminCreateNewsInput = {
  title: string;
  description: string;
  date: string;
  imgFile?: File;
};

export type AdminUpdateNewsInput = Partial<AdminCreateNewsInput>;

export function getNewsImageUrl(
  imgData: News["img"] | undefined
): string | undefined {
  return imgData?.url?.trim() || undefined;
}
