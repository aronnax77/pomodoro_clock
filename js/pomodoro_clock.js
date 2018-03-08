var timer;

var Head = {
  props: ["title"],
  template: "<header><h1>{{ title }}</h1></header>"
};

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

var Progress = {
      props: ["offset", "minutes", "seconds"],
      template: '<div id="display" @click="tick"><svg width="200" height="200" viewBox="0 0 200 200"><circle cx= "100" cy="100" r="94" fill="none" stroke="#666" stroke-width="12"/><circle cx= "100" cy="100" r="94" fill="none" stroke="green" stroke-width="12" stroke-dasharray="590.619" :stroke-dashoffset="offset"/></svg><div class="timer"><div class="minutes"><span>{{ minutes }}:</span></div><div class="seconds"><span>{{ seconds }}</span></div></div></div>',
      methods: {
        tick: function() {
          this.$emit("startstop");
        }
      }
    };

var main = new Vue({
  el: "#app",
  data: {
    title: "Pomodoro Clock",
    titleActive: "ACTIVE",
    titleRest: "REST",
    running: false,
    counterActive: 1,
    counterRest: 1,
    offset: "590.619",
    percentage: "0",
    minutes: 0,
    seconds: 0
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
            console.log("set running equal true");
            var snd = new Audio("audio/beep-05.mp3");
            var count = 1;
            var numSecs = this.counterActive * 60;
            timer = setInterval(function() {
                        main.running = true;
                        main.seconds = numSecs % 60;
                        main.minutes = (numSecs - main.seconds)/60;
                        showProgress(numSecs, count);
                        numSecs -= 1;
                        if(numSecs === -1 && count === 1) {
                          console.log("finished active session");
                          numSecs = main.counterRest * 60;
                          count = 2;
                          snd.play();
                        } else if(numSecs === -1 && count === 2){
                          console.log("finished rest period");
                          clearInterval(timer);
                          snd.play();
                        }

                    }, 1000);
            this.running = true;
          } else if(this.running === true) {
            console.log("set running equal false");
            this.running = false;
            clearInterval(timer);
            this.minutes = 0;
            this.seconds = 0;
            this.offset  = "590.619";
          }
          /*var snd = new Audio("audio/beep-05.mp3");
          var count = 1;
          var numSecs = this.counterActive * 60;
          var timer = setInterval(function() {
                      main.running = true;
                      main.seconds = numSecs % 60;
                      main.minutes = (numSecs - main.seconds)/60;
                      showProgress(numSecs);
                      numSecs -= 1;
                      if(numSecs === -1 && count === 1) {
                        console.log("finished active session");
                        numSecs = main.counterRest * 60;
                        count = 2;
                        snd.play();
                      } else if(numSecs === -1 && count === 2){
                        console.log("finished rest period");
                        clearInterval(timer);
                        snd.play();
                      }

                  }, 1000);*/
        }
      }
});

function showProgress(rem, cnt) {
  if(cnt === 1) {
    main.offset = Math.PI * 2 * 94 * (rem / (main.counterActive * 60));
  } else if(cnt === 2) {
    main.offset = Math.PI * 2 * 94 * (rem / (main.counterRest * 60));
  }

}
