import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../../models/category.model';
import { combineLatest, map, Observable, of } from 'rxjs';

@Pipe({
    name: 'categoryFilter',
    pure: true,
    standalone: true,
})
export class CategoryFilterPipe implements PipeTransform {
  transform(categoryList$: Observable<Category[] | null>, currentCategory$: Observable<Category | null>): Observable<Category[] | null> {
    if (!categoryList$ || !currentCategory$) {
      return of(null);
    }

    return combineLatest([categoryList$, currentCategory$]).pipe(
      map(([categoryList, currentCategory]) => {
        if (!categoryList) {
          return null;
        }

        if (!currentCategory) {
          return categoryList;
        }

        return categoryList.filter(item => item.name === currentCategory.name);
      })
    );
  }
}
