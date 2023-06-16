const addBookButton = document.querySelector(".new-book-form .submit-new-book");
const formValidationNotification = document.querySelector(".form-validation");
const titleInput = document.querySelector(".new-book-form #title");
const authorInput = document.querySelector(".new-book-form #author");
const pagesInput = document.querySelector(".new-book-form #pages-number");
const statusInput = document.querySelectorAll(".new-book-form input[type=radio]");

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
  statusInput.forEach(el => {if (el.checked) {radioChecked = true}});
  if (!radioChecked) {
    formValidationNotification.classList.add("form-validation-show");
    formValid = false;
  }
  if (formValid) {
    createBook();
    popUpWindow.classList.toggle("show");
  }
})

// Creating a new book

function createBook(title, author, pages, status) {
  console.log("CREATED");
};

