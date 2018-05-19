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

// show alert
UI.prototype.showAlert = function(message,className){
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
    
     // validation alert
     if(title ===''|| author===''||isbn==='')
     {
      // Error alert
      ui.showAlert('Please fill in all fields','error');
     }
     else{
// Add book to list
    ui.addBookList(book);
    // show success
    ui.showAlert('Book Added !','success');

     //Clear fields
     ui.clearFields();
     }
     

    

    

     

  e.preventDefault();
});