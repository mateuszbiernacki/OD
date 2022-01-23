let path = "http://localhost:63342/OD/"

$(document).ready(function () {
    get_groups()
})



function get_groups() {
    $.ajax({
        url: 'http://127.0.0.1:5000/groups',
        dataType: 'json',
        contentType: 'application/json',
        type: 'GET',
        traditional: true,
        success: function (response) {
            $("#ul-groups").append()
            $.each(response, function (index, value){
                $("#ul-groups").append("<li>"+ value+ "</li>")
            })
        },
        error: function (response) {
            console.log(response)
        }
    })
}

function get_votings() {
    $.ajax({
        url: 'http://127.0.0.1:5000/allVotings',
        dataType: 'json',
        contentType: 'application/json',
        type: 'GET',
        traditional: true,
        success: function (response) {
            $("#ul-votings").append()
            $.each(response, function (index, value){
                $("#ul-votings").append("<li>"+ value+ "</li>")
            })
        },
        error: function (response) {
            console.log(response)
        }
    })
}