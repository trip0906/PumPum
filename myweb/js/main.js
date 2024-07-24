document.addEventListener("newdata", () => {
  loadBooks(books);
});

window.addEventListener("load", () => {
  if (isSupportStorage) {
    loadBooksFromStorage();
  }

  document.querySelector(".form").addEventListener("submit", (event) => {
    event.preventDefault();
    addBook();
  });

  const searchInput = document.getElementById("search");
  searchInput.parentElement.addEventListener("submit", (event) => {
    event.preventDefault();
  });
  searchInput.addEventListener("input", () => {
    let keyword = searchInput.value;
    const bookFound = searchBooks(keyword);
    loadBooks(bookFound);
  });

  const resetBookshelfButton = document.querySelector(".bookshelf__reset");
  resetBookshelfButton.addEventListener("click", () => {
    resetBookshelfConfirmation();
  });
});
