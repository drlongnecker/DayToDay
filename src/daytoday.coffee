window.Application ||= {}

Application.dayToDay = (options) ->
	dayToDay options

#createCalendar
#	container: $('#calendar-container') (or whatever)
#	dayDecorator: function accepting a (dayContainer, day, event)
#	events: JSON array of objects matching your dayDecorator
#	selectedDate: date to base your calendar off of
#	includeNavigation: (true|false)
#	debug: (true|false)

# formatting classes:
# dayName, monthName, day

class dayToDay
	constructor: (@options) ->
		createCalendar @options

	createCalendar = (options) ->
		# using datejs
		@options = options ? {}
		
		@element = @options.container
		throw { name: 'Error', message: '"container" not defined'} if not @element or @element is '' or not @element?
		
		@decorator = @options.dayDecorator
		@selectedDate = @options.selectedDate ? Date.today()
		
		@events = @options.events
		@debug = @options.debug
		@includeNavigation = @options.includeNavigation
		
		@today = Date.today()
		console.log "today is: #{@today}" if @debug

		@nextMonth = @selectedDate.clone().month().moveToFirstDayOfMonth()
		console.log "next month is: #{@nextMonth}" if @debug

		@lastMonth = @selectedDate.clone().last().month().moveToFirstDayOfMonth()
		console.log "last month is: #{@lastMonth}" if @debug

		@firstDayOfMonth = @selectedDate.clone().moveToFirstDayOfMonth()
		console.log "setting first of month to: #{@firstDayOfMonth}" if @debug		

		# TODO: determine if I really need/care or if it's always '1'
		@startingDay = firstDayOfMonth.getDay()
		console.log "setting starting day to: #{@startingDay}" if @debug

		# clear out the element holding the calendar
		console.log 'emptying calendar' if @debug
		$('#calendar-inner-container').remove()
		
		# TODO: abstract out the bootstrap, formatting, and other things.
		if @includeNavigation
			@lastMonthNav = $('<a>').text(@lastMonth.toString('MMM yyyy'))
				.addClass('move-calendar lastMonth btn')
				.prop('id', @lastMonth.toString('MM-dd-yyyy'))
				.prop('href', '#')
				.prepend('<i class="icon-chevron-left" />&nbsp;')

			@todayNav = $('<a>').text('Today')
				.addClass('move-calendar thisMonth btn')
				.prop('id', @today.toString('MM-dd-yyyy'))
				.prop('href', '#')

			@nextMonthNav = $('<a>').text(@nextMonth.toString('MMM yyyy'))
				.addClass('move-calendar nextMonth btn')
				.prop('id', nextMonth.toString('MM-dd-yyyy'))
				.prop('href', '#')
				.append('&nbsp;<i class="icon-chevron-right" />')
		
		# build out display objects
		@dayNameOutput = $('<div>').prop('id', 'dayName').text(@selectedDate.getDayName())
		@monthNameOutput = $('<div>').prop('id', 'monthName').text(@selectedDate.getMonthName())
		@dateOutput = $('<div>').prop('id', 'day').text(@selectedDate.getDate())
		
		# begin working on calendar
		@calendar = $('<table>').prop('id', 'calendar')
		
		# TODO: pull day names from datejs (or not)
		@daysOfWeek = '<thead>
				<tr>
					<th>Sun</th>
					<th>Mon</th>
					<th>Tue</th>
					<th>Wed</th>
					<th>Thu</th>
					<th>Fri</th>
					<th>Sat</th>
				</tr>
			</thead>'

		console.log 'adding days of week header' if @debug
		@calendar.append @daysOfWeek
		
		@dayIncremental = 1
		console.log 'adding weeks...' if @debug
		for week in [0..6]
			console.log " week #{week}" if @debug
			@weekRow = $('<tr>').addClass('calendar-week')
			for weekday in [0..6]
				@daybox = $('<td>')
				if (@dayIncremental <= @selectedDate.getDaysInMonth() and (week > 0 || weekday >= @startingDay))
					console.log "  adding day #{@dayIncremental}" if @debug

					@calendarDayId = (@selectedDate.getMonth() + 1) + '-' + dayIncremental + '-' + @selectedDate.getFullYear()
					console.log "   setting calendarDayId : #{@calendarDayId}" if @debug
					if Date.parse(@calendarDayId) <= @today
						daybox.addClass('calendar-day').text(dayIncremental).prop('id', @calendarDayId)	
						@decorator? @daybox, @dayIncremental, @events
					else
						daybox.addClass('future-day').text(@dayIncremental).prop('id', @calendarDayId)
					
					@weekRow.append @daybox
					@dayIncremental++
				else
					@weekRow.append @daybox.addClass('empty')
			console.log " week #{@week} complete" if @debug
			@calendar.append @weekRow

			if @dayIncremental > @selectedDate.getDaysInMonth()
				@calendar.append $('<br>')
				console.log 'finished adding weeks ...' if @debug
				break

		console.log 'adding calendar and controls to DOM' if @debug
		@innerElement = $('<div id="calendar-inner-container">').append @dayNameOutput, @monthNameOutput, @dateOutput, @calendar
		
		
		if @options.includeNavigation
			@innerElement.append @lastMonthNav, @todayNav, @nextMonthNav
		
		@element.append @innerElement
		console.log 'DONE!' if @debug