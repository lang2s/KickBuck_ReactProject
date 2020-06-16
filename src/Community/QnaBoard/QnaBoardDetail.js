import React, { Component } from 'react';
import axios from 'axios';
import QnaComment from './QnaComment';
import Button from '@material-ui/core/Button';
import { Dialog, DialogTitle, DialogContent, DialogActions,Typography } from '@material-ui/core';


  

class QnaBoardDetail extends Component {

    constructor({history,match}){
        
        super();

        this.history=history;

        this.num=match.params.num;

        this.state={
            // 스프링으로부터 dto 데이타를 받을 변수
            selectData:'',
            opendelete:false
        }

        this.onSelect=this.onSelect.bind(this);

        this.onDataDelete=this.onDataDelete.bind(this);

        
    }

    // 글 선택 시 호출되는 함수
    onSelect=()=>{
        var url="http://localhost:9000/controller/qnaboard/select?num="+this.num;

        axios.get(url)
        .then((responseData)=>{
            console.log(responseData.data)

            this.setState({
                selectData:responseData.data
            });

        })
        .catch((error)=>{
            console.log("select one error "+error.data);
        })
    }

    

    componentDidMount=()=>{
        // 랜더링 직전 스프링으로부터 목록을 받아온다
        this.onSelect();
    }


    // 삭제하는 함수
    onDataDelete=(num)=>{
        console.log("list num="+this.state.selectData.num);
        var url="http://localhost:9000/controller/qnaboard/delete?num="+this.state.selectData.num;

        axios.get(url)
        .then((responseData)=>{
            // QnaBoard로 이동
            this.history.push("/community/qnaboard");
        })
        .catch((error)=>{
            console.log("delete error");
        });
    }


     // 모달 팝업 관련 이벤트
    handleClickOpen = () =>{
        this.setState({
        opendelete: true
        });
    }
    
    handleClickClose = () =>{
        this.setState({
        opendelete: false
        });
    }


    render() {

        let loginBtn1;
        let loginBtn2;
        
        if (localStorage.state === this.state.selectData.user_name)
        {
            loginBtn1 = 
            <Button variant="contained" style={{margin: '5px'}} 
                onClick={()=>{this.history.push("/community/qnaboardupdate/"+this.state.selectData.num);}}>
                수    정
            </Button>

            loginBtn2 =
            <Button variant="contained" style={{margin: '5px'}} color="secondary" onClick={this.handleClickOpen}>
                삭    제
            </Button>
        }

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
                                <td colSpan="2">
                                  {this.state.selectData.title}
                                </td>
                            </tr>
                        </thead>
                        <tbody className='board_body'>                            
                            <tr height='66px'>
                                <td width="1000px">
                                    작 성 자 &nbsp;&nbsp;:&nbsp;&nbsp; <b>{this.state.selectData.user_name}</b>
                                </td>
                                <td style={{textAlign: 'right'}}>
                                    조회수 &nbsp;&nbsp;:&nbsp;&nbsp; {this.state.selectData.readcnt}
                                </td>
                            </tr>
                            <tr >
                                <td colSpan='2' style={{textAlign: 'right'}}>
                                    작성일 &nbsp;&nbsp;:&nbsp;&nbsp; {this.state.selectData.daytime} &nbsp;&nbsp;&nbsp;&nbsp;
                                    
                                    {loginBtn1}{loginBtn2}                                    
                                    
                                    <Dialog open={this.state.opendelete} onClose={this.handleClickClose}>
                                            <DialogTitle onClose={this.handleClickClose}>삭제 경고</DialogTitle>
                                            <DialogContent>
                                                <Typography gutterBottom>글을 삭제하시려면 '확인'을 클릭하세요</Typography>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button variant="contained" color="secondary" onClick={this.onDataDelete}>확인</Button>
                                                <Button variant="contained" onClick={this.handleClickClose}>닫기</Button>
                                            </DialogActions>
                                    </Dialog>     
                                </td>                               
                            </tr>
                            
                            <tr>
                                <td colSpan="2" width="1000px" height="600px">
                                    <textarea className="input_content input_area" style={{width:'1150px', height:'500px'}} value={this.state.selectData.content}/>
                                </td>
                            </tr>                            
                        </tbody>
                    </table>
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

                        <Button className='btn_function' variant="contained" onClick={()=>{this.history.push("/community/qnaboard");}}>
                            목    록
                        </Button>

                    </div>
                </div>

                <br/><br/><br/>
                <QnaComment qnanum={this.num}/>
            </div>
           
                
            
        );
    }
}

export default QnaBoardDetail;