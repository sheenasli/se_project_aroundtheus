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
import { validationSettings, selectors } from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

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
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "27d1bd70-108d-4f8b-b35a-2fb4fb8998a7",
    "Content-Type": "application/json",
  },
});

// api.removeCard().then((res) => console.log(res));

const selector = { popupSelector: selectors.previewPopup };
const cardPreviewPopup = new PopupWithImage(selector);
const userInfo = new UserInfo(".profile__title", ".profile__description");

api.getUserInfo().then((userData) => {
  console.log(userData);
  userInfo.setUserInfo(userData.name, userData.about);
});

const confirmDeleteModal = new PopupWithConfirmation(
  "#confirm-delete-modal",
  (id) => {
    api
      .removeCard(id)
      .then(() => {
        confirmDeleteModal.close();
      })
      .catch((error) => {
        console.error(error);
      });
  }
);

const renderCard = (card) => {
  const cardEl = new Card(
    {
      data: card,
      userID,
      handleImageClick: (imgData) => {
        cardPreviewPopup.open(imgData);
      },
      handleDeleteCardClick,
      handleCardLikeClick,
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
api.getInitialCards().then((cards) => {
  cardSection.renderItems(cards);
});

cardPreviewPopup.setEventListeners();
editPopup.setEventListeners();
addPopup.setEventListeners();
editFormValidator.enableValidation();
addFormValidator.enableValidation();

/*--------------------------------------------------*/
/*                      Functions                   */
/*--------------------------------------------------*/

function handleDeleteCardClick() {
  confirmDeleteModal.open();
  confirmDeleteModal.setSubmitAction(() => {
    const id = card.getId();
    api
      .removeCard(data._id)
      .then((res) => {
        card.handleDeleteCardClick();
      })
      .catch((err) => {
        console.error(err);
      });
  });
}

function handleCardLikeClick(cardID) {
  if (this._isLiked) {
    api.removeCardLike(cardId).then(() => {
      this.setLike(false);
    });
  } else {
    api.addCardLike(cardId).then(() => {
      this.setLike(true);
    });
  }
}

function handleProfileEditSubmit(obj) {
  api.updateProfileInfo(obj).then((res) => {
    const { name, about } = res;
    userInfo.setUserInfo(name, about);
    editPopup.close();
  });
  console.log(obj);
}

function handlePhotoAddSubmit(obj) {
  console.log(obj);
  api.addCard(obj).then((obj) => {
    const cardData = {
      title,
      url,
    };
    const cardEl = renderCard(cardData);
    cardSection.addItem(cardEl);
  });
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
