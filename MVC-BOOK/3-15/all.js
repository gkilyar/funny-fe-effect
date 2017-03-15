var assert = function(value, msg) {
if ( !value )
console.log(msg || (value + " does not equal true"));
};
var Person = function(name) {
this.name = name;
};
// 实例化一个Person
var alice = new Person('alice');
// 检查这个实例
console.log( alice instanceof Person );



//给类添加实例函数
Person.prototype.breath=function(){console.log("Breathing")}
var man = new Person;
man.breath();




