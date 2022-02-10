import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

import SvgHelp from "./iconComponents/help";
import SvgSetting from "./iconComponents/setting";
import SvgClose from "./iconComponents/close";
import SvgStatistics from "./iconComponents/statistics";

import Button from "./buttonComponents/button"; 
import Board from "./gameComponents/board";
import KeyBoard from "./gameComponents/keyboard";

 

class Statistics extends React.Component {
    render() {
        return (
            <>
                <h1>Statistics</h1>
                <div id="statistics">
                    <div className="statistics-container">
                        <div className="statistic">12</div>
                        <div className="label">Played</div>
                    </div>
                    <div className="statistics-container">
                        <div className="statistic">75</div>
                        <div className="label">Win %</div>
                    </div>
                    <div className="statistics-container">
                        <div className="statistic">2</div>
                        <div className="label">Current Streak</div>
                    </div>
                    <div className="statistics-container">
                        <div className="statistic">5</div>
                        <div className="label">Max Streak</div>
                    </div>
                </div>
            </>
        );
    }
}

class GuessGraph extends React.Component {
    render() {
        return (
        <div className="graph-container">
            <div className="guess">{this.props.guess}</div>
            <div className="graph">
                <div className="graph-bar" style={{width: this.props.width}}>
                    <div className="num-guesses">{this.props.count}</div>
                </div>
            </div>
        </div>
        ); 
    }
}

class GuessDistribution extends React.Component {
    render() {
        return (
            <div id="guess-distribution">
                <h1>Guess Distribution</h1>
                <GuessGraph guess={1} width={"7%"} count={0}/> 
                <GuessGraph guess={2} width={"7%"} count={0}/> 
                <GuessGraph guess={3} width={"7%"} count={0}/> 
                <GuessGraph guess={4} width={"7%"} count={0}/> 
                <GuessGraph guess={5} width={"7%"} count={0}/> 
                <GuessGraph guess={6} width={"7%"} count={0}/> 
            </div>
        );
    }
}

