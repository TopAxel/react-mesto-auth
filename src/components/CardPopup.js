import React from 'react';
import PopupWithForm from './PopupWithForm.js';

// компонент добавление карточки 
function CardPopup({ isOpen, onClose, onAddPlace, onOverlayClose }) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    // обработчики 
    function handleAddName(e) {
        setName(e.target.value);
    }

    function handleAddLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({ name, link });
    }

    // эффекты 
    React.useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    // разметка
    return (
        <PopupWithForm title="Новое место" name="card" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} buttonText={'Создать'} onOverlayClose={onOverlayClose}>
            <input className="form__field" type="text" id="new-place" name="name" placeholder="Название"
                minLength="2" maxLength="30" required value={name} onChange={handleAddName} />
            <span className="form__field-error" id="new-place-error"></span>
            <input className="form__field" type="url" id="new-photo" name="link"
                placeholder="Ссылка на картинку" required value={link} onChange={handleAddLink} />
            <span className="form__field-error" id="new-photo-error"></span>
        </PopupWithForm>
    );
}

export default CardPopup;