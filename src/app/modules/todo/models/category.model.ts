import { Folder } from "./folder.model";

export interface Category {
  id: number;
  name: string;
  favourite?: boolean;
  foldersList: Folder[];
}