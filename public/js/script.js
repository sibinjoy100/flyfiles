$(function(){
    bs_input_file();
    $('#myModal').on('hidden.bs.modal', function () {
        $('.modal-body').empty();
    });
});


$('.downloadBtn').click(function(e){
    const myip = $('.myip').val();
    const form_data = new FormData();

    if(typeof $("#file").prop('files')[0] === 'undefined'){
        window.alert("Please choose file to share then click on \'Show QR\' button")
    } else{
        const file = $("#file").prop('files')[0];
        form_data.append("file", file);
        console.log(window.location.href);
        var settings = {
            // url: 'http://'+myip,
            url: window.location.href,
            type: 'POST',
            data: form_data,
            dataType: 'json',
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            crossDomain: true
        };

        // Api call
        $.ajax(settings).done(function(response) {
            var status = response.status;
            if(status === true) {
                $( ".modal-body" ).append( response.svgContent );
                $('#myModal').modal('show');
            } else{
                window.alert(response.msg);
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            if(jqXHR.status == 403 || jqXHR.status == 405){
                console.log('Server error. ' + jqXHR.status + '. ' + textStatus + '. ' + errorThrown);
            }     
            window.alert('Seems like something is wrong .Please try again');
        });   
    }
});


function bs_input_file() {
    $(".input-file").before(
        function() {
            if ( ! $(this).prev().hasClass('input-ghost') ) {
                var element = $("<input type='file' class='input-ghost' id='file' style='visibility:hidden; height:0'>");
                element.attr("name",$(this).attr("name"));
                element.change(function(){
                    element.next(element).find('input').val((element.val()).split('\\').pop());
                });
                $(this).find("button.btn-choose").click(function(){
                    element.click();
                });
                $(this).find("button.btn-reset").click(function(){
                    element.val(null);
                    $(this).parents(".input-file").find('input').val('');
                });
                $(this).find('input').css("cursor","pointer");
                $(this).find('input').mousedown(function() {
                    $(this).parents('.input-file').prev().click();
                    return false;
                });
                return element;
            }
        }
    );
}