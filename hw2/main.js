

function init(){
    user_off();
    change_main();
}

// change main when bar is clicked
function change_main(){
    var triggers = document.getElementsByClassName("user_bar");
    var handler = function(){
        var target = this.parentNode.parentNode;

        if(target.className === "displaying_main_user"){    // display in sub

            // push right section to mid
            target.parentNode.classList.add("display_off");
            var right = document.getElementById("canvas_right");
            right.id = "canvas_mid";

            // show in sub
            var new_sub_id = "sub"+target.id[4];
            var new_sub = document.getElementById(new_sub_id);
            new_sub.classList.remove("display_off");

            // remove main
            target.classList.add("display_off");
            target.classList.replace("displaying_main_user","main_user");

        }else if(target.className === "user"){              // display in main

            // enable left section
            var left = document.getElementById("canvas_left");
            if(left.classList.length > 0){
                var mid = document.getElementById("canvas_mid");
                left.classList.remove("display_off");
                mid.id = "canvas_right";
            }

            // move main to sub
            var potential_mains = document.getElementsByClassName("main_user");
            if(potential_mains.length < 6){
                var prev_main = document.getElementsByClassName("displaying_main_user")[0];
                var new_sub_id = "sub"+prev_main.id[4];
                var new_sub = document.getElementById(new_sub_id);
                prev_main.classList.replace("displaying_main_user","main_user");
                prev_main.classList.add("display_off");
                new_sub.classList.remove("display_off");
            }
            
            // show in main
            var new_main_id = "main"+target.id[3];
            var new_main = document.getElementById(new_main_id);
            new_main.classList.remove("display_off");
            new_main.classList.replace("main_user","displaying_main_user");

            // remove sub
            target.classList.add("display_off");
        }
    }
    for (var i=0; i<triggers.length; i++){
        triggers[i].addEventListener("click",handler);
    }
}

// remove users when clicked
function user_off(){
    var triggers = document.getElementsByClassName("remove_icn");
    var handler = function(){
        var target = this.parentNode.parentNode;
        if(target.className === "displaying_main_user"){

            target.classList.replace("displaying_main_user","main_user");
            target.parentNode.classList.add("display_off");
            var right = document.getElementById("canvas_right");
            right.id = "canvas_mid";    
        }
        target.classList.add("display_off");
    };
    for (var i=0; i<triggers.length; i++){
        triggers[i].addEventListener("click",handler);
    }
}