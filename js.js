jQuery(function () {
    var d = function () {};
    jQuery(document)
        .delegate(".b-ball_bounce", "mouseenter", function () {
            b(this);
            m(this);
        })
        .delegate(".b-ball_bounce .b-ball__right", "mouseenter", function (i) {
            i.stopPropagation();
            b(this);
            m(this);
        });

    var g = 36;

    function b(n) {
        if (n.className.indexOf("b-ball__right") > -1) {
            n = n.parentNode;
        }
        var i = /b-ball_n(\d+)/.exec(n.className);
        var j = /b-head-decor__inner_n(\d+)/.exec(n.parentNode.className);
        if (i && j) {
            i = parseInt(i[1], 10) - 1;
            j = parseInt(j[1], 10) - 1;
            d((i + j * 9) % g);
        }
    }
    function m(j) {
        var i = jQuery(j);
        if (j.className.indexOf(" bounce") > -1) {
            return;
        }
        i.addClass("bounce");

        function n() {
            i.removeClass("bounce").addClass("bounce1");

            function o() {
                i.removeClass("bounce1").addClass("bounce2");

                function p() {
                    i.removeClass("bounce2").addClass("bounce3");

                    function q() {
                        i.removeClass("bounce3");
                    }
                    setTimeout(q, 300);
                }
                setTimeout(p, 300);
            }
            setTimeout(o, 300);
        }
        setTimeout(n, 300);
    }
});
jQuery("a.page-scroll").bind("click", function (event) {
    var $anchor = jQuery(this);
    jQuery("html, body")
        .stop()
        .animate(
            {
                scrollTop: jQuery($anchor.attr("href")).offset().top - 50,
            },
            1250,
            "easeInOutExpo"
        );
    event.preventDefault();
});

let container = document.getElementById("container");
let count = 50;
for (var i = 0; i < 50; i++) {
    let leftSnow = Math.floor(Math.random() * container.clientWidth);
    let topSnow = Math.floor(Math.random() * container.clientHeight);
    let widthSnow = Math.floor(Math.random() * 50);
    let timeSnow = Math.floor(Math.random() * 5 + 5);
    let blurSnow = Math.floor(Math.random() * 10);
    let div = document.createElement("div");
    div.classList.add("snow");
    div.style.left = leftSnow + "px";
    div.style.top = topSnow + "px";
    div.style.width = widthSnow + "px";
    div.style.height = widthSnow + "px";
    div.style.animationDuration = timeSnow + "s";
    div.style.filter = "blur(" + blurSnow + "px)";
    container.appendChild(div);
}

// Countdown section
const { body } = document;
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minsEl = document.getElementById("mins");
const secsEl = document.getElementById("secs");

function calculateCountdown() {
    const now = new Date();
    const targetMonth = 11; // Tháng 11 (tháng trong JavaScript bắt đầu từ 0)
    const targetDay = 22;
    
    // Xác định năm của lần 22/11 kế tiếp
    let targetYear = now.getFullYear();
    if (now.getMonth() + 1 > targetMonth || (now.getMonth() + 1 === targetMonth && now.getDate() > targetDay)) {
        targetYear += 1;
    }

    const targetDate = new Date(`${targetMonth}/${targetDay}/${targetYear} 00:00:00`);
    const timeLeft = targetDate - now; // in milliseconds

    let days = 0;
    let hours = 0;
    let mins = 0;
    let secs = 0;

    // Chỉ tính thời gian còn lại nếu chưa đến ngày 22/11
    if (now.getMonth() + 1 !== targetMonth || (now.getMonth() + 1 === targetMonth && now.getDate() !== targetDay)) {
        days = Math.floor(timeLeft / 1000 / 60 / 60 / 24);
        hours = Math.floor(timeLeft / 1000 / 60 / 60) % 24;
        mins = Math.floor(timeLeft / 1000 / 60) % 60;
        secs = Math.floor(timeLeft / 1000) % 60;
    }
    
    daysEl.innerHTML = days < 10 ? `0${days}` : days;
    hoursEl.innerHTML = hours < 10 ? `0${hours}` : hours;
    minsEl.innerHTML = mins < 10 ? `0${mins}` : mins;
    secsEl.innerHTML = secs < 10 ? `0${secs}` : secs;
}

