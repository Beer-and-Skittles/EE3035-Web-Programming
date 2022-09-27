// global variables
var user_num = 6;
var main_num = 1;
var max_user_num = 15;
var id_endings = "0123456789abcde";

var space_m = [   
    [1],        // 1
    [2],        // 2
    [3],        // 3
    [4],        // 4
    [3,2],      // 5
    [3,3],      // 6
    [4,3],      // 7
    [4,4],      // 8
    [3,3,3],    // 9
    [4,3,3],    // 10
    [4,4,3],    // 11
    [4,4,4],    // 12
    [5,4,4],    // 13
    [5,5,4],    // 14
    [5,5,5]     // 15
]

var space_r = [
    [1],        // 1
    [1,1],      // 2
    [1,1,1],    // 3
    [2,2],      // 4
    [2,2,1],    // 5
    [2,2,2],    // 6
    [2,2,2,1],  // 7
    [2,2,2,2],  // 8
    [3,3,3],    // 9
    [3,3,2,2],  // 10
    [3,3,3,2],  // 11
    [3,3,3,3],  // 12
    [3,3,3,2,2],// 13
    [3,3,3,3,2],// 14
]

function init(){
    setInterval(show_time,10);
    add_user();
    user_off();
    change_main();
}

// pretty display
function pretty_display(){

    let sub_num = user_num - main_num;

    // check if left takes dominance
    let left  = document.getElementById("canvas_left");
    let right = document.getElementsByClassName("canvas_right_buffer")[0]; 
    if(sub_num === 0){
        left.classList.add("canvas_left_full");
        right.classList.add("display_off");
    }else{
        left.classList.remove("canvas_left_full");
        right.classList.remove("display_off");
        
    }

    // adjust user width and height
    let type = (main_num === 1) ? "_r_" : "_m_";
    let spacing = (main_num === 1) ? space_r[sub_num-1] : space_m[sub_num-1];
    let users = document.getElementsByClassName("user");
    let col = 0;
    let row = 0;
    for(let i=0; i<users.length; i++){
        if(users[i].classList.length == 3){   // if user is on display
            
            let new_width = "w"+type+spacing[row];
            let new_height = "h"+type+(spacing.length);
            users[i].className = "user " + new_width + " " + new_height;

            col += 1;
            if(col >= spacing[row]){
                col = 0;
                row += 1;
            }
        }
    }
}

// add users when add is clicked, in numerical order
function add_user(){
    let trigger = document.getElementById("add_btn");
    let handler = function(){
        
        if(user_num < max_user_num){
            for(let i=0; i<id_endings.length; i++){

                let sub_id  = "sub"+id_endings[i];
                let main_id = "main"+id_endings[i];
                let sub_target  = document.getElementById(sub_id);
                let main_target = document.getElementById(main_id);

                // display is off in both sub and main area
                if(sub_target.classList.length == 4 && main_target.classList.length == 2){   // display is off on both sub and main
                    sub_target.classList.remove("display_off");
                    user_num += 1;
                    break;
                }   
            }
        }
        pretty_display();
    }
    trigger.addEventListener("click",handler);
}

// change main when bar is clicked
function change_main(){
    let triggers = document.getElementsByClassName("user_bar");
    let handler = function(){
        let target = this.parentNode.parentNode;

        if(target.className === "displaying_main_user"){    // display in sub

            // push right section to mid
            target.parentNode.classList.add("display_off");
            let right = document.getElementById("canvas_right");
            right.id = "canvas_mid";

            // show in sub
            let new_sub_id = "sub"+target.id[4];
            let new_sub = document.getElementById(new_sub_id);
            new_sub.classList.remove("display_off");

            // remove main
            target.classList.add("display_off");
            target.classList.replace("displaying_main_user","main_user");

            main_num = 0;
            // alert("main num is 0");

        }else if(target.classList[0] === "user"){              // display in main

            // enable left section
            let left = document.getElementById("canvas_left");
            if(left.classList.length > 0){
                let mid = document.getElementById("canvas_mid");
                left.classList.remove("display_off");
                mid.id = "canvas_right";
            }

            // move main to sub
            let potential_mains = document.getElementsByClassName("main_user");
            if(potential_mains.length < max_user_num){
                let prev_main = document.getElementsByClassName("displaying_main_user")[0];
                let new_sub_id = "sub"+prev_main.id[4];
                let new_sub = document.getElementById(new_sub_id);
                prev_main.classList.replace("displaying_main_user","main_user");
                prev_main.classList.add("display_off");
                new_sub.classList.remove("display_off");
            }
            
            // show in main
            let new_main_id = "main"+target.id[3];
            let new_main = document.getElementById(new_main_id);
            new_main.classList.remove("display_off");
            new_main.classList.replace("main_user","displaying_main_user");

            // remove sub
            target.classList.add("display_off");
            main_num = 1;
        }
        pretty_display();
    }
    for (let i=0; i<triggers.length; i++){
        triggers[i].addEventListener("click",handler);
    }
}

// remove users when clicked
function user_off(){
    let triggers = document.getElementsByClassName("remove_icn");
    let handler = function(){
        let target = this.parentNode.parentNode;
        if(target.className === "displaying_main_user"){

            target.classList.replace("displaying_main_user","main_user");
            target.parentNode.classList.add("display_off");
            let right = document.getElementById("canvas_right");
            right.id = "canvas_mid";    
            main_num = 0;
        }
        target.classList.add("display_off");
        user_num -= 1;
        pretty_display();
    };
    for (let i=0; i<triggers.length; i++){
        triggers[i].addEventListener("click",handler);
    }
}

// set correct time
function show_time(){
    let present = new Date();
    let meridiem = "早上";
    let hour = present.getHours();
    let minute = present.getMinutes();
    let second = present.getSeconds();

    if(hour > 12){
        meridiem = "晚上";
        hour -= 12;
    }
    if(hour < 10){
        hour = "0" + hour;
    }
    if(minute < 10){
        minute = "0" + minute;
    }
    if(second < 10){
        second = "0" + second;
    }

    let current_time = meridiem + " " + hour + ":" + minute + ":" + second;
    let meeting_name = " | cxw-enqy-sub";
    document.getElementById("current_time").innerHTML = current_time + meeting_name;
}
