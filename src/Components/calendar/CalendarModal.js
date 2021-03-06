import React, { useState,useEffect } from 'react';
import  {useSelector,useDispatch} from 'react-redux';
import Modal from 'react-modal';
import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2';
import { uiCloseModal } from '../../actions/ui';
import { eventAddNew, eventClearActiveEvent, eventUpdated } from '../../actions/events';
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  Modal.setAppElement('#root');
  const now = moment().minutes(0).seconds(0).add(1,'hour');
  const end = now.clone().add(1,'hour');//moment().minutes(0).seconds(0).add(2,'hour');

  const initEvent = {
    title: '',
    notes:'',
    start :now.toDate(),
    finish:end.toDate()
  }


export const CalendarModal = () => {

  const {modalOpen} = useSelector(state=> state.ui);
  const {activeEvent} = useSelector(state=> state.calendar);
  
  const dispatch = useDispatch();

    //const [isOpen, setIsOpen] = useState(true);
    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(end.toDate());
    const [titleValid, setTitleValid] = useState(true);

    const [formValues, setFormValues] = useState(initEvent);

    const {title,notes,start,finish} = formValues;

    useEffect(() => {
      console.log(activeEvent);
      if(activeEvent)
      {
        setFormValues(activeEvent);
      }else{
        setFormValues(initEvent)
      }
    }, [activeEvent,setFormValues]);
    
    
    const handleInputChange = ({target}) =>{
      setFormValues({
        ...formValues,
        [target.name]:target.value
      });
    }

    const closeModal  = ()=>{
      //tudu para cerrar modal
      dispatch(uiCloseModal());
      dispatch(eventClearActiveEvent());
      setFormValues(initEvent);

    }

    const handleStartDateChange = (e)=>{
      setDateStart(e);
      setFormValues({
        ...formValues,
        start:e
      });
    }

    const handleEndDateChange = (e)=>{
      setDateEnd(e);
      setFormValues({
        ...formValues,
        finish:e
      });
    }

    const handleSubmitForm = (e) =>{
      e.preventDefault();

      const momentStart= moment(start);
      const momentEnd= moment(finish);    
      if(momentStart.isSameOrAfter(momentEnd)){
        
        return Swal.fire('Error','la fecha final debe ser mayor a la fecha inicial');
      }

      if(title.trim().length<2)
      {
        setTitleValid(false);
      }
      

      if(activeEvent){
        dispatch(eventUpdated(formValues))
      }else{
        dispatch(eventAddNew(
          {
            ...formValues,
            id:new Date().getTime(),
            user : {
              _id:123,
              name:'Jhona'
            }
          }));
      }

      //tudu para
      //reliazar grabacion en base de datos
      setTitleValid(true);
      closeModal();

    }
  return (
    <Modal
        isOpen={modalOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        //contentLabel="Example Modal"
        closeTimeoutMS={200}
        className="modal"
        overlayClassName="modal-fondo"
      >
          <h1> {(activeEvent) ? 'Editando Evento' : 'Nuevo Evento'} </h1>
        <hr />
        <form className="container" onSubmit={handleSubmitForm}>

            <div className="form-group">
                <label>Fecha y hora inicio</label>
                <DateTimePicker
                  onChange={handleStartDateChange}

                  value={dateStart}
                  className="form-control"
                />
            </div>

            <div className="form-group">
                <label>Fecha y hora fin</label>
                <DateTimePicker
                  onChange={handleEndDateChange}
                  value={dateEnd}
                  minDate={dateStart}
                  className="form-control"
                />
            </div>

            <hr />
            <div className="form-group">
                <label>Titulo y notas</label>
                <input 
                    type="text" 
                    className={`form-control ${!titleValid && 'is-invalid'}`}
                    placeholder="T??tulo del evento"
                    name="title"
                    autoComplete="off"
                    value={title}
                    onChange={handleInputChange}
                />
                <small id="emailHelp" className="form-text text-muted">Una descripci??n corta</small>
            </div>

            <div className="form-group">
                <textarea 
                    type="text" 
                    className="form-control"
                    placeholder="Notas"
                    rows="5"
                    name="notes"
                    value={notes}
                    onChange={handleInputChange}
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">Informaci??n adicional</small>
            </div>

            <button
                type="submit"
                className="btn btn-outline-primary btn-block"
            >
                <i className="far fa-save"></i>
                <span> Guardar</span>
            </button>

        </form>

    </Modal>
  );
};
