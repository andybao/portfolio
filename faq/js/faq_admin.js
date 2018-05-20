var faq_id;
var title_id;
var title_obj;
var title_text;
var info_id;
var info_obj;
var info_text;
var editor_div_id;
var editor_div_obj;
var editor_obj;
var edit_button_id;
var edit_button_obj;
var delete_button_id;
var delete_button_obj;
var cancel_button_id;
var cancel_button_obj;
var submit_button_id;
var submit_button_obj;
var edit_error_msg_id;
var edit_error_msg_obj;

function create() {
    page_init();
    $('#new_div_id').removeClass('invisible');
    $('#edit_div_id').hide();
    $('#search').hide();
    $('#create').hide();
    $('#create_error_msg').empty();
    $('#title_new').empty();
    $('#editor').empty();
}

function create_cancel() {
    $('#new_div_id').addClass('invisible');
    $('#edit_div_id').show();
    $('#search').show();
    $('#create').show();
    $('#create_error_msg').empty();
    $('#title_new').empty();
    $('#editor').empty();
}

function create_submit() {
    var error_msg_obj = $('#create_error_msg');

    var title = $('#title_new').text();
    var info = $('#editor').html();

    var userInputCheckResult = submitCheck(title, info, error_msg_obj, true);

    if (userInputCheckResult) {
        var f = new faq(null, title, info, 'create');
        var f_json = JSON.stringify(f);

        var db_result = getObjFromJson(null, f_json);

        if (db_result == true) {
            location.reload(true);
        } else {
            error_msg_obj.text(db_result);
        }
    }

    
}

function edit(html_id) {
/*
    var id_obj = getObjFromJson('id');

    for (var i = 0; i < id_obj.length; i ++) {
        edit_cancel(id_obj[i]);
    }
*/
    page_init();

    init(html_id);
    content_init(html_id);

    title_obj.prop('contentEditable', 'true');
    title_obj.css('border', '1px solid silver');
    title_obj.css('border-radius', '5px');
    title_obj.css('box-shadow', 'inset 0 0 10px silver')

    info_obj.hide();

    $.post('../functions/editor_ajax.php', { info: info_text }, function(result) {
        editor_div_obj.html(result);
    });

    edit_button_obj.addClass('invisible');
    delete_button_obj.addClass('invisible');
    cancel_button_obj.removeClass('invisible');
    cancel_button_obj.addClass('visible');
    submit_button_obj.removeClass('invisible');
    submit_button_obj.addClass('visible');
}

function edit_cancel(html_id) {

    init(html_id);

    content_init(html_id);

    editor_div_obj.empty();
    edit_error_msg_obj.empty();

    style_init();

}

function edit_submit(html_id) {

    edit_error_msg_obj.empty();

    var title = title_obj.text();
    editor_obj = $('#editor');
    var info = editor_obj.html();

    var userInputCheckResult = submitCheck(title, info, edit_error_msg_obj);

    if (userInputCheckResult) {
        var f = new faq(faq_id, title, info, 'update');
        var f_json = JSON.stringify(f);

        var db_result = getObjFromJson(null, f_json);

        if (db_result == true) {
            location.reload(true);
        } else {
            error_msg_obj.text(db_result);
        }
    }

    console.log(title + '  ' + info);
    console.log(edit_error_msg_obj);
}

function del(html_id) {
    var faq_id = getFaqId(html_id);
    var faq_obj = getObjFromJson(null, null, faq_id);

    var title_text = faq_obj['faq_title'];

    var delConfirmText = 'FAQ ' + faq_id + ' will be deleted!\n' + title_text;
    var userInput = confirm(delConfirmText);

    if (userInput == true) {

        var f = new faq(faq_id, null, null, 'delete');
        var f_json = JSON.stringify(f);

        var db_result = getObjFromJson(null, f_json);

        if (db_result == true) {
            location.reload(true);
        }

    }
}

