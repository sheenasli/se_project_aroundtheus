import { handleEscape, closePopup, openPopup } from "../utils/utils.js";

const imageModal = document.querySelector("#image-popup");
const modalImageEl = imageModal.querySelector(".modal__image");
const modalCaption = imageModal.querySelector(".modal__caption");
const cardCaption = document.querySelector(".card__title");

export default class Card {
  constructor({ data, handleImageClick }, cardSelector) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardCaption = this._cardElement.querySelector(".card__title");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._cardCaption.textContent = this._name;
    this._setEventListeners();
    return this._cardElement;
  }

  _setEventListeners() {
    //".card__like-button"
    this._likeButton.addEventListener("click", () => this._handleLikeIcon());

    //".card__delete-button"
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => this._handleDeleteCard());

    //"#image-popup"
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () =>
        this._handleImageClick({ link: this._link, text: this._name })
      );
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  // _handlePreviewPicture(cardData) {
  //   modalImageEl.src = this._link;
  //   imageModal.alt = this._name;
  //   modalCaption.textContent = this._name;
  //   openPopup(imageModal);
  // }
}
