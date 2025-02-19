const componentloader = async (filePath) => {
  return new Promise((resolve, reject) => {
    /* Fetch API: https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch
     * use fetch to load file in same domain
     */
    fetch(filePath, {
      method: 'GET',
      headers: {
        'Content-Type': 'text/html'
      }
    })
      .then(response => response.text()) // Transform the data into text
      .then(content => resolve(content))
      .catch(error => reject(error))
  });
}

// Get the main domain to set the production environment
const mainDomain = window.location.origin
const production = mainDomain.includes('github')
const env = { url: production ? '/App-Landing-Page' : '' }

/*
 * Load components and render them in the root element,
 * use promises all to load all components and render them
 */
const components = [
  `${env.url}/src/components/header/header.html`,
  `${env.url}/src/components/black-landing/black-landing.html`,
  `${env.url}/src/components/destinations/destinations-text.html`,
  `${env.url}/src/components/destinations/destinations-cards.html`,
  `${env.url}/src/components/destinations/destinations-button.html`,
]

Promise.all(components.map(componentloader))
  .then((components) => {
    const root = document.querySelector('.root')
    const contentComplete = components.join('');

    root.innerHTML = contentComplete;
  })
  .catch((error) => console.error('Error al cargar los componentes:', error))