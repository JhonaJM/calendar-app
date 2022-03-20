import React, { useState } from 'react';
import  {useDispatch,useSelector} from 'react-redux';
import {Calendar,momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import { NavBar } from '../ui/NavBar';
import { messages } from '../../helpers/calendar-messages-es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { CalendarEvents } from './CalendarEvents';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive } from '../../actions/events';
import { AddNewButton } from '../ui/AddNewButton';
import { DeleteEventButton } from '../ui/DeleteEventButton';
moment.locale('es');
const localizer = momentLocalizer(moment); 

export const CalendarScreen = () => {
    const dispatch = useDispatch();
    const [lastView, setlastView] = useState(localStorage.getItem('lastView' )|| 'month');
    const {events,activeEvent} = useSelector(state=> state.calendar);    

    const onDobleClick = (e)=>{
      
        dispatch(uiOpenModal());
    }

    const onSelectEvent = (e)=>{
        dispatch(eventSetActive(e));
        //dispatch(uiOpenModal());
    }

    const onViewChange = (e) =>{
        setlastView(e);
        localStorage.setItem('lastView',e);
    }
    const onSelectSlot = (e)=>{
        dispatch(eventClearActiveEvent());
    }

    const eventStyleGetter = (event,start,end,isSelected) =>{
        //console.log(event,start,end,isSelected);
        const style ={
            backgroundColor : '#367CF7',
            borderRadius : '0px',
            opacity:0.8,
            display :'block',    
            color:'white'        
        }

        return{
            style
        }
    }

    return (
        <div>
            <NavBar/>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="finish"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={onDobleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                selectable={true}
                onSelectSlot={onSelectSlot}
                view={lastView}
                components={{event:CalendarEvents}}
                />

            <AddNewButton/>
            {
                (activeEvent)&& <DeleteEventButton/>
            }
            
            <CalendarModal/>


        </div>
    )
}
