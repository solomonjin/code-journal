/* global data */
/* exported data */

var $newPhotoURL = document.querySelector('#new-entry-url');
var $newEntryForm = document.querySelector('.new-entry-form');
var $newEntryButton = document.querySelector('.new-entry-button');
var $entryList = document.querySelector('ul');
var $viewList = document.querySelectorAll('.view');
var $pageTitle = document.querySelector('.form-page-title');
var $newPhoto = document.querySelector('.new-entry-img');

$newPhotoURL.addEventListener('input', handleNewPhotoURL);
$newEntryForm.addEventListener('submit', handleNewSubmit);
window.addEventListener('DOMContentLoaded', handleContentLoad);
$newEntryButton.addEventListener('click', newEntryClick);
$entryList.addEventListener('click', clickOnEdit);

function handleNewPhotoURL(event) {
  $newPhoto.setAttribute('src', event.target.value);
}

function handleNewSubmit(event) {
  event.preventDefault();
  if (data.editing) {
    for (var i = 0; i < data.entries.length; i++) {
      if (data.editing.entryID === data.entries[i].entryID) {
        var indexOfEntry = i;
        data.entries[i].title = $newEntryForm.elements.title.value;
        data.entries[i].image = $newEntryForm.elements.image.value;
        data.entries[i].notes = $newEntryForm.elements.notes.value;
      }
    }
    var $entry = document.querySelector('[data-entry-id="' + data.editing.entryID + '"]');
    $entry.replaceWith(generateEntryDOM(data.entries[indexOfEntry]));
    data.editing = null;
  } else {
    var newEntry = {
      title: $newEntryForm.elements.title.value,
      image: $newEntryForm.elements.image.value,
      notes: $newEntryForm.elements.notes.value,
      entryID: data.nextEntryId
    };
    data.nextEntryId++;
    data.entries.unshift(newEntry);
    $entryList.prepend(generateEntryDOM(newEntry));
  }
  $newPhoto.setAttribute('src', 'images/placeholder-image-square.jpg');
  $newEntryForm.reset();
  switchView('entries');
  var $displayMessage = document.querySelector('.no-entries-msg');
  if ($displayMessage) $displayMessage.remove();
  $pageTitle.textContent = 'New Entry';
}

function generateEntryDOM(entry) {
// <li>
//   <div class="row">
//     <div class="column-half img-container">
//       <img class="entry-image" src="">
//     </div>
//     <div class="column-half"> relative position
//       <h2 class="entry-title"></h2>
//       <p class="entry-notes"></p>
//       <img> (edit icon; absolute position)
//     </div>
//   </div>
// </li>

  var $newImage = document.createElement('img');
  $newImage.setAttribute('src', entry.image);
  $newImage.className = 'entry-image';

  var $imageBox = document.createElement('div');
  $imageBox.className = 'column-half img-container';
  $imageBox.appendChild($newImage);

  var $newTitle = document.createElement('h2');
  $newTitle.textContent = entry.title;
  $newTitle.className = 'entry-title';

  var $newDescription = document.createElement('p');
  $newDescription.innerText = entry.notes;
  $newDescription.className = 'entry-notes';

  var $editIcon = document.createElement('img');
  $editIcon.setAttribute('src', 'images/edit-icon.png');
  $editIcon.className = 'edit-icon';

  var $textBox = document.createElement('div');
  $textBox.className = 'column-half text-box';
  $textBox.appendChild($newTitle);
  $textBox.appendChild($newDescription);
  $textBox.appendChild($editIcon);

  var $listContents = document.createElement('div');
  $listContents.className = 'row';
  $listContents.appendChild($imageBox);
  $listContents.appendChild($textBox);

  var $newListEntry = document.createElement('li');
  $newListEntry.setAttribute('data-entry-id', entry.entryID.toString());
  $newListEntry.appendChild($listContents);

  return $newListEntry;
}

function handleContentLoad(event) {
  if (data.entries.length === 0) {
    var $displayMessage = document.createElement('p');
    $displayMessage.textContent = 'No entries have been recorded.';
    $displayMessage.className = 'no-entries-msg';
    $entryList.appendChild($displayMessage);
  }
  for (var i = 0; i < data.entries.length; i++) {
    $entryList.appendChild(generateEntryDOM(data.entries[i]));
  }
}

function newEntryClick(event) {
  switchView('entry-form', 'new');
}

function switchView(view, form = null) {
  for (var i = 0; i < $viewList.length; i++) {
    if ($viewList[i].getAttribute('data-view') === view) $viewList[i].classList.remove('hidden');
    else $viewList[i].classList.add('hidden');
  }
}

function clickOnEdit(event) {
  if (event.target.className !== 'edit-icon') {
    return;
  }
  switchView('entry-form', 'edit');
  var listID = parseInt(event.target.closest('li').getAttribute('data-entry-id'));
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryID === listID) data.editing = data.entries[i];
  }
  $newEntryForm.elements.title.value = data.editing.title;
  $newEntryForm.elements.image.value = data.editing.image;
  $newEntryForm.elements.notes.value = data.editing.notes;
  $newPhoto.setAttribute('src', data.editing.image);
  $pageTitle.textContent = 'Edit Entry';
}
