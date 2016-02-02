# Bilkent Automatic OCR

This script enables you to wait and automatically register for a course in 
Bilkent University's online course registration system. As I ( @alpernebbi ) have no 
access to the registration system as of 2016-02-02, this script is not tested
and will not be developed further - at least not by me.

## Installation

The current version of the script should work with up-to-date
[Firefox (42)](https://www.firefox.com/) and
[Greasemonkey (3.6)](https://addons.mozilla.org/firefox/addon/greasemonkey/).
If you have both installed, click below and Greasemonkey should prompt
you to install the script.

* [BilkentOCR.user.js](https://github.com/alpernebbi/BilkentOCR/raw/master/BilkentOCR.user.js)

## Usage

After installing, try to add a course or change a section as you would do without 
this script. When you come to the section selection step, the sections that 
previously would have been marked "Not Eligible" should be replaced with a "Wait" 
button. Click it, confirm your selection and the sections pane should start refreshing
on its own. The script will look for the "Add" button for the section you chose,
and will click it and confirm your registration automatically if it finds it.

## Screenshots

!['Not Eligible' text changes into a 'Wait' button](screenshots/p4.png?raw=true)

![Clicking it asks you to confirm section](screenshots/p5.png?raw=true)

![Only the bottom pane refreshes while operation](screenshots/p6.png?raw=true)
