import React, { Component } from 'react';
import Bmr from './Bmr';
import Bmrwrite from './Bmrwrite';

export default class Bmrlist extends Component {

    constructor({props,history}){
        
        super(props);

        this.history=history;
    }


    render(){
        return (
            <div>

                <div className='section-top'>
                    <div className='community_title'>
                        <span>COMMUNITY</span>
                    </div>
                </div>
                
                <div className='board_container'>
                    <ul className='board_tab'>
                        <li onClick={()=>{this.props.history.push("/community/freeboardlist");}}>Free Board</li>
                        <li onClick={()=>{this.props.history.push("/community/qnaboard");}}>Q & A Board</li>
                        <li className='tab_on' onClick={()=>{this.props.history.push("/community/guestboard");}}>Guest Board</li>
                        <li onClick={()=>{this.props.history.push("/community/FAQ_signup");}}>F&nbsp;A&nbsp;Q</li>
                    </ul>
                </div>
                <Bmrwrite />
                <br></br>
                <Bmr />
                <br></br> 
            </div>
        );
    }
}