// filterByCategory.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByCategory',
})
export class FilterByCategoryPipe implements PipeTransform {
  /**
   * Transforms an array of items by filtering them based on the provided category ID.
   * @param items The array of items to filter.
   * @param categoryId The ID of the category to filter by.
   * @returns The filtered array of items.
   */
  transform(items: any[], categoryId: number): any[] {
    if (!items || !categoryId) {
      return items;
    }
    return items.filter(item => item.noteCategory.id === categoryId);
  }
}
