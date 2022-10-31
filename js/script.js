const addButton = document.querySelector(".add-book-btn");
const main = document.querySelector(".main");
const modalBackground = document.querySelector(".modal-background");
const modal = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const submit = document.querySelector(".submitBtn");

const title = document.querySelector("#bookName");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const readSelect = document.querySelector("#read");

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function toggleModal() {
  main.classList.toggle("active-blur");
  modalBackground.classList.toggle("no-display");
  modal.classList.toggle("no-display");
}

addButton.addEventListener("click", (event) => {
  toggleModal();
});

modalClose.addEventListener("click", (event) => {
  toggleModal();
});

submit.addEventListener("click", (event) => {
  event.preventDefault();
  let read = readSelect.value == "yes" ? true : false;
  addBookToLibrary(new Book(title.value, author.value, pages.value, read));
  displayBooks();
  toggleModal();
});

Book.prototype.info = function () {
  let ret = "";
  ret += `${this.title} written by ${this.author}, ${this.pages} pages, `;
  ret += this.read ? "already read." : "not read yet.";
  return ret;
};

Book.prototype.toggledInfo = function () {
  let ret = "";
  ret += `${this.title} written by ${this.author}, ${this.pages} pages, `;
  if (this.read) this.read = false;
  else this.read = true;
  ret += this.read ? "already read." : "not read yet.";
  return ret;
};

function random(lowerBound, upperBound) {
  return Math.floor(Math.random() * (upperBound - lowerBound) + lowerBound);
}

function addBookToLibrary(book) {
  book.bookColor = `rgb(${random(192, 255)}, ${random(192, 255)}, ${random(
    192,
    255
  )})`;
  book.wasAlreadyDisplayed = false;
  myLibrary.push(book);
}

function removeBookFromLibrary(bookTitle) {
  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].title === bookTitle) {
      myLibrary.splice(i, 1);
    }
  }
}

function displayBooks() {
  for (let i = 0; i < myLibrary.length; i++) {
    const elem = myLibrary[i];
    if (elem.wasAlreadyDisplayed) continue;
    const currBook = document.createElement("div");
    currBook.style.cssText += `background-color: ${elem.bookColor}; margin-bottom: 30px;`;
    currBook.textContent += elem.info();
    currBook.setAttribute("data-bookName", elem.title);

    const removeButton = document.createElement("button");
    removeButton.textContent += "Remove";
    removeButton.addEventListener("click", (e) => {
      console.log(elem.title);
      removeBookFromLibrary(elem.title);
      main.removeChild(currBook);
    });
    currBook.appendChild(removeButton);
    const readStatusButton = document.createElement("button");
    readStatusButton.textContent = "toggle read";
    readStatusButton.addEventListener("click", (event) => {
      if (elem.read == true) {
        currBook.textContent = currBook.textContent.replace(
          "already read",
          "not read yet"
        );
        elem.read = false;
      } else {
        currBook.textContent = currBook.textContent.replace(
          "not read yet",
          "already read"
        );
        elem.read = true;
      }
      currBook.textContent = currBook.textContent.replace(
        "Removetoggle read",
        ""
      );
      currBook.appendChild(removeButton);
      currBook.appendChild(readStatusButton);
    });
    currBook.appendChild(readStatusButton);

    main.appendChild(currBook);
    elem.wasAlreadyDisplayed = true;
  }
}

let heriPota = new Book("Harry Potter", "J.K Rowling", 295, false);
let quo = new Book("Quo Vadis", "Henryk Sienkiewicz", 431, true);

addBookToLibrary(heriPota);
addBookToLibrary(quo);

displayBooks();
