import moment from 'moment';

export default{
  getEvents:() =>{
    const now = moment();
    const dataFormat = 'YYYY-MM-DD';
    const description = 'Something fucking cool should go here, I hope I didnt wast the last three hours working on something broken but i guess we will see what doesnt work and if anything does!!!';
    const eventMeta = [
      {start:1, length:5}, {start:5, length:1}, {start:5, length:3}, {start:12, length:15}, {start:15, length:45}, {start:18, length:6}, {start:21, length:5}, {start:24, length:14},{start:25, length:9}
    ]
    const events = eventMeta.map((data) => {
      const today = moment(now);
      return{
        start:today.date(data.start).format(dataFormat),
        end:today.add(data.length-1,'days').format(dataFormat),
        eventClasses:'custom-event-class',
        title:data.length+' day event '+(data.title || ''),
        description:description
      }
    });
    return events;
  }
};
