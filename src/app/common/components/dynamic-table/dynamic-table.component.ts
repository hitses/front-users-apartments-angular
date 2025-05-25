import { Component, input, output } from '@angular/core';
import { TableColumn } from '../../../../interfaces/table-column';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dynamic-table',
  imports: [RouterLink],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.scss',
})
export class DynamicTableComponent {
  data = input<any[]>([]);
  columns = input<TableColumn[]>([]);
  viewRoutePrefix = input<string>('');
  editRoutePrefix = input<string>('');

  deleteItem = output<number>();

  onDelete(item: number): void {
    this.deleteItem.emit(item);
  }

  getViewRoute(item: any): string {
    if (this.viewRoutePrefix && item.id)
      return `${this.viewRoutePrefix()}/${item.id}`;

    return '';
  }

  getEditRoute(item: any): string {
    if (this.editRoutePrefix && item.id)
      return `${this.editRoutePrefix()}/${item.id}`;

    return '';
  }
}
