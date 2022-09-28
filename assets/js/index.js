const form = document.forms.formContact;
const inputName = form.elements.userName;
const inputEmail = form.elements.userEmail;
const inputMensagge = form.elements.userMessagge;
const barsContainer = document.querySelector(".burguer-container");
const menuBars = document.querySelector(".icon-bars");
const menu = document.querySelector(".navbar");
const heroContact = document.querySelector(".hero__contact");
const btnMenu = document.querySelectorAll(".navbar__link");
const animationText = document.querySelector(".heading__animation");
const api = `user_wkxffu2ETbaLHyKAU`;
emailjs.init("wkxffu2ETbaLHyKAU");

const setSession = (element) => {
  return sessionStorage.setItem("token", element);
};
const getSession = () => {
  return sessionStorage.getItem("token");
};

menuBars.addEventListener("click", () => {
  menu.classList.toggle("show");
  if (menu.classList.contains("show")) {
    menu.classList.remove("hidden");
    menuBars.className = `fa-solid fa-xmark icon-bars`;
  } else {
    menu.classList.add("hidden");
    menuBars.className = `fa-solid fa-bars icon-bars`;
  }
});
btnMenu.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (menu.classList.contains("show")) {
      menu.classList.remove("show");
      menu.classList.add("hidden");
      menuBars.className = `fa-solid fa-bars icon-bars`;
    }
  });
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!allValid(inputName, inputEmail, inputMensagge)) {
    return (
      (lengthError(inputName),
      emptyError(inputName, inputEmail, inputMensagge)),
      mailError(inputEmail)
    );
  } else {
    validationAll(inputName, inputEmail, inputMensagge);
    const serviceId = `service_w7h0g8n`;
    const templateId = `template_uzd7cso`;
    if (getSession() !== null) {
      createAlert(
        "Ya has enviado un mensaje intenta más tarde ❌",
        heroContact
      );
    } else {
      // createAlert("Mensaje Enviado ✅", heroContact);
      createAlert(
        "Ya has enviado un mensaje intenta más tarde ❌",
        heroContact
      );
      // createAlert("Error, Intenta más tarde ❌", heroContact);

      // emailjs.sendForm(serviceId, templateId, form).then(
      //   function () {
      //     console.log("SUCCESS!");
      //     createAlert("Mensaje Enviado ✅", heroContact);
      //     setSession("already");
      //   },
      //   function (error) {
      //     createAlert("Error, Intenta más tarde ❌", heroContact);
      //   }
      // );
    }
    form.reset();
    resetInputs(inputName, inputEmail, inputMensagge);
  }
});

const allValid = (name, email, menssagge) => {
  return (
    notEmpty(name, email, menssagge) && allLengthValid(name) && mailValid(email)
  );
};

const notEmpty = (name, email, menssagge) => {
  return name.value !== "" && email.value !== "" && menssagge.value !== "";
};
const mailValid = (email) => {
  const regex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
  return regex.test(email.value);
};
const mailError = (email) => {
  const regex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
  if (regex.test(email.value) && email.value.length > 0) {
    return validateInput(email, findData(email));
  } else if (!regex.test(email.value) && email.value.length > 0) {
    return inputError(email, "Mail incorrecto", findData(email));
  }
};
const allLengthValid = (name) => inputLength(name, 3, 30);
const inputLength = (input, min, max) =>
  input.value.length >= min && input.value.length < max;

const emptyError = (name, mail, mensagge) => {
  const validateEmpty = (input) => {
    if (input.value === "") {
      inputError(input, "Complete el campo", findData(input));
    } else {
      return validateInput(input, findData(input));
    }
  };
  validateEmpty(name);
  validateEmpty(mail);
  validateEmpty(mensagge);
};
const lengthError = (name) => {
  const higherMin = (input, mensagge, min, data) => {
    if (!(input.value.length >= min)) {
      return inputError(input, mensagge, data);
    } else {
      return validateInput(input, data);
    }
  };
  const minorMax = (input, mensagge, max, data) => {
    if (!(input.value.length <= max)) {
      return inputError(input, mensagge, data);
    }
  };
  higherMin(
    name,
    "El nombre debe tener minimo 4 caracteres",
    3,
    findData(name)
  );

  minorMax(
    name,
    "El nombre debe tener menos de 30 caracteres",
    30,
    findData(name)
  );
};
const validateInput = (input, data) => {
  const inputSpan = searchSpan(input, data);
  inputSpan.innerHTML = "";
  input.classList.remove("form__error-validationInput");
  input.classList.add("form__validate");
};
function inputError(input, mensaje, data) {
  const inputSpan = searchSpan(input, data);
  inputSpan.innerHTML = `<i class="fa-solid fa-circle-xmark icon__error"></i> ${mensaje}`;
  input.classList.add("form__error-validationInput");
}

const searchSpan = (input, data) => {
  let formElements = input.parentNode.childNodes;
  let formSpans = [...formElements].filter((e) => e.tagName == "SPAN");
  let spanInput = formSpans.find(
    (span) => span.getAttribute("data-input") === data
  );
  return spanInput;
};
const findData = (input) => {
  return input.getAttribute("data-input");
};
const createAlert = (menssage, element) => {
  const div = document.createElement("div");
  div.innerHTML = ` <div class="cardAlert"><span class="spanAlert">${menssage}</span></div>`;
  div.classList.add("articleCard");
  element.appendChild(div);
  setTimeout(() => div.remove(), 2000);
};

const validationAll = (name, email, menssage) => {
  const inputs = [name, email, menssage];
  const datas = [findData(name), findData(email), findData(menssage)];
  inputs.forEach((input) => {
    datas.forEach((data) => {
      validateInput(input, data);
    });
  });
};

const resetInputs = (name, email, menssage) => {
  const inputs = [name, email, menssage];
  inputs.forEach((input) => {
    input.classList.remove("form__validate");
  });
};
