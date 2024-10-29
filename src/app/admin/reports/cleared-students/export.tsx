import { dateTime } from '@/lib/format';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { getClearedStudents } from './actions';

export async function exportToExcel() {
  const response = await getClearedStudents();
  const workbook = new ExcelJS.Workbook();

  workbook.creator = 'Clearance System';
  workbook.created = new Date();

  const sheet = workbook.addWorksheet('Cleared Students');

  sheet.columns = [
    { header: 'Student No', key: 'stdNo', width: 15 },
    { header: 'Name', key: 'name', width: 30 },
    { header: 'Program', key: 'program', width: 45 },
    { header: 'Date Requested', key: 'dateRequested', width: 20 },
    { header: 'Date Cleared', key: 'dateCleared', width: 20 },
    { header: 'Cleared By', key: 'clearedBy', width: 20 },
  ];

  const headerRow = sheet.getRow(1);
  headerRow.font = {
    bold: true,
    color: { argb: 'FFFFFF' },
  };

  headerRow.eachCell((cell) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '333333' },
    };
  });

  headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
  headerRow.height = 25;

  response.items.forEach((item) => {
    sheet.addRow({
      stdNo: item.stdNo,
      name: item.names,
      program: item.program,
      dateRequested: dateTime(item.dateRequested),
      dateCleared: dateTime(item.dateCleared),
      clearedBy: titleCase(item.clearedBy ?? 'Unknown'),
    });
  });

  sheet.eachRow((row, rowNumber) => {
    if (rowNumber > 1) {
      row.alignment = { vertical: 'middle' };
      row.height = 20;
    }

    row.eachCell((cell) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });
  });

  sheet.eachRow((row, rowNumber) => {
    if (rowNumber > 1 && rowNumber % 2 === 0) {
      row.eachCell((cell) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'F5F5F5' },
        };
      });
    }
  });

  sheet.insertRow(1, []);
  sheet.insertRow(1, [
    `Cleared Students Report - Generated on ${dateTime(new Date())}`,
  ]);
  const titleRow = sheet.getRow(1);
  titleRow.font = { bold: true, size: 12 };
  titleRow.height = 30;
  sheet.mergeCells('A1:F1');
  titleRow.alignment = { horizontal: 'center', vertical: 'middle' };

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  saveAs(
    blob,
    `Cleared_Students_${dateTime(new Date()).replace(/[/:]/g, '-')}.xlsx`,
  );
}

function titleCase(str: string) {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
