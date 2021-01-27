// DOM
const quoteContainer = document.getElementById('quote-container')
const twitterBtn = document.querySelector('#twitter');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const newQuoteBtn = document.querySelector('#new-quote');
const loader = document.getElementById('loader');


// Montrer Loader 
function showLoadingSpinner() {
    loader.hidden = false;             // Voir le Loader
    quoteContainer.hidden = true;      // Cacher Container
}   
 

// Cacher Loader
function removeLoadingSpinner() {
    
    if (!loader.hidden) {               // Si loader est caché
        quoteContainer.hidden = false;  // Affiche container
        loader.hidden = true;           // Cache loader
    }           
}


// Eventistener
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);


// Methode getQuote de l'API
async function getQuote() {

    showLoadingSpinner()

    const apiUrl = 'https://type.fit/api/quotes/?method=getQuote&lang=en&format=json';
    
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        // API renvoit un tableau donc on prend un nuombre aleatoire
        let number = Math.floor(Math.random() * data.length);
       
        if (data[number].author === null) {
            authorText.innerText = "Unknown";
            
        } 
        
        else {
            authorText.innerText = data[number].author;
        }

        console.log(data[number]);
        console.log(data[number].text.length);


        // Reduire FontSize si txt trop long
        if (data[number].text.length > 50) {
            quoteText.classList.add('long-quote');
        }

        else {
            quoteText.classList.remove('long-quote');
        }

        quoteText.innerText = data[number].text;


        // Stopper loader, Afficher Quote
        removeLoadingSpinner();

    } catch(error) {
        // getQuote();
        console.log('Whoopps, no quote', error)

    }
}


// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank')

}


// On Load
// getQuote();

complete()