class Footer extends React.Component {
    render() {
        return (
            <div className="footer">
                <div className="countdown">
                    <h1>Next WORDLE</h1>
                    <div id="timer">
                        <div className="statistics-container">
                            <div className="statistic timer">
                                <div id="timer">08:25:30</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="reset">
                    <Button id="reset-button" data="Reset" onClick={() => this.props.onClick()}/>
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    tileEmpty = "#000000";
    tileColorAbsent = "#3a3a3c";
    tileColorPresent = "#b59f3b";
    tileColorCorrect = "#538d4e";
    constructor(props) {
        super(props);
        this.state = {
            boardState: Array.from({length: 6}, e => Array(5).fill(null)),
            boardColor: Array.from({length: 6}, e => Array(5).fill(this.tileEmpty)),
            keyBoardColor: {"a": "", "b": "", "c": "", "d": "",
                            "e": "", "f": "", "g": "", "h": "",
                            "i": "", "j": "", "k": "", "l": "",
                            "m": "", "n": "", "o": "", "p": "",
                            "q": "", "r": "", "s": "", "t": "",
                            "u": "", "v": "", "w": "", "x": "",
                            "y": "", "z": ""},
            activeRow: 0,
            activeTileIndex: 0,
            correctWord: "",
            displayStatistics: true,
            statisticsAnimation: "SlideIn 1000ms",
            correctWordGuessed: false,
            gameFinished: false,
        }

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleHelpButtonClick = this.handleHelpButtonClick.bind(this);
        this.handleSettingButtonClick = this.handleSettingButtonClick.bind(this);
        this.handleStatisticsButtonClick = this.handleStatisticsButtonClick.bind(this);
        this.handleCloseClick = this.handleCloseClick.bind(this);

        this.fetchWord().then(word => {
            this.state.correctWord = word["word"]; 
        });
    }

    async fetchWord() {
        const respose = await fetch("/word-generator/");
        const time = await respose.json();

        return time;
    }

    async fetchGuess() {
        const response = await fetch("/word/hello");
        const define = await response.json();

        return define;
    }

    checkUserGuess(guess) {
        const correctWord = this.state.correctWord;

        // Check if guess is correct
        if (guess === this.state.correctWord) {
            return Array(5).fill(this.tileColorCorrect);
        }

        const correctWordCharCount = {};
        for (let i = 0; i < correctWord.length; i++) {
            correctWordCharCount[correctWord.charAt(i)] = 
                correctWord.split(correctWord.charAt(i)).length - 1;
        }

        // Check if any letters match correct word
        const tileColors = Array(5).fill(this.tileColorAbsent);
        for (let i = 0; i < correctWord.length; i++) {
            if (correctWord.includes(guess.charAt(i)) && correctWordCharCount[guess.charAt(i)] > 0) {
                if (correctWord.indexOf(guess.charAt(i)) === i) {
                    tileColors[i] =  this.tileColorCorrect;
                } else {
                    tileColors[i] = this.tileColorPresent;
                }
                --correctWordCharCount[guess.charAt(i)];
            }
        }

        // (nilp) TODO: If YEMEN, and first E yellow and second grey, keyboard E should be yellow not grey
        
        return tileColors;
    }

    handleKeyDown(e) {
        const keyPressed = e.key;
        const boardState = this.state.boardState.slice();
        var boardRow = this.state.activeRow;
        var tileIndex = this.state.activeTileIndex;
        var gameFinished = this.state.gameFinished;
        if (keyPressed.length === 1 && keyPressed.match(/[a-z]/i) && !gameFinished) {
           if (boardRow < boardState.length && tileIndex < boardState[0].length) {
               boardState[boardRow][tileIndex] = keyPressed.toLowerCase();
           }
           if (tileIndex < boardState[0].length) {
               tileIndex++;
           }
           this.setState(
               {
                   boardState: boardState,
                   activeRow: boardRow,
                   activeTileIndex: tileIndex,
               }
           );
        } else if (keyPressed === "Backspace" && !gameFinished) {
            // TODO: Fix backspace key error after last row and last letter filled
            if (tileIndex > 0) {
                tileIndex--;
            }
            boardState[boardRow][tileIndex] = null;

            this.setState({
                    boardState: boardState,
                    activeTileIndex: tileIndex,
                    activeRow: boardRow,
            });
        } else if (keyPressed === "Enter" && tileIndex === boardState[0].length && !gameFinished) {
            const boardColor = this.state.boardColor;
            const keyboardColor = this.state.keyBoardColor;
            let finished = false;
            let gameFinished = false;
            // Change game colors 
            boardColor[boardRow]= this.checkUserGuess(this.state.boardState[boardRow].join(""));
            for (let i = 0; i < boardState[boardRow].length; i++) {
                const guessChar = boardState[boardRow][i];
                keyboardColor[guessChar] = boardColor[boardRow][i];
            }

            // Check if game is finished
            const guessColor = boardColor[boardRow]
            const endColor = Array(5).fill(this.tileColorCorrect);
            if (guessColor.length === endColor.length && guessColor.every((value, index) => value === endColor[index])) {
                finished = true;
                gameFinished = true;
            }

            tileIndex = 0;
            if (boardRow < boardState.length) {
                boardRow++;
            }
            // Game finished without winning
            if (boardRow === boardState.length) {
                gameFinished = true;
            }

            this.setState({
                boardColor: boardColor,
                keyboardColor: keyboardColor,
                activeRow: boardRow,
                activeTileIndex: tileIndex,
                displayStatistics: gameFinished,
                statisticsAnimation: gameFinished === true ? "SlideIn 1000ms" : "SlideOut 1000ms",
                correctWordGuessed: finished,
                gameFinished: gameFinished,
            });

        }
    }

    handleHelpButtonClick() {
        console.log("Clicked Help Button!");
    }

    handleSettingButtonClick() {
        console.log("Clicked Setting Button!");
    }

    handleStatisticsButtonClick() {
        this.setState({
            displayStatistics: true,
            statisticsAnimation: "SlideIn 1000ms",
        });
    }

    handleCloseClick() {
        this.setState({
            statisticsAnimation: "SlideOut 1000ms",
        });

        setTimeout(() => {
            this.setState({
                displayStatistics: false,
            })
        }, 900);
    }

    handleReset() {
        // Also want to be able to reset if game-over
        if (this.state.correctWordGuessed || this.state.gameFinished) {
            console.log("Word was: " + this.state.correctWord);
            this.setState({
                boardState: Array.from({length: 6}, e => Array(5).fill(null)),
                boardColor: Array.from({length: 6}, e => Array(5).fill(this.tileEmpty)),
                keyBoardColor: {"a": "", "b": "", "c": "", "d": "",
                                "e": "", "f": "", "g": "", "h": "",
                                "i": "", "j": "", "k": "", "l": "",
                                "m": "", "n": "", "o": "", "p": "",
                                "q": "", "r": "", "s": "", "t": "",
                                "u": "", "v": "", "w": "", "x": "",
                                "y": "", "z": ""},
                activeRow: 0,
                activeTileIndex: 0,
                correctWord: "",
                displayStatistics: true,
                statisticsAnimation: "SlideOut 1000ms",
                correctWordGuessed: false,
                gameFinished: false,
            });
            this.fetchWord().then(word => {
                this.state.correctWord = word["word"]; 
            });
            this.handleCloseClick();
        } else {
            console.log("cannot reset yet");
        }
    }

    render() {
        window.addEventListener("keydown", this.handleKeyDown);
        return (
            <div className="game">
                <header>
                    <div className="menu">
                        <Button 
                            id={"help-button"}
                            data={<SvgHelp height={24} width={24} fill={"#565758"}/>}
                            onClick={() => this.handleHelpButtonClick()}
                        /> 
                    </div>
                    <div className="title">WORDLE</div>
                    <div className="menu">
                        <Button 
                            id={"statistics-button"}
                            data={<SvgStatistics height={24} width={24} fill={"#565758"}/>}
                            onClick={() => this.handleStatisticsButtonClick()}
                        />
                        <Button 
                            id={"setting-button"}
                            data={<SvgSetting height={24} width={24} fill={"#565758"}/>}
                            onClick={() => this.handleSettingButtonClick()}
                        /> 
                    </div>
                </header>
                <div id="board-container">
                    <Board boardState={this.state.boardState} boardColor={this.state.boardColor}/>
                </div>
                <div id="game-keyboard">
                    <KeyBoard data={this.state.keyBoardColor}/>
                </div>
                <div>
                    <div className="overlay" style={{display: this.state.displayStatistics === true ? "flex" : "none"}}>
                        <div className="content" style={{animation: this.state.statisticsAnimation}}>
                            <SvgClose 
                                height={24} 
                                width={24}
                                style={{
                                    position: "absolute",
                                    top: "10px",
                                    right: " 16px",
                                    cursor: "pointer",
                                    userSelect: "none",
                                    fill: "#565758",
                                }}
                                onClick={() => this.handleCloseClick()}
                            />
                            <div className="container">
                                <Statistics /> 
                                <GuessDistribution />
                                <Footer onClick={() => this.handleReset()}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById("root"),
);