// 차트
// $(window).ready(function(){
    // draw(85, '.chart1', '#8ec48e');
    // draw(85, '.chart2', '#60985e');
    // draw(60, '.chart3', '#417b42');
    // draw(70, '.chart4', '#356a46');
    // draw(90, '.chart5', '#25542b');
    // draw(85, '.chart6', '#0c391d');
// });



function draw(max, classname, colorname){
    var i = 1;
    var func1 = setInterval(function(){
        if ( i<max ){
            color1(i, classname, colorname);
            i++;
            countFn(i, classname);
        } else {
            clearInterval(func1);
        }
    },40);
}
function countFn(i, classname){
    $(classname).find('.number').text(i+'%');
}

function color1(i, classname,colorname){
$(classname).css({
"background":"conic-gradient("+colorname+" 0% "+i+"%, #ffffff "+i+"% 100%)"
});
}

        
