require('electron-reloader')(module);
const { app, BrowserWindow, ipcMain } = require('electron');
const { data } = require('jquery');
const emailFactory = require('./email-factory');

function createWindow() {
  const win = new BrowserWindow({
    width: 1600,
    height: 1200,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile('renderer/index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();;
  }
});


ipcMain.on('create-company-tax-email', (e, formData) => {
  let email = emailFactory.createCompanyTaxEmail(formData);
  //e.sender.send('create-email-success', email);
});

ipcMain.on('create-personal-tax-email', (e, data) => {
  let email = emailFactory.createPersonalTaxEmail(data);
});

ipcMain.on('create-bas-email', (e, data) => {
  let email = emailFactory.createBasEmail(data);
});

ipcMain.on('create-ias-email', (e, data) => {
  let email = emailFactory.createIasEmail(data);
});

ipcMain.on('create-payroll-email', (e, data) => {
  let email = emailFactory.createPayrollEmail(data);
});