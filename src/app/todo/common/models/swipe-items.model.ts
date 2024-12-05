import { TPriority } from "./priority.model";

export interface SwipeComponentStyles {
  type: string;
  wrapper: string;
  bar: string;
  priority?: string;
  barItem: string;
}

export const STYLESLIST: SwipeComponentStyles[] = [
  {
    type: 'task-item',
    wrapper: 'task-item__swipe-wrapper',
    bar: 'task-item__tool-bar',
    barItem: 'task-item__tool-bar__item',
  },
  {
    type: 'folder-item',
    wrapper: 'folder-item__swipe-wrapper',
    bar: 'folder-item__tool-bar',
    barItem: 'folder-item__tool-bar__item',
    priority: 'none',
  },
  {
    type: 'category-item',
    wrapper: 'category-item__swipe-wrapper',
    bar: 'category-item__tool-bar',
    barItem: 'category-item__tool-bar__item',
    priority: 'none',
  }
]

export interface SwipeComponentConfig {
  priorityType: TPriority;
  iconsColor: string;
  offsetY: number;
}

export const SWIPECOMPONENTCONFIGLIST: SwipeComponentConfig[] = [
  {
    priorityType: 'high',
    iconsColor: '#830000',
    offsetY: -20
  },
  {
    priorityType: 'medium',
    iconsColor: '#B58D00',
    offsetY: -60
  },
  {
    priorityType: 'low',
    iconsColor: '#7E6FD9',
    offsetY: -100
  },
  {
    priorityType: 'none',
    iconsColor: '#676127',
    offsetY: -140
  }
]