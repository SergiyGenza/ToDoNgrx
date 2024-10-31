import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../../models/category.model';

@Pipe({
    name: 'categoryFilter',
    pure: true,
    standalone: true,
})
export class CategoryFilterPipe implements PipeTransform {
  transform(categoryList: Category[] | null, currentCategory: Category | null): Category[] | null {
    currentCategory
      ? categoryList = categoryList!.filter(items => items.name === currentCategory?.name)
      : categoryList;
    return categoryList;
  }
}