setInterval(calculateCountdown, 1000);

// You can change global variables here:
var radius = 240; // how big of the radius
var autoRotate = true; // auto rotate or not
var rotateSpeed = -60; // unit: seconds/360 degrees
var imgWidth = 155; // width of images (unit: px)
var imgHeight = 205; // height of images (unit: px)

// Link of background music - set 'null' if you dont want to play background music
var bgMusicURL =
    "https://api.soundcloud.com/tracks/143041228/stream?client_id=587aa2d384f7333a886010d5f52f302a";
var bgMusicControls = false; // Show UI music control

// ===================== start =======================
setTimeout(init, 100);

var odrag = document.getElementById("drag-container");
var ospin = document.getElementById("spin-container");
var aImg = ospin.getElementsByTagName("img");
var aVid = ospin.getElementsByTagName("video");
var aEle = [...aImg, ...aVid]; // combine 2 arrays

// Size of images
ospin.style.width = imgWidth + "px";
ospin.style.height = imgHeight + "px";

// Size of ground - depend on radius
var ground = document.getElementById("ground");
ground.style.width = radius * 3 + "px";
ground.style.height = radius * 3 + "px";

function init(delayTime) {
    for (var i = 0; i < aEle.length; i++) {
        aEle[i].style.transform =
            "rotateY(" +
            i * (360 / aEle.length) +
            "deg) translateZ(" +
            radius +
            "px)";
        aEle[i].style.transition = "transform 1s";
        aEle[i].style.transitionDelay =
            delayTime || (aEle.length - i) / 4 + "s";
    }
}

function applyTranform(obj) {
    // Constrain the angle of camera (between 0 and 180)
    if (tY > 180) tY = 180;
    if (tY < 0) tY = 0;

    // Apply the angle
    obj.style.transform = "rotateX(" + -tY + "deg) rotateY(" + tX + "deg)";
}

function playSpin(yes) {
    ospin.style.animationPlayState = yes ? "running" : "paused";
}

var sX,
    sY,
    nX,
    nY,
    desX = 0,
    desY = 0,
    tX = 0,
    tY = 10;

// auto spin
if (autoRotate) {
    var animationName = rotateSpeed > 0 ? "spin" : "spinRevert";
    ospin.style.animation = `${animationName} ${Math.abs(
        rotateSpeed
    )}s infinite linear`;
}

// add background music
if (bgMusicURL) {
    document.getElementById("music-container").innerHTML += `
<audio src="${bgMusicURL}" ${
        bgMusicControls ? "controls" : ""
    } autoplay loop>    
<p>If you are reading this, it is because your browser does not support the audio element.</p>
</audio>
`;
}

// setup events
document.onpointerdown = function (e) {
    clearInterval(odrag.timer);
    e = e || window.event;
    var sX = e.clientX,
        sY = e.clientY;

    this.onpointermove = function (e) {
        e = e || window.event;
        var nX = e.clientX,
            nY = e.clientY;
        desX = nX - sX;
        desY = nY - sY;
        tX += desX * 0.1;
        tY += desY * 0.1;
        applyTranform(odrag);
        sX = nX;
        sY = nY;
    };

    this.onpointerup = function (e) {
        odrag.timer = setInterval(function () {
            desX *= 0.95;
            desY *= 0.95;
            tX += desX * 0.1;
            tY += desY * 0.1;
            applyTranform(odrag);
            playSpin(false);
            if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
                clearInterval(odrag.timer);
                playSpin(true);
            }
        }, 17);
        this.onpointermove = this.onpointerup = null;
    };

    return false;
};

document.onmousewheel = function (e) {
    e = e || window.event;
    var d = e.wheelDelta / 20 || -e.detail;
    radius += d;
    init(1);
};
