let themeChanger = document.querySelector(".header .theme-changer .dot");
let themeChangerStyle = getComputedStyle(
  document.querySelector(".header .theme-changer .dot")
);
let root = document.querySelector(":root");
let rootStyle = getComputedStyle(root);

//Calc Varibles
//////////
let header = document.querySelector(".header");

//toggle
let toggleBar = document.querySelector(".theme-changer");
let dotToggle = document.querySelector(".theme-changer .dot");

//Screen
let screen = document.querySelector(".screen");
let theHand = document.querySelector(".screen .hand");

//keypad
let keypad = document.querySelector(".keypad");

//Normal Keys - Number- Operations
let normKeys = document.querySelectorAll(".num-butt");
let numbers = document.querySelectorAll(".number");
let operations = document.querySelectorAll(".oper");
let theDot = document.querySelector(".the-dot");

//Reset and delete
let resetDel = document.querySelectorAll(".word-butt");

//Equal
let equal = document.querySelector(".eq-butt");

/* ========= The Program =========*/

program();

function program() {
  //There Was An Operation Before
  let beforeOper = false;
  let anyOper = false;
  let dotPosLeft = true;
  //Numbers
  numbers.forEach((num) => {
    if (beforeOper) {
      screen.innerHTML = "";
      beforeOper = false;
    }
    num.addEventListener("click", () => {
      if (screen.innerHTML === "NaN") {
        screen.innerHTML = "";
      }

      screen.innerHTML += num.innerHTML;

      thereNumber = true;
    });

    theDot.onclick = function () {
      if (!isNaN(screen.innerHTML[screen.innerHTML.length - 1])) {
        if (dotPosLeft) {
          screen.innerHTML += ".";
          dotPosLeft = false;
        } else {
          screen.innerHTML += ".";
          dotPosLeft = true;
        }
      }
    };
  });

  //Operations
  let operation;
  operations.forEach((oper) => {
    oper.addEventListener("click", () => {
      if (screen.innerHTML === "NaN") {
        screen.innerHTML = "";
      }
      if (!anyOper) {
        if (!isNaN(parseInt(screen.innerHTML[screen.innerHTML.length - 1]))) {
          screen.innerHTML += oper.innerHTML;
          beforeOper = false;
        } else {
          screen.innerHTML =
            screen.innerHTML.slice(0, screen.innerHTML.length - 1) +
            oper.innerHTML;
        }
        anyOper = true;
        operation = oper.innerHTML;
      }
    });
  });

  //Delete And Reset
  resetDel[0].addEventListener("click", function () {
    screen.innerHTML = screen.innerHTML.slice(0, screen.innerHTML.length - 1);
  });
  resetDel[1].addEventListener("click", function () {
    screen.innerHTML = "";
  });

  //Equal
  equal.addEventListener("click", () => {
    let opIndex = screen.innerHTML.indexOf(operation);
    let scr = screen.innerHTML;
    switch (operation) {
      case "+": {
        screen.innerHTML =
          Number(scr.slice(0, opIndex)) + Number(scr.slice(opIndex + 1));
        break;
      }
      case "-": {
        screen.innerHTML =
          Number(scr.slice(0, opIndex)) - Number(scr.slice(opIndex + 1));
        break;
      }
      case "/": {
        screen.innerHTML =
          Number(scr.slice(0, opIndex)) / Number(scr.slice(opIndex + 1));
        break;
      }
      case "x": {
        screen.innerHTML =
          Number(scr.slice(0, opIndex)) * Number(scr.slice(opIndex + 1));
        break;
      }
    }
    beforeOper = true;
    anyOper = false;
  });
}

/* ========= Theme Changer Mode =========*/
if (window.localStorage.getItem("toggleDot")) {
  themeChanger.style.left = window.localStorage.getItem("toggleDot");
  if (window.localStorage.getItem("theme")) {
    let theTheme = window.localStorage.getItem("theme").split(",");
    //setting
    /////////
    //Background
    document.body.style.background = theTheme[0];
    // Color [header - screen - keys]
    header.style.color = theTheme[1];
    screen.style.color = theTheme[1];
    normKeys.forEach((key) => {
      key.style.color = theTheme[1];
    });
    // Background [toggle, Screen ,keypad]
    toggleBar.style.background = theTheme[2];
    screen.style.background = theTheme[2];
    keypad.style.background = theTheme[2];
    //Background [dot, equal]
    dotToggle.style.background = theTheme[3];
    equal.style.background = theTheme[3];
    // Background - boxshadow - color [Normal Butts]
    normKeys.forEach((key) => {
      key.style.background = theTheme[4];
      key.style.boxShadow = theTheme[5];
      key.style.color = theTheme[6];
    });
    // [ reset - del - equal]
    resetDel.forEach((key) => {
      key.style.background = theTheme[7];
      key.style.color = theTheme[8];
      key.style.boxShadow = theTheme[9];
    });
    equal.style.color = theTheme[8];
    equal.style.boxShadow = theTheme[10];
  }
}

