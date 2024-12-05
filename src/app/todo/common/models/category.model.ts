import { Folder } from "./folder.model";

export interface CategoryCreate {
  name: string;
  foldersList: Folder[];
}


export interface Category extends CategoryCreate {
  id: number;
}