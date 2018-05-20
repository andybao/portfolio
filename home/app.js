import getPrefix from './lib/getPrefix';
import Promise from 'bluebird';
import preStyles from 'raw-loader!./prestyles.css';
import {default as writeChar, writeSimpleChar} from "./lib/writeChar";
let styleText = [0].map(function(i) { return require('raw-loader!./styles' + i + '.css'); });
import workText from 'raw-loader!./info.txt';
import testText from 'raw-loader!./testinfo.txt';
let style, styleEl, workEl, pgpEl, skipAnimationEl, pauseEl, textbtn;
let browserPrefix;


document.addEventListener("DOMContentLoaded", function() {
    let t = document.getElementById('info');


    getEls();

    startAnimation();

    $("#test_btn").click(function () {
       testAnimation();
    });

});



async function startAnimation() {
    try {
        //await writeTo(styleEl, styleText[0], 0, 16, true, 1);
        await writeTo(workEl, workText, 0, 16, false, 1);
        $("#card").show("slow");


    }
        // Flow control straight from the ghettos of Milwaukee
    catch(e) {
        if (e.message === "SKIP IT") {

        } else {
            throw e;
        }
    }
}

async function testAnimation() {
    try {
        //await writeTo(styleEl, styleText[0], 0, 16, true, 1);
        await writeTo(workEl, testText, 0, 16, false, 1);
    }
        // Flow control straight from the ghettos of Milwaukee
    catch(e) {
        if (e.message === "SKIP IT") {

        } else {
            throw e;
        }
    }
}

let endOfSentence = /[\.\?\!]\s$/;
let comma = /\D[\,]\s$/;
let endOfBlock = /[^\/]\n\n$/;

async function writeTo(el, message, index, interval, mirrorToStyle, charsPerInterval){
    // Write a character or multiple characters to the buffer.
    let chars = message.slice(index, index + charsPerInterval);
    index += charsPerInterval;

    // Ensure we stay scrolled to the bottom.
    el.scrollTop = el.scrollHeight;

    // If this is going to <style> it's more complex; otherwise, just write.
    if (mirrorToStyle) {
        writeChar(el, chars, style);
    } else {
        writeSimpleChar(el, chars);
    }

    // Schedule another write.
    if (index < message.length) {
        let thisInterval = interval;
        let thisSlice = message.slice(index - 2, index + 1);
        if (comma.test(thisSlice)) thisInterval = interval * 30;
        if (endOfBlock.test(thisSlice)) thisInterval = interval * 50;
        if (endOfSentence.test(thisSlice)) thisInterval = interval * 70;

        await Promise.delay(thisInterval);

        return writeTo(el, message, index, interval, mirrorToStyle, charsPerInterval);
    }
}

//
// Put els into the module scope.
//
function getEls() {
    // We're cheating a bit on styles.
    let preStyleEl = document.createElement('style');
    preStyleEl.textContent = preStyles;
    document.head.insertBefore(preStyleEl, document.getElementsByTagName('style')[0]);

    // El refs
    style = document.getElementById('style-tag');
    styleEl = document.getElementById('style-text');
    workEl = document.getElementById('work-text');
    pgpEl = document.getElementById('pgp-text');
    textbtn = document.getElementById('test_btn');

}