
function loadBooks(booksData) {
  COMPLETE_LIST.innerHTML = "";
  NOT_COMPLETE_LIST.innerHTML = "";

  for (let book of booksData) {
    const bookElements = createBookElements(
      book.title,
      book.author,
      book.year,
      book.isComplete
    );
    bookElements[BOOK_ID] = book[BOOK_ID];

    if (book.isComplete) {
      COMPLETE_LIST.append(bookElements);
    } else {
      NOT_COMPLETE_LIST.append(bookElements);
    }
  }
}

function createBookElements(bookTitle, bookAuthor, bookYear, isComplete) {
  const container = document.createElement("tr");
  const title = document.createElement("td");
  const author = document.createElement("td");
  const year = document.createElement("td");
  const buttonContainer = document.createElement("td");
  const bookshelfAction = document.createElement("div");

  title.innerText = bookTitle;
  author.innerText = bookAuthor;
  year.innerText = bookYear;
  bookshelfAction.classList.add("bookshelf__action");

  if (isComplete) {
    bookshelfAction.append(
      createCompleteBookButton(),
      createDeleteBookButton()
    );
  } else {
    bookshelfAction.append(
      createNotCompleteBookButton(),
      createDeleteBookButton()
    );
  }

  buttonContainer.append(bookshelfAction);
  container.append(title, author, year, buttonContainer);

  return container;
}

function createCompleteBookButton() {
  return createButtonElements({
    content: '<i class="fas fa-check-circle"></i>',
    cssClass: "button",
    clickEventListener: (event) => {
      moveBook(event.target.parentElement.parentElement.parentElement, false);
    },
  });
}

function createNotCompleteBookButton() {
  return createButtonElements({
    content: '<i class="far fa-circle"></i>',
    cssClass: "button",
    clickEventListener: (event) => {
      moveBook(event.target.parentElement.parentElement.parentElement, true);
    },
  });
}

function createDeleteBookButton() {
  return createButtonElements({
    content: '<i class="fas fa-trash"></i>',
    cssClass: "button",
    clickEventListener: (event) => {
      deleteBookConfirmation(
        event.target.parentElement.parentElement.parentElement
      );
    },
  });
}

function moveBook(elements, toComplete) {
  elements = elements.parentElement;
  const childBookElements = elements.querySelectorAll("td");
  const title = childBookElements[0].innerText;
  const author = childBookElements[1].innerText;
  const year = childBookElements[2].innerText;

  const book = getBook(elements[BOOK_ID]);
  book.isComplete = toComplete;
  updateBooksInStorage();

  const bookElements = createBookElements(title, author, year, toComplete);
  bookElements[BOOK_ID] = book[BOOK_ID];

  if (toComplete) {
    COMPLETE_LIST.append(bookElements);
  } else {
    NOT_COMPLETE_LIST.append(bookElements);
  }

  elements.classList.add("fade");
  setTimeout(() => {
    elements.remove();
  }, 125);
}

function deleteBookConfirmation(elements) {
  bookForDelete = elements.parentElement;

  const modal = createConfirmationElements({
    headerText: "Delete Book",
    bodyText: "Sure you want to delete the book?",
    confirmButton: createConfirmDeleteBookButton(elements.parentElement),
    cancelButton: createCancelDeleteBookButton(),
  });

  document.body.append(modal);
  showConfirmationElements(modal);
}

function createConfirmDeleteBookButton(elements) {
  return createButtonElements({
    content: "Delete",
    cssClass: ["button", "button--blue", "modal__confirm"],
    clickEventListener: () => {
      deleteBook(elements);
      elements.remove();
      bookForDelete = null;
      deleteConfirmationElements();
    },
  });
}

function createCancelDeleteBookButton() {
  return createButtonElements({
    content: "Cancel",
    cssClass: ["button", "button--red", "modal__cancel"],
    clickEventListener: () => {
      bookForDelete = null;
      deleteConfirmationElements();
    },
  });
}

function deleteBook(elements) {
  const bookIndex = getBookIndex(elements[BOOK_ID]);
  books.splice(bookIndex, 1);
  updateBooksInStorage();
}
