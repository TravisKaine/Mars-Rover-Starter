const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single TEST, feel free to comment out all the others.
//       However, do NOT edit the grading TESTs for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Command class", function() {
  
  // TEST 1
  ///Throws error if command type is NOT passed into constructor as the first parameter then expects an error to be thrown if Command is shown without a command type.
  it("throws error if command type is NOT passed into constructor as the first parameter", function() {
    expect( function() { new Command();}).toThrow(new Error('Command type required.'));
  });

  // TEST 2
  ///Constructor sets command type and expects Command's commandType to be set correctly.
  it("constructor sets command type", function() {
    let command = new Command('STATUS_CHECK');
    expect(command.commandType).toEqual('STATUS_CHECK');
  });

  // TEST 3
  ///Constructor sets a value passed in as the 2nd argument
  it("constructor sets a value passed in as the 2nd argument", function() {
    let command = new Command('MOVE', 20);
    expect(command.value).toEqual(20);
  });
});