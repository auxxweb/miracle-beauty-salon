/**
 * Paste into Google Apps Script (Extensions → Apps Script) for your spreadsheet.
 * Deploy: Deploy → New deployment → Web app
 * - Execute as: Me
 * - Who has access: Anyone
 *
 * Sheet row columns (row 1 headers recommended):
 * Timestamp | Full Name | Phone | Email | Service | Preferred Date | Message | Source Page
 */
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = e.parameter || {};

    sheet.appendRow([
      new Date(),
      data.fullName || '',
      data.phone || '',
      data.email || '',
      data.service || data.serviceInterested || '',
      data.preferredDate || '',
      data.message || '',
      data.sourcePage || '',
    ]);

    return jsonOutput({ success: true });
  } catch (err) {
    return jsonOutput({ success: false, message: String(err) });
  }
}

function jsonOutput(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
