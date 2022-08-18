/*
There will be two elements on the page side by side, the image container and
the menu container.
*/
const imageContainer = document.querySelector(".svg-image-container");
const menuContainer = document.querySelector(".menu-container");

/*
Flexbox will be used for the layout, so the size of the menu container needs
to be set to the same size as the image container.  Function setSize() does that.
*/
setSize(); // set the size initially, and
window.addEventListener('resize', setSize); // reset size on each window resize

function setSize() {
    // set the size of the menuContainer equal to the size of the imageContainer
    width = imageContainer.getBoundingClientRect()['width'].toString();
    height = imageContainer.getBoundingClientRect()['height'].toString();
    console.log(width, height);
    menuContainer.style.width = `${width}px`;
    menuContainer.style.height = `${height}px`;
}
