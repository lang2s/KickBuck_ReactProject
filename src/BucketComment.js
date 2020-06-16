import React, { Component } from 'react';
import BucketCommentItem from './BucketCommetitem';
import axios from 'axios';
import Button from '@material-ui/core/Button';

class BucketComment extends Component {

    constructor(props,history){
        super(props);

        this.history=history;

        this.state={
            qnaCommentData: [],
            num:'',
            user_name: '',
            comment: '',
            commentCount: '',
            qnum: props.qnanum
        }
        this.onKeyChange =  this.onKeyChange.bind(this);

    }

    shouldComponentUpdate(nextProps, nextState){
        if(this.state.qnum !== nextProps.qnanum)
        {
            this.setState({
                qnum: nextProps.qnanum
            })
            this.qnaCommentList();
            this.qnaCommentCount(); 
        }

        return true;
    }


    onKeyChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value,
            num: this.props.qnanum,
            user_name: localStorage.state
        });        
    }
        
   

    onSubmit=(e)=>{
        e.preventDefault();

        axios.post(
            "http://localhost:9000/controller/bucketcomment/commentwrite",
            {
                num: this.state.num,
                user_name: this.state.user_name,
                comment: this.state.comment
            }
        )
            .then((responseData)=>{
                // 추가를 한 후에 필요한 코드    
                // 코멘트 리스트 다시 호출
                this.qnaCommentList();

                // 코멘트 입력란 지우기
                this.setState({
                    comment:''
                });       
                
                this.qnaCommentCount();
                
            })
            .catch((error)=>{
                console.log("add error");
            });
               
    }

    // 목록을 가져올 함수
    qnaCommentList=()=>{
        var url="http://localhost:9000/controller/bucketcomment/list?num=" + this.props.qnanum;
        axios.get(url)
        .then((resData)=>{
            // 스프링 서버로부터 받은 데이타로 qnaData로 수정
            this.setState({
                qnaCommentData: resData.data
            })
            this.qnaCommentCount();

        })
        .catch((error)=>{
            console.log("qnaboard list 오류!");
        })
    }

    // 댓글 갯수를 가져올 함수
    qnaCommentCount=()=>{
        var url="http://localhost:9000/controller/bucketcomment/commentcount?num=" + this.props.qnanum;
        
        axios.get(url)
        .then((resData)=>{
            // 스프링 서버로부터 받은 데이타로 qnaData로 수정 
            this.setState({
                commentCount: resData.data
            })
        })
        .catch((error)=>{
            console.log("qnaboard comment count 오류!");
        })
    }



    render() {
        
        return (
            <div>
                <div className='board_container' style={{paddingTop:'50px'}}>
                    <h3 style={{textAlign:'left', marginLeft: '30px', height: '30px'}}><b> 댓글 &nbsp;
                        <span style={{color: '#E86D51'}}>{this.state.commentCount}</span></b>
                    </h3>                
                    
                    <table className="board" style={{width: '100%'}}>
                        
                            {
                                this.state.qnaCommentData.map((row,idx)=>(
                                    <BucketCommentItem row={row} idx={idx} key={row.comment_num} onList={this.qnaCommentList}/>                                
                                ))
                            }
                        
                    </table>
                    
                    <br/><br/>
                    <form onSubmit={this.onSubmit}>
                        <table className="board">
                            <tbody className='board_body'>
                                <tr>
                                    <th style={{width:'150px', height: '60px', textAlign:'center'}}>
                                        {localStorage.state}
                                    </th>
                                    <td>
                                        <input type="text" name="comment" className="input_area input_comment" 
                                        style={{width:'710px', height:'50px'}} placeholder="댓글을 입력하세요." value={this.state.comment}
                                        required="required" onChange={this.onKeyChange}/>
                                    </td>
                                    <td>                                
                                        <Button className='btn_function' type="submit" variant="outlined" color="primary">
                                            댓글 등록
                                        </Button>                                    
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                    <br/><br/>
                </div>
            </div>
        );
    }
}

export default BucketComment;
