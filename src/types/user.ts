export type FullUser = {
  _id: string;
  name: string;
  lastName: string;
  userName: string;
  email: string;
  rol?: string;
  avatar?: string | { $oid: string } | null;
  birthDate?: string | { $date: string };
  nivel?: string;
  preference?: {
    category?: string[];
    format?: string[];
    _id?: { $oid: string } | string;
  };
};