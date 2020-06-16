import React, { Component } from 'react';
import axios from 'axios';
import '../Board.css';
import Button from '@material-ui/core/Button';

export default class Bmrwrite extends Component {
    constructor (props) {
        super(props);

        this.state={
            
            nickname:'',
            content:''
            
        }
    }

      // 입력 시 바로 state값 변경하는 이벤트    
    onKeyChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit=(e)=>{
        e.preventDefault();

        var url="http://localhost:9000/controller/guestsave";
        axios.post(url, {
            nickname: this.state.nickname,
            contents: this.state.content
        })
        .then((res)=>{
            this.setState({
                nickname:'',
                contents:''
            })
        })
        .catch((error)=>{
            console.log("submit 오류:" + error.data);
        });
        window.location.reload(); //새로고침할 필요없이 방명록이 바로 목록에 출력된다
    }

    render(){
        return (
            <div className='board_container'>
                <table  className="board">
                    <thead className='board_head'>
                        <tr height= '80px'>
                            <td colSpan="2">
                                방명록 글 남기기
                            </td>
                        </tr>
                    </thead>

                    <tbody className='board_body'>
                        <tr>
                            <td>
                                <input type="text" placeholder="방문자 이름"
                                className="input_title input_area"
                                style={{width:'1200px', height: '50px'}}
                                value={this.state.nickname}
                                onChange={this.onKeyChange}
                                name="nickname"/>
                            </td>
                        </tr>
                        <tr>   
                            <td>
                                <input type="text" placeholder="한마디 이야기를 남겨주세요"
                                className="input_title input_area"
                                style={{width: "1200px", height:"200px"}}
                                value={this.state.content}
                                onChange={this.onKeyChange}
                                name="content"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <br/>
                <form onSubmit={this.onSubmit} style={{float:'right'}}>
                    <Button className='btn_function' type="submit" variant="contained" color="primary" >
                        남기기
                    </Button>
                </form>        
            </div>
        )
    }
}