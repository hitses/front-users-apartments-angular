export type ColumnPipeType =
  | 'titlecase'
  | 'currency'
  | 'date'
  | 'lowercase'
  | 'none';

export interface TableColumn {
  header: string;
  field: string;
  widthClass?: string;
  pipe?: ColumnPipeType;
  pipeArgs?: string[];
}
