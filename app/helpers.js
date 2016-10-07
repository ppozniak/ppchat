// Various utility helpers
// ======================
// 1. Rand
//


var helpers = {
  rand: function(arg1, arg2) {
    // Returns random value depending on what arguments you provide:
    // 1. Array - returns random value from the provided array
    // 2. Number - returns random value from 0 to that number
    // 3. Two numbers - returns random value between these two
    // 4. String - returns random character from the string

    switch(typeof arg1) {
      case 'object':
        if(Array.isArray(arg1)) {
          return arg1[Math.floor(Math.random() * arg1.length)];
        } else {
          return false;
        }
      case 'number':
        if(typeof arg2 === 'number') {
          return Math.floor((Math.random() * arg2)) + arg1;
        } else {
          return Math.floor(Math.random() * arg1);
        }
      case 'string':
        return arg1.charAt(Math.floor(Math.random() * arg1.length));
      default:
        return false;
    }
  }
}

export default helpers;
