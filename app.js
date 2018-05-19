// // My Code

// // select all the elements
// const title = document.querySelector('#title');
// const author = document.querySelector('#author');
// const isbn = document.querySelector('#isbn');

// Book Constructor

function Book(title,author,isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}


// UI Constructor
function UI(){}
// Add Book To List
UI.prototype.addBookList = function(book){
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

// clear field function
UI.prototype.clearFields = function(){
  document.querySelector('#title').value= '';
   document.querySelector('#author').value='';
   document.querySelector('#isbn').value='';
}

// Event Listner

document.getElementById('book-form').addEventListener('submit',function(e){
  // get forms value
const title = document.querySelector('#title').value,
    author = document.querySelector('#author').value,
    isbn = document.querySelector('#isbn').value

  //console.log(title,author,isbn);
   
     const book = new Book(title,author,isbn);

     //Instantiate UI
     const ui = new UI();
    

     // Add book to list
     ui.addBookList(book);

     //Clear fields
     ui.clearFields();
     

  e.preventDefault();
});