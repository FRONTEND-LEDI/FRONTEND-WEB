export interface FullUser {
  _id: string;
  name: string;
  lastName: string;
  userName: string;
  birthDate?: string;
  email: string;
  password?: string;
  nivel?: string;
  level?:
    | string
    | {
        img?: {
          url_secura?: string;
          id_image?: string;
        };
        _id?: string;
        level?: number;
        maxPoint?: number;
        level_string?: string;
        __v?: number;
      };
  imgLevel?: string;
  point?: number;
  rol?: string;
  avatar?: string;
  preference?: {
    category?: string[];
    format?: string[];
    _id?: string;
  };
  medals?: any[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
