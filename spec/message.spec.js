const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single TEST, feel free to comment out all the others.
//       However, do NOT edit the grading TESTs for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {

    // TEST 4
    ///Throws error if a name is NOT passed into the constructor as the first parameter and expects an error to be thrown if Message is shown without a name.
    it("throws error if a name is NOT passed into the constructor as the first parameter", function() {
        expect( function() { new Message();}).toThrow(new Error('Message name required.'));
      });

    // TEST 5
    ///Constructor sets name then expects Message's name property to be set correctly.
    it("constructor sets name", function() {
        let message = new Message('New message!');
        expect(message.name).toEqual('New message!');
      });

    // TEST 6
    ///Contains a commands array passed into the constructor as 2nd argument, and expects Message's commands property to contain an array of commands provided.
    it("contains a commands array passed into the constructor as 2nd argument", function() {
        let commands = [new Command('STATUS_CHECK'), new Command('MOVE', 20)];
        let message = new Message('Another message!', commands);
        expect(message.commands).toEqual(commands);
    });

});
