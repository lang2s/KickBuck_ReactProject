import React, { Component } from 'react';
import Axios from 'axios';
import Button from '@material-ui/core/Button';

class QnaBoardUpdate extends Component {

    constructor({history,match}){
        
        super();

        this.history=history;

        this.num=match.params.num;

        this.state={
            // 스프링으로부터 dto 데이타를 받을 변수
            selectData:'',
            title: '',
            content: ''
        }


        this.onEdit=this.onEdit.bind(this);

    }

    // 글 선택 시 호출되는 함수
    onEdit=()=>{
        var url="http://localhost:9000/controller/qnaboard/select?num="+this.num;

        Axios.get(url)
        .then((responseData)=>{
            console.log(responseData.data)

            this.setState({
                selectData:responseData.data,
                title: responseData.data.title,
                content: responseData.data.content
            });
        })
        .catch((error)=>{
            console.log("select one error"+error.data);
        })
    }

    titleChange=(e)=>{
        this.setState({
            title: e.target.value
        });
    }

    contentChange=(e)=>{
        this.setState({
            content: e.target.value
        });
    }

    // 업데이트 함수
    onDataUpdate=(title1, content1, num1)=>{
        console.log(title1, content1, num1);
        var url="http://localhost:9000/controller/qnaboard/update";
        Axios.post(url,{title:title1,
            content:content1, num:num1})
            .then((responseData)=>{
                // 추가를 한 후에 필요한 코드
                // 작성한 글(qnaboarddetail)로 이동
                this.history.push("/community/qnaboarddetail/"+this.state.selectData.num);
                
            })
            .catch((error)=>{
                console.log("add error");
            })
    }

    // form submit 시 호출할 함수
    onSubmit=(e)=>{
        e.preventDefault();
        // Boardlist의 이벤트 핸들러 호출
        const {title,content}=this.refs;
        const num=this.state.selectData.num;
        console.log(title.value,content.value,num);
        

        this.onDataUpdate(title.value,content.value,num);
    }

    componentWillMount=()=>{
        // 랜더링 직전 스프링으로부터 목록을 받아온다
        this.onEdit();
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
                        <li className='tab_on'onClick={()=>{this.props.history.push("/community/qnaboard");}}>Q & A Board</li>
                        <li onClick={()=>{this.props.history.push("/community/guestboard");}}>Guest Board</li>
                        <li onClick={()=>{this.props.history.push("/community/FAQ_signup");}}>FAQ</li>
                    </ul>
                </div>

                <div className='board_container'>
                    <table className="board">
                        <thead className='board_head'>
                            <tr height= '80px'>
                                <th style={{width:'200px', height:'50px'}}>사용자 이름</th>
                                <td>
                                     {this.state.selectData.user_name}
                                </td>
                            </tr>
                        </thead>
                        <tbody className='board_body'>                            
                            <tr>
                                <th style={{width:'200px', height:'50px'}}>제    목</th>
                                <td>
                                    <input type="text" ref="title" className="input_title input_area"
                                    style={{width:'1000px', height: '50px'}} value={this.state.title}
                                    onChange={this.titleChange} required="required"></input>
                                </td>
                            </tr>
                            <tr>
                                <th style={{width:'200px', height:'50px'}}>질문내용</th>
                                <td>
                                    <textarea ref="content" className="input_content input_area" 
                                    style={{width:'1000px', height:'400px'}} value={this.state.content}
                                    onChange={this.contentChange} required="required">                                        
                                    </textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <form onSubmit={this.onSubmit} style={{float:'right'}}>
                        <Button className='btn_function' type="submit" variant="contained" color="primary" >
                            저 장
                        </Button>
                    
                        <Button className='btn_function' variant="contained" onClick={()=>{this.history.push("/community/qnaboarddetail/"+this.state.selectData.num);}}>
                            취 소
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default QnaBoardUpdate;