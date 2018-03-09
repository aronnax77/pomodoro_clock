/* Author: Richard Myatt
   Date: 9 March 2018

   Pomodoro Clock.  A challenge set by FreeCodeCamp.
*/

// global variable for timer
var timer;

// header
var Head = {
  props: ["title"],
  template: "<header><h1>{{ title }}</h1></header>"
};

// counter
var Counter = {
  props: ["title", "counter"],
  template: '<div id="counter"><div class="counter-title"><span>{{ title }}</span></div><div class="output"><span>{{ counter }}</span></div><div class="btns"><span class="dec" @click="decHandler">-</span><span class="inc" @click="incHandler">+</span></div></div>',
  methods: {
    incHandler: function() {
      this.$emit("inc");
    },
    decHandler: function() {
      this.$emit("dec");
    }
  }
};

// radial progress bar
var Progress = {
      props: ["offset", "minutes", "seconds", "bg", "fg"],
      template: '<div id="display" @click="tick"><svg width="200" height="200" viewBox="0 0 200 200"><circle cx= "100" cy="100" r="94" fill="none" :stroke="bg" stroke-width="12"/><circle cx= "100" cy="100" r="94" fill="none" :stroke="fg" stroke-width="12" stroke-dasharray="590.619" :stroke-dashoffset="offset"/></svg><div class="timer"><div class="minutes"><span>{{ minutes }}:</span></div><div class="seconds"><span>{{ seconds }}</span></div></div></div>',
      methods: {
        tick: function() {
          this.$emit("startstop");
        }
      }
    };

var main = new Vue({
  el: "#app",
  data: {
    title: "Pomodoro Clock",  // main title
    titleActive: "ACTIVE",    // activity counter title
    titleRest: "REST",        // rest counter title
    bg: "#333",               // background colour of progress bar
    fg: "#90EE90",            // foreground colour of progress bar
    running: false,           // is the timer running
    counterActive: 25,        // set value for activity counter
    counterRest: 5,           // set value for rest counter
    offset: "590.619",        // offset for progress bar
    percentage: "0",          // percentage progress
    minutes: 0,               // minutes on clock
    seconds: 0                // seconds on clock
  },
  components: {
    "heading": Head,
    "counter": Counter,
    "progressbar": Progress
  },
  methods: {
        increment: function(num) {
          if(num === 1 && this.counterActive < 90) {
            this.counterActive += 1;
          } else if(num === 2 && this.counterRest < 60) {
            this.counterRest += 1;
          }
        },
        decrement: function(num) {
          if(num === 1 && this.counterActive > 0) {
            this.counterActive -= 1;
          } else if(num === 2 && this.counterRest > 0) {
            this.counterRest -= 1;
          }
        },
        timerStartStop: function() {
          if(this.running === false) {
            var snd = new Audio("https://cdn.rawgit.com/aronnax77/pomodoro_clock/master/audio/beep-05.mp3");
            var count = 1;
            var numSecs = this.counterActive * 60;
            timer = setInterval(function() {
                        main.running = true;
                        main.seconds = numSecs % 60;
                        main.minutes = (numSecs - main.seconds)/60;
                        showProgress(numSecs, count);
                        numSecs -= 1;
                        if(numSecs === -1 && count === 1) {
                          numSecs = main.counterRest * 60;
                          main.fg = "#f77a52";
                          count = 2;
                          snd.play();
                        } else if(numSecs === -1 && count === 2){
                          clearInterval(timer);
                          main.fg = "#90EE90";
                          main.offset = "590.619";
                          main.running = false;
                          snd.play();
                        }

                    }, 1000);
            this.running = true;
          } else if(this.running === true) {
            this.running = false;
            clearInterval(timer);
            this.minutes = 0;
            this.seconds = 0;
            this.offset  = "590.619";
            this.fg = "#90EE90";
          }
        }
      }
});

// helper function for timerStartStop
function showProgress(rem, cnt) {
  if(cnt === 1) {
    main.offset = Math.PI * 2 * 94 * (rem / (main.counterActive * 60));
  } else if(cnt === 2) {
    main.offset = Math.PI * 2 * 94 * (rem / (main.counterRest * 60));
  }

}
