class Book{
    constructor(bname, aname, pages, hr){
        this.title = bname;
        this.author = aname;
        this.pages = pages;
        this.isRead = hr;
    }
}

class myLib{
    constructor(){
        this.books = []
    }
    
    addBook(newBook) {
        if (!this.isInLibrary(newBook)) {
            this.books.push(newBook)
        }
    }

    removeBook(title){
        this.books = this.books.filter((book) => book.title !== title)
    }

    getBook(title) {
        return this.books.find((book) => book.title === title)
    }

    isInLibrary(newBook) {
        return this.books.some((book) => book.title === newBook.title)
    }
}

const libObj = new myLib();

const gridObj = document.getElementById("books-grid");
const addBtn = document.querySelector(".btn-add");
const submitBtn = document.querySelector(".btn-submit");
const addBookForm = document.querySelector(".popup_form");
const addBookModal = document.querySelector(".popup_form_container");

const openAddBookModal = () => {
    addBookForm.reset()
    addBookModal.classList.add('active');
}
  
const closeAddBookModal = () => {
    addBookModal.classList.remove('active')
    errorMsg.classList.remove('active')
    errorMsg.textContent = ''
}

const createBookCard = (book) => {
    const bookCard = document.createElement('div')
    const title = document.createElement('p')
    const author = document.createElement('p')
    const pages = document.createElement('p')
    const buttonGroup = document.createElement('div')
    const readBtn = document.createElement('button')
    const removeBtn = document.createElement('button')
  
    bookCard.classList.add('book-card')
    buttonGroup.classList.add('button-group')
    readBtn.classList.add('btn')
    removeBtn.classList.add('btn')
    readBtn.onclick = toggleRead
    removeBtn.onclick = removeBook
    

    title.textContent = `"${book.title}"`
    author.textContent = book.author
    pages.textContent = `${book.pages} pages`
    removeBtn.textContent = 'Remove'
  
    if (book.isRead) {
      readBtn.textContent = 'Read'
      readBtn.classList.add('btn-light-green')
    } else {
      readBtn.textContent = 'Not read'
      readBtn.classList.add('btn-light-red')
    }
  
    bookCard.appendChild(title)
    bookCard.appendChild(author)
    bookCard.appendChild(pages)
    buttonGroup.appendChild(readBtn)
    buttonGroup.appendChild(removeBtn)
    bookCard.appendChild(buttonGroup)
    gridObj.appendChild(bookCard)
}



const addBook = (e)=> {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const isRead = document.getElementById('isRead').checked;
    console.log(title+author+pages+isRead);
    const newBook = new Book(title, author, pages, isRead);
    if (libObj.isInLibrary(newBook)) {
        errorMsg.textContent = 'This book already exists in your library'
        errorMsg.classList.add('active')
        return
    }
    libObj.addBook(newBook);
    createBookCard(newBook);
    closeAddBookModal();
}

const removeBook = (e) => {
    const title = e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll(
      '"',
      ''
    )
    libObj.removeBook(title);
    const bookcard = e.target.parentNode.parentNode;
    bookcard.remove()
}

const toggleRead = (e) => {
    const title = e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll(
      '"',
      ''
    )
    const book = libObj.getBook(title)
    book.isRead = !book.isRead;
    e.target.textContent = book.isRead?"Read":"Not Read";
}

addBtn.onclick = openAddBookModal;
submitBtn.onclick = addBook;

  



