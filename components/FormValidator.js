class FormValidator {
  constructor(options, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._form = formElement;
  }

  _showInputError(inputEl, errorMessage) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(errorClass);
  }

  //what to do with parameters and elements?
  _toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
    if (hasInvalidInput(inputEls)) {
      submitButton.classList.add(inactiveButtonClass);
      submitButton.disabled = true;
      return;
    }
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  }

  _hasInvalidInput(inputList) {
    return !inputList.every((inputEl) => inputEl.validity.valid);
  }

  _checkInputValidity(formEl, inputEl, options) {
    if (!inputEl.validity.valid) {
      return showInputError(formEl, inputEl, options);
    }
    hideInputError(formEl, inputEl, options);

    _setEventListeners();
    this._inputEls = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._submitButton = this._form.querySelector(this._submitButtonSelector);

    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        checkInputValidity(this._form, inputEl, options);
        toggleButtonState(this._inputEls, this._submitButton, options);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(formElement, options);
  }
}

export default FormValidator;
