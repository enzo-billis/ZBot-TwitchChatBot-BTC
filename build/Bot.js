"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.date.to-iso-string");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.function.bind");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("regenerator-runtime/runtime");

var _tmi = _interopRequireDefault(require("tmi.js"));

var _axios = _interopRequireDefault(require("axios"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Bot = /*#__PURE__*/function () {
  function Bot(_params) {
    var _this = this;

    _classCallCheck(this, Bot);

    _defineProperty(this, "echo", /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(target, context, params) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.client.say(target, "Echo");

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }());

    _defineProperty(this, "help", /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(target, context, params) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this.client.say(target, "https://github.com/enzo-billis/TwitchChatBot-BTC/blob/master/README.md#commandes");

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x4, _x5, _x6) {
        return _ref2.apply(this, arguments);
      };
    }());

    _defineProperty(this, "converter", /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(target, context, params) {
        var _this$params, currencySymbole, convertTimeout, rawCurrency, value, currency, convertedValue, _convertedValue;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this$params = _this.params, currencySymbole = _this$params.currencySymbole, convertTimeout = _this$params.convertTimeout, rawCurrency = _this$params.currency;
                value = parseFloat(params[0]);
                currency = rawCurrency.toLocaleLowerCase();

                if (!_this.converterTimeout) {
                  _context3.next = 5;
                  break;
                }

                return _context3.abrupt("return");

              case 5:
                if (!params[1] || params[1] === "u" || params[1].includes('btc')) {
                  convertedValue = value * _this.ubtcValue;

                  _this.client.say(target, "".concat(value, " \u03BCbtc -> ").concat(Math.round(convertedValue), " ").concat(currencySymbole, " :)"));
                } else if (params[1] && params[1] === currency[0] || params[1] === currencySymbole || params[1].includes(currency)) {
                  _convertedValue = value / _this.ubtcValue;

                  _this.client.say(target, "".concat(value, " ").concat(currencySymbole, " -> ").concat(Math.round(_convertedValue), " \u03BCbtc :)"));
                }

                return _context3.abrupt("return", _this.converterTimeout = setTimeout(function () {
                  return _this.converterTimeout = null;
                }, convertTimeout * 1000));

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x7, _x8, _x9) {
        return _ref3.apply(this, arguments);
      };
    }());

    this.converterTimeout = null;
    this.params = _params;
    this.ubtcValue = null;
    this.commands = {
      "echo": this.echo,
      "c": this.converter,
      "conv": this.converter,
      "convert": this.converter,
      "h": this.help,
      "help": this.help
    };
    this.onMessageHandler = this.onMessageHandler.bind(this);
    this.init();
  }

  _createClass(Bot, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      var options = {
        options: {
          debug: true
        },
        connection: {
          secure: true,
          reconnect: true
        },
        identity: {
          username: this.params['username'],
          password: this.params['token']
        },
        channels: this.params['channels']
      };
      this.client = new _tmi["default"].client(options);
      this.client.on('message', this.onMessageHandler);
      this.client.on('connected', this.onConnectedHandler);
      this.client.on('disconnected', this.onDisconnectHandler);
      this.params.currencySymbole = this.defineCurrencySymbol();
      this.refreshBtcValue().then(function (r) {
        return _this2.client.connect();
      });
      setInterval(this.refreshBtcValue.bind(this), this.params['refreshEvery'] * 1000);
    }
  }, {
    key: "defineCurrencySymbol",
    value: function defineCurrencySymbol() {
      switch (this.params.currency) {
        case 'EUR':
          return '€';
          break;

        case 'USD':
          return '$';
          break;

        case 'GBP':
          return '£';
          break;

        default:
          return '€';
      }
    }
  }, {
    key: "onConnectedHandler",
    value: function onConnectedHandler(addr, port) {
      console.log("* Connected to ".concat(addr, ":").concat(port));
    }
  }, {
    key: "onDisconnectHandler",
    value: function onDisconnectHandler(reason) {
      console.log("Disconnected: ".concat(reason));
      process.exit(1);
    }
  }, {
    key: "onMessageHandler",
    value: function onMessageHandler(target, context, msg, self) {
      //If this is a bot message, ignore
      if (self) {
        return;
      } //If the message is not a command (doesn't start with !) then ignore


      if (msg.substr(0, 1) !== "!") {
        return;
      } //Split message to retrieve parameters


      var parse = msg.slice(1).split(' ');
      var command = parse[0];
      var params = parse.splice(1);

      if (!!this.commands[command]) {
        this.commands[command](target, context, params).then(function () {
          console.log("".concat((0, _moment["default"])().toISOString(), " | ").concat(context.username, " executed command ").concat(command, " successfully."));
        });
      } else {
        console.warn("".concat((0, _moment["default"])().toISOString(), " WARNING: UNKNOWN COMMAND | ").concat(context.username, " says ").concat(msg));
      }
    }
  }, {
    key: "refreshBtcValue",
    value: function () {
      var _refreshBtcValue = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var _this$params2, currency, currencySymbole, _yield$axios$get, data, btcValue;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _this$params2 = this.params, currency = _this$params2.currency, currencySymbole = _this$params2.currencySymbole;
                _context4.next = 3;
                return _axios["default"].get('https://api.coindesk.com/v1/bpi/currentprice.json');

              case 3:
                _yield$axios$get = _context4.sent;
                data = _yield$axios$get.data;
                btcValue = parseFloat(data.bpi[currency].rate.replace(',', ''));
                this.ubtcValue = btcValue / 1000000;
                console.log("".concat((0, _moment["default"])().toISOString(), " | Bitcoin value refreshed. New value is ").concat(btcValue, " ").concat(currencySymbole));

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function refreshBtcValue() {
        return _refreshBtcValue.apply(this, arguments);
      }

      return refreshBtcValue;
    }()
  }]);

  return Bot;
}();

exports["default"] = Bot;