import React, { Component, Fragment } from 'react';

import '../Board.css';
import {NavLink} from 'react-router-dom';

export default class FAQ_signup extends Component {
   
    constructor({props,history}){
        
        super(props);

        this.history=history;
    }

    state={ yashow:false, ybshow:false, ycshow:false, ydshow:false}

    yatoggle()
    {
        this.setState({
            yashow:!this.state.yashow
        })
    }

    ybtoggle()
    {
        this.setState({
            ybshow:!this.state.ybshow
        })
    }

    yctoggle()
    {
        this.setState({
            ycshow:!this.state.ycshow
        })
    }

    ydtoggle()
    {
        this.setState({
            ydshow:!this.state.ydshow
        })
    }



  render() {
    
    return (
      <Fragment>
        <div className='section-top'>
            <div className='community_title'>
                <span>COMMUNITY</span>
            </div>
        </div>
        
        <div className='board_container'>
            <ul className='board_tab'>
                <li onClick={()=>{this.props.history.push("/community/freeboardlist");}}>Free Board</li>
                <li onClick={()=>{this.props.history.push("/community/qnaboard");}}>Q & A Board</li>
                <li onClick={()=>{this.props.history.push("/community/guestboard");}}>Guest Board</li>
                <li className='tab_on' onClick={()=>{this.props.history.push("/community/FAQ_signup");}}>FAQ</li>
            </ul>
        </div>


        <div className='board_container'>
                
            <table className="board">                        
                <tbody className='board_body' style={{textAlign: 'center'}}>
                    <tr height= '80px'>                                
                        <td width="250" >
                            {/* style={{ textDecoration: 'none' }}은 NavLink 밑줄 제거하기 위해 적용
                                xmenu는 hover     */}                                    
                            <NavLink exact to="/community/FAQ_signup" style={{ textDecoration: 'none' }}>
                                <p id="xmenu">가입/로그인</p>
                            </NavLink>
                        </td>
                        <td width="250">
                            <NavLink exact to="/community/FAQ_contents" style={{ textDecoration: 'none' }}>
                                <p id="xmenu">서비스/컨텐츠</p> 
                            </NavLink>  
                        </td>
                        <td width="250">
                            <NavLink exact to="/community/FAQ_etc" style={{ textDecoration: 'none' }}>
                                <p id="xmenu">기타</p> 
                            </NavLink>
                        </td>
                    </tr>                            
                </tbody> 
            </table>             
        </div>        

        <div className='board_container'>

            <ul>
                <li className="question" onClick={()=>this.yatoggle()} name="aa" >
                        가입시 이메일은 필수인가요?                              
                    
                    {  this.state.yashow?
                            <p className="answer"> <b>A.</b> 이메일로 본인확인을 가능하여 이메일이 없을 시 가입이 불가능합니다.<br/>
                            그리고 공지사항 및 이벤트를 이메일로 전달해 드리고 있어 이메일 주소가 필수사항입니다. 
                            </p>
                    :null
                    }                           
                </li>
                <li className="question" onClick={()=>this.ybtoggle()} name="ab">
                    나이 제한은 없나요?                           
                           
                            {  this.state.ybshow?
                                 <p className="answer"> <b>A.</b> 나이와 관계없이 누구나 참여할 수 있습니다. </p>
                            :null
                            }                           
                </li>
                <li className="question" onClick={()=>this.yctoggle()} name="ac">
                        로그인이 되지 않아요                           
                    
                    {  this.state.ycshow?
                            <p className="answer"> <b>A.</b> 비밀번호 찾기 진행해보시고 안 되면 관리자 및 QNA 게시판에 문의주세요. </p>
                    :null
                    }                           
                </li>
                <li className="question" onClick={()=>this.ydtoggle()} name="ad">
                    탈퇴를 하는 방법은 어떻게 되나요?                           
                    
                    {  this.state.ydshow?
                            <p className="answer"> <b>A.</b> 탈퇴하는 기능이 따로 없습니다. 탈퇴를 원하실 경우
                            Q&A 게시판에 작성해주시면 처리해드리고 있습니다. </p>
                    :null
                    }                           
                </li>
                
                

            </ul>

                

            </div>
      </Fragment>
    );
  }
}
