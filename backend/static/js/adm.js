let path = "http://localhost:63342/OD/"

$(document).ready(function () {
    get_groups()
    get_votings()
    $('#ul-votings').on('click', 'li', get_voting_result)
    console.log('document ready')
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
                $("#ul-votings").append("<li " + "id=" + value['nr_głosowania'] + ">"+ value['nr_głosowania']+ " - "+ value['pytanie'] + "</li>")
            })
        },
        error: function (response) {
            console.log(response)
        }
    })
}

function get_voting_result() {
    let voting_id = $(this).attr('id')
    let data_to_send = {
        'VoteNumber': voting_id
    }
    console.log("dupa")

    $.ajax({
        url: 'http://127.0.0.1:5000/results',
        data: JSON.stringify(data_to_send),
        dataType: 'json',
        type: 'POST',
        contentType: 'application/json',
        traditional: true,
        success: function (response) {
            console.log(response)
        },
        error: function (response) {
            console.log(response)
        }
    })
}