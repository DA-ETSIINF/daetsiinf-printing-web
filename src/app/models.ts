export interface RegisterUser {
  username: string;
  email: string;
  password: string;
}

export interface LoginUser {
  username: string;
  password: string;
}

export interface UserInfo {
  username: string;
  email: string;
  quantity: number;
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
  link?: string;
  type?: string;
  shorten?: string;
  npages?: number;
}

export interface FileToPrint {
  documentId: number;
  name: string;
  npages: number;
  doubleSided: boolean;
  ncopies: number;
}
