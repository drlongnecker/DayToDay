describe 'Creating a calendar with minimum options', ->
	container = null
	selectedDate = Date.parse('1-1-2012')
	
	expectedDayName = '<div id="dayName">'+ selectedDate.getDayName() + '</div>'
	expectedMonthName = '<div id="monthName">'+ selectedDate.getMonthName() + '</div>'
	expectedDayNumber = '<div id="day">'+ selectedDate.getDate() + '</div>'

	beforeEach ->
		container = $('<div id="calendar-container">blahblahblah</div>')
		
		Application.dayToDay
			container: container
			selectedDate: selectedDate

	it 'should add the calendar to the specified element', ->
		expect(container.html()).toContain '<table id="calendar">'
	
	it 'should not empty the element of the original text', ->
		expect(container.html()).toContain 'blahblahblah'

	it 'should create an inner element to hold the calendar', ->
		expect(container.html()).toContain '<div id="calendar-inner-container">'

	it 'should contain the selected date specified', ->
		expect(container.html()).toContain selectedDate.getDate()

	it 'should contain the specified day name', ->
		expect(container.html()).toContain expectedDayName

	it 'should contain the specified month name', ->
		expect(container.html()).toContain expectedMonthName

	it 'should contain the specified day', ->
		expect(container.html()).toContain expectedDayNumber

	it 'should contain the week number for the first week', ->
		expect(container.html()).toContain '<tr class="calendar-week" id="1">'

describe 'Creating a calendar without specifying any options', ->
	calendar = null

	it 'should throw an exception: container not defined', ->
		expect(-> Application.dayToDay()).toThrow '"container" not defined'

describe 'Creating a calendar without specify a selected date', ->
	container = null
	expectedDayName = '<div id="dayName">'+ Date.today().getDayName() + '</div>'
	expectedMonthName = '<div id="monthName">'+ Date.today().getMonthName() + '</div>'
	expectedDayNumber = '<div id="day">'+ Date.today().getDate() + '</div>'
	expectedFirstWeek = '<tr class="calendar-week" id="' + Date.today().monday().getWeekOfYear() + '">'
	expectedSecondWeek = '<tr class="calendar-week" id="' + (Date.today().monday().getWeekOfYear() + 1) + '">'

	beforeEach ->
		container = $('<div id="calendar-container">blahblahblah</div>')
		
		Application.dayToDay
			container: container
	
	it 'should add the calendar to the specified element', ->
		expect(container.html()).toContain '<table id="calendar">'
	
	it 'should default to today\'s day name', ->
		expect(container.html()).toContain expectedDayName

	it 'should default to today\'s month name', ->
		expect(container.html()).toContain expectedMonthName

	it 'should default to today\'s day', ->
		expect(container.html()).toContain expectedDayNumber

	it 'should not empty the element of the original text', ->
		expect(container.html()).toContain 'blahblahblah'
	
	it 'should create an inner element to hold the calendar', ->
		expect(container.html()).toContain '<div id="calendar-inner-container">'

	it 'should contain the week number for the first week', ->
		expect(container.html()).toContain expectedFirstWeek
	
	it 'should contain the week number for the second week', ->
		expect(container.html()).toContain expectedSecondWeek