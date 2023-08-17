import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import {
  handleEscape,
  closePopup,
  openPopup,
  handlePopupClose,
  validationSettings,
} from "../utils/utils.js";
import { initialCards, selectors } from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

/*--------------------------------------------------*/
/*                      Elements                    */
/*--------------------------------------------------*/

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
// const addCardFormElement = addCardModal.querySelector(".modal__form");
const imageModal = document.querySelector("#image-popup");
// const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
// const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
// const imageModalCloseButton = imageModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-decription-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
// const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const addNewCardButton = document.querySelector(".profile__add-button");
// const cardTitleInput = addCardFormElement.querySelector(
//   ".modal__input_type_title"
// );
// const cardUrlInput = addCardFormElement.querySelector(".modal__input_type_url");
// const modalImageEl = imageModal.querySelector(".modal__image");
// const modalCaption = imageModal.querySelector(".modal__caption");
// const cardSelector = "#card-template";

// Instances of the Classes
const selector = { popupSelector: selectors.previewPopup };
const CardPreviewPopup = new PopupWithImage(selector);
const SubmitProfileInfo = new UserInfo(
  ".profile__title",
  ".profile__description"
);

const CardSection = new Section(
  {
    renderer: (item) => {
      const cardEl = new Card(
        {
          data: item,
          handleImageClick: (imgData) => {
            CardPreviewPopup.open(imgData);
          },
        },
        selectors.cardTemplate
      );
      CardSection.addItems(cardEl.getView());
    },
  },
  selectors.cardSection
);

const editPopup = new PopupWithForm("#profile-edit-modal", (obj) => {
  handleProfileEditSubmit(obj);
});

const addPopup = new PopupWithForm("#add-card-modal", (obj) => {
  handlePhotoAddSubmit(obj);
});

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addFormValidator = new FormValidator(validationSettings, addCardModal);

//Initialize all instances
CardSection.renderItems(initialCards);
CardPreviewPopup.setEventListeners();
editPopup.setEventListeners();
addPopup.setEventListeners();
editFormValidator.enableValidation();
addFormValidator.enableValidation();

/*--------------------------------------------------*/
/*                      Functions                   */
/*--------------------------------------------------*/

function handleProfileEditSubmit(obj) {
  const { title, description } = obj;
  SubmitProfileInfo.setUserInfo(title, description);
  editPopup.close();
}

function handlePhotoAddSubmit(obj) {
  const cardData = {
    name: obj.title,
    link: obj.url,
  };
  const cardEl = new Card(
    {
      data: cardData,
      handleImageClick: (imgData) => {
        CardPreviewPopup.open(imgData);
      },
    },
    selectors.cardTemplate
  );
  CardSection.addItems(cardEl.getView());
}

function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function openEditProfileModal() {
  fillProfileForm();
  editPopup.open();
}

/*--------------------------------------------------*/
/*                 Event Handlers                   */
/*--------------------------------------------------*/

// function handleProfileEditSubmit(e) {
//   e.preventDefault();
//   profileTitle.textContent = profileTitleInput.value;
//   profileDescription.textContent = profileDescriptionInput.value;
//   closePopup(profileEditModal);
// }

// profileEditForm.addEventListener("submit", handleProfileEditSubmit);
profileEditButton.addEventListener("click", openEditProfileModal);

// profileEditCloseButton.addEventListener("click", () =>
//   closePopup(profileEditModal)
// );

//add new card button
addNewCardButton.addEventListener("click", () => openPopup(addCardModal));
// addCardModalCloseButton.addEventListener("click", () =>
//   closePopup(addCardModal)
// );

// imageModalCloseButton.addEventListener("click", () => closePopup(imageModal));

// initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

// addCardFormElement.addEventListener("submit", handleAddCardSubmit);

//close modal with esc key and mouse-click on background
// [profileEditModal, addCardModal, imageModal].forEach((modalElement) => {
//   modalElement.addEventListener("click", handlePopupClose);
// });

// function handleAddCardSubmit(e) {
//   e.preventDefault();
//   const name = cardTitleInput.value;
//   const link = cardUrlInput.value;
//   renderCard({ name, link }, cardListEl);
//   addCardFormElement.reset();
//   const cardFormSubmitButton =
//     addCardFormElement.querySelector(".modal__button");
//   addFormValidator.toggleButtonState();
//   closePopup(addCardModal);
// }

// const editFormElement = profileEditModal.querySelector(".modal__form");
// const addFormElement = addCardModal.querySelector(".modal__form");
