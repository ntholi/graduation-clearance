import { dateTime } from '@/lib/format';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { getAllBlockedStudents } from './actions';

export async function exportToExcel() {
  const response = await getAllBlockedStudents();
  const workbook = new ExcelJS.Workbook();

  workbook.creator = 'Clearance System';
  workbook.created = new Date();

  const sheet = workbook.addWorksheet('Blocked Students');

  sheet.columns = [
    { header: '#', key: 'index', width: 10 },
    { header: 'Student No', key: 'stdNo', width: 15 },
    { header: 'Name', key: 'name', width: 30 },
    { header: 'Program', key: 'program', width: 45 },
    { header: 'Date Blocked', key: 'dateBlocked', width: 20 },
    { header: 'Blocked By', key: 'blockedBy', width: 20 },
    { header: 'Reason', key: 'reason', width: 40 },
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

  response.forEach((item, index) => {
    sheet.addRow({
      index: index + 1,
      stdNo: Number(item.stdNo),
      name: item.names,
      program: item.program,
      dateBlocked: dateTime(item.dateBlocked),
      blockedBy: titleCase(item.blockedBy ?? 'Unknown'),
      reason: item.reason,
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
    `Blocked Students Report - Generated on ${dateTime(new Date())}`,
  ]);
  const titleRow = sheet.getRow(1);
  titleRow.font = { bold: true, size: 12 };
  titleRow.height = 30;
  sheet.mergeCells('A1:G1');
  titleRow.alignment = { horizontal: 'center', vertical: 'middle' };

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  saveAs(
    blob,
    `Blocked_Students_${dateTime(new Date()).replace(/[/:]/g, '-')}.xlsx`,
  );
}

function titleCase(str: string) {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
