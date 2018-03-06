/* Author: Richard Myatt
   Date: 5 March 2018

   Simple counter using vue.js components
*/

// the counter component
var Counter = {
  props: ["counter"],
  template: '<div id="counter"><div class="output"><span>{{ counter }}</span></div><div class="btns"><span class="dec" @click="decHandler">-</span><span class="inc" @click="incHandler">+</span></div></div>',
  methods: {
    incHandler: function() {
      this.$emit("inc");
    },
    decHandler: function() {
      this.$emit("dec");
    }
  }
};

// vue.js instance with registered component
new Vue({
  el: "#app",
  data: {
    counter: 0
  },
  components: {
    "counter": Counter
  },
  methods: {
    increment: function() {
      this.counter += 1;
    },
    decrement: function() {
      this.counter -= 1;
    },
  }
});
