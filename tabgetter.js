/**
 * Created by andrew on 23.12.16.
 */
let last_tab = 0;

$(document.documentElement).append('<div id="tabsbar"><div id="supertabs">Нет супервкладок |</div><div id="normaltabs"></div></div>');

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.name === "tab_updated") {
            $('#normaltabs').html("");
            for (let [id, tab] of Object.entries(request.all_tabs)){
                $('#normaltabs').append(`<div id="tab_number_${ id }"><img class="favicon" src="${ tab.favUrl }"><a href="#">${ tab.tabTitle }</a></div>`);
            }
        }

        if (request.name === "tab_removed") {
            $(`#tab_number_${ request.tabId }`).remove();
        }

        if (request.name === "update_last_tab") {
            console.log(request.last_tab_id, last_tab);
            $(`#tab_number_${ request.last_tab_id }`).addClass("last-tab");

            if(last_tab !== request.last_tab_id) {
                $(`#tab_number_${ last_tab }`).removeClass("last-tab");
            }

            last_tab = request.last_tab_id;
        }

        sendResponse({you: "know"});
    });

$('#tabsbar').on('click', 'div[id^=tab_number_]', function (e) {
    e.preventDefault();
    let tabId  = $(this).attr('id').split('_')[2];
    chrome.runtime.sendMessage({name: "tab_highlight", tabId: tabId}, function (response) {
        console.log("success");
    });
});
