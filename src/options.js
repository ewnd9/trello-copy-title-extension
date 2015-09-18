function save_options() {
  var template = document.getElementById('template').value;

  chrome.storage.sync.set({
    template: template,
  }, function() {
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function restore_options() {
  chrome.storage.sync.get({
    template: 'trello#${id} ${title}'
  }, function(items) {
    document.getElementById('template').value = items.template;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
