import React, {Component } from'react';
// import ReactDOM from 'react-dom';
import P5Wrapper from 'react-p5-wrapper';
import Sketch2 from './sketch2.js'

import MicrophoneViz from './MicrophoneViz.js'
import CreateImage from './CreateImage.js'

// Import the Artyom library
import Artyom from 'artyom.js';
// Import the previously created class to handle the commands from another file
import ArtyomCommands, { ArtyomCommandsManager,
                          spokenword,
                          finalCommand
                         } from './ArtyomCommands.js';
// Create a "globally" accesible instance of Artyom
const Jarvis = new Artyom();

class App extends Component {

  constructor (props, context){
    super(props, context);
    // Add `this` context to the handler functions
    this.startAssistant = this.startAssistant.bind(this);
    this.stopAssistant = this.stopAssistant.bind(this);
    // this.speakText = this.speakText.bind(this);
    // this.handleTextareaChange = this.handleTextareaChange.bind(this);

    // Prepare simple state
    this.state = {
        artyomActive: false,
        textareaValue: "",
        artyomIsReading: false,
        finalCommand: "",
        text: 'Richard'
    };

    // Load some commands to Artyom using the commands manager
    let CommandsManager = new ArtyomCommandsManager(Jarvis);
    CommandsManager.loadCommands();
    // setInterval(() => console.log(spokenword), 1000)
    // console.log(CommandsManager.loadCommands().spokenword)
}

  loadVoices = (msg) => {
    let timer = setInterval(() => {
      let voices = speechSynthesis.getVoices();
      // console.log(voices);
      if (voices.length !== 0) {
        let message = new SpeechSynthesisUtterance(msg);
        message.voice = voices[49];
        speechSynthesis.speak(message);
        clearInterval(timer);
        }
    }, 20);
  }

  componentDidMount(){
    // if (this.state.finalCommand !== prevState.finalCommand) return true
    document.querySelector("#talkButton").click()
  }

  startAssistant() {
    let _this = this;

    console.log("Artyom succesfully started !");

    Jarvis.initialize({
        lang: "en-GB",
        debug: true,
        continuous: true,
        soundex: true,
        listen: true
    }).then(() => {
        // Display loaded commands in the console

        console.log(Jarvis.getAvailableCommands());

        Jarvis.say("Hello there");

        // Jarvis.say("How are you")

        _this.setState({
            artyomActive: true
        });
    }).catch((err) => {
        console.error("Oopsy daisy, this shouldn't happen !", err);
    });
  }

  stopAssistant() {
    let _this = this;

    Jarvis.fatality().then(() => {
        console.log("Jarvis has been succesfully stopped");

        _this.setState({
            artyomActive: false,
            finalCommand: finalCommand
        });

    }).catch((err) => {
        console.error("Oopsy daisy, this shouldn't happen neither!", err);

        _this.setState({
            artyomActive: false
      });

    });
  }



	render () {
    // console.log(Artyom.getVoices())
    // console.log(CreateImage.createImage())
		return (
			<div>

        <div style={{position: "absolute", marginLeft: "auto", marginRight: "auto", left: "0", right: "0", width:"900px", height:"200px"}}>
          <P5Wrapper sketch={Sketch2} />

          <CreateImage msg={["hello, " + this.state.finalCommand]}/>

        </div>

        <div style={{position: "relative",zIndex: "99999999999"}}>
          <div id="talkButton" onClick={this.startAssistant}/>
          <input type="button" value="Stop Artyom" disabled={!this.state.artyomActive} onClick={this.stopAssistant}/>
        </div>

        {this.loadVoices("Hello. I am Jarvis.")}

      {spokenword === null ? null : <p>{spokenword}</p>}


        <MicrophoneViz />

          <svg preserveAspectRatio="none" id="visualizer" version="1.1" >
            <defs>
              <mask id="mask">
                  <g id="maskGroup">
                </g>
              </mask>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{stopColor:'#ff0a0a',stopOpacity:'.75'}} />
                <stop offset="20%" style={{stopColor:'#f1ff0a',stopOpacity:'.75'}} />
                <stop offset="90%" style={{stopColor:'#d923b9',stopOpacity:'.75'}} />
                <stop offset="100%" style={{stopColor:'#050d61',stopOpacity:'.75'}} />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#gradient)" mask="url(#mask)"></rect>
          </svg>

        <h1>In <a href="https://codepen.io/zapplebee/full/gbNbZE/">Full Page view</a>, please allow the use of your microphone</h1>
			</div>
		);
	}
}

export default App
