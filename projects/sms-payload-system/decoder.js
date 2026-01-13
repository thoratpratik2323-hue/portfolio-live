
// Mock window and BOM
global.window = {
    atob: (str) => Buffer.from(str, 'base64').toString('binary'),
    btoa: (str) => Buffer.from(str, 'binary').toString('base64')
};
global.ReverseString = function (_0xbec8a7) {
    return _0xbec8a7.split('').reverse().join('');
}

// First Obfuscation Block (for manavEncrypt)
function _0x1fa1() { var _0x2cf7db = ['init', '44219ZnKbTb', 'reverse', 'atob', 'length', 'counter', 'function\x20*\x5c(\x20*\x5c)', 'test', 'btoa', '2840328PMommA', 'charCodeAt', '2641995Iponkz', 'apply', 'chain', 'fromCharCode', 'action', '\x5c+\x5c+\x20*(?:[a-zA-Z_$][0-9a-zA-Z_$]*)', 'stateObject', 'constructor', 'prepend', '2381452URrSQQ', 'join', '902651FfMDhJ', '27qsEJYo', '3861435OuvSNu', 'input', '2BBXzUi', '8919830WZVChe', 'debu', '568QWPubI', 'gger']; _0x1fa1 = function () { return _0x2cf7db; }; return _0x1fa1(); }
function _0x5a71(_0x3d1c72, _0x465291) { var _0x6a9747 = _0x1fa1(); return _0x5a71 = function (_0xa3cafd, _0x359986) { _0xa3cafd = _0xa3cafd - 0x18d; var _0x1fa181 = _0x6a9747[_0xa3cafd]; return _0x1fa181; }, _0x5a71(_0x3d1c72, _0x465291); }
(function (_0x558d2f, _0x3ed558) { var _0x52ff42 = _0x5a71, _0xaf7b3a = _0x558d2f(); while (!![]) { try { var _0x5b8a2a = -parseInt(_0x52ff42(0x1a7)) / 0x1 * (-parseInt(_0x52ff42(0x1ab)) / 0x2) + parseInt(_0x52ff42(0x19c)) / 0x3 + parseInt(_0x52ff42(0x1a5)) / 0x4 + parseInt(_0x52ff42(0x1a9)) / 0x5 + parseInt(_0x52ff42(0x19a)) / 0x6 + parseInt(_0x52ff42(0x192)) / 0x7 * (-parseInt(_0x52ff42(0x18f)) / 0x8) + -parseInt(_0x52ff42(0x1a8)) / 0x9 * (parseInt(_0x52ff42(0x18d)) / 0xa); if (_0x5b8a2a === _0x3ed558) break; else _0xaf7b3a['push'](_0xaf7b3a['shift']()); } catch (_0x547860) { _0xaf7b3a['push'](_0xaf7b3a['shift']()); } } }(_0x1fa1, 0x7a0ba));

function manavEncrypt(_0x3658da) { var _0x91cab7 = _0x5a71, _0x4e871e = ''; for (i = 0x0; i < _0x3658da[_0x91cab7(0x195)]; i++) { var _0x41a59 = _0x3658da[_0x91cab7(0x19b)](i), _0x5cc3be = _0x41a59 ^ 0x33; _0x4e871e = _0x4e871e + String[_0x91cab7(0x19f)](_0x5cc3be); } return ReverseString(window[_0x91cab7(0x199)](window[_0x91cab7(0x199)](_0x4e871e))); }

// Second Obfuscation Block (for URL and params)
function _0x4f54() { var _0x15f80e = ['#count', '#progress_bar_div', 'submit', 'location', '1374896cODCJQ', 'hide', 'val', '<b>', '35sEXiot', 'parse', 'START', '#stopBtn', 'replace', 'width', 'html', '<br>', '#mobno', '#progress_bar', 'status', 'post', 'ready', '911432ccIZsu', 'new', 'message', '#submitBtnText', 'Sending...', '2787015qGdRzM', '/smsbomber/success', '#country_code', 'css', '\x20SMS\x20SENT</b>', '/smsbomber/', '74022XWQmeE', '[name=_token]', 'Start', ':checked', 'each', '#startsms', '#showerror', '314793PlykPh', 'disabled', '3380016QOLlPx', '#sendsms', 'show', '378191yDtSjs', '#showsuccess', '#startsms_spinner', '#mediumSpeed', 'prop']; _0x4f54 = function () { return _0x15f80e; }; return _0x4f54(); }
function _0x5c5c(_0x19397a, _0x2d113d) { var _0x4f5440 = _0x4f54(); return _0x5c5c = function (_0x5c5c3a, _0x24cef2) { _0x5c5c3a = _0x5c5c3a - 0x1d5; var _0x3aecf7 = _0x4f5440[_0x5c5c3a]; return _0x3aecf7; }, _0x5c5c(_0x19397a, _0x2d113d); }
(function (_0x5d38e0, _0x5804c4) { var _0x5ddb3f = _0x5c5c, _0x5ac86f = _0x5d38e0(); while (!![]) { try { var _0x656de9 = parseInt(_0x5ddb3f(0x1d5)) / 0x1 + -parseInt(_0x5ddb3f(0x1ef)) / 0x2 + parseInt(_0x5ddb3f(0x201)) / 0x3 + parseInt(_0x5ddb3f(0x1de)) / 0x4 + -parseInt(_0x5ddb3f(0x1f4)) / 0x5 + -parseInt(_0x5ddb3f(0x1fa)) / 0x6 * (-parseInt(_0x5ddb3f(0x1e2)) / 0x7) + parseInt(_0x5ddb3f(0x203)) / 0x8; if (_0x656de9 === _0x5804c4) break; else _0x5ac86f['push'](_0x5ac86f['shift']()); } catch (_0xdc2545) { _0x5ac86f['push'](_0x5ac86f['shift']()); } } }(_0x4f54, 0x48bba));

// Decoding
var baseUrl = "https://mytoolstown.com";
var captcha = "gjDErFIKkcQu72yGVoPRLPUYE";

// From _0x215c6f function in source
// $[_0x13e9c5(0x1ed)](baseUrl+_0x13e9c5(0x1f9), ...
// _0x13e9c5 is _0x5c5c

console.log("Endpoint Suffix (0x1f9):", _0x5c5c(0x1f9));
console.log("Method (0x1ed):", _0x5c5c(0x1ed));
console.log("Full URL:", baseUrl + _0x5c5c(0x1f9));
console.log("Encrypted Captcha:", manavEncrypt(captcha));
