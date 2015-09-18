var clickedEl = null;
var idRegex = /trello\.com\/.+\/.+\/(\d+).+/;

document.addEventListener("mousedown", function(event) {
  if(event.button === 2) {
    clickedEl = event.target;
  }
}, true);

chrome.runtime.onMessage.addListener(function(request, options, sendResponse) {
  if (request.type === 'menu-click') {
    var text = clickedEl.innerText;
    var match = idRegex.exec(clickedEl.href);
    var id = match[1];

    chrome.storage.sync.get({
      template: 'trello#${id} ${title}'
    }, function(items) {
      var result = items.template.replace('${id}', id).replace('${title}', text);

      var copyFrom = document.createElement('textarea');
      copyFrom.textContent = result;
      document.body.appendChild(copyFrom);
      copyFrom.focus();
      document.execCommand('SelectAll');

      try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copy email command was ' + msg);
      } catch(err) {
        console.log('Oops, unable to copy');
      }

      document.body.removeChild(copyFrom);
      alert('"' + result + '" in clipboard');
    });
  }
});
