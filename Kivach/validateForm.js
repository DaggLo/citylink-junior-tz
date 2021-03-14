const render = (state) => {
  const modalTitle = document.querySelector('#loginModalLabel');
  const modalBody = document.querySelector('[data-modal-part="body"]');
  const { isFormValid, validationErrors } = state;
  modalBody.innerHTML = '';

  if (isFormValid) {
    modalTitle.textContent = 'Wellcome!';
  } else {
    modalTitle.textContent = 'Authentification failed!';
    const ulEl = document.createElement('UL');

    validationErrors.forEach(([, errorMessage]) => {
      const liEl = document.createElement('LI');
      liEl.textContent = errorMessage;
      ulEl.appendChild(liEl);
    });

    modalBody.appendChild(ulEl);
  }

  const onFormValidationEvent = new CustomEvent('formValidation');
  document.dispatchEvent(onFormValidationEvent);
};

(() => {
  const state = {
    isFormValid: false,
    validationErrors: [],
  };

  const formEl = document.querySelector('form');
  const usernameEl = document.querySelector('#usernameField');

  formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const username = data.get('username');
    const password = data.get('password');

    state.validationErrors = [];
    state.isFormValid = true;

    if (!(/[a-zA-Z]+/.test(username))) {
      const inputId = 'usernameField';
      const errorMessage = 'В поле Username можно использовать только буквы латинского алфавита.';
      state.validationErrors.push([inputId, errorMessage]);
      state.isFormValid = false;
    }

    if (!(/^\d{4}$/.test(password))) {
      const inputId = 'passwordField';
      const errorMessage = 'В поле Password могут быть только четыре цифры.';
      state.validationErrors.push([inputId, errorMessage]);
      state.isFormValid = false;
    }

    if (!state.isFormValid) {
      render(state);
      return;
    }

    if (username !== 'user' || password !== '0000') {
      const inputId = 'usernameField';
      const errorMessage = 'Неверное имя пользователя или пароль.';
      state.validationErrors.push([inputId, errorMessage]);
      state.isFormValid = false;
    }

    render(state);
  });

  const closeModalEls = document.querySelectorAll('button[data-bs-dismiss="modal"]');
  closeModalEls.forEach(
    (el) => el.addEventListener('click', () => {
      if (state.validationErrors.length === 0) {
        formEl.reset();
        usernameEl.focus();
        return;
      }

      const [inputId] = state.validationErrors[0];
      document.querySelector(`#${inputId}`).focus();
    }),
  );

  formEl.reset();
  usernameEl.focus();
})();
