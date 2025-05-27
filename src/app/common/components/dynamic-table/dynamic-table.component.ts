import { Component, input, output } from '@angular/core';
import { TableColumn } from '../../../../interfaces/table-column';
import { RouterLink } from '@angular/router';
import { FileComponent } from '../../icons/file/file.component';
import { EditComponent } from '../../icons/edit/edit.component';
import { TrashComponent } from '../../icons/trash/trash.component';
import {
  CurrencyPipe,
  DatePipe,
  LowerCasePipe,
  TitleCasePipe,
} from '@angular/common';

@Component({
  selector: 'app-dynamic-table',
  imports: [
    RouterLink,
    FileComponent,
    EditComponent,
    TrashComponent,
    TitleCasePipe,
    LowerCasePipe,
    CurrencyPipe,
    DatePipe,
  ],
  templateUrl: './dynamic-table.component.html',
})
export class DynamicTableComponent {
  // Propiedades entrantes del componente
  data = input<any[]>([]);
  columns = input<TableColumn[]>([]);
  viewRoutePrefix = input<string>('');
  editRoutePrefix = input<string>('');

  // Eventos de salida del componente
  deleteItem = output<number>();

  // Al eliminar un elemento, se emite el ID del elemento a eliminar ha su componente padre correspondiente
  onDelete(id: number): void {
    this.deleteItem.emit(id);
  }

  // Se crea una ruta para acceder al detalle de un elemento en particular
  getViewRoute(item: any): string {
    if (this.viewRoutePrefix && item.id)
      return `${this.viewRoutePrefix()}/${item.id}`;

    return '';
  }

  // Se crea una ruta para editar un elemento en particular
  getEditRoute(item: any): string {
    if (this.editRoutePrefix && item.id)
      return `${this.editRoutePrefix()}/${item.id}`;

    return '';
  }
}
