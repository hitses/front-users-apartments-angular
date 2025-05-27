// Tipos de pipes permitidos en los campos del formulario dinámico
// El formulario dinámico se encuentra en la ruta:
// src/app/components/dynamic-form
export type ColumnPipeType =
  | 'titlecase'
  | 'currency'
  | 'date'
  | 'lowercase'
  | 'none';

// Interfaz para definir las columnas de una tabla dinámica y sus propiedades
export interface TableColumn {
  header: string;
  field: string;
  widthClass?: string;
  pipe?: ColumnPipeType;
  pipeArgs?: string[];
}
