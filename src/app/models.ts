export interface RegisterUser {
  username: string;
  email: string;
  password: string;
}

export interface LoginUser {
  username: string;
  password: string;
}

export interface Folder {
  id: number;
  name: string;
  files: FolderItem[];
  folders: Folder[];
}


export interface FolderItem {
  id: number;
  name: string;
  type?: string;
  shorten?: string;
  npages?: number;
}


export interface FileToPrint {
  id: number;
  name: string;
  npages: number;
  doubledSided: boolean;
  ncopies: number;
}
