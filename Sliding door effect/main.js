window.onload = function(){
    var box = document.getElementById('container');
    var divs = box.getElementsByTagName('div');
    var divswidth = divs[0].offsetWidth;
    var doorwidth = 200;
    var boxwidth = divswidth + (divs.length-1)*doorwidth;
    console.log(divswidth)
    box.style.width = boxwidth+'px';

    //设置每道门的初始位置
    function setdoorPosition(){
        for(var i=1,len = divs.length;i<len;i++){
        divs[i].style.left = divswidth + doorwidth*(i-1)+'px'; 
    }
    }
    setdoorPosition();
    



    var translate = divswidth - doorwidth;
    for(var i=0,len = divs.length;i<len;i++){
        //使用立即调用函数表达式，为了获取不同的i值
        (function(i){
            divs[i].onclick = function(){
                //先将每道门复位
                setdoorPosition();
                //打开们只需要处理第二个到当前div之间所有的div即可，所以j<=第二张图片的下标即可
                for(var j=1;j<=i;j++){
                    divs[j].style.left = parseInt(divs[j].style.left,10) - translate + 'px';
                }
            }
        })(i);
    }
};