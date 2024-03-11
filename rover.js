class Rover {
   // Write code here!
   // Initialize rover with a position. If no position is provided, throw an error.
   constructor(position) {
      this.position = position;
      if (!position) {
        throw Error("Rover position required.");
      }
      // Set default mode to "NORMAL"
      this.mode = "NORMAL";
      this.generatorWatts = 110;
    }
  
    receiveMessage(theMessage) {
      const message = theMessage.name;
      const results = [];
  
      // Loop through each command in the message and check the type of command and execute accordingly.
      // If rover is in "LOW_POWER" mode, cannot move, and update rover's position.
      for (const command of theMessage.commands) {
        let result = { completed: true };
        if (command.commandType === "MOVE") {
          if (this.mode === "LOW_POWER") {
            result.completed = false;
          } else {
            this.position = command.value;
          }
        // Provide the current status of the rover.
        } else if (command.commandType === "STATUS_CHECK") {
          result.roverStatus = {
            mode: this.mode,
            generatorWatts: this.generatorWatts,
            position: this.position
          };
        // Change the mode of the rover, if command type is not recognized, throw an error.
        } else if (command.commandType === "MODE_CHANGE") {
          this.mode = command.value;
        } else {
          throw Error("Command Type undefined.");
        }
        results.push(result);
      }
  
      return { message, results };
    }
}

module.exports = Rover;