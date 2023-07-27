import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {
  handleEscape,
  closePopup,
  openPopup,
  handlePopupClose,
} from "../utils/utils.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

const card = new Card(cardData, "#card-template");
card.getView();

/*--------------------------------------------------*/
/*                      Elements                    */
/*--------------------------------------------------*/

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const imageModal = document.querySelector("#image-popup");
const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const imageModalCloseButton = imageModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-decription-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const addNewCardButton = document.querySelector(".profile__add-button");
const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
const cardUrlInput = addCardFormElement.querySelector(".modal__input_type_url");
const modalImageEl = imageModal.querySelector(".modal__image");
const modalCaption = imageModal.querySelector(".modal__caption");

const cardSelector = "#card-template";

/*--------------------------------------------------*/
/*                      Functions                   */
/*--------------------------------------------------*/

function renderCard(cardData, wrapper) {
  const card = new Card(cardData, cardSelector);
  wrapper.prepend(card.getView());
}

function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function openEditProfileModal() {
  fillProfileForm();
  openPopup(profileEditModal);
}

/*--------------------------------------------------*/
/*                 Event Handlers                   */
/*--------------------------------------------------*/

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
profileEditButton.addEventListener("click", openEditProfileModal);

profileEditCloseButton.addEventListener("click", () =>
  closePopup(profileEditModal)
);

//add new card button
addNewCardButton.addEventListener("click", () => openPopup(addCardModal));
addCardModalCloseButton.addEventListener("click", () =>
  closePopup(addCardModal)
);

imageModalCloseButton.addEventListener("click", () => closePopup(imageModal));

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

addCardFormElement.addEventListener("submit", handleAddCardSubmit);

//close modal with esc key and mouse-click on background

[profileEditModal, addCardModal, imageModal].forEach((modalElement) => {
  modalElement.addEventListener("click", handlePopupClose);
});

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  addCardFormElement.reset();
  //toggleButtonState(inputEls, submitButton, options);//
  const cardFormSubmitButton =
    addCardFormElement.querySelector(".modal__button");
  toggleButtonState(
    [cardTitleInput, cardUrlInput],
    cardFormSubmitButton,
    config
  );
  closePopup(addCardModal);
}

const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormElement = profileEditModal.querySelector(".modal__form");
const addFormElement = addCardModal.querySelector(".modal__form");

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addFormValidator = new FormValidator(validationSettings, addCardModal);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

// function getCardElement(cardData) {
//   const cardElement = cardTemplate.cloneNode(true);
//   const cardImageEl = cardElement.querySelector(".card__image");
//   const cardTitleEl = cardElement.querySelector(".card__title");
//   const likeButton = cardElement.querySelector(".card__like-button");
//   const deleteButton = cardElement.querySelector(".card__delete-button");

//deleteButton.addEventListener("click", () => {
//  cardElement.remove();
//});

// const imageModal = document.querySelector("#image-popup");
// const modalImageEl = imageModal.querySelector(".modal__image");
// const modalCaption = imageModal.querySelector(".modal__caption");

// cardImageEl.addEventListener("click", () => {
//   modalImageEl.src = cardData.link;
//   imageModal.alt = cardData.name;
//   modalCaption.textContent = cardData.name;
//   openPopup(imageModal);
// });

//likeButton.addEventListener("click", () => {
//  likeButton.classList.toggle("card__like-button_active");
//});

// cardImageEl.src = cardData.link;
// cardImageEl.alt = cardData.name;
// cardTitleEl.textContent = cardData.name;

//   return cardElement;
// }

/*--------------------------------------------------*/
/*                 Event Listeners                  */
/*--------------------------------------------------*/

// enabling validation by calling enableValidation()
// pass all the settings on call

function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  // const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  // inputEl.classList.add(inputErrorClass);
  // errorMessageEl.textContent = inputEl.validationMessage;
  // errorMessageEl.classList.add(errorClass);
}

// function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
//   const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
//   inputEl.classList.remove(inputErrorClass);
//   errorMessageEl.textContent = "";
//   errorMessageEl.classList.remove(errorClass);
// }

// function checkInputValidity(formEl, inputEl, options) {
//   if (!inputEl.validity.valid) {
//     return showInputError(formEl, inputEl, options);
//   }
//   hideInputError(formEl, inputEl, options);
// }

// function hasInvalidInput(inputList) {
//   return !inputList.every((inputEl) => inputEl.validity.valid);
// }

// function toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
//   if (hasInvalidInput(inputEls)) {
//     submitButton.classList.add(inactiveButtonClass);
//     submitButton.disabled = true;
//     return;
//   }

//   submitButton.classList.remove(inactiveButtonClass);
//   submitButton.disabled = false;
// }

// function setEventListeners(formEl, options) {
//   const { inputSelector } = options;
// const inputEls = Array.from(formEl.querySelectorAll(inputSelector));
// const submitButton = formEl.querySelector(options.submitButtonSelector);

// inputEls.forEach((inputEl) => {
//   inputEl.addEventListener("input", (e) => {
//     checkInputValidity(formEl, inputEl, options);
//     toggleButtonState(inputEls, submitButton, options);
//   });
// });
// }

function enableValidation(options) {
  const formEls = Array.from(document.querySelectorAll(options.formSelector));
  formEls.forEach((formEl) => {
    // formEl.addEventListener("submit", (e) => {
    //   e.preventDefault();
    // });
    // setEventListeners(formEl, options);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
