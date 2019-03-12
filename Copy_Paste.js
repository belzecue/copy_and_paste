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
				
				// create invisible textarea to copy string to clipboard from there
				var textArea = document.createElement("textarea");
								
				// check if Qlik tooltip for diagrams is visible -> if so, use these values, else use mouseover values of other objects (like ListBox, Table)
				if (tooltipStyle == 'display: block;') {
					// grab value from Qlik Diagram Popup		
					var popupText = $(".qv-chart-tooltip-content").text(); // if you want descriptions included, use .qv-tp-row instead //qv-chart-tooltip-content //  .qv-tp-value // la-vie-tooltip // qv-chart-tooltip-content
					// little bit of string cleanup
					//popupText = popupText.trim(); // no spaces
					//popupText = popupText.replace(/\t/g, ''); // no tabs
					//popupText = popupText.replace(/\r\n|\n|\r/g, ' '); // replace CR/LF with spaces
					textArea.value = popupText;			
				}
				else if ( $("#la-vie-tooltip").text().length > 1 ) { // pie charts use different DIV classes than all other diagrams, but only when mouseover is active...
					var popupPieChartText = $("#la-vie-tooltip").text(); // get info of pie chart popup
					popupPieChartText = popupPieChartText.trim();
					popupPieChartText = popupPieChartText.replace(/\t/g, '');
					popupPieChartText = popupPieChartText.replace(/\r\n|\n|\r/g, ' ');
					textArea.value = popupPieChartText;	
				}
				else {
					// grab value of other elements
					textArea.value = mouseoverText.trim(); // no spaces
				}
				
				// debug: output to console
				// console.log(textArea.value);
				
				// attach textarea to DOM
				document.body.appendChild(textArea);
				
				// copy value from textarea to clipboard
				textArea.select();
				document.execCommand("Copy");
				
				// get rid of the textbox
				textArea.remove();				
			}
			
			
			// permanently scan for mouseover of Qlik Listboxes + Tables
			$(".qv-listbox-text, .value, .qv-st-value-overflow, .kpi-value").bind("mouseenter",function(){ 
					mouseoverText = $(this).text();					
			});
			
			
			
			// Look out for ctrl-c hotkey
			$(document).keydown(function(e) {
				if (e.keyCode == 67 && e.ctrlKey) {														
					doCopy();									
				}
			});
 				
				
			// rendering code for GUI -> empty
			$element.html( "" );			
			
			
			//needed for export
			return qlik.Promise.resolve();
			
		}
	};

} );

