function DatePicker(parent){
	var container = document.createElement('div');
	var monthYearHeader = document.createElement('div');
	var dayCalendar = document.createElement('div');
	var prevBtn = document.createElement('button');
	var nextBtn = document.createElement('button');
	var prevIcon = document.createTextNode('<');
	var nextIcon = document.createTextNode('>');
	var headerText;
	var currentMonth = moment().startOf('month');
	var selectedMonth = currentMonth;
	var btnStyle = "w3-btn w3-white w3-border w3-border-grey ";
	var closeBtn = document.createElement('span');
	var x = document.createTextNode("x");
	var prevFunction = function(){
		selectedMonth = DatePickerChangeMonth(selectedMonth, false);
		headerText = document.createTextNode(moment(selectedMonth).format('MMMM YYYY'));
		monthYearHeader.replaceChild(headerText, monthYearHeader.childNodes[1]);
		DatePickerGenerateButtons(selectedMonth, dayCalendar);
	};
	var nextFunction = function(){
		selectedMonth = DatePickerChangeMonth(selectedMonth, true);
		headerText = document.createTextNode(moment(selectedMonth).format('MMMM YYYY'));
		monthYearHeader.replaceChild(headerText, monthYearHeader.childNodes[1]);
		DatePickerGenerateButtons(selectedMonth, dayCalendar);
	}
	closeBtn.className = "w3-closebtn";
	closeBtn.appendChild(x);
	closeBtn.style.marginTop = '-8px';
	closeBtn.style.marginRight = '-4px';
	closeBtn.addEventListener("click", function(){
		parent.removeChild(container);
	});
	closeBtn.addEventListener("touchstart", function(){
		parent.removeChild(container);
	});
	DatePickerGenerateButtons(selectedMonth, dayCalendar);
	headerText = document.createTextNode(moment(selectedMonth).format('MMMM YYYY'));
	container.id = 'datePicker';
	container.className = "w3-container w3-padding-top w3-white w3-border w3-border-black";
	container.style.width = "420px";
	container.style.display = "inline-block";
	monthYearHeader.id = 'monthHeader';
	monthYearHeader.className = "w3-container w3-center w3-white";
	prevBtn.className = btnStyle + "w3-margin-left";
	prevBtn.style.cssFloat = 'left';
	prevBtn.addEventListener("click", prevFunction);
	prevBtn.addEventListener("touchstart", prevFunction);
	nextBtn.className = btnStyle + "w3-margin-right";
	nextBtn.style.cssFloat = 'right';
	nextBtn.addEventListener("click", nextFunction);
	nextBtn.addEventListener("touchstart", prevFunction);
	dayCalendar.id = 'dayCalendar';
	dayCalendar.className = "w3-container w3-white";
	
	prevBtn.appendChild(prevIcon);
	nextBtn.appendChild(nextIcon);
	monthYearHeader.appendChild(prevBtn);
	monthYearHeader.appendChild(headerText);
	monthYearHeader.appendChild(nextBtn);
	container.appendChild(closeBtn);
	container.appendChild(monthYearHeader);
	container.appendChild(dayCalendar);
	if (document.getElementById(container.id) == undefined){
		parent.appendChild(container);
	}
	
	$(window).click(function(e){
		if (e.target == container.parentNode){
			parent.removeChild(container);
		}
	});
	
	function DatePickerGenerateButtons(selectedMonth, dayCalendar){
		var day = moment(selectedMonth).startOf('week');
		var weekDayLetters = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
		var selectedDay;
		var event = document.createEvent("Event");
		event.initEvent("dateselect", true, true);

		dayCalendar.innerHTML = "";
		//start the week loop at -1 so -1 handles adding the weekday name header
		for(var w = -1; w < 5; w++){
			var weekRow = document.createElement('div');
			weekRow.className = "w3-row-padding w3-white";
			for(var d = 0; d < 7; d++){
				var currentDay = moment(day).add((w * 7) + d, 'day');
				var dayCol;
				var dayTxt;
				if (w >= 0 && moment(currentDay).isSame(selectedMonth, 'month')) {
					dayCol = document.createElement('button');
					dayCol.className = "w3-col l1 m1 s1 w3-btn w3-center w3-white w3-padding-0 w3-border w3-border-grey";
					dayCol.assignedDay = currentDay;
					dayCol.addEventListener("click", function(e){
						selectedDay = e.target.assignedDay;
						event.selectedDay = selectedDay;
						//dispatch the event from the calendar container that is returned by the DatePicker function
						container.dispatchEvent(event);
						//remove the Date Picker from the HTML DOM as we already selected a date
						container.parentNode.removeChild(container);
					});
					dayTxt = document.createTextNode(moment(currentDay).format('DD'));
				} else if (w >= 0 && !moment(currentDay).isSame(selectedMonth, 'month')){
					dayCol = document.createElement('div');
					dayCol.className = "w3-col l1 m1 s1 w3-center w3-white w3-padding-0";
					dayTxt = document.createTextNode('  ');
				}
				else {
					dayCol = document.createElement('div');
					dayCol.className = "w3-col l1 m1 s1 w3-center w3-white w3-padding-0 w3-border w3-border-black";
					dayTxt = document.createTextNode(weekDayLetters[moment(currentDay).add(7, 'day').format('d')]);
				}
				dayCol.style.margin = '4px 10px';
				dayCol.appendChild(dayTxt);
				weekRow.appendChild(dayCol);
			}
			dayCalendar.appendChild(weekRow);
		}
	}
	function DatePickerChangeMonth(selecMonth, doForward){
		var prevSelectedMonth = selecMonth;
		if (doForward){
			selecMonth = moment(selecMonth).add(1, 'month');
		} else {
			selecMonth = moment(selecMonth).subtract(1, 'month');
		}
		return selecMonth;
	}
	
	return container;
}