/**
 * Created by LiHongyao on 2017/5/11.
 */

// 获取页面元素
var oWrap  = document.getElementsByClassName('wrap')[0];
var oPrev  = document.getElementsByClassName('prev')[0];
var oNext  = document.getElementsByClassName('next')[0];
var aImgs  = document.getElementsByClassName('imgs-box')[0].children;
var aIdots = document.getElementsByClassName('idots-box')[0].children;
// 记录当前显示图片位置
var curImgIdx = 0;
// 记录动画执行状态
var isAnimating = false;
// 定时器（自动轮播）
var timer = null;
tab();
play();
//上一张
oPrev.onclick = function(){
    var clarity = getStyle(aImgs[curImgIdx],"opacity");
    if(clarity < 1){
        return;
    }
    if(curImgIdx == 0){
        curImgIdx = 5;
    }else{
        curImgIdx--;
    }
    tab();
    changeIdots();
}
//下一张
oNext.onclick = function(){
    var clarity = getStyle(aImgs[curImgIdx],"opacity");
    if(clarity < 1){
        return;
    }
    if(curImgIdx == 5){
        curImgIdx = 0;
    }else{
        curImgIdx++;
    }
    tab();
    changeIdots();
}
//图片显示与隐藏函数
function tab(){
    for(var i = 0;i < aImgs.length;i++){
        aImgs[i].classList.add("hide");
        aImgs[i].classList.remove("show");
    }
    aImgs[curImgIdx].classList.remove("hide");
    aImgs[curImgIdx].classList.add("show");
}
//小圆点变化函数
function changeIdots(){
    for(let i = 0; i < aIdots.length;i++){
        if(aIdots[i].classList.contains("active")){
            aIdots[i].classList.remove("active");
        }   
    }
    aIdots[curImgIdx].classList.add("active");
}
//小圆点点击事件
 for(let i = 0; i < aIdots.length;i++){
     aIdots[i].idx = i;
     aIdots[i].onclick = function(){
        var clarity = getStyle(aImgs[curImgIdx],"opacity");
        if(clarity < 1 || this.idx == curImgIdx){
            return;
        }          
        curImgIdx = this.idx;
         tab();
         changeIdots();
     }
 }
//自动播放函数
function play() {
    timer = setInterval(function () {
        isAnimating = true;
        oNext.onclick();       
    },5000);
}
//动画停止
function stop() {
    isAnimating = false;
    clearInterval(timer);
}

oWrap.onmouseover = stop;
oWrap.onmouseout = play;

/**
 * 获取非行间样式
 */
function getStyle(obj, attr) {
	// 兼容IE
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	}else {
		return getComputedStyle(obj, false)[attr];
	}
}
