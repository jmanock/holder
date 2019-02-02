import React,{Component} from 'react';
import classnames from 'classnames';

class CalendarDay extends Component{
  render(){
    const {day, isToday, events, onClick} = this.props;
    const dayClasses = classnames({
      'flexColumn':true,
      'day':true,
      'inactive':day.siblingMonth,
      'today':isToday
    });
    return(
      <div onClick={onClick.bind(null, this, day)} className={dayClasses}>
        <div className='inner-grid'>
          <div className='date'>
            {day.day}
          </div>
          {events}
        </div>
      </div>
    );
  }
}

CalendarDay.defaultProps ={
  onClick:() =>{}
}

export default CalendarDay;
