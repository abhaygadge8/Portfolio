const RECIPIENT_EMAIL = "abhaygadge8@gmail.com";
const SPREADSHEET_ID = "PASTE_YOUR_GOOGLE_SHEET_ID_HERE";
const SHEET_NAME = "Portfolio Responses";

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || "{}");
    const name = String(payload.name || "").trim();
    const email = String(payload.email || "").trim();
    const subject = String(payload.subject || "").trim();
    const message = String(payload.message || "").trim();
    const submittedAt = String(payload.submittedAt || new Date().toISOString());

    if (!name || !email || !subject || !message) {
      return jsonResponse({ success: false, error: "Missing required fields." });
    }

    const sheet = getSheet();
    sheet.appendRow([
      new Date(),
      submittedAt,
      name,
      email,
      subject,
      message
    ]);

    GmailApp.sendEmail(
      RECIPIENT_EMAIL,
      "New portfolio contact: " + subject,
      [
        "You received a new portfolio contact form submission.",
        "",
        "Name: " + name,
        "Email: " + email,
        "Subject: " + subject,
        "Message:",
        message,
        "",
        "Submitted At: " + submittedAt
      ].join("\n"),
      {
        replyTo: email
      }
    );

    return jsonResponse({ success: true });
  } catch (error) {
    return jsonResponse({ success: false, error: error.message });
  }
}

function getSheet() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow(["Created At", "Submitted At", "Name", "Email", "Subject", "Message"]);
  }

  return sheet;
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
