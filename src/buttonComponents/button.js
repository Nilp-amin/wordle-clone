import React from "react";

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {
        return (
            <button 
                className={this.props.className}
                id={this.props.id} 
                onClick={() => this.props.onClick()}
                style={this.props.style}
            >
                {this.props.data}
            </button>
        );
    }

}

export default Button;