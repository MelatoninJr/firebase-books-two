import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore/lite';
import { addDoc, collection } from "firebase/firestore"; 
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");


const titlegrab = document.getElementById('Title')
const authorgrab = document.getElementById('Author')
const pagegrab = document.getElementById('Pages')

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCCjq-G8nksGsogXnW_TXNS_dS1kR9wf5A",
    authDomain: "library-9e6c8.firebaseapp.com",
    projectId: "library-9e6c8",
    storageBucket: "library-9e6c8.appspot.com",
    messagingSenderId: "560044291373",
    appId: "1:560044291373:web:9eb7510601fb8dd881cfa4"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app)
  
  try {
    const docRef = await addDoc(collection(db, "books"), {
        hello: "world"
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }



titlegrab.addEventListener("input", function(e) {
    if(titlegrab.validity.tooShort === true) {
        titlegrab.setCustomValidity("Needs to be at least 4 characters long.")
        titlegrab.reportValidity();
    } else {
        titlegrab.setCustomValidity('')
    }
})

authorgrab.addEventListener("input", function(e) {
    if(authorgrab.validity.tooShort === true) {
        e.preventDefault()
        authorgrab.setCustomValidity("Needs to be at least 4 characters long.")
        authorgrab.reportValidity();
    } else {
        authorgrab.setCustomValidity('')
        
    }
})

pagegrab.addEventListener("input", function(e) {
    if(pagegrab.validity.tooShort === true) {
        pagegrab.setCustomValidity("Needs to be at least 4 characters long.")
        pagegrab.reportValidity();
    } else {
        pagegrab.setCustomValidity('')
    }
})







let cardcontainer = document.getElementById('bookcontainer')


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn').addEventListener('click', addBook)
    
})

const myLibrary = [];
function Book(title, author, pages, status){
this.id = Date.now(),
this.title = title;
this.author = author;
this.pages = pages;
this.status = status;
}

// and that is separate from the `addBook` function!
const addBook = (e)=>{
e.preventDefault();
let book = new Book(
    
    document.getElementById("Title").value,
    document.getElementById("Author").value,
    document.getElementById("Pages").value,
    document.getElementById("Status").value
)
myLibrary.push(book)
document.forms[0].reset();
displayBook(book)
console.log(myLibrary)


// 
}






const displayBook = (book)=>{
    // code to take one book's data, and turn it into a DOM "card"
    // and hopefully, return that card. 
    const card = document.createElement('div')
    card.classList.add('book-card')
    
    card.value = book.id
    bookcontainer.appendChild(card)

    const title = document.createElement('div')
    title.classList.add('title-card')
    title.textContent = book.title
    card.appendChild(title)

    const author = document.createElement('div')
    author.classList.add('author-card')
    author.textContent = book.author
    card.appendChild(author)

    const pages = document.createElement('div')
    pages.classList.add('pages-card')
    pages.textContent = book.pages
    card.appendChild(pages)
    
    const status = document.createElement('button')
    status.classList.add('status-card')
    status.innerText = book.status
    status.value = book.id
    status.setAttribute("type", "button")
    card.appendChild(status)
    status.addEventListener('click', change)

    const remove = document.createElement('button')
    remove.classList.add('remove-card')
    remove.innerText = 'Remove'
    remove.setAttribute("type", "button")
    remove.value = book.id
    card.appendChild(remove)
    remove.addEventListener('click', use)
    


   
    }
  
            

//This is function to change read status. It matches using the Date ID and then reacts based on the current string value.
const change = (event) => {
for (i = 0; i < myLibrary.length; i++) {
console.log(myLibrary[i].id)
console.log(Number(event.currentTarget.value) )
if(myLibrary[i].id === Number(event.currentTarget.value) && myLibrary[i].status === "Finished") {
    myLibrary[i].status = "Unfinished"
    event.currentTarget.innerText = "Unfinished"
   
    
    
        } else if(myLibrary[i].id === Number(event.currentTarget.value) && myLibrary[i].status === "Unfinished") {
            myLibrary[i].status = "Finished"
            event.currentTarget.innerText = "Finished"
        }
    console.log(myLibrary)}
}


//This is my remove button function. It checks against the Date ID then splices the array to remove the obj.
const use = (event)=>{
for (i = 0; i < myLibrary.length; i++) {
console.log(myLibrary[i].id)
console.log(Number(event.currentTarget.value) )
if(myLibrary[i].id === Number(event.currentTarget.value)) {
    myLibrary.splice(i, 1)
    event.currentTarget.closest('.book-card').remove();
}
}
    
        }
        console.log(myLibrary)
    

        // Import the functions you need from the SDKs you need





