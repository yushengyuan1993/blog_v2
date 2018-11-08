/*
* Scrolline.js - Create an indication bar line of scroll position
* Basic usage : $.scrolline();
* ---
* Version: 1.0
* Copyright 2014, Anthony Ly (http://anthonyly.com)
* Released under the MIT Licence
*/
(function(c,b,a,d){c.extend({scrolline:function(f){var g={backColor:"#ecf0f1",direction:"horizontal",frontColor:"#2ecc71",opacity:1,position:"top",reverse:false,weight:5,zindex:10,scrollEnd:function(){}};function e(h){this.params=c.extend(g,h);this.$back=c(a.createElement("div"));this.$front=c(a.createElement("div"));this.init()}e.prototype={init:function(){var r=this,n,q,j,k,p,i,o,m,l,h;if(r.params.direction!="vertical"){r.params.direction="horizontal"}if(r.params.direction=="vertical"&&r.params.position!="right"){r.params.position="left"}if(r.params.direction=="horizontal"&&r.params.position!="bottom"){r.params.position="top"}if(r.params.direction=="vertical"){j=n=0;if(r.params.position=="right"){q=0;k="auto"}else{q="auto";k=0}}else{q=k=0;if(r.params.position=="bottom"){n="auto";j=0}else{n=0;j="auto"}}if(r.params.reverse&&r.params.reverse===true){if(r.params.direction=="vertical"){m=o=l=0;i="auto"}else{m=o=o=0;l="auto"}}else{i=l=0;m=o="auto"}r.$front.css({background:r.params.frontColor,bottom:m,height:0,left:l,margin:0,overflow:"hidden",padding:0,position:"absolute",right:o,top:i,width:0}).appendTo(r.$back);r.$back.css({background:r.params.backColor,bottom:j,height:0,left:k,opacity:r.params.opacity,margin:0,overflow:"hidden",position:"fixed",padding:0,right:q,top:n,width:0,zIndex:r.params.zindex,}).appendTo("body");c(b).on("load resize scroll orientationchange",function(){r.scrollListener()})},scrollListener:function(){var r=this,m=c(b).height(),n=c(b).width(),o=c(a).height(),h=c(b).scrollTop(),l,p,j,q,k,i;if(r.params.direction=="vertical"){k=(h+m)*m/o;l=r.params.weight;p=i=m;j=r.params.weight;q=k}else{k=(h+m)*n/o;l=i=n;p=r.params.weight;j=k;q=r.params.weight}r.$back.css({height:p,width:l});r.$front.css({height:q,width:j});if(k>=i){r.params.scrollEnd()}}};new e(f)}})})(jQuery,window,document);
$.scrolline({
  weight: 3,
  frontColor: '#01ACED',
  backColor: '#fff'
});
/*
* code
*/
function GetScrollPosition () {
  var scrollPos = null;

  if (window.pageYOffset) {
    scrollPos = window.pageYOffset;
  } else if (document.compatMode && document.compatMode != 'BackCompat') {
    scrollPos = document.documentElement.scrollTop;
  } else if (document.body) {
    scrollPos = document.body.scrollTop;
  }

  return scrollPos;
}

if (GetScrollPosition() > 200) {
  $('.page-top').hide();
  $('.toTop').show();
} else {
  $('.page-top').show();
  $('.toTop').hide();
}

$(document).on('scroll', function () {
  // 获取页面 Y轴 滚动量
  var scrollPos = GetScrollPosition();

  if (scrollPos > 200) {
    $('.page-top').slideUp('normal');
    $('.toTop').slideDown('normal');
  } else {
    $('.page-top').slideDown('normal');
    $('.toTop').slideUp('normal');
  }
})

// to top
$('.toTop').click(function () {
  toTop1();
})

function toTop1(){
  var timer = null;
  cancelAnimationFrame(timer);
  timer = requestAnimationFrame(function fn() {
    var oTop = document.body.scrollTop || document.documentElement.scrollTop;
    if (oTop > 0) {
      document.body.scrollTop = document.documentElement.scrollTop = oTop - 100;
      timer = requestAnimationFrame(fn);
    } else {
      cancelAnimationFrame(timer);
    } 
  });
}

var timer1 = null;
function toTop2(){
  cancelAnimationFrame(timer1);
  timer1 = requestAnimationFrame(function fn() {
    var oTop = document.body.scrollTop || document.documentElement.scrollTop;
    if (oTop > 0) {
      scrollTo(0, oTop-100);
      timer1 = requestAnimationFrame(fn);
    } else {
      cancelAnimationFrame(timer1);
    } 
  });
}

// 基于`layer` 的图片预览
layer.photos({
  photos: '.post-content',
  anim: 4 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
}); 

//This is a pen based off of Codewoofy's eyes follow mouse. It is just cleaned up, face removed, and then made to be a little more cartoony. https://codepen.io/Codewoofy/pen/VeBJEP
// $(document).mousemove(function(event) {
//   var eye = $(".eye");
//   var x = (eye.offset().left) + (eye.width() / 2);
//   var y = (eye.offset().top) + (eye.height() / 2);
//   var rad = Math.atan2(event.pageX - x, event.pageY - y);
//   var rot = (rad * (180 / Math.PI) * -1) + 180;
//   eye.css({
//     '-webkit-transform': 'rotate(' + rot + 'deg)',
//     '-moz-transform': 'rotate(' + rot + 'deg)',
//     '-ms-transform': 'rotate(' + rot + 'deg)',
//     'transform': 'rotate(' + rot + 'deg)'
//   });
// });