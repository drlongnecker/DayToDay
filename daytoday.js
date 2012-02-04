(function() {
  var dayToDay;
  window.Application || (window.Application = {});
  Application.dayToDay = function(options) {
    return dayToDay(options);
  };
  dayToDay = (function() {
    var createCalendar;
    function dayToDay(options) {
      this.options = options;
      createCalendar(this.options);
    }
    createCalendar = function(options) {
      var week, weekday;
      this.options = options;
      this.element = this.options.container;
      this.decorator = this.options.dayDecorator;
      this.selectedDate = this.options.selectedDate;
      this.events = this.options.events;
      this.debug = this.options.debug;
      this.includeNavigation = this.options.includeNavigation;
      this.today = Date.today();
      if (this.debug) {
        console.log("today is: " + this.today);
      }
      this.nextMonth = this.selectedDate.clone().month().moveToFirstDayOfMonth();
      if (this.debug) {
        console.log("next month is: " + this.nextMonth);
      }
      this.lastMonth = this.selectedDate.clone().last().month().moveToFirstDayOfMonth();
      if (this.debug) {
        console.log("last month is: " + this.lastMonth);
      }
      this.firstDayOfMonth = this.selectedDate.clone().moveToFirstDayOfMonth();
      if (this.debug) {
        console.log("setting first of month to: " + this.firstDayOfMonth);
      }
      this.startingDay = firstDayOfMonth.getDay();
      if (this.debug) {
        console.log("setting starting day to: " + this.startingDay);
      }
      if (this.debug) {
        console.log('emptying calendar');
      }
      this.element.empty();
      if (includeNavigation) {
        this.lastMonthNav = $('<a>').text(this.lastMonth.toString('MMM yyyy')).addClass('move-calendar lastMonth btn').prop('id', this.lastMonth.toString('MM-dd-yyyy')).prop('href', '#').prepend('<i class="icon-chevron-left" />&nbsp;');
        this.todayNav = $('<a>').text('Today').addClass('move-calendar thisMonth btn').prop('id', this.today.toString('MM-dd-yyyy')).prop('href', '#');
        this.nextMonthNav = $('<a>').text(this.nextMonth.toString('MMM yyyy')).addClass('move-calendar nextMonth btn').prop('id', nextMonth.toString('MM-dd-yyyy')).prop('href', '#').append('&nbsp;<i class="icon-chevron-right" />');
      }
      this.dayNameOutput = $('<div>').prop('id', 'dayName').text(this.selectedDate.getDayName());
      this.monthNameOutput = $('<div>').prop('id', 'monthName').text(this.selectedDate.getMonthName());
      this.dateOutput = $('<div>').prop('id', 'day').text(this.selectedDate.getDate());
      this.calendar = $('<table>').prop('id', 'calendar');
      this.daysOfWeek = '<thead>\
				<tr>\
					<th>Sun</th>\
					<th>Mon</th>\
					<th>Tue</th>\
					<th>Wed</th>\
					<th>Thu</th>\
					<th>Fri</th>\
					<th>Sat</th>\
				</tr>\
			</thead>';
      if (this.debug) {
        console.log('adding days of week header');
      }
      this.calendar.append(this.daysOfWeek);
      this.dayIncremental = 1;
      if (this.debug) {
        console.log('adding weeks...');
      }
      for (week = 0; week <= 6; week++) {
        if (this.debug) {
          console.log(" week " + week);
        }
        this.weekRow = $('<tr>').addClass('calendar-week');
        for (weekday = 0; weekday <= 6; weekday++) {
          this.daybox = $('<td>');
          if (this.dayIncremental <= this.selectedDate.getDaysInMonth() && (week > 0 || weekday >= this.startingDay)) {
            if (this.debug) {
              console.log("  adding day " + this.dayIncremental);
            }
            this.calendarDayId = (this.selectedDate.getMonth() + 1) + '-' + dayIncremental + '-' + this.selectedDate.getFullYear();
            if (this.debug) {
              console.log("   setting calendarDayId : " + this.calendarDayId);
            }
            if (Date.parse(this.calendarDayId) <= this.today) {
              daybox.addClass('calendar-day').text(dayIncremental).prop('id', this.calendarDayId);
              if (typeof this.decorator === "function") {
                this.decorator(this.daybox, this.dayIncremental, this.events);
              }
            } else {
              daybox.addClass('future-day').text(this.dayIncremental).prop('id', this.calendarDayId);
            }
            this.weekRow.append(this.daybox);
            this.dayIncremental++;
          } else {
            this.weekRow.append(this.daybox.addClass('empty'));
          }
        }
        if (this.debug) {
          console.log(" week " + this.week + " complete");
        }
        this.calendar.append(this.weekRow);
        if (this.dayIncremental > this.selectedDate.getDaysInMonth()) {
          this.calendar.append($('<br>'));
          if (this.debug) {
            console.log('finished adding weeks ...');
          }
          break;
        }
      }
      if (this.debug) {
        console.log('adding calendar and controls to DOM');
      }
      this.element.append(this.dayNameOutput, this.monthNameOutput, this.dateOutput, this.calendar);
      if (this.options.includeNavigation) {
        this.element.append(this.lastMonthNav, this.todayNav, this.nextMonthNav);
      }
      if (this.debug) {
        return console.log('DONE!');
      }
    };
    return dayToDay;
  })();
}).call(this);
