/* global data */
/* exported data */

var $newPhotoURL = document.querySelector('#new-entry-url');
var $newEntryForm = document.querySelector('.new-entry-form');

$newPhotoURL.addEventListener('input', handleNewPhotoURL);
$newEntryForm.addEventListener('submit', handleNewSubmit);
window.addEventListener('beforeunload', handleUnload);

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
    nextEntryID: data.nextEntryId
  };
  data.nextEntryId++;
  data.entries.unshift(newEntry);
  var $newPhoto = document.querySelector('.new-entry-img');
  $newPhoto.setAttribute('src', 'images/placeholder-image-square.jpg');
  $newEntryForm.reset();
}

function handleUnload(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('user-entry-data', dataJSON);
}
