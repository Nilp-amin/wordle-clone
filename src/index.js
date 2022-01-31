import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

import SvgHelp from "./iconComponents/help";
import SvgSetting from "./iconComponents/setting";
import Button from "./buttonComponents/button"; 

class Tile extends React.Component {
    render() {
        return (
            <div 
                className="tile" 
                style={{backgroundColor: this.props.color}} 
                tabIndex={"0"}
            >
                {this.props.value}
            </div>
        );
    }
}

class BoardRow extends React.Component {
    renderTile(i) {
        return <Tile 
            value={this.props.data[i]}
            color={this.props.tileColors[i]}
        />
    }

    render() {
        return (
            <div id="board-row">
                {this.renderTile(0)}
                {this.renderTile(1)}
                {this.renderTile(2)}
                {this.renderTile(3)}
                {this.renderTile(4)}
            </div>
        );
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        const tileColorAbsent = "#3a3a3c";
        const tileColorPresent = "#b59f3b";
        const tileColorCorrect = "#538d4e";
        this.state = {
            boardState: Array.from({length: 6}, e => Array(5).fill(null)),
            boardColor: Array.from({length: 6}, e => Array(5).fill(tileColorAbsent)),
            activeRow: 0,
            activeTileIndex: 0,
        }

        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    // TODO: Check if row char after 5 letters entered and "enter" key pressed

    handleKeyDown(e) {
        const keyPressed = e.key;
        const boardState = this.state.boardState.slice();
        var boardRow = this.state.activeRow;
        var tileIndex = this.state.activeTileIndex;
        if (keyPressed.length === 1 && keyPressed.match(/[a-z]/i)) {
           if (boardRow < boardState.length && tileIndex < boardState[0].length) {
               boardState[boardRow][tileIndex] = keyPressed;
           }
           if (tileIndex < boardState[0].length) {
               tileIndex++;
           }
           if (boardRow < boardState.length && tileIndex === boardState[0].length) {
               tileIndex = 0;
               boardRow++;
           }
           this.setState(
               {
                   boardState: boardState,
                   activeRow: boardRow,
                   activeTileIndex: tileIndex,
               }
           );
        } else if (keyPressed === "Backspace") {
            if (tileIndex > 0) {
                tileIndex--;
            } else if (boardRow > 0) {
                tileIndex = 4;
                boardRow--;
            }
            boardState[boardRow][tileIndex] = null;

            this.setState(
                {
                    boardState: boardState,
                    activeTileIndex: tileIndex,
                    activeRow: boardRow,
                }
            );
        }
    }

    render() {
        window.addEventListener("keydown", this.handleKeyDown);
        return (
            <div id="board">
                <BoardRow data={this.state.boardState[0]} tileColors={this.state.boardColor[0]}/>
                <BoardRow data={this.state.boardState[1]} tileColors={this.state.boardColor[1]}/>
                <BoardRow data={this.state.boardState[2]} tileColors={this.state.boardColor[2]}/>
                <BoardRow data={this.state.boardState[3]} tileColors={this.state.boardColor[3]}/>
                <BoardRow data={this.state.boardState[4]} tileColors={this.state.boardColor[4]}/>
                <BoardRow data={this.state.boardState[5]} tileColors={this.state.boardColor[5]}/>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
    }

    handleHelpButtonClick() {
        console.log("Clicked Help Button!");
    }

    handleSettingButtonClick() {
        console.log("Clicked Setting Buttin!");
    }

    render() {
        return (
            <div className="game">
                <header>
                    <div className="menu">
                        <Button 
                            id={"help-button"}
                            data={<SvgHelp height={35} width={35}/>}
                            onClick={() => this.handleHelpButtonClick()}
                        /> 
                    </div>
                    <div className="title">WORDLE</div>
                    <div className="menu">
                       <Button 
                            id={"setting-button"}
                            data={<SvgSetting height={35} width={35}/>}
                            onClick={() => this.handleSettingButtonClick()}
                       /> 
                    </div>
                </header>
                <div id="board-container">
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