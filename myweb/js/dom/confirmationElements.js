
function createConfirmationElements({
  headerText,
  bodyText,
  confirmButton,
  cancelButton,
}) {
  const container = document.createElement("div");
  const modal = document.createElement("div");
  const header = document.createElement("header");
  const body = document.createElement("div");
  const footer = document.createElement("footer");

  container.classList.add("confirmation", "fade");
  modal.classList.add("modal");
  header.classList.add("modal__header");
  body.classList.add("modal__body");
  footer.classList.add("modal__footer");

  header.innerHTML = "<h4>" + headerText + "</h4>";
  body.innerHTML = "<p>" + bodyText + "</p>";
  footer.append(cancelButton, confirmButton);

  modal.append(header, body, footer);
  container.append(modal);

  return container;
}

function showConfirmationElements(modal) {
  setTimeout(() => {
    modal.classList.remove("fade");
  }, 125);
}

function deleteConfirmationElements() {
  const modal = document.querySelector(".confirmation");
  modal.classList.add("fade");
  setTimeout(() => {
    modal.remove();
  }, 125);
}
