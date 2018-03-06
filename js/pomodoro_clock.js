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
      props: ["offset", "percentage"],
      template: '<div id="display"><svg width="120" height="120" viewBox="0 0 120 120"><circle cx= "60" cy="60" r="54" fill="none" stroke="#e6e6e6" stroke-width="12"/><circle cx= "60" cy="60" r="54" fill="none" stroke="green" stroke-width="12" stroke-dasharray="339.292" :stroke-dashoffset="offset"/></svg><div class="number"><span>{{ percentage }}%</span></div></div>'
    };

var mainApp = new Vue({
  el: "#app",
  data: {
    title: "Pomodoro Clock",
    titleActive: "ACTIVE",
    titleRest: "REST",
    counterActive: 40,
    counterRest: 5,
    offset: "339.292",
    percentage: "0"
  },
  components: {
    "heading": Head,
    "counter": Counter,
    "progressbar": Progress
  }
});
