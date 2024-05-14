import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../models/category.model';

@Pipe({
  name: 'categoryFilter',
  pure: true,
})
export class CategoryFilterPipe implements PipeTransform {

  transform(categoryList: Category[] | null, currentCategory: any = 'first cat'): Category[] | null {
    if (currentCategory === 'all') {
      return categoryList;
    } else if (categoryList) {
      categoryList = categoryList.filter(items => items.name === currentCategory)
    }
    console.log(categoryList);
    return categoryList;
  }

}
