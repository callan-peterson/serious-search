const targetUrl = 'http://68k.news/index.php?section=world&loc=US';
const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;

fetch(proxyUrl)
    .then(response => {
        if (!response.ok) throw new Error('Failed to fetch the content.');
        return response.json();
    })
    .then(data => {
        // Extract the HTML content from the fetched data
        const parser = new DOMParser();
        const doc = parser.parseFromString(data.contents, 'text/html');

        // Extract the relevant portion of the page (e.g., news articles)
        const articles = doc.querySelectorAll('h3'); // Adjust selector to match 68k.news structure
        const newsContainer = document.getElementById('news');

		if (articles.length > 0) {
			articles.forEach(article => {
				const articleClone = document.createElement('p');
				articleClone.innerHTML = article.innerHTML; // Copy article content
				articleClone.classList.add('small-text'); // Add the class
				newsContainer.appendChild(articleClone);
			});
		} else {
			newsContainer.textContent = 'No articles found.';
		}

    })
    .catch(error => console.error('Error fetching the page:', error));
