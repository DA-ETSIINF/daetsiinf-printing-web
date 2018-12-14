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
  funds: number;
  id: number;
}

export interface Folder {
  id: number;
  name: string;
  files: FileItem[];
  folders: Folder[];
}

export interface ShowedItems {
  files: FileItem[];
  folders: FolderItem[];
}

export interface FolderItem {
  id: number;
  name: string;
  shorten?: string;
}

export interface FileItem {
  id: number;
  name: string;
  type: string;
  link: string;
  npages: number;
  shorten?: string;
}

export interface FileToPrint {
  documentId: number;
  name: string;
  npages: number;
  doubleSided: boolean;
  ncopies: number;
}

export interface Notification {
  title: string;
  status: 'error' | 'loading' | 'ok' | 'info';
  description?: string;
}