function init(id) {

    faq_id = getFaqId(id);
    /*
    if (id.includes('_')) {
        var arr = id.split('_');

        faq_id = arr[1];

    }
    else {
        faq_id = id;
    }*/

    title_id = 'title_' + faq_id;
    title_obj = $('#' + title_id);


    info_id = 'info_' + faq_id;
    info_obj = $('#' + info_id);


    editor_div_id = 'editor_div_' + faq_id;
    editor_div_obj = $('#' + editor_div_id);


    edit_button_id = 'edit_' + faq_id;
    edit_button_obj = $('#' + edit_button_id);


    delete_button_id = 'delete_' + faq_id;
    delete_button_obj = $('#' + delete_button_id);


    cancel_button_id = 'cancel_' + faq_id;
    cancel_button_obj = $('#' + cancel_button_id);


    submit_button_id = 'submit_' + faq_id;
    submit_button_obj = $('#' + submit_button_id);

    edit_error_msg_id = 'msg_' + faq_id;
    edit_error_msg_obj = $('#' + edit_error_msg_id);

}

function content_init(id) {

    var faq_id = getFaqId(id);
    /*
    if (id.includes('_')) {
        var arr = id.split('_');

        faq_id = arr[1];

    }
    else {
        faq_id = id;
    }*/
    var faq_obj = getObjFromJson(null, null, faq_id);

    title_text = faq_obj['faq_title'];
    info_text = faq_obj['faq_info'];
    title_obj.text(title_text);
    info_obj.html(info_text);
}

function style_init() {
    title_obj.prop('contentEditable', 'false');
    title_obj.css('border', '');
    title_obj.css('border-radius', '');
    title_obj.css('box-shadow', '');

    info_obj.show();

    edit_button_obj.removeClass('invisible');

    delete_button_obj.removeClass('invisible');

    cancel_button_obj.removeClass('visible');
    cancel_button_obj.addClass('invisible');

    submit_button_obj.removeClass('visible');
    submit_button_obj.addClass('invisible');
}

function page_init() {
    var id_obj = getObjFromJson('id');

    for (var i = 0; i < id_obj.length; i ++) {
        edit_cancel(id_obj[i]);
    }
}

function getFaqId(id) {
    var faq_id;

    if (id.includes('_')) {
        var arr = id.split('_');

        faq_id = arr[1];

    }
    else {
        faq_id = id;
    }

    return faq_id;

}

function faq(id, faq_title, faq_info, action) {
    this.id = id;
    this.faq_title = faq_title;
    this.faq_info = faq_info;
    this.action = action;
}

function submitCheck(title, info, error_msg_obj, new_data=false) {
    error_msg_obj.empty();

    var error_msg = '';

    if (!title.trim()) {
        error_msg = 'Title cannot be empty';
    }

    else if (!info.trim()) {
        error_msg = 'Answer cannot be empty';
    }
    else {
        var title_obj = getObjFromJson('faq_title');
        var info_obj = getObjFromJson('faq_info');

        if (new_data) {
            var duplicate_flag = false;

            for (var i = 0; i < title_obj.length; i ++) {
                if (title == title_obj[i]) {
                    error_msg = 'There is a same title in the DB';
                    duplicate_flag = true;
                }
            }

            if (!duplicate_flag) {
                for(var i = 0; i < info_obj.length; i ++) {
                    if (info == info_obj[i]) {
                        error_msg = 'There is a same answer in the DB';
                    }
                }
            }
        }
        else {
            var title_duplicate_flag = false;
            var info_duplicate_flag = false;
            for (var i = 0; i < title_obj.length; i ++) {
                if (title == title_obj[i]) {
                    title_duplicate_flag = true;
                }
            }
            for(var i = 0; i < info_obj.length; i ++) {
                if (info == info_obj[i]) {
                    info_duplicate_flag = true;
                }
            }
            if (title_duplicate_flag && info_duplicate_flag) {
                error_msg = 'There is not any change';
            }
        }
    }

    if (error_msg != '') {
        error_msg_obj.text(error_msg);
        return false;
    } else {
        return true
    }

}

function getObjFromJson(request = null, faq_json = null, faq_id = null){

    var url = '../functions/faq_helper/faq_ajax.php';

    var http = new XMLHttpRequest(); // a new request

    var params;

    if (request != null) {

        params = 'request=' + request;
    }
    else if (faq_json != null) {

        params = 'faq=' + faq_json;
    }
    else if (faq_id != null) {
        params = 'id=' + faq_id;
    }
    else {

        params = '';
    }

    http.open('POST',url,false);

    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    //alert(params);

    http.send(params);

    //alert(http.responseText);

    return JSON.parse(http.responseText);
}