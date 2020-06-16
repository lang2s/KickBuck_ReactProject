import React, { Component } from 'react';
import './Board.css';



class Board_Top extends Component {

    constructor({history}){
        
        super();

        this.state={
            freedisplay_none: "none",
            freedisplay: "block",
            qnadisplay_none: "none",
            qnadisplay: "block",
            freeTab_on_className: "tab_on",
            qnaTab_on_className: "",
            guestTab_on_className: "",
            faqTab_on_className: ""
        }

        this.history = history;
    }
    
    freeVisibleEvent=()=>{   
        this.setState({      
            freedisplay_none: 'block',
            qnadisplay: 'none',  
            freeTab_on_className: 'tab_on',    
            qnaTab_on_className: '',
            guestTab_on_className: '',
            faqTab_on_className: ''
        })
    }
    
    qnaVisibleEvent=()=>{
        this.setState({
            freedisplay_none: 'none',
            qnadisplay: 'block',
            freeTab_on_className: '',    
            qnaTab_on_className: 'tab_on',
            guestTab_on_className: '',
            faqTab_on_className: ''
        })
      }



    render() {
        return (
            <div>
                <div className='section-top'>
                    <div className='community_title'>
                        <span>COMMUNITY</span>
                    </div>
                </div>
                
                <div className='board_container'>
                    <ul className='board_tab'>
                        <li className={this.state.freeTab_on_className} onClick={this.freeVisibleEvent.bind(this)}>Free Board</li>
                        <li className={this.state.qnaTab_on_className} onClick={this.qnaVisibleEvent.bind(this)}>Q & A Board</li>
                        <li>Guest Board</li>
                        <li>FAQ</li>
                    </ul>
                </div>            

            </div>
        );
    }
}

export default Board_Top;