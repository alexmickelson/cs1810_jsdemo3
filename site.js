import { books } from "./books.js";
console.log(books);
const readingList = document.getElementById("reading-list");
readingList.addEventListener("drop", drop);
readingList.addEventListener("dragover", allowDrop);
console.log("readingList", readingList);

// Function to display books in the left pane
function displayBooks() {
  //implement this
  const bookList = document.getElementById("book-list");
  books.forEach((book, index) => {
    const bookdraggable = document.createElement('div')
    bookdraggable.addEventListener('dragstart', drag)
    bookdraggable.setAttribute("draggable", true)
    bookdraggable.setAttribute("id", index)
    bookdraggable.classList.add('book')
    bookdraggable.classList.add('draggable')
    bookdraggable.innerHTML = getLeftBookTemplate(book, index)
    bookList.appendChild(bookdraggable);
  })
}

const getLeftBookTemplate = (book, index) => {
  return `
        <img draggable="false" src=https://picsum.photos/seed/${index + 1
    }/150/150 style="margin-right: 1em;" >
        <div>
            <h3>${book.title}</h3>
            <p>Description: ${book.description}</p>
            <p>Rating: ${renderStars(book.rating)}</p>
        </div>
    `;
};

const getRightBookTemplate = (book, index) => `
    <img src=https://picsum.photos/seed/${parseInt(index) + 1
  }/300/300 style="; margin-right: 1em;" >
    <div>
        <h3>${book.title}</h3>
        <p>Pages: ${book.pages}</p>
        <p>Sold: ${book.number_sold}</p>
        <p>Description: ${book.description}</p>
        <p>Rating: ${renderStars(book.rating)}</p>
    </div>
`;

// Drag and drop functionality
function drag(event) {
  //implement this (don't forget to send the index of the book)
  event.dataTransfer.clearData()
  event.dataTransfer.setData("text/plain", event.target.id)
  console.log(event.target)
}

function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  console.log(`dropped`)
  console.log(event.dataTransfer.getData("text/plain"))
  const index = event.dataTransfer.getData("text/plain")
  const readingList = document.getElementById('reading-list')
  const book = books[index]
  const div = document.createElement("div")
  div.innerHTML = getRightBookTemplate(book, index);
  readingList.appendChild(div)
}

function renderStars(rating) {
  if (isNaN(rating) || rating < 0 || rating > 5) {
    return ""; // Invalid rating
  }

  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const emptyStars = totalStars - fullStars;

  let starsHTML = "";

  for (let i = 0; i < fullStars; i++) {
    starsHTML += '<span class="star">★</span>'; // Full star (★)
  }

  for (let i = 0; i < emptyStars; i++) {
    starsHTML += '<span class="star">☆</span>'; // Empty star (☆)
  }

  return starsHTML;
}

// Initialize the page
displayBooks();
