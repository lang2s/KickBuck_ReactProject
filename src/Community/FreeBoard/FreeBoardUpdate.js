import React, { Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";

export default class FreeBoardDetail extends Component {
  constructor({ history, match }) {
    super();

    this.history = history;
    this.num = match.params.num;
    this.state = {
      //스프링으로부터 dto 데이타를 받을변수
      selectData: "",
      title: "",
      content: "",
      imagename: "",
      user_name: "",
      num: this.num
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
        console.log(responseData.data);
        this.setState({
          title: responseData.data.title,
          content: responseData.data.content,
          imagename: responseData.data.imagename,
          user_name: responseData.data.user_name
        });
      })
      .catch(error => {
        console.log("select error");
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

  onKeyChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const uploadFile = this.state;

    console.log(this.num);
    var url =
      "http://localhost:9000/controller/community/freeboarddetail/update";
    axios
      .post(url, uploadFile)
      .then(res => {
        this.setState({
          msg: res.data,
          title: "",
          imagename: "",
          content: ""
        });
        console.log(res.data);
        this.props.history.push("/community/freeboarddetail/" + this.num);
      })
      .catch(err => {
        console.log("submit 오류:" + err.data);
      });
  };

  componentWillMount = () => {
    this.onSelect();
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
          <ul className="board_tab">
            <li
              className="tab_on"
              onClick={() => {
                this.props.history.push("/community/freeboardlist");
              }}
            >
              Free Board
            </li>
            <li
              onClick={() => {
                this.props.history.push("/community/qnaboard");
              }}
            >
              Q & A Board
            </li>
            <li
              onClick={() => {
                this.props.history.push("/community");
              }}
            >
              Guest Board
            </li>
            <li
              onClick={() => {
                this.props.history.push("/community");
              }}
            >
              FAQ
            </li>
          </ul>
        </div>

        <div className="board_container">
          <table className="board">
            <thead className="board_head">
              <tr height="80px">
                <th style={{ width: "200px", height: "50px" }}>사용자 이름</th>
                <td>{this.state.user_name}</td>
              </tr>
            </thead>

            <tbody className="board_body">
              <tr>
                <th style={{ width: "200px", height: "50px" }}>제목</th>
                <td>
                  <input
                    type="text"
                    className="input_title input_area"
                    style={{ width: "1000px", height: "50px" }}
                    value={this.state.title}
                    onChange={this.onKeyChange}
                    name="title"
                    required
                  ></input>
                </td>
              </tr>

              <tr>
                <th style={{ width: "200px", height: "50px" }}>내용</th>
                <td>
                  <textarea
                    value={this.state.content}
                    className="input_content input_area"
                    style={{ width: "1000px", height: "400px" }}
                    required="required"
                    onChange={this.onKeyChange}
                    name="content"
                    required
                  ></textarea>
                </td>
              </tr>
              <tr>
                <th style={{ width: "200px", height: "50px" }}>사진</th>
                <td>
                  <input type="file" onChange={this.onImageUpload}></input>
                </td>
              </tr>
            </tbody>
          </table>

          <form onSubmit={this.onSubmit} style={{ float: "right" }}>
            <Button
              type="submit"
              className="btn_function"
              variant="contained"
              color="primary"
            >
              저장
            </Button>

            <Button
              className="btn_function"
              variant="contained"
              type="button"
              onClick={() => {
                this.history.push("/community/freeboarddetail/" + this.num);
              }}
            >
              취소
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
