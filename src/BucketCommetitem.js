import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@material-ui/core';
import './community/Board.css';

class BucketCommentItem extends Component {

    constructor(history){
        super();

        this.history=history;

        this.state={
            qnaCommentData: [],
            group_num:'',
            num:'',
            recomment: '',
            display: "none",
            isvisible: "visible",
            opendelete:false
        }

        this.onKeyChange =  this.onKeyChange.bind(this);

    }

    

    onKeyChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value,
            num: this.props.row.num,
            group_num: this.props.row.group_num
        });        
        console.log(this.state);
    }

    visibleEvent=()=>{
        this.setState({
            display: 'table-row',
            isvisible: 'hidden'
        })
    }

    unvisibleEvent=()=>{
        this.setState({
            display: 'none',
            isvisible: 'visible'
        })
    }

    onSubmit=(e)=>{
        e.preventDefault();

        axios.post(
            "http://localhost:9000/controller/bucketcomment/recommentwrite",
            {
                group_num: this.state.group_num,
                num: this.state.num,
                user_name: localStorage.state,
                comment: this.state.recomment
            }
        )
            .then((responseData)=>{
                // 추가를 한 후에 필요한 코드    
                
                // 코멘트 리스트 다시 호출
                this.props.onList();

                // 코멘트 입력란 지우기
                this.setState({            
                    recomment:''
                });

                this.qnaCommentCount();

            })
            .catch((error)=>{
                console.log("add error");
            });
               
    }

    // 삭제하는 함수
    onDataDelete=(num)=>{
        
        var url="http://localhost:9000/controller/bucketcomment/commentdelete?comment_num="+this.props.row.comment_num;

        axios.get(url)
        .then((responseData)=>{
            // 코멘트 리스트 다시 호출
            this.props.onList();
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

        let step = this.props.row.step_num;

        return (
            <tbody className='board_body'>
                <tr height="60px;" >

                    {/* <td style={{textAlign: 'center', width: '60px'}}>
                        {
                            step === 1
                            ? this.props.row.comment_num
                            : ""
                        }
                    </td> */}

                    <td colSpan='2' style={{textAlign: 'center', width: '150px'}}>
                        {this.props.row.user_name}
                    </td>

                    <td style={{textAlign: 'left', width: '600px'}}>
                        {
                            step === 1
                            ? this.props.row.comment
                            :'RE:  '+this.props.row.comment
                        
                        }
                    </td>

                    <td style={{textAlign: 'center', width: '150px'}}>
                        {this.props.row.daytime}
                    </td>   

                    <td width='170px'>
                        <Button variant="outlined" style={{width:'80px', height:'40px', margin: '3px',
                         visibility:this.state.isvisible}} onClick={this.visibleEvent.bind(this)}>
                            대댓글
                        </Button>  
                        <Button variant="outlined" color="secondary" style={{width:'20px', height:'40px', margin: '3px',
                         visibility:this.state.isvisible}} onClick={this.handleClickOpen}>
                            X
                        </Button>
                        <Dialog open={this.state.opendelete} onClose={this.handleClickClose}>
                            <DialogTitle>댓글 삭제</DialogTitle>
                                <DialogContent>
                                    <Typography gutterBottom>댓글을 삭제하시려면 '확인'을 클릭하세요</Typography>
                                </DialogContent>
                            <DialogActions>
                                <Button variant="contained" color="secondary" onClick={this.onDataDelete}>확인</Button>
                                <Button variant="contained" onClick={this.handleClickClose}>닫기</Button>
                            </DialogActions>
                        </Dialog>  
                    </td>             
                </tr>
                <tr style={{display:this.state.display}}>
                    <td colSpan='2' style={{textAlign: 'center'}}>
                        RE:
                    </td>
                    {/* <td style={{width:'130px', height: '40px', textAlign: 'center'}}>
                        {localStorage.state}
                    </td> */}
                    <td colSpan="2">
                        <input type="text" name="recomment" className="input_area input_comment" 
                         style={{width:'750px', height:'40px'}} placeholder="대댓글을 입력하세요." value={this.state.recomment}
                         required="required" onChange={this.onKeyChange}/>
                    </td>
                    
                    <td width='190px'>   
                        <form onSubmit={this.onSubmit}>                             
                            <Button type="submit" variant="outlined" color="primary" style={{width:'60px', height:'40px', margin: '5px'}}
                             onClick={this.unvisibleEvent.bind(this)}>
                                등록
                            </Button>
                            <Button variant="outlined" style={{width:'55px', height:'40px', margin: '5px'}}
                             onClick={this.unvisibleEvent.bind(this)}>
                                취소
                            </Button> 
                        </form>                                   
                    </td>
                    
                </tr> 
            </tbody>
                          
                                                    
                
        );
    }
}

export default BucketCommentItem;