function renderStatus(statusText) {
    document.getElementById('status').textContent += statusText;
}

document.addEventListener('DOMContentLoaded', function () {

});


/*let list = [];

 document.addEventListener('DOMContentLoaded', function () {
 chrome.tabs.onMoved.addListener(function (tabId, moveInfo) {
 list.push({
 tabId: tabId,
 moveInfo: moveInfo
 });

 chrome.storage.local.set({'tabsList': list}, function () {
 renderStatus('Saved successfully');
 })
 });

 chrome.storage.local.get('tabsList', function (store) {
 for (let tab of store['tabsList']) {
 chrome.tabs.get(tab.tabId, function(realTab){
 console.log(realTab.title);
 });
 }
 });

 chrome.tabs.query({active: true}, function (tabs) {
 tabs.forEach(function (tab) {
 renderStatus(tab.id);
 });
 });
 });*/

