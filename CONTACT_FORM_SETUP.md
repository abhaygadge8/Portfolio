# Contact Form Setup

This portfolio is a static site, so the contact form needs a backend endpoint to:

- send each submission to your email
- save each submission into a Google Sheet in your Google Drive

This project includes a Google Apps Script file for that backend: [google-apps-script/contact-form.gs](google-apps-script/contact-form.gs)

## 1. Create the Google Sheet

1. Open Google Sheets.
2. Create a new sheet in your Google Drive.
3. Copy the spreadsheet ID from the URL.

Example:

```text
https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
```

## 2. Create the Apps Script project

1. Go to `https://script.google.com`.
2. Create a new project.
3. Replace the default code with the contents of `google-apps-script/contact-form.gs`.
4. Update these values:

```javascript
const RECIPIENT_EMAIL = "abhaygadge8@gmail.com";
const SPREADSHEET_ID = "PASTE_YOUR_GOOGLE_SHEET_ID_HERE";
```

## 3. Deploy as a Web App

1. Click `Deploy`.
2. Click `New deployment`.
3. Choose `Web app`.
4. Set access to `Anyone`.
5. Deploy and copy the web app URL.

## 4. Connect the portfolio form

Open [index.html](index.html) and set the `data-endpoint` value on the form:

```html
<form id="contactForm" class="glass-card p-4" data-endpoint="PASTE_WEB_APP_URL_HERE" novalidate>
```

## 5. Result

After setup:

- every form submission is emailed to `abhaygadge8@gmail.com`
- every form submission is stored in your Google Sheet
- you can review all responses in one place inside Google Drive
