/* global data */
/* exported data */

var $newPhotoURL = document.querySelector('#new-entry-url');
var $newEntryForm = document.querySelector('.new-entry-form');

$newPhotoURL.addEventListener('input', handleNewPhotoURL);
$newEntryForm.addEventListener('submit', handleNewSubmit);

function handleNewPhotoURL(event) {
  var $newPhoto = document.querySelector('.new-entry-img');
  $newPhoto.setAttribute('src', event.target.value);
}

function handleNewSubmit(event) {
  event.preventDefault();
  var newEntry = {
    title: $newEntryForm.elements.title.value,
    image: $newEntryForm.elements.image.value,
    notes: $newEntryForm.elements.notes.value,
    entryID: data.nextEntryId
  };
  data.nextEntryId++;
  data.entries.unshift(newEntry);
  var $newPhoto = document.querySelector('.new-entry-img');
  $newPhoto.setAttribute('src', 'images/placeholder-image-square.jpg');
  $newEntryForm.reset();
}

function generateEntryDOM(entry) {
// <li>
//   <div class="row">
//     <div class="column-half img-container">
//       <img src="">
//     </div>
//     <div class="column-half">
//       <h2></h2>
//       <p></p>
//     </div>
//   </div>
// </li>

  var $newImage = document.createElement('img');
  $newImage.setAttribute('src', entry.image);

  var $imageBox = document.createElement('div');
  $imageBox.className = 'column-half img-container';
  $imageBox.appendChild($newImage);

  var $newTitle = document.createElement('h2');
  $newTitle.textContent = entry.title;

  var $newDescription = document.createElement('p');
  $newDescription.innerText = entry.notes;

  var $textBox = document.createElement('div');
  $textBox.className = 'column-half';
  $textBox.appendChild($newTitle);
  $textBox.appendChild($newDescription);

  var $listContents = document.createElement('div');
  $listContents.className = 'row';
  $listContents.appendChild($imageBox);
  $listContents.appendChild($textBox);

  var $newListEntry = document.createElement('li');
  $newListEntry.appendChild($listContents);

  return $newListEntry;
}

generateEntryDOM(data.entries[1]);
