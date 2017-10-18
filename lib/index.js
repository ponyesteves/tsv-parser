'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parse = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _rxjs = require('rxjs');

var _rxjs2 = _interopRequireDefault(_rxjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT1Bw7xBeaavCkQHjsciGovUZwOFZQuE4h-Hj4MCO5pY-Dl3fqiHpP9M0KavP_6gvf9uuBDcH1y-SFq/pub?gid=0&single=true&output=tsv'

var parse = function parse(url) {
  return _rxjs2.default.Observable.create(function (obs) {
    (0, _request2.default)(url, function (e, r, b) {
      if (e) return obs.error(e);
      var rta = b.split('\r\n').map(function (row) {
        return row.split('\t');
      }).map(_objWithFirstAsHeader).slice(1);
      obs.next(rta);
      obs.complete();
    });
  });
};

var _objWithFirstAsHeader = function _objWithFirstAsHeader(rowAry) {
  _objWithFirstAsHeader.header = _objWithFirstAsHeader.header || rowAry;
  return rowAry.reduce(function (p, c, i) {
    return _extends(_defineProperty({}, _objWithFirstAsHeader.header[i], c), p);
  }, {});
};

exports.parse = parse;