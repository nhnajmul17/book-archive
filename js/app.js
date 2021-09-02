const searchInput = document.getElementById('search-input');
// const searchButton = document.getElementById('search-btn')
const totalBookfound = document.getElementById('totalBook-found');
const bookContainer = document.getElementById('book-container');
const errorDiv = document.getElementById('error');
const spinner = document.getElementById('spinner')


// search button event
const searchButton = () => {
    const searchText = searchInput.value;

    // Error Message
    if (searchText === '') {
        errorDiv.innerText = "Search Field Cannot Be Empty";
        return;
    }
    spinner.classList.remove('d-none')

    // empty the values
    errorDiv.innerText = '';
    searchInput.value = '';
    totalBookfound.innerHTML = '';
    bookContainer.innerHTML = '';



    // Api fetching
    const url = ` https://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => bookData(data))


}

// Search Results
const bookData = (booksArray) => {

    const total = booksArray.num_found;
    if (total === 0) {
        errorDiv.innerText = "No results Found";
    }


    const totalDiv = document.createElement('div');
    totalDiv.innerHTML = `<h3>Number of Total Book Found: ${total}</h3>`
    totalBookfound.appendChild(totalDiv);


    const books = booksArray.docs

    books.forEach(item => {
        // console.log(item);

        const div = document.createElement('div')
        div.classList.add('col-md-4')
        div.innerHTML = `
        <div class="rounded overflow-hidden border p-2">
      <img src=https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg class="w-100" alt=""/>   
    </div>
    
    <div
      class="py-2 d-flex justify-content-between align-items-center d-md-block text-md-center">
      <h3 class='text-danger'>${item.title}</h3>
      <h5>Author: ${item.author_name?.[0]}</h5>
      <p>First Published: ${item.first_publish_year}</P>
      <p>Publisher: ${item.publisher?.[0]}</p>
      
    </div>`;
        bookContainer.appendChild(div)




    });
    spinner.classList.add('d-none')
}

