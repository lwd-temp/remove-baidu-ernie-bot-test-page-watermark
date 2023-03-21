// ==UserScript==
// @name         Remove Baidu ERNIE Bot Test Page Watermark
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  Why do they put watermark on garbage?
// @author       Bing Chat & Me
// @match        https://yiyan.baidu.com/
// @grant        none
// @run-at       document-start
// @license      WTFPL
// ==/UserScript==

(function() {
    'use strict';

    // Save the original MutationObserver constructor
    const OriginalMutationObserver = window.MutationObserver;

    // Define a custom MutationObserver constructor that does nothing
    function CustomMutationObserver(callback) {
        // Do nothing
        return {
            observe: function () {},
            disconnect: function () {},
            takeRecords: function () { return []; }
        };
    }

    // Assign the custom constructor to the window object
    window.MutationObserver = CustomMutationObserver;

    // Optionally, you can restore the original constructor later if needed
    // window.MutationObserver = OriginalMutationObserver;

    function delWM(){
        // 获取所有有ShadowRoot的元素
        let elements = [...document.querySelectorAll('*')].filter(el => el.shadowRoot);
        // 遍历每个元素的ShadowRoot
        for (let el of elements) {
            // 获取ShadowRoot中所有id包含mask_div的元素
            let maskDivs = el.shadowRoot.querySelectorAll('[id*="mask_div"]');
            // 遍历并删除这些元素
            for (let div of maskDivs) {
                div.remove();
            }
        }
    }

    var intervalID = setInterval (delWM, 1000);
})();
