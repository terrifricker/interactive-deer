/*
There will be two main elements on the page, the image container and
the menu container.
*/
const imageContainer = document.querySelector(".svg-image-container");
const menuContainer = document.querySelector(".menu-container");

/* The imageContainer size is based on the size of viewport with css.
This function sets the size of the menuContainer based on the size of the 
imageContainer to make flexbox work. */
setMenuContainerSize(); // set the size initially, and
window.addEventListener('resize', setMenuContainerSize); // reset size on each window resize

function setMenuContainerSize() {
    // if mobile, height equal to height of the imageContainer
    if (window.screen.availWidth < 900) {
        height = imageContainer.getBoundingClientRect()['height'].toString();
        width = window.screen.availWidth;
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
    if (menuContainer.firstElementChild) {
        menuContainer.firstElementChild.remove();
    }
    
    // get name of area in image that was clicked
    let targetName = e.target.classList[0];
    let targetNameCapitalized = targetName.charAt(0).toUpperCase() + targetName.slice(1);

    // create the menu div
    let newMenuDiv = document.createElement('div');
    newMenuDiv.classList.add("menu");

    // create video link
    let newVideoLink = document.createElement('a');
    newVideoLink.target = "_blank";
    newVideoLink.title = "Click for Video";

    // set video to Jeremiah's backleg video
    newVideoLink.href = "https://www.youtube.com/watch?v=JNK-KTMPzZI";

    /* Set video dynamically
    newVideoLink.href = `https://fromfieldtoplate.com/video/${targetName}`;
    */

    newVideoLink.appendChild(videoLinkLabel);
    newVideoLink.classList.add("video-link");

    // create recipe section
    let newRecipeSection = document.createElement('div');
    newRecipeSection.classList.add("recipe-section");

    //create a recipe link
    let newRecipeLink = document.createElement('a');

    // build entire menu
    newMenuDiv.appendChild(newVideoLink);
    newMenuDiv.appendChild(newRecipeSection);

    // center menu on cick coordinates
    let click_x = e.clientX;
    let click_y = e.clientY;
  
    // add units for css
    let click_x_in_pixels = click_x+'px';
    let click_y_in_pixels = click_y+'px';

    // locate new menu at click coordinates
    newMenuDiv.style.left = click_x_in_pixels;
    newMenuDiv.style.top = click_y_in_pixels;

    // add the new menu to the DOM
    menuContainer.appendChild(newMenuDiv);

    // calculate translation 
    let window_width = window.innerWidth;
    let window_height = window.innerHeight;
    let translate_x = 0;
    let translate_y = 0;

    // if mobile, to center of bottom half
    if (window_width < 900) {
        translate_x = window_width * 0.2 - click_x;
        translate_y = window_height * 0.55 - click_y + 20;
    }
    // if desktop, to 3/4 window over, 1/2 window down
    else {
        translate_x = window_width * 0.55 - click_x;
        translate_y = window_height * 0.2 - click_y + 75;
    }
    
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

