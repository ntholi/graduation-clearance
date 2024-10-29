import { dateTime } from '@/lib/format';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { getClearedStudents } from './actions';

export async function exportToExcel() {
  const response = await getClearedStudents();
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Cleared Students');
  sheet.addRow([
    'Student No',
    'Name',
    'Program',
    'Date Requested',
    'Date Cleared',
    'Cleared By',
  ]);

  const data = response.items.map((item) => [
    item.stdNo,
    item.names,
    item.program,
    dateTime(item.dateRequested),
    dateTime(item.dateCleared),
    item.clearedBy,
  ]);

  data.forEach((row) => sheet.addRow(row));

  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, 'Report.xlsx');
  });
}
