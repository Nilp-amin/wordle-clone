import React from "react";

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
    render() {
        return (
            <div id="board">
                <BoardRow data={this.props.boardState[0]} tileColors={this.props.boardColor[0]}/>
                <BoardRow data={this.props.boardState[1]} tileColors={this.props.boardColor[1]}/>
                <BoardRow data={this.props.boardState[2]} tileColors={this.props.boardColor[2]}/>
                <BoardRow data={this.props.boardState[3]} tileColors={this.props.boardColor[3]}/>
                <BoardRow data={this.props.boardState[4]} tileColors={this.props.boardColor[4]}/>
                <BoardRow data={this.props.boardState[5]} tileColors={this.props.boardColor[5]}/>
            </div>
        );
    }
}

export default Board;