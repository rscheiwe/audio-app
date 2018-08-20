
let spokenword;
let finalCommand;

class ArtyomCommandsManager {

    // The ArtyomCommandsManager class expects as argument in the constructor
    // an already declared instance of Artyom.js
    constructor (ArtyomInstance) {

        this._artyom = ArtyomInstance;

        this.setSomeVariable = this.setSomeVariable.bind(this);
    }

    setSomeVariable(spokenword) {
      return spokenword
    }

    // Execute the loadCommands method to inject the methods to the instance of Artyom
    loadCommands(){
        let Artyom = this._artyom;
        // Here you can load all the commands that you want to Artyom
        return Artyom.addCommands([
            {
                indexes: ["Hello"],
                action: () => {
                    Artyom.say("Hello, how are you?");
                }
            },
            {
                indexes: ["say hi"],
                action: () => {
                    Artyom.say("Hi justine");
                }
            },
            {
                indexes: ["good?"],
                action: () => {
                    Artyom.say("I'm great");
                }
            },
            {
              indexes: ["I want *", "Not *"],
              smart: true,
              action: (i, wildcard) => {
                if (i === 0) {
                  Artyom.say("You want" + wildcard)
                  spokenword = wildcard
                } else if (i === 1) {
                  Artyom.say("Ok, sorry. Please tell me again")
                }
              }
            },
            {
                indexes: ["Yes"],
                action: () => {
                    Artyom.say("great! Searching" + spokenword);
                    // this.setSomeVariable(spokenword)
                    finalCommand = spokenword
                }
            },
            {
                indexes: ["Generate reports of * of this year"],
                smart: true,
                action: (i, month) => {
                    let year = new Date().getFullYear();

                    Artyom.say(`Generating reports of ${month} ${year} `);

                    Artyom.say("Ready ! What were you expecting? write some code you lazy bear !");
                }
            },
        ]);
    }
}

export {
  ArtyomCommandsManager,
  spokenword,
  finalCommand
}
