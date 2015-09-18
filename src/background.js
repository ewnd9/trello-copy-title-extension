chrome.runtime.onInstalled.addListener(function() {
  var context = 'link';
  var title = 'Copy title';
  var id = chrome.contextMenus.create({
    'title': title,
    'contexts': [context],
    'id': 'context' + context,
    'documentUrlPatterns': ['*://trello.com/*']
  });

  chrome.tabs.create({ url: 'options.html' }, function (tab) {
  });
});

function onClickHandler(info, tab) {
  chrome.tabs.sendMessage(tab.id, { type: 'menu-click' });
};

chrome.contextMenus.onClicked.addListener(onClickHandler);
