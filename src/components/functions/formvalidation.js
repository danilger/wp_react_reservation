export let formvalidation = (name, phone) => {
  let error = [];

  if (!(name.value.length >= 2) || /[0-9()+-\s]/.test(name.value)) {
    error.push(0);
  }

  if (
    /[^0-9()+-\s]/.test(phone.value) ||
    phone.value.replace(/\D/g, "").length !== 11
  ) {
    error.push(1);
  }

  if (!error.length) {
    error = false;
  } else {
    error.forEach((e) => {
      switch (e) {
        case 0:
          name.classList.add("border-danger");
          setTimeout(() => name.classList.remove("border-danger"), 3000);
          break;
        case 1:
          phone.classList.add("border-danger");
          setTimeout(() => phone.classList.remove("border-danger"), 3000);
          break;
        default:
          break;
      }
    });
  }

  return error;
};
