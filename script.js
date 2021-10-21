const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}

function removeLoadingSpinner(){
    if(!loader.hidden){
        quoteContainer.hidden=false;
        loader.hidden=true;
    }
}

// យកកូដមកពីអេភីអាយ
async function getQuote(){
    showLoadingSpinner();
    const proxyUrl='http://cors-anywhere.herokuapp.com/';
    const apiUrl='http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response =await fetch(proxyUrl + apiUrl);
        const data=await response.json();
        // អានិងបើវា author វា blank ,ដាក់វាជា unknow
        if (data.quoteAuthor === ''){
            authorText.innerText = 'Unknow';
        }else{
            authorText.innerText = data.quoteAuthor;
        }
        // authorText.innerText = data.quoteAuthor;
        // Reduce font size for long quotes
        if (data.quoteText.length > 120){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        // console.log(data);
    removeLoadingSpinner();
    }catch(error){
        getQuote();
        // console.log('whoo, no quote',error);
    }
}
//twitter quote
function twitterQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl,'_blank');
}

//event listener
newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',twitterQuote);

// ពេលដំណើរការនៅសុភាសិន
getQuote();

//loading()
