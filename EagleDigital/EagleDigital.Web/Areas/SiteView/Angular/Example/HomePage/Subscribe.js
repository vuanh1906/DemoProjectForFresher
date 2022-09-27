$(document).ready(function () {
    FunctionValidate();
});


function FunctionValidate() {
    $.validator.addMethod("ValidEmail", function (value, element) {
        var re = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
        return re.test(value);
    }, 'Please enter a valid email address.');

    var rules = {
        Email: {
            required: true,
            ValidEmail: true
        }
    }
    var messages = {
        Email: {
            required: 'This field is required. Please enter a value.',
            ValidEmail: 'Please enter a valid email address.'
        }
    }

    var frmNote = $('.frmEmailTemplete');
    frmNote.validate({
        errorElement: 'div',
        errorPlacement: function (error, element) {
            var type = $(element).attr("type");
            if (type === "checkbox") {
                error.appendTo(element.parent("p").parent("div"));
            } else {
                error.insertAfter(element).wrap('<div/>');
            }
        },
        rules: rules,
        messages: messages,
        submitHandler: function (form) {
        },
        invalidHandler: function (event, validator) {
        },
        validateOnInit: true
    });
}

function InsertEmailLeter() {
    if (!$('#frmEmailTemplete').valid()) {
        return;
    }
    var email = $("#email-newsletters").val();
    $.ajax({
        cache: false,
        async: false,
        url: '/Home/AddEmailLetter',
        type: "POST",
        data: {
            email : email
        },
        dataType: "json",
        success: function (result) {
            if (result.Status == "Success") {
                $("#divSubscribeSuccess").openModal({
                    dismissible: false
                });
                $("#email-newsletters").val("");
                var frmNote = $('.frmEmailTemplete').validate();
                frmNote.resetForm();
                $("#email-newsletters-error").hide();
            }
        }
    });
}