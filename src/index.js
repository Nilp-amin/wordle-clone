import React from "react";
import { useEffect } from "react";
import ReactDOM from "react-dom";

import "./index.css";

import SvgHelp from "./iconComponents/help";
import SvgSetting from "./iconComponents/setting";
import Button from "./buttonComponents/button"; 

class Tile extends React.Component {
    render() {
        const id = this.props.id;
        return (
            <div 
                className="tile" 
                style={{backgroundColor: this.props.colors[id]}} 
                onKeyDown={(e) => this.props.onKeyDown(e)}
                tabIndex={"0"}
            >
                {this.props.values[id]}
            </div>
        );
    }
}

class BoardRow extends React.Component {
    constructor(props) {
        super(props);
        const tileColorAbsent = "#3a3a3c";
        const tileColorPresent = "#b59f3b";
        const tileColorCorrect = "#538d4e";
        this.state = {
            values: Array(5).fill(null),
            tileColors: Array(5).fill(tileColorAbsent),
            activeTileIndex: 0,
        }

        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    renderTile(i) {
        return <Tile 
            onKeyDown={e => this.handleKeyDown(e)}
            values={this.state.values}
            colors={this.state.tileColors}
            id={i}
        />
    }

    handleKeyDown(e) {
        const keyPressed = e.key;
        const val = this.state.values.slice();
        var tileIndex = this.state.activeTileIndex;
        if (keyPressed.length === 1 && keyPressed.match(/[a-z]/i)) {
            if (tileIndex < 5) {
                val[tileIndex] = keyPressed;
            }
            if (tileIndex < this.state.values.length) {
                tileIndex++;
            }

            this.setState(
                {
                    values: val,
                    activeTileIndex: tileIndex,
                }
            );
        } else if (keyPressed === "Backspace") {
            if (tileIndex > 0) {
                tileIndex--;
            }
            val[tileIndex] = null;

            this.setState(
                {
                    values: val,
                    activeTileIndex: tileIndex,
                }
            );
        }
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
    render() {
        return (
            <div id="board">
                <BoardRow />
                <BoardRow />
                <BoardRow />
                <BoardRow />
                <BoardRow />
                <BoardRow />
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