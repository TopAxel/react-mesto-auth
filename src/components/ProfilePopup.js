import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
// компонент профиль
function ProfilePopup({ isOpen, onClose, onUpdateUser, onOverlayClose }) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  // эффекты
  React.useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.name || '');
      setDescription(currentUser.about || '');
    }
  }, [isOpen, currentUser]);

  // обработчики
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  };


  // разметка
  return (
    <PopupWithForm title="Редактировать профиль" name="profile" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} buttonText={'Сохранить'} onOverlayClose={onOverlayClose}>
      <input className="form__field" type="text" id="name" name="name" placeholder="Имя" minLength="2" maxLength="40" required value={name} onChange={handleNameChange} />
      <span className="form__field-error" id="name-error"></span>
      <input className="form__field" type="text" id="job" name="about" placeholder="Профессия" minLength="2" maxLength="200" required value={description} onChange={handleDescriptionChange} />
      <span className="form__field-error" id="job-error"></span>
    </PopupWithForm>
  );
}

export default ProfilePopup;