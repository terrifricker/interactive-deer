/*
There will be two elements on the page, the image container and
the menu container.
*/
const imageContainer = document.querySelector(".svg-image-container");
const menuContainer = document.querySelector(".menu-container");

/* The imageContainer size is based on the size of viewport.  The size of the menuContainer
changes with the size of the imageContainer. */
setMenuContainerSize(); // set the size initially, and
window.addEventListener('resize', setMenuContainerSize()); // reset size on each window resize

function setMenuContainerSize() {
    // if mobile, height equal to height of the imageContainer
    if (window.screen.availWidth < 900) {
        height = imageContainer.getBoundingClientRect()['height'].toString();
        width = screenWidth; // 70vw conversion
    }
    else {
    // set the size of the menuContainer equal to the size of the imageContainer
    width = imageContainer.getBoundingClientRect()['width'].toString();
    height = imageContainer.getBoundingClientRect()['height'].toString();
    }
    menuContainer.style.width = `${width}px`;
    menuContainer.style.height = `${height}px`;
}



/*
When a section of the image is clicked, a menu box will be created and displayed
containing a link to a video and links to recipes.
*/
imageContainer.addEventListener('click', showMenu);

function showMenu(e) {

  // if there is already a menu, remove it
    if (menuContainer.firstChild) {
        menuContainer.removeChild(menuContainer.firstChild)
    };

    // get name of area in image that was clicked
    let targetName = e.target.classList[0];
    let targetNameCapitalized = targetName.charAt(0).toUpperCase() + targetName.slice(1);

    // create the menu div
    let newMenuDiv = document.createElement('div');
    newMenuDiv.classList.add("menu");

    // create video link
    let newVideoLink = document.createElement('a');
    newVideoLink.href = `https://fromfieldtoplate.com/video/${targetName}`;
    let videoLinkLabel = document.createTextNode(`${targetNameCapitalized} Video`);
    newVideoLink.appendChild(videoLinkLabel);
    newVideoLink.classList.add("video-link");

    // create recipe section
    let newRecipeSecion = document.createElement('div');
    newRecipeSecion.classList.add("recipe-section");

    //create a recipe link
    let newRecipeLink = document.createElement('a');

    // build entire menu
    newMenuDiv.appendChild(newVideoLink);
    newMenuDiv.appendChild(newRecipeSecion);


    // get click coordinates
    let click_x = e.clientX - 100;
    let click_y = e.clientY -150;
  
    // add units for css
    let click_x_in_pixels = click_x+'px';
    let click_y_in_pixels = click_y+'px';

    // locate new menu at click coordinates
    newMenuDiv.style.left = click_x_in_pixels;
    newMenuDiv.style.top = click_y_in_pixels;

    // add the new menu to the DOM
    menuContainer.appendChild(newMenuDiv);

    // calculate translation to 2/3 window over, 1/2 window down (less the header height)
    let window_width = window.innerWidth;
    let window_height = window.innerHeight + 125; // less the header height
    let translate_x = window_width * 3/4 - click_x - 100;
    let translate_y = window_height * 1/2 - click_y - 150;

    // don't translate until rendered, using setTimeout()
    setTimeout( () => {
        // grow size
        newMenuDiv.style.width = "var(--menu-width)";
        newMenuDiv.style.height = "var(--menu-height)";

        // translate location
        newMenuDiv.style.transform = 'translate('+translate_x+'px, '+translate_y+'px)';
  
        // set final opacity to 1
        newMenuDiv.style.opacity = '1';
    }, 10);
}

