function scheduleMovieNight() {
  
  var spreadsheet = SpreadsheetApp.getActiveSheet();
  var calendarId = 'i2j2ghp35gf8vc4d4mvqlnpeck@group.calendar.google.com';
  var eventCal = CalendarApp.getCalendarById(calendarId)
  
  
  //delete all previous events so there are no duplicate events
  
  var fromDate = new Date(2020,0,1,0,0,0); 
  var toDate = new Date(2030,0,1,0,0,0);
  
  // delete from Jan 1 to end of Jan 4, 2013 (for month 0 = Jan, 1 = Feb...)
  var events = eventCal.getEvents(fromDate, toDate);
  for(var i=0; i<events.length;i++){
    var ev = events[i];
    //Logger.log(ev.getTitle()); // show event name in log
    ev.deleteEvent();
  }
  

  var events = SpreadsheetApp.getActiveSpreadsheet().getRangeByName('MoviesList').getValues();
  //Logger.log(events)
  
  for (x=0; x<events.length-1;x++) {
    //Logger.log(events[x]+1)
    
    var event = events[x+1]
    var title = event[0]
    var startTime = event[6]
    var endTime = event[7]
    
    Logger.log(title)
    Logger.log(startTime)
    Logger.log(endTime)
    
    //Only create event that has a startTime
    if (startTime != "" && title != "") {
      //Logger.log(title)
      //Logger.log(startTime)
      //Logger.log(endTime)
      eventCal.createEvent('Movie Night: '+title,startTime,endTime)
    }
  }
}

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Sync to Google Calendar')
  .addItem('Add events to shared calendar', 'scheduleMovieNight')
  .addToUi();
}