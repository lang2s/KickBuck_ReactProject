import React, { Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";

class FreeBoardInsert extends Component {
  constructor(props, history) {
    super(props);
    this.state = {
      title: "",
      imagename: "",
      content: "",
      user_name: localStorage.state,
      open: false
    };
    this.history = history;
    console.log(this.state.user_name);
  }

  //입력시 state 값 변경
  onKeyChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onImageUpload = e => {
    const uploadFile = e.target.files[0];
    const imagename = e.target.files[0].name; //이미지파일명
    console.log("이미지 파일명:" + imagename);
    this.setState({
      imagename
    });

    //서버로  사진 업로드
    const stufile = new FormData();
    stufile.append("uploadFile", uploadFile);
    axios({
      method: "post",
      url: "http://localhost:9000/controller/community/freeboardinsert/save",
      data: stufile,
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log("업로드 오류:" + error.data);
      });
  };

  onSubmit = e => {
    e.preventDefault();

    const uploadFile = this.state;
    var url =
      "http://localhost:9000/controller/community/freeboardinsert/input";
    axios
      .post(url, uploadFile)
      .then(res => {
        this.setState({
          msg: res.data,
          title: "",
          imagename: "",
          content: "",
          user_name: localStorage.state
        });
        this.props.history.push("/community/freeboardlist");
      })
      .catch(err => {
        console.log("submit 오류:" + err.data);
      });
  };

  render() {
    return (
      <div>
        <div className="section-top">
          <div className="community_title">
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
            <thead className="board_head">
              <tr height="80px">
                <td colSpan="2">Free Board 글쓰기</td>
              </tr>
            </thead>
            <tbody className="board_body">
              <tr>
                <th style={{ width: "200px", height: "50px" }}>사용자이름</th>
                <td>{localStorage.state}</td>
              </tr>
              <tr>
                <th style={{ width: "200px", height: "50px" }}>제목</th>
                <td>
                  <input
                    className="input_title input_area"
                    style={{ width: "1000px", height: "50px" }}
                    placeholder="제목을 입력하세요."
                    required="required"
                    type="text"
                    name="title"
                    value={this.state.title}
                    onChange={this.onKeyChange}
                    required
                  ></input>
                </td>
              </tr>
              <tr>
                <th style={{ width: "200px", height: "50px" }}>내용</th>
                <td>
                  <textarea
                    className="input_content input_area"
                    style={{ width: "1000px", height: "400px" }}
                    placeholder="내용을 입력하세요."
                    required="required"
                    name="content"
                    value={this.state.content}
                    onChange={this.onKeyChange}
                    required
                  ></textarea>
                </td>
              </tr>
              <tr>
                <th style={{ width: "200px", height: "50px" }}>사진</th>
                <td>
                  <input
                    className="filebox"
                    type="file"
                    name="imagename"
                    onChange={this.onImageUpload}
                  ></input>
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <form onSubmit={this.onSubmit} style={{ float: "right" }}>
            <Button
              className="btn_function"
              type="submit"
              variant="contained"
              color="primary"
            >
              저 장
            </Button>

            <Button
              className="btn_function"
              variant="contained"
              onClick={() => {
                this.props.history.push("/community/freeboardlist");
              }}
            >
              취 소
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default FreeBoardInsert;
