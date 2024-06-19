import { Folder } from "./folder.model";

export interface Category {
  id: number;
  name: string;
  foldersList: Folder[];
}