$(document).ready(function () {
    $("#login-button").click(admin_log)
    $("#reg-button").click(admin_reg)
})



function admin_reg() {
    window.location.replace("/reg_html")
}

function admin_log() {
    let data_to_send = {
        "Mail": $("#login").val(),
        "Password": $("#password").val(),
        "OTPCode": $("#OTPCode").val()
    }
    console.log(data_to_send)
    $.ajax({
        url: 'http://127.0.0.1:5000/adminLogin',
        data: JSON.stringify(data_to_send),
        dataType: 'json',
        type: 'POST',
        contentType: 'application/json',
        traditional: true,
        success: function (response) {
            window.location.replace('/menu')
        },
        error: function (response) {
            console.log("problem")
        }
    })
}