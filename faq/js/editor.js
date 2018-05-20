$(document).ready(function () {
   $("#btn_show_editor").click(function () {
       $.ajax({url: "../functions/editor_ajax.php",
           success: function (result) {
               $("#div_text_editor").html(result);
           }
       });
       $("#div_text_editor").show();
   });
   $("#btn_hide_editor").click(function () {
       $("#div_text_editor").hide();
   });
});