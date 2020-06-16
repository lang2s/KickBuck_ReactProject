import React, { Component } from "react";
import '../Board.css';
import axios from "axios";
import FreeBoardItem from "./FreeBoardItem";
import Button from "@material-ui/core/Button";

class FreeBoardList extends Component {
  constructor() {
    super();

    this.state = {
      freeBoardListData: [], //스프링으로부터  게시판 목록 받아서 저장할 변수
      start: 0,
      flag: false,
      flag2: false
    };
  }

  //리스트 함수
  list = () => {
    var url =
      "http://localhost:9000/controller/community/freeboardlist?start=" +
      this.state.start;
    axios
      .get(url)
      .then(responseData => {
        this.setState({
          freeBoardListData: responseData.data
        });
      })
      .catch(error => {
        console.log("list 오류");
      });
  };
  onClickNext = () => {
    if (this.state.freeBoardListData.length !== 0) {
      this.setState((prevState, props) => ({
        start: prevState.start + 10,
        flag: true
      }));
    }
  };

  onClickPre = () => {
    if (this.state.start > 0) {
      this.setState((prevState, props) => ({
        start: prevState.start - 10,
        flag2: true
      }));
    }
  };

  componentDidMount() {
    this.list(); //랜더링 직전 스프링으로부터 목록을 받아온다
    console.log(localStorage);
  }

  componentDidUpdate = () => {
    if (this.state.flag) {
      this.list();
      this.setState({
        flag: false
      });
    } else if (this.state.flag2) {
      this.list();
      this.setState({
        flag2: false
      });
    }
  };

  handleClickOpen() {
    this.setState({
      open: true
    });
  }

  componentDidUpdate = (p, s) => {
    if (this.state.flag) {
      this.list();
      this.setState({
        flag: false
      });
    } else if (this.state.flag2) {
      this.list();
      this.setState({
        flag2: false
      });
    }
  };

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
                <li className='tab_on' onClick={()=>{this.props.history.push("/community/freeboardlist");}}>Free Board</li>
                <li onClick={()=>{this.props.history.push("/community/qnaboard");}}>Q & A Board</li>
                <li onClick={()=>{this.props.history.push("/community/guestboard");}}>Guest Board</li>
                <li onClick={()=>{this.props.history.push("/community/FAQ_signup");}}>FAQ</li>
            </ul>
        </div>
         
        <div className="board_container">          
          <table className="board">
            <thead className='board_head'>
              <tr height= '80px'>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>조회수</th>
                <th>작성일</th>
              </tr>
            </thead>
            <tbody className='board_body'>
              {this.state.freeBoardListData.map((row, idx) => (
                <FreeBoardItem
                  row={row}
                  idx={idx}
                  key={row.num}
                ></FreeBoardItem>
              ))}
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
                  this.props.history.push("/community/freeboardinsert");
                } else {
                  alert("로그인을 해주세요");
                }
              }}>
              글쓰기
            </Button>
          </div>
        </div>

      </div>
      
    );
  }
}

export default FreeBoardList;
