window.onload=load();

function load(){
	var oInput=document.getElementById('add');
	var aLi=document.getElementsByTagName('li');
	var oCnt1=document.getElementById('count1');//count待办
	var oCnt2=document.getElementById('count2');//count完成

	loadData();
	if(localStorage.count1){
		oCnt1.innerHTML=localStorage.count1;
	}else{
		oCnt1.innerHTML=0;
	}
	if(localStorage.count2){
		oCnt2.innerHTML=localStorage.count2;
	}else{
		oCnt2.innerHTML=0;
	}

	document.onkeydown=function(ev){
		var ev=ev||window.event;
		if(ev.keyCode==13){
			if(oInput.value.trim()){
				createLi(oInput.value.trim(),false);
				oInput.value='';
				oCnt1.innerHTML=parseInt(oCnt1.innerHTML)+1;
				saveSort();
				travelLi();	
			}else{
				for(i=0;i<aLi.length;i++){
					showValue(aLi[i]);
				}
			}
		}
	}
	travelLi();
}

// 点击文字，显示修改内容输入框
function showInput(aLi){
	var oDiv3=aLi.getElementsByTagName('div')[2];
	var oP=oDiv3.getElementsByTagName('p')[0];
	var oInput2=oDiv3.getElementsByTagName('input')[0];
	oDiv3.onclick=function (){
		aLi.onOff=true;
		oInput2.value=oP.innerHTML;
		oP.style.display='none';
		oInput2.style.display='block';
		oInput2.focus();
	}
	oInput2.onblur=function (){
		showValue(aLi);
	}
}
// 显示修改后的内容
function showValue(aLi){
	var oDiv3=aLi.getElementsByTagName('div')[2];
	var oP=oDiv3.getElementsByTagName('p')[0];
	var oInput2=oDiv3.getElementsByTagName('input')[0];
	if(aLi.onOff){
		oP.innerHTML=oInput2.value;
		oP.style.display='block';
		oInput2.style.display='none';
		aLi.onOff=false;
		saveSort();
	}
}
//	修改事项完成状态
function changeBox(aLi){
	var oDiv1=aLi.getElementsByTagName('div')[0];
	var oInput1=oDiv1.getElementsByTagName('input')[0];
	var oDiv3=aLi.getElementsByTagName('div')[2];
	var oP=oDiv3.getElementsByTagName('p')[0];
	var oCnt1=document.getElementById('count1');
	var oCnt2=document.getElementById('count2');
	oInput1.onchange=function(){
		if(aLi.done){	//将已完成的更改为待完成
			createLi(oP.innerHTML,false);
			aLi.parentNode.removeChild(aLi);
			oCnt1.innerHTML=parseInt(oCnt1.innerHTML)+1;
			oCnt2.innerHTML=parseInt(oCnt2.innerHTML)-1;
			travelLi();
			saveSort();
		}else{			//改待完成改为已完成
			createLi(oP.innerHTML,true);
			aLi.parentNode.removeChild(aLi);
			oCnt1.innerHTML=parseInt(oCnt1.innerHTML)-1;
			oCnt2.innerHTML=parseInt(oCnt2.innerHTML)+1;
			travelLi();
			saveSort();
		}
		localStorage.count1=parseInt(oCnt1.innerHTML);
		localStorage.count2=parseInt(oCnt2.innerHTML);
	}
}
// 创建待办事件
function createLi(val,bool){
	var oToDo=document.getElementById('todolist');
	var oDone=document.getElementById('donelist');
	if(!bool){
		var str='<li draggable="true" class="clearfix"><div><input type="checkbox" title="标记为已完成" class="checkbox"></div>'+
			'<div><a class="del" href="javascript:;"></a></div>'+
			'<div><p class="text-show">'+val+'</p><input type="text" class="text"></div></li>';
		oToDo.innerHTML=str+oToDo.innerHTML;
	}else{
		var str='<li draggable="true" class="clearfix"><div><input type="checkbox" title="标记为已完成" class="checkbox" checked></div>'+
			'<div><a class="del" href="javascript:;"></a></div>'+
			'<div><p class="text-show">'+val+'</p><input type="text" class="text"></div></li>';
		oDone.innerHTML=str+oDone.innerHTML;
	}
	return str;
}
//	遍历Li
function travelLi(){
	var oToDo=document.getElementById('todolist');
	var oDone=document.getElementById('donelist');
	var aLi=document.getElementsByTagName('li');
	var aLi1=oToDo.getElementsByTagName('li');
	var aLi2=oDone.getElementsByTagName('li');
	for(i=0;i<aLi.length;i++){
		aLi[i].onOff=false;
		aLi[i].index=i;
		showInput(aLi[i]);
		delLi(aLi[i]);	
	}
	for(i=0;i<aLi1.length;i++){
		aLi1[i].done=false;
		changeBox(aLi1[i]);	
	}
	for(i=0;i<aLi2.length;i++){
		aLi2[i].done=true;
		changeBox(aLi2[i]);
	}
	removeData();
}
// 删除Li
function delLi(aLi){
	var oToDo=document.getElementById('todolist');
	var oDone=document.getElementById('donelist');
	var oA1 = oToDo.getElementsByTagName('div')[1];
	var oA2 = oDone.getElementsByTagName('div')[1];
	var Li1 = oToDo.getElementsByTagName('li');
	var Li2 = oDone.getElementsByTagName('li');
	var local_todo_a = oToDo.getElementsByTagName('a');
	var local_s_a = oDone.getElementsByTagName('a');
	var count1 = document.getElementById('count1');
	var count2 = document.getElementById('count2');

	if(aLi.parentNode.getAttribute('id') == 'todolist'){
	for(let i=0;i<local_todo_a.length;i++){
		// Li2[i].index = i;
		local_todo_a[i].onclick = function(){	
				var cur_input_value = this.parentNode.nextSibling.firstChild.innerHTML;
				var newarr=JSON.parse(localStorage.todo).reverse();
				console.log(newarr);
				newarr.splice(i,1)
				// console.log(newarr);
				// for(var key in arr) {arr[key] = Number(key) +1;console.log(arr[key])};
				// arr.splice(i,1);
				localStorage.count1--;
				// var thisdata = arr[i].value;
				savetodoData(newarr.reverse());
				oToDo.removeChild(this.parentNode.parentNode);
				count1.innerHTML = parseInt(count1.innerHTML) - 1;
		}
	}
	}

	if(aLi.parentNode.getAttribute('id') == 'donelist'){
		for(let i=0;i<local_s_a.length;i++){
			// local_s_a[i].index = i+1;
			local_s_a[i].onclick = function(){	
				var cur_input_value = this.parentNode.nextSibling.firstChild.innerHTML;
				// console.log(cur_input_value);
				if(localStorage.done){
					var arr=JSON.parse(localStorage.done).reverse();
				}
				console.log(arr);
				arr.splice(i,1)
				// console.log(newarr);
				// for(var key in arr) {arr[key] = Number(key) +1;console.log(arr[key])};
				// arr.splice(i,1);
				localStorage.count2--;
				// var thisdata = arr[i].value;
				savedoneData(arr.reverse());
				oDone.removeChild(this.parentNode.parentNode);
				count2.innerHTML = parseInt(count2.innerHTML) - 1;
			}
		}
	}
}
//	保存localStorage数据
function saveSort(){
	var oToDo=document.getElementById('todolist');
	var oDone=document.getElementById('donelist');
	var aP1=oToDo.getElementsByTagName('p');
	var aP2=oDone.getElementsByTagName('p');
	var data=[];
	var data2=[];
	localStorage.count1=aP1.length;
	for(i=0;i<aP1.length;i++){
		var todo={"value":aP1[i].innerHTML,"done":"false"};
		data.unshift(todo);
	}
	localStorage.count2=aP2.length;
	for(i=0;i<aP2.length;i++){
		var done={"value":aP2[i].innerHTML,"done":"true"};
		data2.unshift(done);
	}
	savetodoData(data);
	savedoneData(data2);
}

