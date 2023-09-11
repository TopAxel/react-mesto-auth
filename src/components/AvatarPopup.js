import React from 'react';
import PopupWithForm from './PopupWithForm.js';
// компонент аватар
function AvatarPopup({ isOpen, onClose, onUpdateAvatar, onOverlayClose }) {
    const avatarRef = React.useRef();
    // обработчики
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        },
        );
    }
    // эффекты
    React.useEffect(() => {
        avatarRef.current.value = '';
    }, [isOpen]);

    // разметка
    return (
        <PopupWithForm title="Обновить аватар" name="avatar" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} buttonText={'Сохранить'} onOverlayClose={onOverlayClose}>
            <input ref={avatarRef} className="form__field" type="url" id="avatar" name="avatar"
                placeholder="Введите ссылку на аватар" minLength="2" maxLength="200" required />
            <span className="form__field-error" id="avatar-error"></span>
        </PopupWithForm>
    );
}

export default AvatarPopup;