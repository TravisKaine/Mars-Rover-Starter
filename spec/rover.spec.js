const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single TEST, feel free to comment out all the others.
//       However, do NOT edit the grading TESTs for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  // 7 TESTs here!

  // TEST 7
  ///Verifies that the Rover constructor throws an error if position is not provided.
  it("constructor sets position and default values for mode and generatorWatts", () => {
    expect(() => new Rover()).toThrow(new Error('Rover position required.'));
  });

  // TEST 8
  ///Verifies that the response returned by the Rover's receiveMessage method contains the name of the message.
  it("response returned by receiveMessage contains name of message", () => {
    const commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    const message = new Message("New message!", commands);
    const rover = new Rover(100);
    const response = rover.receiveMessage(message);
    expect(response.message).toEqual("New message!");
  });

  // TEST 9
  ///Verifies that the response returned by the Rover's receiveMessage method includes two results if two commands are sent in the message.
  it("response returned by receiveMessage includes two results if two commands are sent in the message", () => {
    const commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    const message = new Message('TEST message with two commands', commands);
    const rover = new Rover(98382);
    const response = rover.receiveMessage(message);
    expect(response.results.length).toEqual(commands.length);
  });

  // TEST 10
  ///Verifies that the Rover responds correctly to a status check command by checking if the status information in the response matches the rover's current status.
  it("responds correctly to status check command", () => {
    const commands = [new Command('STATUS_CHECK')];
    const message = new Message('Rover check status', commands);
    const rover = new Rover(98382);
    const response = rover.receiveMessage(message);
    const roverInfo = { mode: rover.mode, generatorWatts: rover.generatorWatts, position: rover.position };
    expect(response.results[0].roverStatus).toEqual(roverInfo);
  });

  // TEST 11
  ///Verifies that the Rover responds correctly to a mode change command by checking if the rover's mode is updated correctly.
  it("responds correctly to mode change command", () => {
    const mode = 'LOW_POWER';
    const commands = [new Command('MODE_CHANGE', mode)];
    const message = new Message(`Changing mode to ${mode}`, commands);
    const rover = new Rover(98382);
    const response = rover.receiveMessage(message);
    expect(rover.mode).toEqual(mode);
  });

  // TEST 12
  ///Verifies that the Rover responds with a false completed value when attempting to move in LOW_POWER mode.
  it("responds with false completed value when attempting to move in LOW_POWER mode", () => {
    const mode = 'LOW_POWER';
    const commands = [new Command('MODE_CHANGE', mode), new Command('MOVE', 2000)];
    const message = new Message(`Can not move while at ${mode} mode`, commands);
    const rover = new Rover(98382);
    const response = rover.receiveMessage(message);
    expect(response.results[1]).toEqual({ completed: false });
  });

  // TEST 13
  ///Verifies that the Rover responds with the correct position for a move command by checking if the rover's position is updated correctly.
  it("responds with position for move command", () => {
    const position = 2000;
    const commands = [new Command('MOVE', position)];
    const message = new Message(`Moving to position ${position}`, commands);
    const rover = new Rover(98382);
    const response = rover.receiveMessage(message);
    expect(rover.position).toEqual(position);
  });
});
