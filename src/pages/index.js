import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import {
  handleEscape,
  closePopup,
  openPopup,
  handlePopupClose,
} from "../utils/utils.js";
import {
  initialCards,
  validationSettings,
  selectors,
} from "../utils/constants.js";
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
const imageModal = document.querySelector("#image-popup");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-decription-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const addNewCardButton = document.querySelector(".profile__add-button");

// Instances of the Classes
const selector = { popupSelector: selectors.previewPopup };
const cardPreviewPopup = new PopupWithImage(selector);
const userInfo = new UserInfo(".profile__title", ".profile__description");

const renderCard = (card) => {
  const cardEl = new Card(
    {
      data: card,
      handleImageClick: (imgData) => {
        cardPreviewPopup.open(imgData);
      },
    },
    selectors.cardTemplate
  );
  return cardEl.getView();
};

const cardSection = new Section(
  {
    renderer: (item) => {
      const cardEl = renderCard(item);
      cardSection.addItem(cardEl);
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
cardSection.renderItems(initialCards);
cardPreviewPopup.setEventListeners();
editPopup.setEventListeners();
addPopup.setEventListeners();
editFormValidator.enableValidation();
addFormValidator.enableValidation();

/*--------------------------------------------------*/
/*                      Functions                   */
/*--------------------------------------------------*/

function handleProfileEditSubmit(obj) {
  const { title, description } = obj;
  userInfo.setUserInfo(title, description);
  editPopup.close();
}

function handlePhotoAddSubmit(obj) {
  const cardData = {
    name: obj.title,
    link: obj.url,
  };
  const cardEl = renderCard(cardData);
  cardSection.addItem(cardEl);
}

function fillProfileForm() {
  const { name, description } = userInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = description;
}

function openEditProfileModal() {
  fillProfileForm();
  editPopup.open();
}

/*--------------------------------------------------*/
/*                 Event Handlers                   */
/*--------------------------------------------------*/
profileEditButton.addEventListener("click", openEditProfileModal);

addNewCardButton.addEventListener("click", () => {
  addFormValidator.toggleButtonState();
  addPopup.open();
});
