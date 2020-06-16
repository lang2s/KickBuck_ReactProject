import React, { Component } from "react";
import axios from 'axios';
export default class FreeBoardItem extends Component {

  constructor(){
    super();

    this.state={
        commentCount: ''
    }

  }

  // 댓글 갯수를 가져올 함수
  freeCommentCount=()=>{
    var url="http://localhost:9000/controller/freeboardcomment/commentcount?num=" + this.props.row.num;
    
    axios.get(url)
    .then((resData)=>{
        // 스프링 서버로부터 받은 데이타로 qnaData로 수정 
        this.setState({
            commentCount: resData.data
        })

        console.log(this.state.commentCount);
    })
    .catch((error)=>{
        console.log("freeboard comment count 오류!");
    })
  }

  componentDidMount() {
    // 랜더링 직전 스프링으로 댓글 갯수를 받아온다
    this.freeCommentCount();
  }

  render() {
    return (
      <tr className='board_body' height="70px;">
        
        <td style={{textAlign: 'center', width: '110px'}}>
          {this.props.row.num}
        </td>
        
        <td style={{width: '680px'}}>
          <a href={"/community/freeboarddetail/" + this.props.row.num}>
            {this.props.row.title} &nbsp;
            <sup style={{color: '#E86D51'}}>{this.state.commentCount}</sup>
          </a>
        </td>
        
        <td style={{textAlign: 'center', width: '180px'}}>
          {this.props.row.user_name}
        </td>
        
        <td style={{textAlign: 'center', width: '100px'}}>
          {this.props.row.readcnt}
        </td>
        
        <td style={{textAlign: 'center', width: '120px'}}>
          {this.props.row.today}
        </td>

      </tr>
    );
  }
}
