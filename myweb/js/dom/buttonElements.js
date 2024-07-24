
function createButtonElements({ content, cssClass, clickEventListener }) {
  const button = document.createElement("button");
  button.innerHTML = content;

  button.addEventListener("click", clickEventListener);

  if (typeof cssClass != "object") {
    button.classList.add(cssClass);
    return button;
  }

  for (let css of cssClass) {
    button.classList.add(css);
  }

  return button;
}
