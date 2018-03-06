/* Author: Richard Myatt
   4 March 2018

   Radial progress bar
*/

var app = new Vue({
  el: "#progress",
  data: {
    offset: "339.292",
    slide: "0"
  },
  methods: {
    calcOffset: function() {
      this.offset = Math.PI * 2 * 54 *(1 - this.slide/100);
    }
  }
});
