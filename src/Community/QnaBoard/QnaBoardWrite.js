import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';


class QnaBoardWrite extends Component {


    constructor({history}){
        
        super();

        this.history=history;
         
    }


    onSubmit=(e)=>{
        e.preventDefault();

        let title = this.refs.title;
        let content = this.refs.content;
    
        console.log(title.value,content.value);
        
        var url="http://localhost:9000/controller/qnaboard/write";
        axios.post(
            url,
            {
                user_name:localStorage.state,
                title:title.value,
                content:content.value
            })
            .then((responseData)=>{
                // 추가를 한 후에 필요한 코드
                // 작성한 글(qnaboarddetail)로 이동
                this.history.push("/community/qnaboard");
                
            })
            .catch((error)=>{
                console.log("add error");
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
                                    Q & A 글쓰기
                                </td>
                            </tr>
                        </thead>
                        <tbody className='board_body'>
                            <tr>
                                <th style={{width:'200px', height:'50px'}}>사용자이름</th>
                                <td>
                                    {localStorage.state}
                                </td>
                            </tr>
                            <tr>
                                <th style={{width:'200px', height:'50px'}}>제    목</th>
                                <td>
                                    <input type="text" ref="title" className="input_title input_area"
                                    style={{width:'1000px', height: '50px'}} placeholder="제목을 입력하세요."
                                    required="required"/>
                                </td>
                            </tr>
                            <tr>
                                <th style={{width:'200px', height:'50px'}}>질문내용</th>
                                <td>
                                    <textarea ref="content" className="input_content input_area" 
                                    style={{width:'1000px', height:'400px'}} placeholder="질문을 입력하세요."
                                    required="required"/>
                                </td>
                            </tr>                            
                        </tbody>
                    </table>
                    <br/>
                    <form onSubmit={this.onSubmit} style={{float:'right'}}>
                        <Button className='btn_function' type="submit" variant="contained" color="primary" >
                            질문 등록
                        </Button>
                    
                        <Button className='btn_function' variant="contained" onClick={()=>{this.history.push("/community/qnaboard");}}>
                            취 소
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default QnaBoardWrite;