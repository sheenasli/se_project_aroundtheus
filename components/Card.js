const imageModal = document.querySelector("#image-popup");
const modalImageEl = imageModal.querySelector(".modal__image");
const modalCaption = imageModal.querySelector(".modal__caption");

const closePopup = (modal) => {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
};

const handleEscape = (e) => {
  if (e.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    closePopup(modal);
  }
};

class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .queryselector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._cardElement.querySelector(
      ".card__image"
    ).style.backgroundImage = `url(${this._link})`;
    this._cardElement.querySelector(".card_title").textContent = this._name;
    this._setEventListeners();
  }

  _setEventListeners() {
    //".card__like-button"
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => this._handleLikeIcon());

    //".card__delete-button"
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => this._handleDeleteCard());

    //"#image-popup"
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => this._handlePreviewPicture());
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

  //fix this
  _handlePreviewPicture(cardData) {
    modalImageEl.src = cardData.link;
    imageModal.alt = cardData.name;
    modalCaption.textContent = cardData.name;
    openPopup(imageModal);
  }
}

export default Card;
