import React from 'react';
import  {useDispatch} from 'react-redux';
import { eventDeleted } from '../../actions/events';
export const DeleteEventButton = () => {
    
    const dispatch = useDispatch();
    
    const handleDeleteEvent = ()=>{
        dispatch(eventDeleted());
    }

  return (
  <button 
    className='btn btn-danger fab-danger'
    onClick={handleDeleteEvent}
    >
        <i className='fas fa-trash'></i>
        <span> Borrar Evento </span>

  </button>);
};
