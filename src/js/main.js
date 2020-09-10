// sub.jsファイルを読み込む
// import { hello } from "./sub";

//import '../sass/style.scss'; // style.scssをバンドル（webpackでscssをバンドルするよう）
// ----------webpack用---------------
// require("intersection-observer"); // polyfill
// import "whatwg-fetch"; // polyfill
// import objectFitImages from "object-fit-images"; // polyfill
// objectFitImages();
// ----------外部ファイル読み込み-----------
// ----------webpack用---------------

function changeColor() {
  // スクロール
  let scrollY = window.pageYOffset;
  // クリックイベントのPC、SP判定
  let eventType = window.ontouchstart ? "touchstart" : "click";

  // ロゴ用の変数
  const fbImg = document.querySelector(".bl_firstView_wrapper");
  const triggerLogoY = fbImg.clientHeight;
  const logo = document.querySelector(".bl_siteLogo");
  // スクロール位置によってロゴの色を変更
  if (triggerLogoY - scrollY < 0) {
    logo.classList.add("js_svgFillBlack");
  } else {
    logo.classList.remove("js_svgFillBlack");
  }

  // メニュー用の変数
  const fb = document.querySelector(".bl_firstView");
  const triggerMenuY = fb.clientHeight;
  const menu = document.querySelector(".bl_drawer_icon");
  // チェックボックス
  const drawerCB = document.querySelector(".bl_drawer_checkbox");
  // スクロール位置によってメニューの色を変更
  // ドロワーメニューが閉じている時
  if (!drawerCB.checked) {
    if (triggerMenuY - scrollY < 0) {
      menu.classList.add("js_menuBlack");
    } else {
      menu.classList.remove("js_menuBlack");
    }
  }

  // メニューボタンを押したときの色の挙動
  menu.addEventListener(eventType, () => {
    if (triggerMenuY - scrollY < 0) {
      // ドロワーメニューが閉じている時
      if (drawerCB.checked) {
        menu.classList.add("js_menuBlack");
      } // ドロワーメニューが閉じている時
      else {
        menu.classList.remove("js_menuBlack");
      }
    } else {
      menu.classList.remove("js_menuBlack");
    }
  });

  const drawerOL = document.querySelector(".bl_drawer_overlay");
  // 背景部分を押したときの色の挙動
  drawerOL.addEventListener(eventType, () => {
    if (triggerMenuY - scrollY < 0) {
      menu.classList.add("js_menuBlack");
    } else {
      menu.classList.remove("js_menuBlack");
    }
  });
}

$(function() {
  window.addEventListener("scroll", changeColor);

  // IE対応（background-attachment: fixed）カクカクするからやらないほうがいい？
  if (
    navigator.userAgent.match(/MSIE 10/i) ||
    navigator.userAgent.match(/Trident\/7\./) ||
    navigator.userAgent.match(/Edge\/12\./)
  ) {
    $("body").on("mousewheel", function() {
      event.preventDefault();
      var wd = event.wheelDelta;
      var csp = window.pageYOffset;
      window.scrollTo(0, csp - wd);
    });
  }
  //  iPhon,iPad対応（background-attachment: fixed）
  let height = $(window).height();
  let device = navigator.userAgent;
  if (device.indexOf("iPhone") !== -1 || device.indexOf("iPad") !== -1) {
    $("body").css({ "background-size": "auto " + height + "px" });
  }
});
