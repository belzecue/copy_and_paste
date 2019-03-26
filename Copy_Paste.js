define( [ "qlik", "jquery"
],
function ( qlik, $) {

	return {
		support : {
			snapshot: false,
			export: false,
			exportData : false
		},
		paint: function ($element) {
			
			// global var to permanently fetch mouseover events from non-diagram objects (ListBox, Table)
			var mouseoverText = '';


			function doCopy() {		

				// check if Qlik mouseover tooltip for diagrams is active/visible
				var tooltipStyle = $( "#qs-chart-tooltip" ).children().attr( "style" );				
				
				// this var will be copied to clipboard later
				var clipboard = '';					
												
				// check if Qlik tooltip for diagrams is visible -> if so, use these values, else use mouseover values of other objects (like ListBox, Table)
				if (tooltipStyle == 'display: block;') {
					// grab value from Qlik Diagram Popup		
					var popupText = $(".qv-chart-tooltip-content").text(); // if you want descriptions included, use .qv-tp-row instead
					// little bit of string cleanup
					popupText = popupText.trim(); // no spaces
					popupText = popupText.replace(/\t/g, ''); // no tabs
					popupText = popupText.replace(/\r\n|\n|\r/g, ' '); // replace CR/LF with spaces
					clipboard = popupText;			
				}
				else if ( $("#la-vie-tooltip").text().length > 1 ) { // pie charts use different DIV classes than all other diagrams, but only when mouseover is active...
					var popupPieChartText = $("#la-vie-tooltip").text(); // get info of pie chart popup
					//popupPieChartText = popupPieChartText.trim();
					//popupPieChartText = popupPieChartText.replace(/\t/g, '');
					//popupPieChartText = popupPieChartText.replace(/\r\n|\n|\r/g, ' ');
					clipboard = popupPieChartText;	
				}
				else {
					// grab value of other elements like listboxes + tables via bound mouseover
					clipboard = mouseoverText.trim(); // no spaces
				}
				
				// debug: output to console	
				//console.log('clipboard:');				
				//console.log(clipboard);				
				//console.log(window.navigator.userAgent);

				// check for IE11: true on IE11, false on Edge and other IEs/browsers.
				var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;  								

				// IE11 support: the IE11 cannot remove the textbox afterwards, so we have to use a different method
				if (isIE11) {				
					// IE clipboard method
					window.clipboardData.setData('Text', clipboard);
				}
				else {
					// create invisible textarea to copy string to clipboard from there
					var textArea = document.createElement("textarea");

					// fill textarea
					textArea.value = clipboard;

					// attach textarea to DOM
					document.body.appendChild(textArea);
					
					// copy value from textarea to clipboard
					textArea.select();
					document.execCommand("Copy");
					
					// get rid of the textbox (this is the problem in IE11)
					textArea.remove();				
				}
			}
			

			// wait for DOM
			$( document ).ready(function() {	

				// permanently scan for mouseover of Qlik Listboxes + Tables
				$(".value, .qv-st-value-overflow, .kpi-value, .qv-listbox-text").bind("mouseenter",function(){ 
						mouseoverText = $(this).text();		
						//console.log('mouseoverText:');
						//console.log(mouseoverText);			
				});
			
				// Look out for ctrl-c hotkey
				$(document).keydown(function(e) {
					if (e.keyCode == 67 && e.ctrlKey) {														
						doCopy();									
					}
				});
			});	
				
			// rendering code for GUI -> empty
			$element.html( "" );						
			
			//needed for export
			return qlik.Promise.resolve();
			

		} // paint
	}; 

});

