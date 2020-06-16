import React, { Component} from "react";
import axios from "axios";
import FreeBoardCommentItem from "./FreeBoardCommentItem";
import Button from '@material-ui/core/Button';
import '../Board.css';

class FreeBoardComment extends Component {
  constructor(history) {
    super();

    this.history = history;

    this.state = {
      freeBoardCommentData: [],
      num: "",
      user_name: "",
      comment: "",
      commentCount: ''
    };

    this.onKeyChange = this.onKeyChange.bind(this);
  }

  onKeyChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      num: this.props.freeboardnum,
      user_name: localStorage.state
    });
  };

  onSubmit = e => {
    e.preventDefault();

    axios
      .post("http://localhost:9000/controller/freeboardcomment/commentwrite", {
        num: this.state.num,
        user_name: this.state.user_name,
        comment: this.state.comment
      })
      .then(responseData => {
        // 추가를 한 후에 필요한 코드
        // 코멘트 리스트 다시 호출
        this.freeBoardCommentList();

        // 코멘트 입력란 지우기
        this.setState({
          comment: ""
        });
      })
      .catch(error => {
        console.log("프리보드댓글 error");
      });
  };

  // 목록을 가져올 함수
  freeBoardCommentList = () => {
    console.log("commentlistnum=" + this.props.freeboardnum);
    var url =
      "http://localhost:9000/controller/freeboardcomment/list?num=" +
      this.props.freeboardnum;
    axios
      .get(url)
      .then(resData => {
        // 스프링 서버로부터 받은 데이타로 qnaData로 수정
        this.setState({
          freeBoardCommentData: resData.data
        });
      })
      .catch(error => {
        console.log(
          "freeBoardComment list 오류!" + this.state.freeBoardCommentData
        );
      });
  };

  // 댓글 갯수를 가져올 함수
  freeCommentCount=()=>{
    var url="http://localhost:9000/controller/freeboardcomment/commentcount?num=" + this.props.freeboardnum;
    
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
    // 랜더링 직전 스프링으로 목록을 받아온다
    this.freeBoardCommentList();
    // 랜더링 직전 스프링으로 댓글 갯수를 받아온다
    this.freeCommentCount();
  }

  render() {
    return (
      <div>
        
        <div className='board_container'>
          <h3 style={{textAlign:'left', marginLeft: '30px', height: '30px'}}><b> 댓글 &nbsp;
            <span style={{color: '#E86D51'}}>{this.state.commentCount}</span> </b>
          </h3>        
        
        <table className="board" style={{ width: "1200px" }}>
          {this.state.freeBoardCommentData.map((row, idx) => (
            <FreeBoardCommentItem
              row={row}
              idx={idx}
              key={row.comment_num}
              onList={this.freeBoardCommentList}
            />
          ))}
        </table>
        
        <br />
        <br />
        <form onSubmit={this.onSubmit}>
          <table className="board">
            <tbody className='board_body'>
              <tr>
                <th style={{ width: "150px", height: "60px", textAlign:'center' }}>
                  {localStorage.state}
                </th>
                <td>
                  <input
                    type="text"
                    name="comment"
                    className="input_area input_comment"
                    style={{ width: "710px", height: "50px" }}
                    placeholder="댓글을 입력하세요."
                    value={this.state.comment}
                    required="required"
                    onChange={this.onKeyChange}
                  />
                </td>
                <td>
                  <Button
                    type="submit"
                    className="btn_function" variant="outlined" color="primary"
                  >
                    댓글 등록
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>          
        </form>
        <br /><br />
        </div>
      </div>
    );
  }
}

export default FreeBoardComment;
