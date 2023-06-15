import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';

@Pipe({
  name: 'filterPipe',
})
export class FilterPipePipe implements PipeTransform {
  transform(value: Product[], filterText: string): Product[] {
    return value.filter((p) =>
      p.productName.toLowerCase().includes(filterText.toLowerCase())
    );
  }
}
