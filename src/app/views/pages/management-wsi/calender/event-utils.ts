import { EventInput } from '@fullcalendar/angular';
import { date } from 'ngx-custom-validators/src/app/date/validator';
import {ManagementWsiService} from '../management-wsi.service';


let eventGuid = 0;
//const TODAY_STR = () => {
 // let dateObj = new Date();
  //if(dateObj.getUTCMonth() < 10) {
  //  return dateObj.getUTCFullYear() + '-' + ('0'+(dateObj.getUTCMonth() + 1));
  //} else {
   // return dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
  //}
//}
// objects


//
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
const term1Start = new Date('2021-01-11').toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
const term1End = new Date('2021-04-28').toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
const term2Start = new Date('2021-06-24').toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
const term2End = new Date('2021-07-27').toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
const term3tart = new Date('2021-09-25').toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
const term3End = new Date('2021-10-01').toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
const term4Start = new Date('2021-10-15').toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
const term4End = new Date('2021-12-15').toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today




// Calendar Event Source
export const INITIAL_EVENTS: EventInput[] = [
 /*
 
  {
    id: createEventId(),
    title: 'present day',
    start: TODAY_STR ,
    backgroundColor: 'rgba(#f3f3fe)',
    borderColor: '#727cf5'
  },
  {
    id: createEventId(),
    title: 'term one start',
    start:  term1Start,
    backgroundColor: '#fffbf2',
    borderColor: '#fbbc06'
  },
  {
    id: createEventId(),
    title: 'term one end',
    start:  term1End,
    backgroundColor: '#fffbf2',
    borderColor: '#fbbc06'

    
  },
  {
    id: createEventId(),
    title: 'term two start',
    start:  term2Start ,
    backgroundColor: '#f3f3fe',
    borderColor: '#727cf5'

  },
  {
    id: createEventId(),
    title: 'term two end',
    start: term2End,
    backgroundColor: '#f3f3fe',
    borderColor: '#727cf5'

  },
  {
    id: createEventId(),
    title: 'term three start',
    start: term3tart,
    backgroundColor: '#f7fdfd',
    borderColor: '#66d1d1'
  },
  {
    id: createEventId(),
    title: 'term three end',
    start: term3End,
    backgroundColor: '#f7fdfd',
    borderColor: '#66d1d1'

    
  },
  {
    id: createEventId(),
    title: 'term four start',
    start: term4Start,
    backgroundColor: '#f1fef7',
    borderColor: '#10b759'

  },
  {
   id: createEventId(),
    title: 'term four end',
    start: term4End,
    backgroundColor: '#f1fef7',
    borderColor: '#10b759'

  }, */

];
//

//export const INITIAL_EVENTS: EventInput[] = [ ...exampleEvents, ...birthdayEvents, ...holidayEvents, ...discoveredEvents, ...meetupEvents, ...otherEvents];

// export const INITIAL_EVENTS: EventInput[] = [
//   {
//     id: createEventId(),
//     title: 'All-day event',
//     start: TODAY_STR
//   },
//   {
//     id: createEventId(),
//     title: 'Timed event',
//     start: TODAY_STR + 'T12:00:00'
//   }
// ];

export function createEventId() {
  return String(eventGuid++);
}
