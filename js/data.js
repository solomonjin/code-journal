/* exported data */
/* global $viewList */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousEntries = localStorage.getItem('user-entry-data');
if (previousEntries) data = JSON.parse(previousEntries);

window.addEventListener('beforeunload', handleUnload);

function handleUnload(event) {
  var currentView = '';
  for (var i = 0; i < $viewList.length; i++) {
    if (!$viewList[i].classList.contains('hidden')) currentView = $viewList[i].getAttribute('data-view');
  }
  data.view = currentView;
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('user-entry-data', dataJSON);
}
