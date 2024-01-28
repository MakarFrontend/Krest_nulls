"use strict";
let analitic = false;
let setting = false;
function summaryFunc(elem) {
    if (elem == 'analitic') {
        if (analitic == false) {
            document.querySelector('#listSummaryAnalitic').outerHTML = `<img id="listSummaryAnalitic" src="toTop.png" style="height: 15px; width: 15px;">`;
            analitic = true;
        } else if (analitic == true) {
            document.querySelector('#listSummaryAnalitic').outerHTML = `<img id="listSummaryAnalitic" src="toClose.png" style="height: 15px; width: 15px;">`;
            analitic = false;
        }
    } else if (elem == 'setting') {
        if (setting == false) {
            document.querySelector('#listSummarySetting').outerHTML = `<img id="listSummarySetting" src="toTop.png" style="height: 15px; width: 15px;">`;
            setting = true;
        } else if (setting == true) {
            document.querySelector('#listSummarySetting').outerHTML = `<img id="listSummarySetting" src="toClose.png" style="height: 15px; width: 15px;">`;
            setting = false;
        }
    }
}