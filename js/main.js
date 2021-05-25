/* global data */
/* exported data */

var $newPhotoURL = document.querySelector('#new-entry-url');
var $newEntryForm = document.querySelector('.new-entry-form');
var $newEntryButton = document.querySelector('.new-entry-button');
var $entryList = document.querySelector('ul');
var $viewList = document.querySelectorAll('.view');

$newPhotoURL.addEventListener('input', handleNewPhotoURL);
$newEntryForm.addEventListener('submit', handleNewSubmit);
window.addEventListener('DOMContentLoaded', handleContentLoad);
$newEntryButton.addEventListener('click', newEntryClick);

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
  $entryList.prepend(generateEntryDOM(newEntry));
  switchView('entries');
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

function handleContentLoad(event) {
  if (data.entries.length === 0) {
    var $displayMessage = document.createElement('p');
    $displayMessage.textContent = 'No entries have been recorded.';
    $entryList.appendChild($displayMessage);
  }
  for (var i = 0; i < data.entries.length; i++) {
    $entryList.appendChild(generateEntryDOM(data.entries[i]));
  }
}

function newEntryClick(event) {
  switchView('entry-form');
}

function switchView(view) {
  for (var i = 0; i < $viewList.length; i++) {
    if ($viewList[i].getAttribute('data-view') === view) $viewList[i].classList.remove('hidden');
    else $viewList[i].classList.add('hidden');
  }
}
