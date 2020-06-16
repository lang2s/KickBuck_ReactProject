import React, { Component} from "react";
import axios from "axios";
import FreeBoardComment from "./FreeBoardComment";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";

export default class FreeBoardDetail extends Component {
  constructor({ history, match }) {
    super();

    this.history = history;
    this.num = match.params.num;
    this.state = {
      selectData: "", //스프링으로부터 dto 데이타를 받을변수
      freeboardcommentListData: "",
      open: false
    };

    this.onSelect = this.onSelect.bind(this);
  }
  //글선택 함수
  onSelect = () => {
    var url =
      "http://localhost:9000/controller/community/freeboarddetail?num=" +
      this.num;

    axios
      .get(url)
      .then(responseData => {
        this.setState({
          selectData: responseData.data
        });
      })
      .catch(error => {
        console.log("select error");
      });
  };

  onDelete = () => {
    if (localStorage.state === this.state.selectData.user_name) {
      var url =
        "http://localhost:9000/controller/community/freeboarddetail/delete?num=" +
        this.num;

      axios
        .get(url)
        .then(responseData => {
          //삭제후 돌아가기
          this.history.push("/community/freeboardlist");
        })
        .catch(error => {
          console.log("delte error");
        });
    } else {
      alert("로그인 정보가 일치하지않습니다");
    }
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };
  handleClickClose = () => {
    this.setState({
      open: false
    });
  };

  componentDidMount = () => {
    this.onSelect();
  };

  render() {
    const url = "http://localhost:9000/controller/save/";

    let loginBtn1;
    let loginBtn2;
    
    if (localStorage.state === this.state.selectData.user_name)
    {
        loginBtn1 = 
        <Button variant="contained" style={{margin: '5px'}} 
            onClick={()=>{this.history.push("/community/freeboardupdate/" + this.state.selectData.num);}}>
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
                <li className='tab_on' onClick={()=>{this.props.history.push("/community/freeboardlist");}}>Free Board</li>
                <li onClick={()=>{this.props.history.push("/community/qnaboard");}}>Q & A Board</li>
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
                      작성일 &nbsp;&nbsp;:&nbsp;&nbsp; {this.state.selectData.day} &nbsp;&nbsp;&nbsp;&nbsp;
                      
                      {loginBtn1}{loginBtn2}                                    
                      
                      <Dialog open={this.state.open} onClose={this.handleClickClose}>
                        <DialogTitle onClose={this.handleClickClose}>삭제 경고</DialogTitle>
                        <DialogContent>
                          <Typography gutterBottom>선택한 게시물을 삭제하시겠습니까?</Typography>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={this.onDelete}
                          >
                            삭제
                          </Button>
                          <Button
                            variant="contained"
                            onClick={this.handleClickClose}
                          >
                            닫기
                          </Button>
                        </DialogActions>
                      </Dialog>
                  </td>                               
              </tr>
              <tr>
                <td colSpan="2" width="1000px" height="600px">
                  <div style={{backgroundColor: '#f6f6f6'}}>   
                    <p style={{textAlign:'center', margin: '5px 5px 5px 5px'}}>        
                      <img src={url + this.state.selectData.imagename} alt="" style={{textAlign: 'center', maxWidth: '900px'}}/>
                    </p>
                    <textarea className="input_content input_area" style={{width:'1150px', height:'500px'}}
                    value={this.state.selectData.content}/>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <br/>
          <div style={{float:'right'}}>

              <Button className='btn_function' variant="contained" color="primary" onClick={() => {
                  if (localStorage.length === 1) {
                      this.props.history.push("/community/freeboardinsert");
                  } else {
                    alert("로그인을 해주세요");
                  }
                }}>
                  글쓰기
              </Button>                        

              <Button className='btn_function' variant="contained" onClick={()=>{this.history.push("/community/freeboardlist");}}>
                  목    록
              </Button>

          </div>
        </div>
        
        <br/><br/><br/>
        <FreeBoardComment freeboardnum={this.num} />
        
      </div>
    );
  }
}
