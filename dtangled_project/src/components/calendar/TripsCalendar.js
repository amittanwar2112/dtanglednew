import React from 'react';
import { Calendar, momentLocalizer   } from 'react-big-calendar';
import moment from 'moment';


const localizer = momentLocalizer(moment)

let eventStyleGetter = (event, start, end, isSelected) => {
    console.log(event);
    var backgroundColor = event.color;
    var style = {
        backgroundColor: backgroundColor,
        borderRadius: '0px',
        opacity: 0.8,
        color: 'black',
        border: '0px',
        display: 'block'
    };
    return {
        style: style
    };
}


let myEventsList = [{
    id: 0,
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date("2019-12-18T20:56:12.083Z"),
    end: new Date("2019-12-18T20:56:12.083Z"),
    color: "#f56c42"
}]

export function TripsCalendar(props) {
    return (
        <Calendar
            localizer={localizer}
            events={props.trips.map( trip => { return { id: trip.id, title:trip.destination, allDay: true, start: new Date(trip.start), end: new Date(moment(trip.start).add(trip.duration, 'days').format()), color:trip.color } })}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 700 }}
            eventPropGetter={eventStyleGetter}
        />
    );
  }