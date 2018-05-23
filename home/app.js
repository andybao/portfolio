import Promise from 'bluebird';
import preStyles from 'raw-loader!./prestyles.css';
import {default as writeChar, writeSimpleChar} from "./lib/writeChar";
let styleText = [0].map(function(i) { return require('raw-loader!./styles' + i + '.css'); });
import txt_0 from 'raw-loader!./txt/0.txt';
import txt_1 from 'raw-loader!./txt/1.txt';
import txt_2 from 'raw-loader!./txt/2.txt';
import txt_3 from 'raw-loader!./txt/3.txt';
import txt_4 from 'raw-loader!./txt/4.txt';
import txt_5 from 'raw-loader!./txt/5.txt';
import txt_6 from 'raw-loader!./txt/6.txt';
import txt_7 from 'raw-loader!./txt/7.txt';
import txt_8 from 'raw-loader!./txt/8.txt';
import txt_9 from 'raw-loader!./txt/9.txt';
import txt_10 from 'raw-loader!./txt/10.txt';
let style, styleEl, workEl, pgpEl, skipAnimationEl, pauseEl, textbtn;
let displaySpeed = 0;

const isLocal = window.location.hostname === 'localhost';

document.addEventListener("DOMContentLoaded", function() {
    let t = document.getElementById('info');


    getEls();

    startAnimation();

    $("#f_c_btn").click(function () {
       faqClientAnimation();
    });
    
    $("#f_a_create_btn").click(function () {
        faqAdminCreateAnimation();
    });

    $("#f_a_edit_btn").click(function () {
       faqAdminEditAnimation();
    });

    $("#f_a_delete_btn").click(function () {
        faqAdminDeleteAnimation();
    });

    $("#h_c_btn").click(function () {
        chatClientAnimation();
    });

    $("#h_a_btn").click(function () {
       chatAdminAnimation();
    });

    $("#g_v_btn").click(function () {
       gameVideoAnimation();
    });

    $("#g_p_btn").click(function () {
        gamePlayerAnimation();
    })
});

async function startAnimation() {
    try {
        //await writeTo(styleEl, styleText[0], 0, 16, true, 1);
        await writeTo(workEl, txt_0, 0, displaySpeed, false, 1);
        await $("#card").show("slow");
        await Promise.delay(2000);
        await writeTo(workEl, txt_1, 0, displaySpeed, false, 1);
        await Promise.delay(2000);
        await writeTo(workEl, txt_2, 0, displaySpeed, false, 1);
        await $("#f_c_btn").prop('disabled', false);
    }
        // Flow control straight from the ghettos of Milwaukee
    catch(e) {
        throw e;
    }
}

async function faqClientAnimation() {
    try {
        //await writeTo(styleEl, styleText[0], 0, 16, true, 1);
        await writeTo(workEl, txt_3, 0, displaySpeed, false, 1);
        await $("#f_c_btn").prop('disabled', true);
        await $("#f_a_create_btn").prop('disabled', false);
    }
        // Flow control straight from the ghettos of Milwaukee
    catch(e) {
        throw e;
    }
}

async function faqAdminCreateAnimation() {
    try {
        //await writeTo(styleEl, styleText[0], 0, 16, true, 1);
        await writeTo(workEl, txt_4, 0, displaySpeed, false, 1);
        await $("#f_a_create_btn").prop('disabled', true);
        await $("#f_a_edit_btn").prop('disabled', false);
    }
        // Flow control straight from the ghettos of Milwaukee
    catch(e) {
        throw e;
    }
}

async function faqAdminEditAnimation() {
    try {
        //await writeTo(styleEl, styleText[0], 0, 16, true, 1);
        await writeTo(workEl, txt_5, 0, displaySpeed, false, 1);
        await $("#f_a_edit_btn").prop('disabled', true);
        await $("#f_a_delete_btn").prop('disabled', false);
    }
        // Flow control straight from the ghettos of Milwaukee
    catch(e) {
        throw e;
    }
}

async function faqAdminDeleteAnimation() {
    try {

        await $("#f_a_delete_btn").prop('disabled', true);

        if (isLocal) {
            await writeTo(workEl, txt_8, 0, displaySpeed, false, 1);
            await $("#g_v_btn").prop('disabled', false);
        } else {
            await writeTo(workEl, txt_6, 0, displaySpeed, false, 1);
            await $("#h_c_btn").prop('disabled', false);
        }


    }
        // Flow control straight from the ghettos of Milwaukee
    catch(e) {
        throw e;
    }
}

async function chatClientAnimation() {
    try {
        //await writeTo(styleEl, styleText[0], 0, 16, true, 1);
        await writeTo(workEl, txt_7, 0, displaySpeed, false, 1);
        await $("#h_c_btn").prop('disabled', true);
        await $("#h_a_btn").prop('disabled', false);
    }
        // Flow control straight from the ghettos of Milwaukee
    catch(e) {
        throw e;
    }
}

async function chatAdminAnimation() {
    try {
        //await writeTo(styleEl, styleText[0], 0, 16, true, 1);
        await writeTo(workEl, txt_8, 0, displaySpeed, false, 1);
        await $("#h_a_btn").prop('disabled', true);
        await $("#g_v_btn").prop('disabled', false);
    }
        // Flow control straight from the ghettos of Milwaukee
    catch(e) {
        throw e;
    }
}

async function gameVideoAnimation() {
    try {
        //await writeTo(styleEl, styleText[0], 0, 16, true, 1);
        await writeTo(workEl, txt_9, 0, displaySpeed, false, 1);
        await $("#g_v_btn").prop('disabled', true);
        await $("#g_p_btn").prop('disabled', false);
    }
    // Flow control straight from the ghettos of Milwaukee
catch(e) {
        throw e;
    }
}

async function gamePlayerAnimation() {

    try {

        await writeTo(workEl, txt_10, 0, displaySpeed, false, 1);
        await $("#g_p_btn").prop('disabled', true);

    }
        // Flow control straight from the ghettos of Milwaukee
    catch(e) {
        throw e;
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