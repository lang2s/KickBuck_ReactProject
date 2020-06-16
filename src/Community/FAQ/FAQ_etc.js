import React, { Component, Fragment } from 'react';
import './faq.css';
import {NavLink} from 'react-router-dom';

export default class FAQ_etc extends Component {
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
                    사기를 당한 것 같아 걱정되어요                                
                           
                            {  this.state.yashow?
                                 <p className="answer"> 
                                    A. 가까운 경찰서 또는 사이버 안전국, KISA(인터넷침해대응센터)으로 신고해 주세요.<br/>
                                    <br/> 경찰청 사이버 안전 지킴이 바로가기->  http://www.police.go.kr/www/security/cyber.jsp
                                    <br/>KISA(인터넷침해대응센터) 바로가기-> https://www.krcert.or.kr/consult/phishing.do
                                    <br/> <br/>사기당한 방법 및 수법을 카페에 알려, 제2의 피해자가 나오지 않도록 합니다.  
                                    &nbsp;사기꾼에게서 온 문자나 연락처, 주소 등 인적 사항을 알아낼 수 있는 정보는 보존하고, 많은 사람과 공유합니다.
                                </p>
                            :null
                            }    

                </li>
                <li className="question" onClick={()=>this.ybtoggle()} name="ab" >
                    기타 문의를 원하시면                               
                           
                            {  this.state.ybshow?
                                 <p className="answer"> 
                                    A. 기타 문의를 원하시면 'tickoff_csmanager@gmail.com' 로 문의주시기 바랍니다.<br/>
                                    또는 Q&A 게시판의 문의 주시면 빠른 시간 안에 답변드리도록 하겠습니다.
                                    감사합니다.
                                </p>
                            :null
                            }    

                </li>
            </ul>
        </div>
      </Fragment>
    );
  }
}



