export interface FullUser {
  _id: string;
  name: string;
  lastName: string;
  userName: string;
  birthDate?: string;
  email: string;
  password?: string;
  nivel?: string;
  level: null | {
    _id?: string;
    level?: number;
    maxPoint?: number;
    level_string?: string;
    img?: {
      url_secura?: string;
    };
  };
  point?: number;
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
