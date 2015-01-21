/**
 * Created by hvaras on 20-01-15.
 */

function add_user(data) {
    // TODO: Should use some template here!

    if (!$("#" + data.nick).length)
        $('#dancefloor').append("<div class='dancer'><div class='nickname'>" + data.nick + "</div><div class='user hi' id='" + data.nick + "'></div></div>");
}

function process_action(action, data) {
    nick = $("#dancefloor #" + data.nick);

    // action is an array ['event string', 'group1'], so we need action[1]
    nick.attr('class', 'user').addClass(action[1]);

    if (action[1]=="left"){
        var audio = new Audio('/hand-clap-2.wav');
        audio.play();
    }
    if (action[1]=="right"){
        var audio = new Audio('/guitar.wav');
        audio.play();
    }
    if (action[1]=="hi"){
        var audio = new Audio('/drum.mp3');
        audio.play();
    }
}


