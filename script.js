// Array to hold the created images
let createdImages = [];

// Remove the first image from the array
let firstImageObject = createdImages.shift();

// updates the top meme text field
function updateTextTop() {
  let memeTextTopInput = document.getElementById("topText");
  let memeTextTop = document.getElementById("memeTextTop");
  memeTextTop.innerHTML = memeTextTopInput.value;
}
// updates the bottom meme text field
function updateTextBot() {
  let memeTextBotInput = document.getElementById("bottomText");
  let memeTextBot = document.getElementById("memeTextBot");
  memeTextBot.innerHTML = memeTextBotInput.value;
}

// updates the image field with the image
function updateImage() {
  let img = document.querySelector("#exampleMeme img");
  let file = document.querySelector("input[type=url]");
  img.onload = function () {
    img.src = file.value;
  };
  let memeText = document.createElement("div");
  memeText.style.textShadow = "2px 2px 2px rgba(0, 0, 0, 0.5)";
  img.src = file.value;

  // append the memeText to the body of the document
  document.getElementById("memeContainer").appendChild(memeText);
}

// creates the meme and appends it to the page
document
  .getElementById("memeForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Create a new canvas element
    let canvas = document.createElement("canvas");

    // Get the 2D rendering context for the canvas
    let ctx = canvas.getContext("2d");

    // Create a new image element
    let img = new Image();

    // Set the cross-origin attribute to anonymous to allow loading from external sources
    img.crossOrigin = "anonymous";

    // Set the source of the image to the source of the image selected in the form
    img.src = document.querySelector("#memeImage").src;

    // When the image has loaded, execute this function
    img.onload = function () {
      // Set the width and height of the canvas to match the image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image onto the canvas
      ctx.drawImage(img, 0, 0, img.width, img.height);

      // Get the top and bottom text from the form
      let topText = document.getElementById("memeTextTop").innerText;
      let bottomText = document.getElementById("memeTextBot").innerText;

      // Set the font size to 10% of the canvas width
      let fontSize = canvas.width * 0.1;

      // Set the font, fill color, text alignment, and shadow properties for the text
      ctx.font = fontSize + "px Impact";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.shadowColor = "black";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 5;
      ctx.shadowOffsetY = 5;

      // Draw the top and bottom text onto the canvas
      ctx.fillText(topText, canvas.width / 2, fontSize + 10);
      ctx.fillText(bottomText, canvas.width / 2, canvas.height - 50);

      // Create a new image element for the final meme
      let newImg = document.createElement("img");

      // Set the source of the new image to the data URL of the canvas
      newImg.src = canvas.toDataURL("image/png");

      // Set the width and height of the new image to match the canvas
      newImg.width = canvas.width + "px";
      newImg.height = canvas.height + "px";

      // Create a checkbox for the new image
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.style.display = "none";

      // add a click event listener to the image
      newImg.addEventListener("click", function () {
        this.classList.toggle("selected");
        checkbox.checked = !checkbox.checked;
      });

      // Create an object to hold the new image and its checkbox
      let imageObject = {
        img: newImg,
        checkbox: checkbox,
      };
      // Add the new image object to the array
      createdImages.push(imageObject);

      // Append the new image and its checkbox to the body
      document.body.appendChild(checkbox);
      document.body.appendChild(newImg);
    };
    console.log(createdImages);
  });

// Function to remove selected images
function removeSelectedImages() {
  console.log("removeSelectedImages called");

  // Loop through all the images in the array
  for (let i = createdImages.length - 1; i >= 0; i--) {
    let imageObject = createdImages[i];
    if (imageObject.checkbox.checked) {
      // If the image is selected, remove it from the body and the array
      document.body.removeChild(imageObject.img);
      document.body.removeChild(imageObject.checkbox);
      createdImages.splice(i, 1);
    }
  }
}

// Check if the first image's checkbox is checked
if (createdImages.length > 0 && createdImages[0].checkbox.checked) {
  let firstImageObject = createdImages.shift();
  document.body.removeChild(firstImageObject.img);
  document.body.removeChild(firstImageObject.checkbox);
} else {
  // Filter out the images that are not selected
  createdImages = createdImages.filter((imageObject) => {
    console.log("checkbox checked:", imageObject.checkbox.checked);
    if (imageObject.checkbox.checked) {
      // If the image is selected, remove it from the body
      document.body.removeChild(imageObject.img);
      document.body.removeChild(imageObject.checkbox);
      return false;
    } else {
      return true;
    }
  });
}

// Add an event listener to the delete button
window.onload = function () {
  document
    .getElementById("deleteButton")
    .addEventListener("click", removeSelectedImages);
};
