window.onload = function() {
    let buttons = document.getElementsByTagName('button');
    for(let i = 0; i < buttons.length; i++) {
        let button = buttons[i];
        button.onclick = function() {
            vote(button.parentElement.parentElement.firstChild.textContent.slice(0, -1))
        }
    }
    get_voting_properties()
}

function get_voting_properties(){
    let title = "Wybór przewodniczącego Rady Osiedla Lecha"
    let desc = "Kandydaci na Przewodniczącego Rady Osiedla Lecha:"
    let vote_type = 'jawne'
    let voters_num = "124"
    let kworum = "83"
    document.getElementById('vote-type').textContent = vote_type
    document.getElementById('voters-num').textContent = voters_num
    document.getElementById('kworum').textContent = kworum
    document.getElementById('question').textContent = title
    document.getElementsByClassName("title").item(0).textContent = desc
    console.log("reading voting prop")
}

function vote(option_name){
    console.log(option_name)
    alert("Oddałeś głos na " + option_name)
}