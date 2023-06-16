const addBookButton = document.querySelector(".new-book-form .submit-new-book");
const formValidationNotification = document.querySelector(".form-validation");
const titleInput = document.querySelector(".new-book-form #title");
const authorInput = document.querySelector(".new-book-form #author");
const pagesInput = document.querySelector(".new-book-form #pages-number");
const statusInput = document.querySelectorAll(".new-book-form input[type=radio]");
const statRead = document.querySelector("#stat-read");
const statPages = document.querySelector("#stat-pages");
const statPlanned = document.querySelector("#stat-planned");
const statCurrent = document.querySelector("#stat-current");
let bookArray = [];

// For form validation

addBookButton.addEventListener("click", function() {
  let formValid = true;
  if (!titleInput.value) {
    formValidationNotification.classList.add("form-validation-show");
    titleInput.classList.add("red");
    formValid = false;
  }
  if (!authorInput.value) {
    formValidationNotification.classList.add("form-validation-show");
    authorInput.classList.add("red");
    formValid = false;
  }
  if (!pagesInput.value) {
    formValidationNotification.classList.add("form-validation-show");
    pagesInput.classList.add("red");
    formValid = false;
  }
  let radioChecked = false;
  let statusChoice = "";
  statusInput.forEach(el => {if (el.checked) {
    radioChecked = true;
    statusChoice = el.value;
  }})
  if (!radioChecked) {
    formValidationNotification.classList.add("form-validation-show");
    formValid = false;
  }
  if (formValid) {
    createBook(titleInput.value, authorInput.value, pagesInput.value, statusChoice);
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    statusInput.forEach(el => {el.checked = false});
    popUpWindow.classList.toggle("show");
  }
})

// Creating a new book

function createBook(title, author, pages, status) {
  let book = new Book(title, author, pages, status);
  bookArray.push(book);
  book.addToPage();
  updateStat(pages, status);
}

// Book object

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages
  this.status = status;
}

Book.prototype.addToPage = function() {
  let newIndex = bookArray.length;
  const bookContainer = document.querySelector("div .book-container");

  const bookItem = document.createElement('div');
  bookItem.classList.add("book-item");
  bookItem.id = String(newIndex);
  if (this.status === "complete") {bookItem.classList.add("complete")}
  else if (this.status === "reading") {bookItem.classList.add("reading")}
  else {bookItem.classList.add("later")}

  const book =  document.createElement('div');
  book.classList.add("book");

  const line = document.createElement('div');
  line.classList.add('line');

  const bookInfo = document.createElement('div');
  bookInfo.classList.add('book-info');

  const bookTitle = document.createElement('h3');
  bookTitle.classList.add('book-title');
  bookTitle.innerText = this.title;

  const bookAuthor = document.createElement('p');
  bookAuthor.classList.add('book-author');
  bookAuthor.innerText = this.author;

  const bookPages = document.createElement('p');
  bookPages.classList.add('book-pages');
  bookPages.innerText = `${this.pages} pages`;

  bookInfo.appendChild(bookTitle);
  bookInfo.appendChild(bookAuthor);
  book.appendChild(line);
  book.appendChild(bookInfo);
  bookItem.appendChild(book);
  bookItem.appendChild(bookPages);
  bookContainer.appendChild(bookItem);

  console.log("New book added");
  console.log(bookArray);
}

function updateStat(pages, status) {
  let countBooksRead = 0;
  let countTotalPages = 0;
  let countPlannedBooks = 0;
  let countCurrentBooks = 0;
  for (let i = 0; i < bookArray.length; i++) {
    if (bookArray[i].status === "complete") {
      countBooksRead++;
      countTotalPages += +bookArray[i].pages;
    }
    else if (bookArray[i].status === "later") {
      countPlannedBooks++;
    }
    else {
      countCurrentBooks++;
    }
  }
  statRead.innerText = "";
  statRead.innerText = `${countBooksRead}   Books read`;
  statPages.innerText = "";
  statPages.innerText = `${countTotalPages}   Total pages read`;
  statPlanned.innerText = "";
  statPlanned.innerText = `${countPlannedBooks}   Planned books`;
  statCurrent.innerText = "";
  statCurrent.innerText = `${countCurrentBooks}   Currently reading`;
}