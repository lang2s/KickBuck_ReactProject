import React, { Component } from 'react';
import Solo from './Solo';
import Off from './Off';
import With from './With';


class All extends Component {

    render() {

        return (
            <div>
                <Solo/>
                <Off/>
                <With/>
            </div>
        );
    }
}

export default All;