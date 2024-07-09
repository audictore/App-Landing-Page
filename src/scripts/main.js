const componentloader = async (filePath) => {
  return new Promise((resolve, reject) => {
    fetch(filePath, {
      method: 'GET',
      headers: {
        'Content-Type': 'text/html'
      }
    })
      .then(response => response.text())
      .then(content => resolve(content))
      .catch(error => reject(error))
  });
}

const components = [
  '/components/header/header.html',
]

Promise.all(components.map(componentloader))
  .then((components) => {
    const root = document.querySelector('.root')
    const contentComplete = components.join('');

    root.innerHTML = contentComplete;
  })
  .catch((error) => console.error('Error al cargar los componentes:', error))