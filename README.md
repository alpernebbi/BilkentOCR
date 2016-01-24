# Bilkent Automatic OCR

This script enables you to wait and automatically register for a course in 
Bilkent University's online course registration system. As I have limited 
access to the registration system, this script is usually not tested 
extensively - if at all.

## Installation

The current version of the script does not work on up-to-date Firefox and 
Greasemonkey (because it uses unsafeWindow in ways that aren't permitted now). 
However, if you want to make it work now, you can try with:

* [Pale Moon 25](https://www.palemoon.org/) (or [its portable variant](https://www.palemoon.org/palemoon-portable.shtml)) 
* [Greasemonkey 1.15.1](https://addons.mozilla.org/en-us/firefox/addon/greasemonkey/versions/?page=2#version-1.15.1-signed)
* [BilkentOCR.user.js](https://github.com/alpernebbi/BilkentOCR/raw/master/BilkentOCR.user.js)

## Usage

After installing, try to add a course or change a section as you would do without 
this script. When you come to the section selection phase, the sections that 
previously would have been marked "Not Eligible" should be replaced with a "Wait" 
button. Click it, confirm your selection and the sections pane should start refreshing
on its own. The script will look for the "Add" button for the section you choose,
and will click it and confirm your registration automatically if it finds it.
