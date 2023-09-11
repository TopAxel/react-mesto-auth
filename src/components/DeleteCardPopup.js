import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function DeleteCardPopup() {

    return (
        <PopupWithForm title="Вы уверены?" name="delete-card" buttonText={'Да'}>

        </PopupWithForm>
    );
}

export default DeleteCardPopup;