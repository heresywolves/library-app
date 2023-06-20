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

// Call this functiion so that all books have action buttons working on startup

addEventsToBooks();
addButtonEvents();
addSortButtonListeners();

// Display empty library text if there is no books in array

function toggleEmptyNotification(){
  const text = document.querySelector('p.empty-notification');
  if (bookArray.length === 0) {
    text.classList.add('show');
  } else {
    text.classList.remove('show');
  }
}

toggleEmptyNotification();

// For form validation

addBookButton.addEventListener("click", function () {
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
  statusInput.forEach(el => {
    if (el.checked) {
      radioChecked = true;
      statusChoice = el.value;
    }
  })
  if (!radioChecked) {
    formValidationNotification.classList.add("form-validation-show");
    formValid = false;
  }
  if (formValid) {
    createBook(titleInput.value, authorInput.value, pagesInput.value, statusChoice);
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    statusInput.forEach(el => { el.checked = false });
    popUpWindow.classList.toggle("show");
  }
})

// Creating a new book

function createBook(title, author, pages, status) {
  let book = new Book(title, author, pages, status);
  bookArray.push(book);
  book.addToPage();
  updateStat(pages, status);
  toggleEmptyNotification();
}

// Book object

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages
  this.status = status;
  this.id = generateId();
}

function generateId() {
  let id = 0;
  let running = true;
  while (running) {
    id = Math.floor(Math.random() * 10000);
    let changeId = false;
    for (let i = 0; i < bookArray.length; i++) {
      if (id === bookArray[i].id) {
        changeId = true;
      }
    }
    if (!changeId) {
      return id;
    }
  }
}

Book.prototype.addToPage = function () {
  const bookContainer = document.querySelector("div .book-container");

  const bookItem = document.createElement('div');
  bookItem.classList.add("book-item");
  bookItem.id = this.id;
  if (this.status === "complete") { bookItem.classList.add("complete") }
  else if (this.status === "reading") { bookItem.classList.add("reading") }
  else { bookItem.classList.add("later") }

  const book = document.createElement('div');
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

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-book');
  deleteButton.innerText = 'Delete';

  const statusButton = document.createElement('button');
  statusButton.classList.add('change-status');
  statusButton.innerText = 'Status';

  bookInfo.appendChild(bookTitle);
  bookInfo.appendChild(bookAuthor);
  book.appendChild(line);
  book.appendChild(bookInfo);
  book.appendChild(statusButton);
  book.appendChild(deleteButton);
  bookItem.appendChild(book);
  bookItem.appendChild(bookPages);
  bookContainer.prepend(bookItem);

  // First remove previous events so there wont be event overlays - prevents bugs
  removeEventsFromBooks();
  addEventsToBooks();

  removeButtonEvents();
  addButtonEvents();
}


function updateStat() {
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
    else if (bookArray[i].status === "reading") {
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


function sortBooks() {
  const currentBooks = bookArray.filter(item => item.status === 'reading'); 
  const laterBooks = bookArray.filter(item => item.status === 'later')
  const completeBooks = bookArray.filter(item => item.status === 'complete');
  const newArray = completeBooks.concat(laterBooks.concat(currentBooks));
  bookArray = [...newArray];
}


// Deletes all current books in the DOM and displays new ones according to the array
function refreshBooks() {

  const bookContainer = document.querySelector("div .book-container");
  const bookItems = bookContainer.querySelectorAll(".book-item");
  bookItems.forEach(item => item.remove());

  bookArray.forEach(item => item.addToPage());
}


function showButtons(book) {
  const deleteButton = book.querySelector("button.delete-book");
  deleteButton.classList.add('show');
  const statusButton = book.querySelector("button.change-status");
  statusButton.classList.add('show');
}


function hideButtons(book) {
  const deleteButton = book.querySelector("button.delete-book");
  deleteButton.classList.remove('show');
  const statusButton = book.querySelector("button.change-status");
  statusButton.classList.remove('show');
}


function addEventsToBooks() {
  const allBooks = document.querySelectorAll('.book-item');

  for (let i = 0; i < allBooks.length; i++) {
    const book = allBooks[i].querySelector('.book');
    book.addEventListener('mouseover', () => showButtons(book));
    book.addEventListener('mouseout', () => hideButtons(book));
  }
}


function removeEventsFromBooks() {
  const allBooks = document.querySelectorAll('.book-item');

  for (let i = 0; i < allBooks.length; i++) {
    const book = allBooks[i].querySelector('.book');
    book.removeEventListener('mouseover', () => showButtons(book));
    book.removeEventListener('mouseout', () => hideButtons(book));
  }
}


// Event listeners for the buttons in each book
function addButtonEvents() {

  const deleteButtons = document.querySelectorAll('button.delete-book');
  deleteButtons.forEach(item => item.addEventListener('click', deleteBook));

  const statusButtons = document.querySelectorAll('button.change-status');
  statusButtons.forEach(item => item.addEventListener('click', changeStatus));
}

function removeButtonEvents() {
  const deleteButtons = document.querySelectorAll('button.delete-book');
  deleteButtons.forEach(item => item.removeEventListener('click', deleteBook));

  const statusButtons = document.querySelectorAll('button.change-status');
  statusButtons.forEach(item => item.removeEventListener('click', changeStatus));
}


// Delete book

function deleteBook() {
  const book = this.closest('div.book-item');

  // The book has to be deleted from array as well as DOM
  for (let i = 0; i < bookArray.length; i++) {

    if (book.id == bookArray[i].id) {
      bookArray.splice(i, 1);
      book.remove();
      updateStat();
      toggleEmptyNotification();  
      return;
    }
  }
}


// Change status book

function changeStatus() {
  
  const item = this.closest('div.book-item');
  let currentStatus = item.className.split(" ")[1];
  item.removeAttribute('class');
  item.classList.add('book-item');


  //Array search for changing the status in the array as well
  //We need to find array item index to change its value later
  let arrayItemIndex;
  for (let i = 0; i < bookArray.length; i++) {
    if (item.id == bookArray[i].id) {
      arrayItemIndex = i;
    }
  }

  if (currentStatus === 'reading') {
    item.classList.add('complete');
    bookArray[arrayItemIndex].status = 'complete';
  }
  else if (currentStatus === 'complete') {
    item.classList.add('later');
    bookArray[arrayItemIndex].status = 'later';
  }
  else {
    item.classList.add('reading');
    bookArray[arrayItemIndex].status = 'reading';
  }

  updateStat();
}

function addSortButtonListeners() {
  const button = document.querySelector('button.sort-button');
  button.addEventListener('click', sortAndRefresh);
}

function sortAndRefresh() {
  sortBooks();
  refreshBooks();
}