import Papa from 'papaparse';
import { Item } from '../types/item';

export const downloadSelectedItems = (items: Item[]) => {
  const csv = Papa.unparse(items);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.setAttribute('download', `${items.length}_items.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};