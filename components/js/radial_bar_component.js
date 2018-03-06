/* Author: Richard Myatt
   4 March 2018

   Radial progress bar
*/

var Progress = {
  props: ["offset", "slide"],
  template: '<div id="display"><svg width="120" height="120" viewBox="0 0 120 120"><circle cx= "60" cy="60" r="54" fill="none" stroke="#e6e6e6" stroke-width="12"/><circle cx= "60" cy="60" r="54" fill="none" stroke="green" stroke-width="12" stroke-dasharray="339.292" :stroke-dashoffset="offset"/></svg><div class="number"><span>{{ slide }}%</span></div></div>'
};

var app = new Vue({
  el: "#progress",
  data: {
    offset: "339.292",
    slide: "0"
  },
  components: {
    "display": Progress
  },
  methods: {
    calcOffset: function() {
      this.offset = Math.PI * 2 * 54 *(1 - this.slide/100);
    }
  }
});
