
const STORAGE_KEY = "BOOKSHELF_APPS";
const BOOK_ID = "id";

let books = [];
let bookForDelete = null;

const COMPLETE_LIST = document.querySelector("#completeList tbody");
const NOT_COMPLETE_LIST = document.querySelector("#notCompleteList tbody");

function isSupportStorage() {
  if (typeof Storage == undefined) {
    alert("Browser tidak support Web Storage!");
    return false;
  }

  return true;
}

function loadBooksFromStorage() {
  if (isSupportStorage) {
    const booksFromStorageJson = localStorage.getItem(STORAGE_KEY);
    let booksFromStorage = JSON.parse(booksFromStorageJson);
    if (booksFromStorage != null) {
      books = booksFromStorage;
    }
  }
  document.dispatchEvent(new Event("newdata"));
}

function updateBooksInStorage() {
  if (isSupportStorage) {
    const booksJson = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, booksJson);
  }
}

function createBookObject(title, author, year, isComplete) {
  return {
    id: +new Date(),
    title,
    author,
    year,
    isComplete,
  };
}

function getBook(id) {
  for (let book of books) {
    if (book[BOOK_ID] == id) {
      return book;
    }
  }
  return null;
}

function getBookIndex(id) {
  let index = 0;
  for (let book of books) {
    if (book[BOOK_ID] == id) {
      return index;
    }
    index++;
  }
  return -1;
}

function searchBooks(keyword) {
  let bookFound = [];
  for (let book of books) {
    if (book.title.toLowerCase().includes(keyword.toLowerCase())) {
      bookFound.push(book);
    }
  }

  return bookFound;
}
