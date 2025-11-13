
export interface Gamble {
  title: string;
  scenery: string;
  page: number;
  option: string;
}

export interface Quiz {
  title: string;
  scenery: string;
  page: number;
  option?: {
    text: string;
    status: boolean;
  };
}