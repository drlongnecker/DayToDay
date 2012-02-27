(function() {
  describe('Creating a calendar with minimum options', function() {
    var container, expectedDayName, expectedDayNumber, expectedMonthName, selectedDate;
    container = null;
    selectedDate = Date.parse('1-1-2012');
    expectedDayName = '<div id="dayName">' + selectedDate.getDayName() + '</div>';
    expectedMonthName = '<div id="monthName">' + selectedDate.getMonthName() + '</div>';
    expectedDayNumber = '<div id="day">' + selectedDate.getDate() + '</div>';
    beforeEach(function() {
      container = $('<div id="calendar-container">blahblahblah</div>');
      return Application.dayToDay({
        container: container,
        selectedDate: selectedDate
      });
    });
    it('should add the calendar to the specified element', function() {
      return expect(container.html()).toContain('<table id="calendar">');
    });
    it('should not empty the element of the original text', function() {
      return expect(container.html()).toContain('blahblahblah');
    });
    it('should create an inner element to hold the calendar', function() {
      return expect(container.html()).toContain('<div id="calendar-inner-container">');
    });
    it('should contain the selected date specified', function() {
      return expect(container.html()).toContain(selectedDate.getDate());
    });
    it('should contain the specified day name', function() {
      return expect(container.html()).toContain(expectedDayName);
    });
    it('should contain the specified month name', function() {
      return expect(container.html()).toContain(expectedMonthName);
    });
    it('should contain the specified day', function() {
      return expect(container.html()).toContain(expectedDayNumber);
    });
    return it('should contain the week number for the first week', function() {
      return expect(container.html()).toContain('<tr class="calendar-week" id="1">');
    });
  });
  describe('Creating a calendar without specifying any options', function() {
    var calendar;
    calendar = null;
    return it('should throw an exception: container not defined', function() {
      return expect(function() {
        return Application.dayToDay();
      }).toThrow('"container" not defined');
    });
  });
  describe('Creating a calendar without specify a selected date', function() {
    var container, expectedDayName, expectedDayNumber, expectedFirstWeek, expectedMonthName, expectedSecondWeek;
    container = null;
    expectedDayName = '<div id="dayName">' + Date.today().getDayName() + '</div>';
    expectedMonthName = '<div id="monthName">' + Date.today().getMonthName() + '</div>';
    expectedDayNumber = '<div id="day">' + Date.today().getDate() + '</div>';
    expectedFirstWeek = '<tr class="calendar-week" id="' + Date.today().monday().getWeekOfYear() + '">';
    expectedSecondWeek = '<tr class="calendar-week" id="' + (Date.today().monday().getWeekOfYear() + 1) + '">';
    beforeEach(function() {
      container = $('<div id="calendar-container">blahblahblah</div>');
      return Application.dayToDay({
        container: container
      });
    });
    it('should add the calendar to the specified element', function() {
      return expect(container.html()).toContain('<table id="calendar">');
    });
    it('should default to today\'s day name', function() {
      return expect(container.html()).toContain(expectedDayName);
    });
    it('should default to today\'s month name', function() {
      return expect(container.html()).toContain(expectedMonthName);
    });
    it('should default to today\'s day', function() {
      return expect(container.html()).toContain(expectedDayNumber);
    });
    it('should not empty the element of the original text', function() {
      return expect(container.html()).toContain('blahblahblah');
    });
    it('should create an inner element to hold the calendar', function() {
      return expect(container.html()).toContain('<div id="calendar-inner-container">');
    });
    it('should contain the week number for the first week', function() {
      return expect(container.html()).toContain(expectedFirstWeek);
    });
    return it('should contain the week number for the second week', function() {
      return expect(container.html()).toContain(expectedSecondWeek);
    });
  });
}).call(this);
