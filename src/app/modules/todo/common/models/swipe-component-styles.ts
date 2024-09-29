export interface SwipeComponentStyles {
  type: string;
  wrapper: string;
  bar: string;
  priority?: string;
  barItem: string;
}

export const stylesList: SwipeComponentStyles[] = [
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