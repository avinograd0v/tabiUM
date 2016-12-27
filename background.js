/**
 * Created by andrew on 25.12.16.
 */
let all_tabs = {};
let last_tab_id = 0;

chrome.tabs.onActivated.addListener(function(activeInfo){
    chrome.tabs.sendMessage(activeInfo.tabId, {
        name: "update_last_tab",
        last_tab_id: last_tab_id
    });
    last_tab_id = activeInfo.tabId;
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    //if (tab.url !== undefined && changeInfo.status == "complete") {
        all_tabs[tab.id] = {
            tabTitle: tab.title,
            tabUrl: tab.url,
            favUrl: tab.favIconUrl
        };
        chrome.tabs.query({currentWindow: true}, function (tabs) {
            tabs.forEach(function (opened_tab) {
                chrome.tabs.sendMessage(opened_tab.id, {
                    name: "tab_updated",
                    all_tabs: all_tabs
                }, function (response) {
                    //console.log(response.you);
                });
            });
        });
    //}
});

chrome.tabs.onCreated.addListener(function(tab){
    
});

chrome.tabs.onRemoved.addListener(function (tabId) {
    delete all_tabs[tabId];
    chrome.tabs.query({currentWindow: true}, function (tabs) {
        tabs.forEach(function (opened_tab) {
            chrome.tabs.sendMessage(opened_tab.id, {
                name: "tab_removed",
                tabId: tabId
            }, function (response) {
                //console.log(response.you);
            });
        });
    });
});

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.name == "tab_highlight") {
            chrome.tabs.update(+request.tabId, {active: true});
        }
        sendResponse({you: "know"});
    });
