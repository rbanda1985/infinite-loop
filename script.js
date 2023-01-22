const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// API URL
let count = 5;
const apiKey = '1dbdNDQOE3AR399Rx210w63MYLJgiSazpVFTr_5ymGQ';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// Check if all images were loaded
function imageLoaded(){
  imagesLoaded++
  if(imagesLoaded === totalImages){
    ready = true;
    loader.hidden = true;
    count = 30;
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`
  } 
}

// Helper function to help set attributes on DOM elements
function setAttributes(element, attributes){
  for(const key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}

// Create Elements for links & photos, add to DOM
function displayPhotos(){
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
     })
    // Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description
    })

    // Event listener, check when each page is finished loading
  img.addEventListener('load', imageLoaded);

    // Put <img> inside of <a>, then put both inside of imageContainer element
    item.appendChild(img);
    imageContainer.appendChild(item); 
  });
}




// Get photos from Unsplash API
async function getPhotos(){
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json()
    displayPhotos();
  }
  catch(err){
    console.log(err)
  }
}

// Check to see if scrolling is near bottom of page, load more photos
window.addEventListener('scroll', () => {
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
    ready = false;
    getPhotos();
  }
})

// On load
getPhotos();