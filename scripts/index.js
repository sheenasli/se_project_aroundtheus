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

/*--------------------------------------------------*/
/*                      Functions                   */
/*--------------------------------------------------*/

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
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

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  const imageModal = document.querySelector("#image-popup");
  const modalImageEl = imageModal.querySelector(".modal__image");
  const modalCaption = imageModal.querySelector(".modal__caption");

  cardImageEl.addEventListener("click", () => {
    modalImageEl.src = cardData.link;
    imageModal.alt = cardData.name;
    modalCaption.textContent = cardData.name;
    openPopup(imageModal);
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;

  return cardElement;
}

/*--------------------------------------------------*/
/*                 Event Listeners                  */
/*--------------------------------------------------*/

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
function handleEscape(e) {
  if (e.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    closePopup(modal);
  }
}

[profileEditModal, addCardModal, imageModal].forEach((modalElement) => {
  modalElement.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("modal") ||
      e.target.classList.contains("modal__close")
    ) {
      closePopup(modalElement);
    }
  });
});
