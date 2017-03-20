window.onload = function(){
    var box = document.getElementById('container');
    var divs = box.getElementsByTagName('div');
    //
    var divWidth = divs[0].offsetWidth;
    //
    var doorwidth = 200;
    //
    function setPost(){
        //
        for(var i = 1,len = divs.length;i<len;i++){
            divs[i].style.left = divWidth+doorwidth*(i-1)+'px';
        }
    }
    setPost();
    //
    var translate = divWidth - doorwidth;
    for (var i = 0; i < divs.length; i++) {
        (function(i){
            divs[i].onclick = function(){
                setPost();
                for(var j=1;j<=i;j++){
                    divs[j].style.left = parseInt(divs[j].style.left,10) - translate + 'px';
                }
            }
        })(i)
        
    };
}