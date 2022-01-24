let user_id
let vote_id

window.onload = function() {
    let buttons = document.getElementsByTagName('button');
    for(let i = 0; i < buttons.length; i++) {
        let button = buttons[i];
        button.onclick = function() {
            vote(button.parentElement.parentElement.firstChild.textContent)
        }
    }
    let user_id_sel = $("#user-id")
    let vote_id_sel = $("#vote-id")
    user_id = user_id_sel.text()
    vote_id = vote_id_sel.text()
    user_id_sel.hide()
    vote_id_sel.hide()
}

// function get_voting_properties(){
//     let title = "Wybór przewodniczącego Rady Osiedla Lecha"
//     let desc = "Kandydaci na Przewodniczącego Rady Osiedla Lecha:"
//     let vote_type = 'jawne'
//     let voters_num = "124"
//     let kworum = "83"
//     document.getElementById('vote-type').textContent = vote_type
//     document.getElementById('voters-num').textContent = voters_num
//     document.getElementById('kworum').textContent = kworum
//     document.getElementById('question').textContent = title
//     document.getElementsByClassName("title").item(0).textContent = desc
//     console.log("reading voting prop")
// }

function vote(option_name){
    console.log(option_name)
    let data_to_send = {
        "Mail": $("#login").val(),
        "Code": $("#OTPCode").val()
    }
    console.log(data_to_send)
    $.ajax({
        url: 'http://127.0.0.1:5000/authorize',
        data: JSON.stringify(data_to_send),
        dataType: 'json',
        type: 'POST',
        contentType: 'application/json',
        traditional: true,
        success: function (response) {
            let data_to_send2 = {
                "VoteNumber": vote_id,
                "UserID": user_id,
                "Choice": option_name
            }
            console.log(data_to_send)
            $.ajax({
                url: 'http://127.0.0.1:5000/addVote',
                data: JSON.stringify(data_to_send2),
                dataType: 'json',
                type: 'POST',
                contentType: 'application/json',
                traditional: true,
                success: function (response) {
                    window.location.replace("/happy_ending_html")
                },
                error: function (response) {
                    alert('Nie ściemniaj')
                }
            })
        },
        error: function (response) {
            console.log("problem")
        }
    })

}