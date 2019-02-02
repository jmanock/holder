import React, {Component} from 'react';
import {Calendar} from 'calendar-base';
import CalendarDay from './components/CalendarDay';
import CalendarEvent from './components/CalendarEvent';
import CalendarTitle from './components/CalendarTitle';

class EventCalendar extends Component{
  state = {
    today:this.getToday(),
  }

  calendar = new Calendar({siblingMonths:true});

  getToday(){
    var today = new Date();
    return{
      day:today.getDate(),
      month:today.getMonth(),
      year:today.getFullYear()
    };
  }

  getCalendarDays(){
    return this.calendar.getCalendar(this.props.year, this.props.month).map((day) => {
      day.eventSlots = Array(this.props.maxEventSlots).fill(false);
      return day;
    });
  }

  getEventMeta(days, eventStart, eventEnd){
    const eventStartInView = this.calendar.isDateSelected(eventStart);
    const eventEndInView = this.calendar.isDateSelected(eventEnd);
    const firstDayOfMonth = days[0];
    const lastDayOfMonth = days[days.length -1];
    const eventMeta ={
      isVisibleInView:false,
      visibleEventLength:days.length,
      firstVisibleDayIndex:eventStartInView ? Calendar.interval(firstDayOfMonth, eventStart)-1 : 0
    };

    if(eventStartInView || eventEndInView){
      eventMeta.isVisibleInView = true;
    }else if(eventStart.month < this.props.month && eventEnd.month > this.props.month){
      eventMeta.isVisibleInView = true;
    }

    if(eventStartInView && eventEndInView){
      eventMeta.visibleEventLength = Calendar.interval(eventStart, eventEnd);
    }else if(!eventStartInView && eventEndInView){
      eventMeta.visibleEventLength = Calendar.interval(firstDayOfMonth, eventEnd);
    }else if(eventStartInView && !eventEndInView){
      eventMeta.visibleEventLength = Calendar.interval(eventStart, lastDayOfMonth);
    }
    return eventMeta;
  }

  getDaysWithEvents(){
    const days = this.getCalendarDays();
    this.calendar.setStartDate(days[0]);
    this.calendar.setEndDate(days[days.length -1]);
    this.props.events.forEach((eventItem) => {
      const eventStart = this.getCalendarDayObject(eventItem.start);
      const eventEnd = this.getCalendarDayObject(eventItem.end);
      const eventMeta = this.getEventMeta(days, eventStart, eventEnd);

      if(eventMeta.isVisibleInView){
        const eventLength = eventMeta.visibleEventLength;
        const eventSlotIndex = days[eventMeta.firstVisibleDayIndex].eventSlots.indexOf(false);
        let dayIndex = 0;

        while(dayIndex < eventLength){
          const eventData = Object.assign({},eventItem);

          if(dayIndex === 0){
            eventData.isFirstDay = true;
          }
          if(dayIndex === eventLength -1){
            eventData.isLastDay = true;
          }
          if(!eventData.isFirstDay || !eventData.isLastDay){
            eventData.isBetweenDay = true;
          }
          days[eventMeta.firstVisibleDayIndex + dayIndex].eventSlots[eventSlotIndex] = eventData;
          dayIndex++;
        }
      }
    });
    return days;
  }

  getCalendarDayObject(date){
    const dateArray = date.split('-');
    return{
      year:dateArray[0],
      month:dateArray[1]-1,
      day:dateArray[2]
    };
  }

  getLastIndexOfEvent(slots){
    const lastIndexOfEvent = slots.map((slot, index) => {
      return slot !== false ? index:false;
    }).filter((element) => {
      return element;
    }).pop();
    return lastIndexOfEvent < 3 || lastIndexOfEvent === undefined ? 2 : lastIndexOfEvent;
  }

  getSerializedDay(day){
    return [day.weekDay, day.day, day.month, day.year].join('');
  }

  renderDaysOfTheWeek(){
    return this.props.daysOfTheWeek.map((title, index) => {
      return(
        <CalendarTitle key={'title_'+index} title={title} />
      )
    });
  }

  renderEvents(day){
    const eventSlots = day.eventSlots.slice(0, this.getLastIndexOfEvent(day.eventSlots)+1);
    return eventSlots.map((eventData, index) => {
      return(
        <CalendarEvent key={'event_'+index+this.getSerializedDay(day)} day={day} eventData={eventData} onClick={this.props.onEventClick} wrapTitle={this.props.wrapTitle} />
      );
    });
  }

  renderCalendarDays(){
    return this.getDaysWithEvents().map((day, index) => {
      const isToday = Calendar.interval(day, this.state.today) === 1;
      const events = this.renderEvents(day);
      return (
        <CalendarDay key={'day_'+this.getSerializedDay(day)} day={day} events={events} isToday={isToday} onClick={this.props.onDayClick} />
      );
    });
  }

  render(){
    return(
      <div className='flexContainer'>
        {this.renderDaysOfTheWeek()}
        {this.renderCalendarDays()}
      </div>
    );
  }
}

EventCalendar.defaultProps ={
  daysOfTheWeek:['Sunday', 'Monday', 'Tuesday', 'Thursday', 'Wednesday', 'Friday', 'Saturday'],
  events:[],
  wrapTitle:true,
  maxEventSlots:10
};

export default EventCalendar;
