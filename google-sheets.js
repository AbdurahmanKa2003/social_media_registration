const { google } = require('googleapis');
const keys = require('./credentials.json');

const client = new google.auth.JWT(
  keys.client_email,
  null,
  keys.private_key.replace(/\\n/g, '\n'),
  ['https://www.googleapis.com/auth/spreadsheets']
);

const gsapi = google.sheets({ version: 'v4', auth: client });

async function appendToSheet(data) {
  const request = {
    spreadsheetId: 'your-spreadsheet-id', // Замените на ID вашей таблицы Google Sheets
    range: 'Sheet1!A1',
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    resource: {
      values: [data],
    },
  };

  try {
    const response = await gsapi.spreadsheets.values.append(request);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

module.exports = { appendToSheet };
