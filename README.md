# copy_and_paste

Use-Case:
Copy&Paste values from objects of a Qlik Dashboard (charts, listboxes, tables, ...) to the clipboard for later usage.

Installation:
Download zip-file and install just as any other Qlik extension, e.g. copy the extension folder to your local Qlik Sense Desktop extension folder or import in the QMC of a Qlik Sense Enterprise version.

Usage:
Highlight (click) the browser window, place the mouse cursor on any data point (a bar of a diagram, a slice of a pie chart, a cell in a table) and hit conrol-c shortcut. Shortcut will not work, if the browser window is not active or in the background.
The selected value will be copied to the clipboard. Very useful to copy&paste values from Qlik (e.g. invoice number, customer number, ...) and use these in external tools like ERP systems.
Drag&Drop the extension to each Qlik sheet you want to provide this functionality. The extension will use a 1x1 square of your canvas for your dashboard, but will be invisible to users.


Remark:
Tested for Qlik Sense Feb 2019 in Chrome 72. Highly experimental, because selected (mouseover) values are identified by classes / ids in the DOM, which might change in future versions of Qlik.
