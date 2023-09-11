function InfoTooltip({ image, isOpen, onOverlayClose, title, onClose }) {
    return (
      <div className={`popup ${isOpen ? 'popup_opened' : ''}`} onClick={onOverlayClose}>
        <div className="popup__info">
          <img className="popup__status" src={image} alt={title}/>
          <h2 className="popup__message">{title}</h2>
          <button className="popup__close-icon" type="button" title="Закрыть" onClick={onClose}/>
        </div>
      </div>
    );
  }
  
  export default InfoTooltip;