themeChanger.onclick = function () {
  let num;
  if (themeChangerStyle.getPropertyValue("left") === "4px") {
    themeChanger.style.left = "20.5px";
    window.localStorage.setItem("toggleDot", "20.5px");
    num = 2;
  } else if (themeChangerStyle.getPropertyValue("left") === "20.5px") {
    themeChanger.style.left = "35px";
    window.localStorage.setItem("toggleDot", "35px");
    num = 3;
  } else if (themeChangerStyle.getPropertyValue("left") === "35px") {
    themeChanger.style.left = "4px";
    window.localStorage.setItem("toggleDot", "4px");
    num = 1;
  }
  themeTool(num);
};

function themeTool(num) {
  if (num === 1) {
    document.body.style.background = "";
    header.style = "";
    dotToggle.style = "";
    screen.style = "";
    keypad.style = "";
    normKeys.forEach((butt) => {
      butt.style = "";
    });
    resetDel.forEach((butt) => {
      butt.style = "";
    });
    equal.style = "";
    window.localStorage.clear("theme");
  } else if (num === 2) {
    document.body.style.background = "#e6e6e6";
    header.style.color = "#373632";
    //toggle
    toggleBar.style.background = "#d3cdcd";
    dotToggle.style.background = "#cc5300";
    //Screen
    screen.style.background = "#d3cdcd";
    screen.style.color = "#373632";
    //keypad
    keypad.style.background = "#d3cdcd";
    //Normal Keys
    normKeys.forEach((butt) => {
      butt.style.background = "#e5e4e0";
      butt.style.color = "#63625d";
      butt.style.boxShadow = "0 5px #a69f96";
    });
    //Reset and delete
    resetDel.forEach((butt) => {
      butt.style.background = "#3a7e86";
      butt.style.color = "#fffff";
      butt.style.boxShadow = "0 5px #1a5e65";
    });
    //Equal
    equal.style.background = "#cc5300";
    equal.style.color = "#fffff";
    equal.style.boxShadow = "0 5px #853900";

    //Save Values to LocalStorage
    window.localStorage.setItem("theme", [
      "#e6e6e6", // Background
      "#373632", // color (header - screen - keys)
      "#d3cdcd", // background (toggle, Screen ,keypad)
      "#cc5300", // background (Dot Equal)
      "#e5e4e0", // background (Normal Butts)
      "0 5px #a69f96", // box-shadow (Normal Butts)
      "#63625d", // color (Normal Butts)
      "#3a7e86", // background (Reset and Del)
      "#fffff", // Color (Reset Del, Equal)
      "0 5px #1a5e65", // box-shadow (Reset Del)
      "0 5px #853900", // box-shadow (Equal)
    ]);
  } else if (num === 3) {
    document.body.style.background = "#17062a";
    header.style.color = "#f2dd5d";
    //toggle
    toggleBar.style.background = "#1e0836";
    dotToggle.style.background = "#03dbce";
    //Screen
    screen.style.background = "#1e0836";
    screen.style.color = "#f2dd5d";
    //keypad
    keypad.style.background = "#1e0836";
    //Normal Keys
    normKeys.forEach((butt) => {
      butt.style.background = "#331b4d";
      butt.style.color = "#f2dd5d";
      butt.style.boxShadow = "0 5px #851d9c";
    });
    //Reset and delete
    resetDel.forEach((butt) => {
      butt.style.background = "#560779";
      butt.style.color = "#fffff";
      butt.style.boxShadow = "0 5px #bd15f2";
    });
    //Equal
    equal.style.background = "#03dbce";
    equal.style.color = "#fffff";
    equal.style.boxShadow = "0 5px #6af9f0";

    //Save Values to LocalStorage
    window.localStorage.setItem("theme", [
      "#17062a", // Background
      "#f2dd5d", // color (header - screen - keys)
      "#1e0836", // background (toggle, Screen ,keypad)
      "#03dbce", // background (Dot, Equal)
      "#331b4d", // background (Normal Butts)
      "0 5px #851d9c", // box-shadow (Normal Butts)
      "#f2dd5d", // color (Normal Butts)
      "#560779", // background (Reset and Del)
      "#fffff", // Color (Reset Del, Equal)
      "0 5px #bd15f2", // box-shadow (Reset Del)
      "0 5px #6af9f0", // box-shadow (Equal)
    ]);
  }
}
