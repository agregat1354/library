let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  let ret = "";
  ret += `${this.title} written by ${this.author}, ${this.pages} pages, `;
  ret += this.read ? "already read." : "not read yet.";
  return ret;
};

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayBooks() {
  myLibrary.forEach((elem) => {
    const currBook = document.createElement("div");
    currBook.textContent += elem.info();
    document.body.appendChild(currBook);
  });
}

let heriPota = new Book("Harry Potter", "J.K Rowling", 295, false);
let quo = new Book("Quo Vadis", "Henryk Sienkiewicz", 431, true);

addBookToLibrary(heriPota);
addBookToLibrary(quo);

displayBooks();
