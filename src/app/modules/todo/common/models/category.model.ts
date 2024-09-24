import { Folder } from "./folder.model";

export interface CategoryCreate {
  name: string;
  foldersList: Folder[];
  key?: string;
}


export interface Category extends CategoryCreate {
  id: string;
}


export interface FCategory extends CategoryCreate {
  key?: string;
}