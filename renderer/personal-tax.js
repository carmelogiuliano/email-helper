const { ipcRenderer } = require('electron');
const $ = jQuery = require('jquery');
const app = require('./app');


$("#personalTaxForm").on("submit", function () {
  let formData = app.getFormData($(this));
  let data = app.formatData(formData);
  ipcRenderer.send('create-personal-tax-email', data);
});