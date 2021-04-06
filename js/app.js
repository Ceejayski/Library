const library = [];
const addBookBtn = document.querySelector('.btn-d-none');

class Book {
  constructor(title, author, genre, page, read) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.read = read;
    this.page = page;
  }
}
