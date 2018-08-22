import React from 'react';
export default class Header extends React.Component {
    constructor() {
        super()
    }
    render(props) {
        return (
            <div>
                <h1>{this.props.a}</h1>
            </div>
        )
    }
}