export interface Item {
  id: number;
  name: string;
  type: string;
  pages?: number;
  shorten?: string;
}

export interface InfoFile {
  id: number;
  name: string;
  pages: number;
  doubledSided: boolean;
  ncopies: number;
}

export interface RegisterUser {
  username: string;
  email: string;
  password: string;
}

export interface LoginUser {
  username: string;
  password: string;
}
