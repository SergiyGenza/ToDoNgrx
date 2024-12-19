import { FFolder, Folder } from "./folder.model";

export interface FCategory {
  fireId: string;
  name: string;
  fFolderList: FFolder[];
}

export interface CategoryCreate {
  name: string;
  foldersList: any[];
}

export interface Category extends CategoryCreate {
  id: number;
}