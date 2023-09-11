import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

// компонент карточек
function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`element__like-icon ${isLiked ? 'element__like-icon_active' : ''}`);

  // обработчики
  const handleDeleteClick = () => {
    onCardDelete(card)
  };

  const handleLikeClick = () => {
    onCardLike(card)
  };

  const handleClick = () => {
    onCardClick(card);
  };

  // разметка
  return (
    <li className="element__card">
      {isOwn && (
        <button className='element__delete-icon' type="button" aria-label="удалить" onClick={handleDeleteClick}></button>)}
      <img className="element__photo" src={card.link} alt={card.name} onClick={handleClick} />
      <h2 className="element__title">{card.name}</h2>
      <ul className="element__like-box">
        <button className={cardLikeButtonClassName} type="button" aria-label="нравится" onClick={handleLikeClick}></button>
        <span className="element__like-counter">{card.likes.length}</span>
      </ul>
    </li>
  );
}

export default Card;

