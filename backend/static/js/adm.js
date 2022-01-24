let path = "http://localhost:63342/OD/"

$(document).ready(function () {
    get_groups()
    get_votings()
    $('#ul-votings').on('click', 'li', get_voting_result)
    $("#new-group-button").click(add_new_group)
    $("#new-voting-button").click(add_new_voting)
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
    let voting_text = $(this).text()
    $('#voting-question span').text(voting_text)
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
            $("#ul-voting-result li").remove()
            $.each(response, function (index, value){
                $("#ul-voting-result").append("<li>"+ value['wybór']+ ": "+ value['głosów'] + "</li>")
            })
        },
        error: function (response) {
            console.log(response)
        }
    })
}

function add_new_group() {
    console.log(':(')
}

function add_new_voting() {
    let question = $('#new-voting-name').val()
    let qorum = $('#qorum-number').val()
    let start = new Date($('#date-from').val())
    let start_year = start.getFullYear()
    let start_month = start.getMonth() + 1
    let start_day = start.getDate()
    let start_hour = start.getHours()
    let start_mins = start.getMinutes()
    let start_text = start_day + '.' + start_month + '.' + start_year + ' ' + start_hour + ':' + start_mins
    let end = new Date($('#date-to').val())
    let end_year = end.getFullYear()
    let end_month = end.getMonth() + 1
    let end_day = end.getDate()
    let end_hour = end.getHours()
    let end_mins = end.getMinutes()
    let end_text = end_day + '.' + end_month + '.' + end_year + ' ' + end_hour + ':' + end_mins
    let options = $('#options-input').val()
    let entitled = $('#grups-input').val()
    let voting_open = $('#secret-checkbox')[0].checked
    let data_to_send = {
        'Question': question,
        'Qorum': qorum,
        'Start': start_text,
        'End': end_text,
        'Options': options,
        'Entitled': entitled,
        "VotingOpen": voting_open

    }
    console.log(start_text)
    console.log("dupa")

    $.ajax({
        url: 'http://127.0.0.1:5000/newVoting',
        data: JSON.stringify(data_to_send),
        dataType: 'json',
        type: 'POST',
        contentType: 'application/json',
        traditional: true,
        success: function (response) {
            console.log(response)
            $("#ul-votings li").remove()
            get_votings()
        },
        error: function (response) {
            console.log(response)
        }
    })
}