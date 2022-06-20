const chai = require("chai");
const expect = chai.expect;

// This is just an async func that takes in a bool
// and calls a callback that returns a some message
// depending on the bool value
function someMadeUpAyncFunc(boolValue, cb) {
  setTimeout(function() {
    cb(boolValue ? "You get a treat!!" : "You get nothing!!")
  }, 0);
}

// Added the `only` tag to have only this set of tests to run
describe.only("AsyncTest", function() {
  it("should return `You get a treat!!` if `true` is passed in", function() {
    someMadeUpAyncFunc(true, function(rewardUser){
      expect(rewardUser).to.equal("You get a treat!!");
    });
  });

  it("should return `You get nothing!!` if `false` is passed in", function() {
    someMadeUpAyncFunc(false, function(rewardUser){
      // Let's fail it on purpose just to see what happens
      expect(rewardUser).to.equal("You get a treat!!");
    });
  });
});
