class Rover {
   // Write code here!
   constructor(position) {
      this.position = position;
      if (!position) {
        throw Error("Rover position required.");
      }
      this.mode = "NORMAL";
      this.generatorWatts = 110;
    }
  
    receiveMessage(theMessage) {
      const message = theMessage.name;
      const results = [];
  
      for (const command of theMessage.commands) {
        let result = { completed: true };
        if (command.commandType === "MOVE") {
          if (this.mode === "LOW_POWER") {
            result.completed = false;
          } else {
            this.position = command.value;
          }
        } else if (command.commandType === "STATUS_CHECK") {
          result.roverStatus = {
            mode: this.mode,
            generatorWatts: this.generatorWatts,
            position: this.position
          };
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