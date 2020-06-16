import React, { Component, Fragment } from 'react';
import './faq.css';
import {NavLink} from 'react-router-dom';


export default class FAQ_contents extends Component {

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

            yetoggle()
            {
                this.setState({
                    yeshow:!this.state.yeshow
                })
            }

            yftoggle()
            {
                this.setState({
                    yfshow:!this.state.yfshow
                })
            }

            ygtoggle()
            {
                this.setState({
                    ygshow:!this.state.ygshow
                })
            }

            yhtoggle()
            {
                this.setState({
                    yhshow:!this.state.yhshow
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
                    'Tick Off' 란 무슨뜻인가요? <br/>                             
                           
                            {  this.state.yashow?
                                 <p className="answer"> 
                                    <b>A.</b> 'Tick Off' 란 체크리스트에서 완료한 항목을 <b>'√'</b>(체크표시)를 하는 일을 말합니다.<br />
                                    'Tick Off'는 여러 분의 버킷리스트를 관리하고 공유하는 공간입니다. <br/>
                                    버킷리스트들을 만들어보세요. 그리고 하나씩 완료하여 <b>'√'</b>(체크표시)를 해나가세요. <br/>
                                    혼자 하기 힘든 버킷리스트는 공감하는 사람들과 함께 해서 'Tick Off' 하세요!
                                    </p>
                            :null
                            }                           
                </li>
                <li className="question" onClick={()=>this.ybtoggle()} name="ab">
                    이용 방법이 궁금해요                               
                           
                            {  this.state.ybshow?
                                 <p className="answer"> 
                                    <b>A.</b> 회원가입 후 로그인을하고 자신이 원하는 버킷리스트를 작성하세요.<br />
                                    이미 있는 버킷리스트에 함께하기를 눌러 시작하면됩니다.<br />
                                    버킷리스트 작성시 같이하고 싶으면 공개를 선택 혼자하고 싶다면 비공개를 선택할 수 있습니다.<br />
                                    다른 사람들의 버킷리스트를 공감하기를 통해 자신의 버킷리스트들과 비교해 보세요.<br />
                                    버킷리스트를 완료하셨다면 'Tick Off' 하고 후기를 작성해 다른 사람들과 정보를 공유하세요!
                                  </p>
                            :null
                            }                           
                </li>
                <li className="question" onClick={()=>this.yctoggle()} name="ac">
                    나이 제한은 없나요?                           
                           
                            {  this.state.ycshow?
                                 <p className="answer"> <b>A.</b> 나이와 관계없이 누구나 참여할 수 있습니다. </p>
                            :null
                            }                           
                </li>
                <li className="question" onClick={()=>this.ydtoggle()} name="ad">
                   비회원으로 참여할 수 있나요?                          
                           
                            {  this.state.ydshow?
                                 <p className="answer"> <b>A.</b> 회원만 이용 가능합니다. Tick Off 는 사용자분들의 소중한 버킷리스트들을 다루고 있습니다.<br />
                                 참여하는 부분에 있어서 회원이 아닐경우 문제가 생길 수 있으므로 회원 가입을 통하여 이용하시기를 부탁드립니다.
                                  </p>
                            :null
                            }                           
                </li>
                <li className="question" onClick={()=>this.yetoggle()} name="ae">
                    프로필사진은 어떻게 올리나요?                        
                           
                            {  this.state.yeshow?
                                 <p className="answer"> <b>A.</b> 로그인하셔서 프로필에 들어가면 이미지업로드버튼이 있습니다.
                                 <br />
                                 원하시는 사진선택 후 수정하기버튼을 누르시면 변경됩니다.
                                  </p>
                            :null
                            }                           
                </li>
                <li className="question" onClick={()=>this.yftoggle()} name="af">
                    공감버튼 누른 것들은 어디서 볼 수 있나요?                      
                           
                            {  this.state.yfshow?
                                 <p className="answer"> <b>A.</b> 마이 페이지에 들어가시면 공감한 버킷리스트들을 모아서 보실 수 있습니다.
                                  </p>
                            :null
                            }                           
                </li>
                <li className="question" onClick={()=>this.ygtoggle()} name="ag">
                    검색은 어떻게 할 수 있나요?                      
                           
                            {  this.state.ygshow?
                                 <p className="answer"> <b>A.</b> 검색은 올라와 있는 글의 제목과 해시태그 기준으로 검색하실 수 있습니다.
                                  </p>
                            :null
                            }                           
                </li>
                <li className="question" onClick={()=>this.yhtoggle()} name="ah">
                    버킷리스트를 함께하는 사람들과는 어떻게 소통하나요?                
                           
                            {  this.state.yhshow?
                                 <p className="answer"> <b>A.</b> 함께하기를 10명 이상이 누르게 되면 함께하기 게시판이 생성됩니다.<br />
                                  함께하기 게시판에서 댓글과 사진을 통해 버킷리스트에 대해 소통하고 함께 Tick Off 해보세요!
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