function savetodoData(data){
	if(data.length==0){
		localStorage.removeItem("todo");
	}else{
		for(let i = 0;i<data.length;i++){
		if(data[i].done === "false"){
			localStorage.setItem("todo",JSON.stringify(data));
		}
	}
}
}

function savedoneData(data){
	console.log(localStorage);
	if(data.length==0){
		localStorage.removeItem("done");
	}else{
		for(let j = 0;j<data.length;j++){
		if(data[j].done === "true"){
			localStorage.setItem("done",JSON.stringify(data));
		}
	}
}
}
//	加载本地缓存数据
function loadData(){
	if(localStorage.todo){
		var todo_arr=JSON.parse(localStorage.todo);
		for(i=0;i<todo_arr.length;i++){
			createLi(todo_arr[i]["value"],false);
		}
	}
	if(localStorage.done){
		var done_arr=JSON.parse(localStorage.done);
		for(j=0;j<done_arr.length;j++){
			createLi(done_arr[j]["value"],true);
		}
	}
}
//删除所有数据

function removeData(){
	var oToDo=document.getElementById('todolist');
	var oDone=document.getElementById('donelist');
	var delAlldata = document.getElementById('clearAll');
	var count1 = document.getElementById('count1');
	var count2 = document.getElementById('count2');
	delAlldata.onclick = function(){
		oToDo.innerHTML = '';
		oDone.innerHTML = '';
	    localStorage.removeItem("todo");
		localStorage.removeItem("done");
	    localStorage.removeItem("count1");
	    localStorage.removeItem("count2");
		count1.innerHTML = '0';		
		count2.innerHTML = '0';
	}	
}	



// //为了删除数组方便
// Array.prototype.remove = function(index,val) {
// if (index > -1) {
// this.splice(index, 1);
// }
// };

// Array.prototype.removeByValue = function(val) {
//   for(let j=0; j<this.length; j++) {
//     if(this[j] == val) {
//       this.splice(j, 1);
//       break;
//     }
//   }
// }
// function removeByValue(arr, val) {
//   for(let j=0; j<arr.length; j++) {
//     if(arr[j] == val) {
//       arr.splice(j, 1);
//     }
//   }
// }

// Array.prototype.remove = function(val) {  
//         var index = this.indexOf(val);  
//         while(index>-1){  
//             this.splice(index, 1);  
//             index = this.indexOf(val);  
//         }  
// };