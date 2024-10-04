const API_KEY = '7b2BpwgYkGJxg_JByQGGoD2FhyNIuYO7oBtnY7Gf-qk'; // Replace with your Unsplash API Key
const searchInput = document.getElementById('search');
const imageGrid = document.getElementById('image-grid');
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const modalCaption = document.getElementById('modal-caption');
const closeModalBtn = document.querySelector('.close-modal');

// Function to fetch images from Unsplash API
async function fetchImages(query = '') {
  const url = query
    ? `https://api.unsplash.com/search/photos?query=${query}&client_id=${API_KEY}`
    : `https://api.unsplash.com/photos?client_id=${API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();
  return query ? data.results : data;
}

// Function to display images in grid
function displayImages(images) {
  imageGrid.innerHTML = ''; // Clear previous results

  images.forEach(image => {
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');

    const img = document.createElement('img');
    img.src = image.urls.small;
    img.alt = image.alt_description;

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    const text = document.createElement('div');
    text.classList.add('text');
    text.innerHTML = `${image.user.name} - ${image.location?.name || 'Unknown'}`;

    const downloadButton = document.createElement('a');
    downloadButton.href = image.links.download;
    downloadButton.classList.add('download-btn');
    downloadButton.innerHTML = '<i class="fas fa-download"></i>'; // Font Awesome download icon
    downloadButton.setAttribute('download', '');


    imageContainer.appendChild(img);
    imageContainer.appendChild(overlay);
    imageContainer.appendChild(text);
    imageContainer.appendChild(downloadButton);
    imageGrid.appendChild(imageContainer);

    // Add event listener to open modal on image click
    imageContainer.addEventListener('click', () => openModal(image.urls.regular, image.user.name));
  });
}

// Search event listener
searchInput.addEventListener('keyup', async (e) => {
  const query = e.target.value;
  if (query) {
    const images = await fetchImages(query);
    displayImages(images);
  }
});

// Open modal with full-sized image
function openModal(imageUrl, author, title) {
  modal.style.display = 'block';
  modalImg.src = imageUrl;
  modalCaption.innerHTML = `Photo by ${title}`;
}

// Close modal
closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Fetch default images on page load
window.onload = async () => {
  const query = 'Africa places food cooking';
  const images = await fetchImages(query);
  displayImages(images);
};
