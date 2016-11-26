// ==UserScript==
// @name        Bilkent Otomatik OCR
// @author      Alper Nebi YASAK
// @namespace   https://github.com/alpernebbi/BilkentOCR
// @include     https://stars.bilkent.edu.tr/ocr/index.php
// @version     0.4
// @grant       none
// ==/UserScript==

// Bilkent Automatic Online Course Registration
// Copyright (C) 2016 Alper Nebi Yasak
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Affero General Public License for more details.
// 
// You should have received a copy of the GNU Affero General Public License
// along with this program. If not, see <http://www.gnu.org/licenses/>.

function main() {

	var _sections;
	var _table;
	var _rows;
	var _sect;
	var _inst;
	var _child;
	var _intv;
	var _loadSections;
	var _sure;

	function _triggerWaiting(_clickEvent) {
		_child = _clickEvent.currentTarget.id.substring(7);
		_sect = _rows[_child].firstElementChild.innerHTML;
		_inst = _rows[_child].children[8].innerHTML;
		_sure = window.confirm("Try to add  " +
			window.jQuery("#tabs input:radio:checked").val().replace("|", "") +
			"-" + _sect + " (" + _inst + ") automatically when it is available?");
		if (_sure) {
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
		_button.setAttribute("id", "breadNo" + i);
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
		window.loadSections();
		if (_rows[_child].firstElementChild.innerHTML != _sect) {
			for (var i = 0; i < _rows.length; i++) {
				if (_rows[i].firstElementChild.innerHTML  === _sect) {
					_child = i;
				}
			}
		} else if (_rows[_child].lastElementChild.innerHTML.search("breadNo") == -1) {
			_clickButton(_rows[_child].lastElementChild.firstElementChild);
			document.getElementById("i_confirm_drop_ok").click();
			window.clearInterval(_intv);
		}
	}

	function _waitLoading() {
		if (document.getElementById("sections").innerHTML.search(".gif") != -1) {
			window.setTimeout(_waitLoading, 1000);
		} else {
			_replaceWithButtons();
		}
	}

	function _hookToLoad() {
		if (typeof loadSections === 'function') {
			_loadSections = loadSections;
			loadSections = function(){
				_loadSections();
				_waitLoading();
			};
		} else {
			loadSections = _waitLoading;
		}
	}

	_hookToLoad();

}

var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ main +')();'));
(document.body || document.head || document.documentElement).appendChild(script);
