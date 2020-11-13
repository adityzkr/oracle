require(['knockout', 'ojs/ojbootstrap', 'ojs/ojmodel', 'ojs/ojcube',
'ojs/ojconverter-number', 'ojs/ojknockouttemplateutils',
'text!../js/cubedata.json',
'ojs/ojdatagrid','ojs/ojknockout'],
function (ko, Bootstrap, Model, Cube, NumberConverter, KnockoutTemplateUtils, jsonData) {
function DataGridModel() {
  this.KnockoutTemplateUtils = KnockoutTemplateUtils;
  var cube = null;
  var dataArr = null;
  function generateCube(dataArr, axes) {
    return new Cube.DataValueAttributeCube(dataArr, axes,
      [{ attribute: 'Units', aggregation: Cube.CubeAggType.SUM },
              { attribute: 'Sales' },
              { attribute: 'Tax', aggregation: Cube.CubeAggType.AVERAGE }]);
  }
  var axes = [
    { axis: 0,
      levels: [
            { attribute: 'city' },
            { dataValue: true }] },
    { axis: 1,
      levels: [
            { attribute: 'year' },
            { attribute: 'product' }] },
    { axis: 2,
      levels: [
            { attribute: 'color' },
            { attribute: 'drivetrain' }] }];
  this.dataSource = ko.observable();
  dataArr = JSON.parse(jsonData);
  cube = generateCube(dataArr, axes);
  this.dataSource(new Cube.CubeDataGridDataSource(cube));


  var currencyOptions =
  {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'symbol'
  };
  this.currencyConverter = new NumberConverter.IntlNumberConverter(
    currencyOptions);
  this.taxConverter = new NumberConverter.IntlNumberConverter(
  { style: 'percent', minimumFractionDigits: 2 });
  this.cellClassName = function (cellContext) {
    return 'oj-helper-justify-content-right';
  }
}
Bootstrap.whenDocumentReady().then(
  function () {
    ko.applyBindings(new DataGridModel(),
        document.getElementById('datagrid'));
  });
});