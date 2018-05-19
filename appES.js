class Book {
constructor(title,author,isbn){
this.title=title;
this.author = author;
this.isbn = isbn;
}
}
class UI {
  addBookList(book){
    const list = document.getElementById('book-list');
    // Create tr element
    const row = document.createElement('tr');
   // console.log(row);
  
   // Insert cols
   row.innerHTML = `
   <td> ${book.title}</td>
   <td> ${book.author}</td>
   <td> ${book.isbn}</td>
   <td> <a href="#" class="delete">X<a></td>
   `;
   list.appendChild(row);
  }
  showAlert(message,className){
// create div
const div = document.createElement('div');
// Add class name
div.className =`alert ${className}`;
// add text
div.appendChild(document.createTextNode(message));
//get parent
const container = document.querySelector('.container');
// get forms
const form = document.querySelector('#book-form');
// Insert Alert
container.insertBefore(div,form);

// Timeout after 3 sec
setTimeout(function(){
  document.querySelector('.alert').remove();
},3000);
  }
  deleteBook(target){
    if(target.className ==='delete') {
      target.parentElement.parentElement.remove();
    }
  }
  clearFields(){
    document.querySelector('#title').value= '';
    document.querySelector('#author').value='';
    document.querySelector('#isbn').value='';
  }

}
// Local storage class
class Store {
  static getBooks(){
  let books;
  if(localStorage.getItem('books')=== null){
   books = [];
  }else {
    books = JSON.parse(localStorage.getItem('books'));
  }
return books;
  }

  static displayBooks(){
    const books = Store.getBooks();
    books.forEach(function(book){
     const ui = new UI;
     // Add book to UI
     ui.addBookList(book);
    });
  }
  static addBook(book){
 const books = Store.getBooks();
 books.push(book);

 localStorage.setItem('books',JSON.stringify(books));
  }

  static removeBook(isbn){
    const books = Store.getBooks();
    books.forEach(function(book,index){
      if(book.isbn === isbn){
        books.splice(index,1);
      }
      
    });
    localStorage.setItem('books',JSON.stringify(books));
  }
}
    
 

//DOM load event
document.addEventListener('DOMContentLoaded',Store.displayBooks);

// Event listner for add book
document.getElementById('book-form').addEventListener('submit',function(e){
  // get forms value
const title = document.querySelector('#title').value,
    author = document.querySelector('#author').value,
    isbn = document.querySelector('#isbn').value

  //console.log(title,author,isbn);
   
     const book = new Book(title,author,isbn);

     //Instantiate UI
     const ui = new UI();
    
     // validation alert
     if(title ===''|| author===''||isbn==='')
     {
      // Error alert
      ui.showAlert('Please fill in all fields','error');
     }
     else{      
// Add book to list
    ui.addBookList(book);

    // Add to local storage
    Store.addBook(book);
    // show success
    ui.showAlert('Book Added !','success');

     //Clear fields
     ui.clearFields();
     }
  e.preventDefault();
});

// Event listner for delete
document.getElementById('book-list').addEventListener('click',function(e){
// Instantiate the UI
const ui =new UI();
// delete the book
ui.deleteBook(e.target);
// ui.deleteBookfromlist(e.target);
// Remove from LS
Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

// show messege
ui.showAlert('Book removed','success');

  e.preventDefault();
});