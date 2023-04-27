import React from 'react';

function ImagePopup(props) {
    return (
       <div className={`popap popap_typy_photo" ${props.card ? 'popap_opened' : ''}`} onClick={props.onCloseClick}>
       <div className="popap__photo-conteiner">
         <img className="popap__photo" src={props.card?.link} alt={props.card?.name}/> 
         <h2 className="popap__photo-name">{props.card?.name}</h2> 
         <button className="popap__button-close" type="button" title="Закрыть" onClick={props.onClose}/>
       </div>
     </div>
    );
  }
  
  export default ImagePopup;