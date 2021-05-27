/* global data */
/* exported data */

var $newPhotoURL = document.querySelector('#new-entry-url');
var $newEntryForm = document.querySelector('.new-entry-form');
var $newEntryButton = document.querySelector('.new-entry-button');
var $entryList = document.querySelector('ul');
var $viewList = document.querySelectorAll('.view');
var $pageTitle = document.querySelector('.form-page-title');
var $newPhoto = document.querySelector('.new-entry-img');
var $deleteButton = document.querySelector('.delete-button');
var $closeModalBtn = document.querySelector('.close-modal');
var $confirmDeleteBtn = document.querySelector('.confirm-delete');
var $modal = document.querySelector('.modal');
var $modalOverlay = document.querySelector('.modal-overlay');
var $entriesLink = document.querySelector('.entries-link');

var $profilePhotoURL = document.querySelector('#edit-profile-img');
var $profilePhoto = document.querySelector('.profile-image');
var $profileForm = document.querySelector('.edit-profile-form');

document.addEventListener('click', clickOnLink);
$newPhotoURL.addEventListener('input', handleNewPhotoURL);
$newEntryForm.addEventListener('submit', handleNewSubmit);
window.addEventListener('DOMContentLoaded', handleContentLoad);
$newEntryButton.addEventListener('click', newEntryClick);
$entryList.addEventListener('click', clickOnEdit);
$deleteButton.addEventListener('click', clickOnDelete);
$closeModalBtn.addEventListener('click', closeModal);
$confirmDeleteBtn.addEventListener('click', deleteEntry);
$entriesLink.addEventListener('click', clickEntriesLink);

$profilePhotoURL.addEventListener('input', handleNewPhotoURL);
$profileForm.addEventListener('submit', saveProfile);

function handleNewPhotoURL(event) {
  var $photoPreview = event.target.closest('.column-half').previousElementSibling.children[0];
  $photoPreview.setAttribute('src', event.target.value);
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
  switchView('entries');
  var $displayMessage = document.querySelector('.no-entries-msg');
  if ($displayMessage) $displayMessage.remove();
  resetEntryForm();
}

function resetEntryForm() {
  $newPhoto.setAttribute('src', 'images/placeholder-image-square.jpg');
  $newEntryForm.reset();
  $pageTitle.textContent = 'New Entry';
  $deleteButton.classList.add('hide-delete');
}

function clickEntriesLink(event) {
  switchView('entries');
  resetEntryForm();
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
  checkIfEmpty();
  for (var i = 0; i < data.entries.length; i++) {
    $entryList.appendChild(generateEntryDOM(data.entries[i]));
  }
  if (!data.profile.username) switchView('edit-profile');
  else switchView(data.view);
  if (data.view === 'entry-form' && data.editing) showEditForm();
}

function checkIfEmpty() {
  if (data.entries.length === 0) {
    var $displayMessage = document.createElement('p');
    $displayMessage.textContent = 'No entries have been recorded.';
    $displayMessage.className = 'no-entries-msg';
    $entryList.appendChild($displayMessage);
  }
}

function newEntryClick(event) {
  switchView('entry-form');
  data.editing = null;
}

function switchView(view) {
  if (view === 'profile') {
    document.querySelector('div.profile-display').remove();
    var $viewProfile = document.querySelector('div[data-view="profile"]');
    $viewProfile.appendChild(generateProfileDOM(data.profile));
  } else if (view === 'edit-profile') fillProfileForm();
  for (var i = 0; i < $viewList.length; i++) {
    if ($viewList[i].getAttribute('data-view') === view) $viewList[i].classList.remove('hidden');
    else $viewList[i].classList.add('hidden');
  }
  data.view = view;
}

function clickOnEdit(event) {
  if (event.target.className !== 'edit-icon') {
    return;
  }
  switchView('entry-form');
  var listID = parseInt(event.target.closest('li').getAttribute('data-entry-id'));
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryID === listID) data.editing = data.entries[i];
  }
  showEditForm();
}

function showEditForm() {
  $newEntryForm.elements.title.value = data.editing.title;
  $newEntryForm.elements.image.value = data.editing.image;
  $newEntryForm.elements.notes.value = data.editing.notes;
  $newPhoto.setAttribute('src', data.editing.image);
  $pageTitle.textContent = 'Edit Entry';
  $deleteButton.classList.remove('hide-delete');
}

function clickOnDelete(event) {
  $modal.classList.remove('hidden');
  $modalOverlay.classList.remove('hidden');
}

function closeModal(event) {
  $modal.classList.add('hidden');
  $modalOverlay.classList.add('hidden');
}

function deleteEntry(event) {
  var entryID = data.editing.entryID;
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryID === entryID) data.entries.splice(i, 1);
  }
  document.querySelector('[data-entry-id="' + entryID + '"]').remove();
  data.editing = null;
  closeModal();
  switchView('entries');
  checkIfEmpty();
  $pageTitle.textContent = 'New Entry';
  $deleteButton.classList.add('hide-delete');
  $newEntryForm.reset();
  $newPhoto.setAttribute('src', 'images/placeholder-image-square.jpg');
}

