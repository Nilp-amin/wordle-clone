import React from "react";

import SvgBackspace from "../iconComponents/backspace";
import Button from "../buttonComponents/button";

class KeyBoard extends React.Component {
    topRowData = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
    middleRowData = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
    bottomRowData = ["z", "x", "c", "v", "b", "n", "m"];

    handleButtonClick(data) {
        window.dispatchEvent(new KeyboardEvent("keydown", {"key": data}));
    }

    keyBoardRow(data) {
        const row = [];
        for (let i = 0; i < data.length; i++) {
            row.push(
                <Button 
                    key={data[i]} 
                    data={data[i]}
                    onClick={() => this.handleButtonClick(data[i])}
                    style={{backgroundColor: this.props.data[data[i]]}}
                />
            );
        }

        return row;
    }

    render() {
        return(
            <div id="keyboard">
                <div className="row">
                    {this.keyBoardRow(this.topRowData)}
                </div>
                <div className="row">
                    <div className="spacer half"></div>
                    {this.keyBoardRow(this.middleRowData)}
                    <div className="spacer half"></div>
                </div>
                <div className="row">
                    <Button 
                        className="one-and-a-half" 
                        data="enter"
                        onClick={() => this.handleButtonClick("Enter")}
                    />
                    {this.keyBoardRow(this.bottomRowData)}
                    <Button 
                        className="one-and-a-half" 
                        data={<SvgBackspace height={24} width={24}/>}
                        onClick={() => this.handleButtonClick("Backspace")}
                    />
                </div>
            </div>
        );
    }
}

export default KeyBoard;