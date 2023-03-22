// ==UserScript==
// @name         移除百度文心一言测试页水印 Remove Baidu ERNIE Bot Test Page Watermark
// @name:en      Remove Baidu ERNIE Bot Test Page Watermark
// @name:zh-CN   移除百度文心一言测试页水印
// @namespace    remove-baidu-ernie-bot-test-page-watermark
// @version      0.1.3
// @description  Why do they put watermark on garbage?
// @description:zh-cn 为什么他们要在垃圾上加水印？
// @description:en Why do they put watermark on garbage?
// @author       Bing Chat & Me
// @match        https://yiyan.baidu.com/
// @grant        none
// @run-at       document-start
// @license      WTFPL
// ==/UserScript==


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

(function() {
    'use strict';

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
