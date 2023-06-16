const newBookButton = document.querySelector(".side-panel-container button.new-book");
const popUpWindow = document.querySelector(".new-book-form");
const closePopupButton = document.querySelector(".new-book-form .close-popup");

console.log();
newBookButton.addEventListener("click", function() {
  popUpWindow.classList.toggle("show");
})

closePopupButton.addEventListener("click", function() {
  popUpWindow.classList.toggle("show");
})