/* USER PROFILE FUNCTIONS */

function saveProfile(event) {
  event.preventDefault();
  var userProfile = {
    username: $profileForm.elements.userName.value,
    image: $profileForm.elements.profileImg.value,
    bio: $profileForm.elements.userBio.value,
    fullName: $profileForm.elements.userFullName.value,
    location: $profileForm.elements.userLocation.value
  };
  data.profile = userProfile;
  $profileForm.reset();
  $profilePhoto.setAttribute('src', data.profile.image);
  switchView('profile');
}

function generateProfileDOM(profile) {
  /*
  append to [data-view="profile"] element
  <div class="row">
    <div class="column-full">
      <h2>Full Name Here</h2>
    </div>
    <div class="column-half img-container">
      <img src="images/placeholder-image-square.jpg" alt="Profile Picture">
    </div>
    <div class="column-half">
      <div class="column-full flex align-center">
        <img src="images/username-icon.webp" alt="Username icon" class="icon">
        <h4>User Name Here</h4>
      </div>
      <div class="column-full flex align-center">
        <img src="images/location-icon.png" alt="Location Icon" class="icon">
        <h4>Location Here</h4>
      </div>
      <div class="column-full">
        <p>User Bio Here</p>
      </div>
      <div class="column-full">
        <a class="edit-profile-btn" href="#" data-view="edit-profile">
          <span>EDIT</span>
        </a>
      </div>
    </div>
  </div>
  */

  var $userNameIcon = document.createElement('img');
  $userNameIcon.setAttribute('src', 'images/username-icon.webp');
  $userNameIcon.setAttribute('alt', 'Username Icon');
  $userNameIcon.className = 'icon';

  var $userName = document.createElement('h4');
  $userName.textContent = profile.username;

  var $userNameBox = document.createElement('div');
  $userNameBox.className = 'column-full flex align-center';
  $userNameBox.appendChild($userNameIcon);
  $userNameBox.appendChild($userName);

  var $locationIcon = document.createElement('img');
  $locationIcon.setAttribute('src', 'images/location-icon.png');
  $locationIcon.setAttribute('alt', 'Location Icon');
  $locationIcon.className = 'icon';

  var $location = document.createElement('h4');
  $location.textContent = profile.location;

  var $locationBox = document.createElement('div');
  $locationBox.className = 'column-full flex align-center';
  $locationBox.appendChild($locationIcon);
  $locationBox.appendChild($location);

  var $userBio = document.createElement('p');
  $userBio.innerText = profile.bio;

  var $bioBox = document.createElement('div');
  $bioBox.className = 'column-full';
  $bioBox.appendChild($userBio);

  // var $editProfileText = document.createElement('span');
  // $editProfileText.textContent = 'EDIT';

  var $editProfileLink = document.createElement('a');
  $editProfileLink.setAttribute('href', '#');
  $editProfileLink.setAttribute('data-view', 'edit-profile');
  $editProfileLink.className = 'edit-profile-btn';
  $editProfileLink.textContent = 'EDIT';
  // $editProfileLink.appendChild($editProfileText);

  var $editProfileBox = document.createElement('div');
  $editProfileBox.className = 'column-full edit-profile-container';
  $editProfileBox.appendChild($editProfileLink);

  var $textBox = document.createElement('div');
  $textBox.className = 'column-half';
  $textBox.appendChild($userNameBox);
  $textBox.appendChild($locationBox);
  $textBox.appendChild($bioBox);
  $textBox.appendChild($editProfileBox);

  var $profilePic = document.createElement('img');
  $profilePic.setAttribute('src', profile.image);
  $profilePic.setAttribute('alt', 'Profile Picture');

  var $profilePicBox = document.createElement('div');
  $profilePicBox.className = 'column-half img-container';
  $profilePicBox.appendChild($profilePic);

  var $fullName = document.createElement('h2');
  $fullName.textContent = profile.fullName;

  var $fullNameBox = document.createElement('div');
  $fullNameBox.className = 'column-full';
  $fullNameBox.appendChild($fullName);

  var $profileDisplay = document.createElement('div');
  $profileDisplay.className = 'row profile-display';
  $profileDisplay.appendChild($fullNameBox);
  $profileDisplay.appendChild($profilePicBox);
  $profileDisplay.appendChild($textBox);

  return $profileDisplay;
}

function fillProfileForm() {
  $profileForm.elements.profileImg.value = data.profile.image;
  $profileForm.elements.userName.value = data.profile.username;
  $profileForm.elements.userFullName.value = data.profile.fullName;
  $profileForm.elements.userLocation.value = data.profile.location;
  $profileForm.elements.userBio.value = data.profile.bio;
  $profilePhoto.setAttribute('src', data.profile.image);
}

function clickOnLink(event) {
  if (event.target.tagName !== 'A') return;
  switchView(event.target.getAttribute('data-view'));
}
