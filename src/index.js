import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import help from "./help.svg";
import setting from "./setting.svg";

class Board extends React.Component {
    render() {
        return (
            <div className="todo">
                <p>Board Implementation To Come Soon...</p>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <header>
                    <div className="menu">
                        <button id="help-button">
                            <img src={help}></img>
                        </button>
                    </div>
                    <div className="title">
                        <h1>WORDLE</h1>
                    </div>
                    <div>
                        <button id="setting-button">
                            <img src={setting}></img>
                        </button>
                    </div>
                </header>
                <div id="board">
                    <Board />
                </div>
            </div>
            
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById("root"),
);