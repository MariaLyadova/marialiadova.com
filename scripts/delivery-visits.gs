// Delivery page visit log. Opened from the Google Sheet:
// Extensions → Apps Script → paste this → Deploy → New deployment → Web app
//   Execute as: Me
//   Who has access: Anyone
// Paste the web app URL into visitLogUrl in photo/download.js

function doGet(e) {
  const params = e && e.parameter ? e.parameter : {};
  if (params.k !== 'ml-visits') {
    return ContentService.createTextOutput('no');
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('visits');
  if (!sheet) {
    sheet = ss.insertSheet('visits');
    sheet.appendRow(['time', 'page', 'ip', 'path']);
  }

  sheet.appendRow([
    new Date(),
    params.page || '',
    params.ip || '',
    params.href || '',
  ]);

  return ContentService.createTextOutput('ok');
}