let count = 1;
document.getElementById("radio1").checked = true;

setInterval( function(){
    nextImage();
}, 3500)

function nextImage(){
    count++;
    if(count > 3){
        count = 1;
    }


    if (count == 1) {
        btn_2.style = "background-color: transparent;"
        btn_3.style = "background-color: transparent;"
        btn_1.style = "background-color: #ffffff;"
    } else if (count == 2) {
        btn_1.style = "background-color: transparent;"
        btn_3.style = "background-color: transparent;"
        btn_2.style = "background-color: #ffffff;"
        
    } else if (count == 3) {
        btn_1.style = "background-color: transparent;"
        btn_2.style = "background-color: transparent;"
        btn_3.style = "background-color: #ffffff;"
    }
    document.getElementById("radio"+count).checked = true;
}