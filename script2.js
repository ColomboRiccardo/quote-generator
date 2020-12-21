const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let allApiQuotes = [];

function loading() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}

function complete() {
	if (quoteContainer.hidden) {
		quoteContainer.hidden = false;
		loader.hidden = true;
	}
}

const getQuotes = async () => {
	const apiUrl = 'https://type.fit/api/quotes';
	try {
		console.log('loading resources');
		loading();
		const response = await fetch(apiUrl);
		const apiQuotes = await response.json();
		complete();
		allApiQuotes = [...apiQuotes];
	} catch (err) {
		console.log(err);
	}
};

const newQuote = () => {
	console.log('getting new quote');
	const apiQuote =
		allApiQuotes[Math.floor(Math.random() * allApiQuotes.length)];
	if (apiQuote.author === null) {
		authorText.innerText = 'Unknown';
	} else {
		authorText.innerText = apiQuote.author;
	}
	if (apiQuote.text.length > 120) {
		quoteText.classList.add('long-quote');
	} else {
		quoteText.classList.remove('long-quote');
	}
	quoteText.innerText = apiQuote.text;
};

function tweetQuote() {
	const quote = quoteText.innerText;
	const author = authorText.innerText;
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quote}- ${author}`;
	window.open(twitterUrl, '_blank');
}

getQuotes().then(() => newQuote());

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
