const form = document.getElementById('book-form');
const resultsDIV = document.getElementById('results');

form.addEventListener('submit', async(e) =>{
    e.preventDefault();
    const query = document.getElementById('search-input').value;
    if(!query){
        resultsDIV.innerHTML = '<p>Please enter a search term.</p>';
        return;
    }
    resultsDIV.innerHTML = '<p>Loading reommendations...</p>';

    try{
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
        const data = await response.json();

        if(data.items){
            displayResults(data.items);
        } else{
            resultsDIV.innerHTML = '<p>No books found. Try another search!</p>';
        }
    } catch (error){
        console.error(error);
        resultsDIV.innerHTML = '<p>Failed to fetch recommendations. Try again later!</p>';
    }
});
function displayResults(books){
    resultsDIV.innerHTML= '';
    books.forEach((book) => {
        const title = book.volumeInfo.title ||'No Title';
        const author = book.volumeInfo.authors?.join(', ') ||  'Unknown Author';
        const thumbnail = book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150';

        const bookCard = `
        <div class="book-card">
        <img src="${thumbnail}" alt="${title}" />
        <h3>${title}</h3>
        <p>${author}</p>
        <button onclick="saveFavorite('${title}')">Save</button>
      </div>
      `;
      resultsDIV.innerHTML += bookCard;
    });
}
function saveFavorite(title) {
    alert(`Saved "${title}" to favorites!`);
  }