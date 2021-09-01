const searchInput = document.getElementById('search-input')
const searchButton = document.getElementById('search-btn')
const totalBookfound = document.getElementById('totalBook-found')
const bookContainer = document.getElementById('book-container')

searchButton.addEventListener('click', function () {
    const searchText = searchInput.value;

    searchInput.value = '';
    totalBookfound.innerHTML = '';
    bookContainer.innerHTML = '';


    const url = ` http://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => bookData(data))


})


function bookData(booksArray) {
    const total = booksArray.num_found;

    const totalDiv = document.createElement('div');
    totalDiv.innerHTML = `<h3>Number Of Total Book Found:${total}</h3>`
    totalBookfound.appendChild(totalDiv);


    const books = booksArray.docs
    books.forEach(item => {
        console.log(item);

        const div = document.createElement('div')
        div.classList.add('col-md-4')
        div.innerHTML = `
        <div class="rounded overflow-hidden border p-2">
      <img src= class="w-100" alt=""/>
    </div>
    
    <div
      class="py-2 d-flex justify-content-between align-items-center d-md-block text-md-center">
      <h3 class='text-danger'>${item.title}</h3>
      <h5>Author: ${item.author_name}</h5>
      <p>First Published: ${item.first_publish_year}</P>
      <p>Publisher: ${item.publisher}</p>
      
    </div>`;
        bookContainer.appendChild(div)




    });
}

