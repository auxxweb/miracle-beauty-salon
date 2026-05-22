/**
 * Add to the same Google Apps Script project as contact form (or deploy separately).
 * Deploy: Deploy → New deployment → Web app — Execute as: Me, Who has access: Anyone
 *
 * Sheet tab name: "Services" (or set SERVICES_SHEET_NAME below)
 * Row 1 headers (exact names):
 * service_name | avg_time | cost | cost_unit | category_service_name | category_service_type
 *
 * GET your web app URL with ?action=services to receive JSON array.
 */

var SERVICES_SHEET_NAME = 'Services';

function doGet(e) {
  var action = e && e.parameter ? e.parameter.action : '';
  if (!action || action === 'services') {
    return getServicesJson();
  }
  return jsonOutput({ success: false, message: 'Unknown action' });
}

function getServicesJson() {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SERVICES_SHEET_NAME) || ss.getSheets()[0];
    var values = sheet.getDataRange().getValues();
    if (values.length < 2) {
      return jsonOutput([]);
    }

    var headers = values[0].map(function (h) {
      return String(h).trim().toLowerCase().replace(/\s+/g, '_');
    });

    var rows = [];
    for (var r = 1; r < values.length; r++) {
      var row = values[r];
      if (!row || row.join('').trim() === '') continue;

      var obj = {};
      for (var c = 0; c < headers.length; c++) {
        obj[headers[c]] = row[c] != null ? String(row[c]).trim() : '';
      }

      if (!obj.service_name) continue;

      rows.push({
        service_name: obj.service_name || '',
        avg_time: obj.avg_time || '',
        cost: obj.cost || '',
        cost_unit: obj.cost_unit || 'From',
        category_service_name: obj.category_service_name || 'General',
        category_service_type: obj.category_service_type || 'Unisex',
      });
    }

    return jsonOutput(rows);
  } catch (err) {
    return jsonOutput({ success: false, message: String(err) });
  }
}

function jsonOutput(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
