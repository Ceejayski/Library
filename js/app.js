const library = [];
const addBookBtn = document.querySelector(".btn-d-none");

class Book {
  constructor(title, author, genre, page, read) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.read = read;
    this.page = page;
  }
}

class UI {
  addBookToList(book, array) {
    const list = document.querySelector("#books-list");
    const index = array.findIndex((x) => x.title === book.title);
    const card = document.createElement("div");

    card.className = "card column is-4";
    card.innerHTML = `<header class="card-header">
                                <p class="card-header-title">
                                    ${book.title}
                                </p>
    
                                </header>
                                <div class="card-content">
                                    <div class="content">
                                        <p>Author: <span>${
                                          book.author
                                        }</span></p>
                                        <p>Genre: <span>${book.genre}</span></p>
                                        <p>pages: <span>${book.page}</span></p>
                                    </div>
                                </div>
                                <footer class="card-footer" id="${index}">
                                    <button href="#" class="card-footer-item button is-success is-light" id="read-link">${this.readBtn(
                                      book
                                    )}</button>
                                    <button href="#" class="card-footer-item button is-danger is-light remove">Delete</button>
                                </footer>
                            `;
    list.appendChild(card);
  }

  readBtn = (book) => {
    const { read } = book;
    let text;
    if (read === true) {
      text = "Already Read this book";
    } else {
      text = "Book not yet Read";
    }
    return text;
  };

  showAlert = (className, message) => {
    const form = document.querySelector(".container");
    const div = document.createElement("div");
    // Add classes
    div.className = `notification ${className}`;
    div.innerHTML = '<button class="delete"></button>';
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".form-container");

    form.insertBefore(div, container);

    setTimeout(() => {
      document.querySelector(".notification").remove();
    }, 5000);
  };

  deleteBook(target) {
    if (target.classList.contains("delete")) {
      target.parentElement.remove();
    } else if (target.classList.contains("remove")) {
      target.parentElement.parentElement.remove();
      this.showAlert("is-danger", "Book Removed");
    }
  }

  clearFields = () => {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("genre").value = "";
    document.getElementById("pages").value = "";
  };

  readBook(target) {
    const bid = target.parentElement.id;
    const book = library[bid];
    if (target.id === "read-link") {
      if (book.read === true) {
        book.read = false;
        this.showAlert("is-danger", "Book not yet Read");
      } else {
        book.read = true;
        this.showAlert("is-success", "Book Read");
      }
      target.innerText = `${this.readBtn(book)}`;
    }
  }

  domMan(book, title, author, genre, page) {
    if (title === "" || author === "" || genre === "" || page === "") {
      this.showAlert("is-danger", "Please fill in all fields");
    } else {
      library.push(book);
      // Add book to list
      this.addBookToList(book, library);
      // Show success
      this.showAlert("is-success", "Book added");
      // Clear fields
      this.clearFields();
    }
  }

  btnDisplay(e, form, addBookBtn) {
    if (e.target.classList.contains("btn-d-none")) {
      form.classList.remove("d-none");
      form.classList.add("d-block");

      addBookBtn.classList.remove("d-block");
      addBookBtn.classList.add("d-none");
    }
  }
}

document.getElementById("book-form").addEventListener("submit", (e) => {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const genre = document.getElementById("genre").value;
  const page = document.getElementById("pages").value;
  const form = document.getElementById("book-form");
  const read = document.getElementById("read").checked;

  const book = new Book(title, author, genre, page, read);
  const ui = new UI();

  ui.domMan(book, title, author, genre, page);

  form.classList.remove("d-block");
  form.classList.add("d-none");
  addBookBtn.classList.add("d-block");
  e.preventDefault();
});

document.querySelector(".container").addEventListener("click", (e) => {
  const ui = new UI();
  const form = document.getElementById("book-form");
  ui.deleteBook(e.target);
  ui.readBook(e.target);
  ui.btnDisplay(e, form, addBookBtn);
});
