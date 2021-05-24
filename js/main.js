/* global data */
/* exported data */

var $newPhotoURL = document.querySelector('#new-entry-url');

$newPhotoURL.addEventListener('input', handleNewPhotoURL);

function handleNewPhotoURL(event) {
  var $newPhoto = document.querySelector('.new-entry-img');
  $newPhoto.setAttribute('src', event.target.value);
}
