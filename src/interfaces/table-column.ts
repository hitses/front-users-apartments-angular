export type ColumnPipeType = 'titlecase' | 'currency' | 'date' | 'none';

export interface TableColumn {
  header: string;
  field: string;
  widthClass?: string;
  pipe?: ColumnPipeType;
  pipeArgs?: string[];
}
