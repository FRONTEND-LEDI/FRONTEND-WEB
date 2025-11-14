export interface FullUser {
  _id: string;
  name: string;
  lastName: string;
  userName: string;
  birthDate?: string;
  email: string;
  password?: string;
  nivel?: string;
  rol?: string;
  avatar?: null | {
    _id?: string;
    gender?: "female" | "male" | "other" | string;
    __v?: number;
    avatars?: {
      url_secura?: string;
    };
  };
  preference?: {
    category?: string[];
    format?: string[];
    _id?: string;
  };
  __v?: number;
}
