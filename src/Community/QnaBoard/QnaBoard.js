import React, { Component } from 'react';
import axios from 'axios';
import QnaBoardItem from './QnaBoardItem';
import Button from '@material-ui/core/Button';
import '../Board.css';



class QnaBoard extends Component {

    constructor({history}){
        
        super();

        this.state = {            

            // 스프링에서 게시판 목록을 받아서 저장할 변수
            qnaData: [],

            // 페이징 관련 
            start: 0,
            flag: false,
            flag2: false

        };

        this.history=history;
    }

    
   

    // 목록을 가져올 함수
    qnaList=()=>{
        var url="http://localhost:9000/controller/qnaboard/list?start=" + 
        this.state.start;
        axios.get(url)
        .then((resData)=>{
            // 스프링 서버로부터 받은 데이타로 qnaData로 수정
            this.setState({
                qnaData: resData.data
            })
        })
        .catch((error)=>{
            console.log("qnaboard list 오류!");
        })
    }


    // 다음 페이지 함수
    onClickNext = () => {
        console.log(this.state.qnaData.length);
        if (this.state.qnaData.length !== 0)
        {
            this.setState((prevState, props) => ({
                start: prevState.start + 10,
                flag: true
            }));
        }
    }

    // 이전 페이지 함수
    onClickPre = () => {
        console.log(this.state.qnaData.length);
        if (this.state.start > 0)
        {
            this.setState((prevState, props) => ({
                start: prevState.start - 10,
                flag2: true
            }));
        }
    }

    componentDidMount(){
        // 랜더링 직전 스프링으로 목록을 받아온다
        this.qnaList();
    }

    componentDidUpdate = (p, s) => {
        if (this.state.flag)
        {
            this.qnaList();
            this.setState({
                flag: false
            });
        }
        else if (this.state.flag2)
        {
            this.qnaList();
            this.setState({
                flag2: false
            })
        }
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
                        <li onClick={()=>{this.props.history.push("/community/freeboardlist");}}>Free Board</li>
                        <li className='tab_on' onClick={()=>{this.props.history.push("/community/qnaboard");}}>Q & A Board</li>
                        <li onClick={()=>{this.props.history.push("/community/guestboard");}}>Guest Board</li>
                        <li onClick={()=>{this.props.history.push("/community/FAQ_signup");}}>FAQ</li>
                    </ul>
                </div>            

                <div className='board_container'>
                    <table className="board">
                        <thead className='board_head'>
                            <tr height= '80px'>
                                <th style={{textAlign: 'center'}}>번호</th>
                                <th style={{textAlign: 'center'}}>제목</th>
                                <th style={{textAlign: 'center'}}>사용자이름</th>
                                <th style={{textAlign: 'center'}}>조회수</th>
                                <th style={{textAlign: 'center'}}>작성일</th>
                            </tr>
                        </thead>
                        <tbody className='board_body'>
                            {
                                this.state.qnaData.map((row,idx)=>(
                                    <QnaBoardItem row={row} idx={idx} key={row.num}
                                    onSelect={this.onSelect}/>
                                ))
                            }
                        </tbody>
                    </table>

                    <br/>
                    <div>
                        <Button variant="contained" onClick={this.onClickPre} style={{margin: '5px', marginLeft: '50px'}}>
                            ＜ Pre
                        </Button>
                        <Button variant="contained" onClick={this.onClickNext} style={{margin: '5px', marginLeft: '940px'}}>
                            Next ＞
                        </Button>
                    </div>            
                    <br/>
                    <div style={{float:'right'}}>                    
                        <Button className='btn_function' variant="contained" color="primary"                         
                         onClick={() => {
                            if (localStorage.length === 1) {
                                this.props.history.push("/community/qnaboardwrite");
                            } else {
                              alert("로그인을 해주세요");
                            }
                          }}>
                            글쓰기
                        </Button>                  
                    </div>

                    <br/><br/>
                </div>
            </div>
        );
    }
}

export default QnaBoard;