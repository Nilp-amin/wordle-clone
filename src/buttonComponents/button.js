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
            <button id={this.props.id} onClick={() => this.props.onClick()}>
                {this.props.data}
            </button>
        );
    }

}

export default Button;