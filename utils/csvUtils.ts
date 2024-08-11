import { saveAs } from 'file-saver';
import Papa from 'papaparse';

interface CsvData {
  name: string;
  height?: string;
  mass?: string;
  hair_color?: string;
  skin_color?: string;
  eye_color?: string;
  birth_year?: string;
  gender?: string;
}

export const saveAsCsv = (data: CsvData[], itemCount: number) => {
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const filename =
    itemCount === 1 ? `${itemCount}_person.csv` : `${itemCount}_people.csv`;
  saveAs(blob, filename);
};
