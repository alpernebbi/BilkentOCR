// ==UserScript==
// @name        Bilkent Otomatik OCR
// @namespace   https://stars.bilkent.edu.tr/ocr/index.php
// @include     https://stars.bilkent.edu.tr/ocr/index.php
// @version     0.1
// @grant       unsafeWindow
// ==/UserScript==

var _sections;
var _table;
var _rows;
var _sect;
var _inst;
var _child;
var _intv;
var _loadSections;
var _confirm;
var _id;
var _cry;

function _whoisthis() {
	var links = document.getElementsByTagName('a');
	for (var i = 0; i < links.length; i++) {
		if (links[i].href.search("webserv") != -1) {
		   var translink = links[i].href;
		   var idind = translink.search("id=");
		   var cryind = translink.search("cry=");
		   _id = translink.substring(idind + 3, idind + 11);
		   _cry = translink.substring(cryind + 4, cryind + 36);
		}
	}
}

function _triggerWaiting(_clickEvent) {
	_child = _clickEvent.currentTarget.id.substring(7);
	_sect = _rows[_child].firstElementChild.innerHTML;
	_inst = _rows[_child].children[8].innerHTML;
	if (window.confirm("Try to add  " + unsafeWindow.jQuery("#tabs input:radio:checked").val().replace("|", "") + "-" + _sect + " (" + _inst + ") automatically when it has available quota?")) {
		_intv = window.setInterval(_waitForIt, 2000);
	}
}

function _replaceWithButtons() {
	_sections = document.getElementById("sections");
	_table = _sections.firstElementChild;
	_rows = _table.getElementsByClassName("_section_row");
	for (var i = 0; i < _rows.length; i++) {
		if (_rows[i].lastElementChild.innerHTML === "Not Eligible") {
			_rows[i].lastElementChild.innerHTML = "";
			_rows[i].lastElementChild.appendChild(_makeButton(i));
		}
	}
}

function _makeButton(i) {
	var _button = document.createElement('input');
	_button.setAttribute("id", "waitButtonNo" + i);
	_button.setAttribute("aria-disabled", "false");
	_button.setAttribute("role", "button");
	_button.setAttribute("value", "Wait");
	_button.setAttribute("class", "_button ui-button ui-widget ui-state-default ui-corner-all");
	_button.setAttribute("style", "width: 80px");
	_button.setAttribute("type", "button");
	_button.addEventListener('click', _triggerWaiting, true);
	return _button;
}

function _clickButton(i) {
	var evt = document.createEvent("MouseEvents");
	evt.initEvent("click", true, true);
	i.dispatchEvent(evt);
}

function _waitForIt() {
	
	unsafeWindow.loadSections();
	if (_rows[_child].firstElementChild.innerHTML != _sect) {
		for (var i = 0; i < _rows.length; i++) {
			if (_rows[i].firstElementChild.innerHTML  === _sect) {
				_child = i;
			}
		}
	} else if (_rows[_child].lastElementChild.innerHTML.search("waitButtonNo") == -1) {
		_nullifyConfirm();
		_clickButton(_rows[_child].lastElementChild.firstElementChild);
		_restoreConfirm();
	}
}

function _waitLoading() {
	if (document.getElementById("sections").innerHTML.search(".gif") != -1) {
		window.setTimeout(_waitLoading, 250);
	} else {
		_replaceWithButtons();
	}
}

function _nullifyConfirm() {
	if (typeof unsafeWindow.confirm === 'function') {
		_confirm = unsafeWindow.confirm;
		unsafeWindow.confirm = function(whatever){
			return true;
		};
	} else {
		unsafeWindow.confirm = true;
	}
}

function _restoreConfirm() {
	unsafeWindow.confirm = _confirm;
}

function _hookToLoad() {
	if (typeof unsafeWindow.loadSections === 'function') {
		_loadSections = unsafeWindow.loadSections;
		unsafeWindow.loadSections = function(){
			_loadSections();
			_waitLoading();
		};
	} else {
		unsafeWindow.loadSections = _waitLoading;
	}
}

// _whoisthis();
_hookToLoad();