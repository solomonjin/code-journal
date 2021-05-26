/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
  profile: {}
};

var previousEntries = localStorage.getItem('user-entry-data');
if (previousEntries) data = JSON.parse(previousEntries);

window.addEventListener('beforeunload', handleUnload);

function handleUnload(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('user-entry-data', dataJSON);
}
