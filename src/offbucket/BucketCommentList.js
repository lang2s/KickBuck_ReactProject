import React, { Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import TextFieldAutosize from "@material-ui/core/TextareaAutosize";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  hidden: {
    display: "none"
  }
});
class BucketCommentList extends Component {
  state = {
    open: false,
    open2: false,
    subject: "",
    image: "",
    content: "",
    user_name: "",
    endday: "",
    pk: "",
    commentData: []
  };

  handleClickOpen = () => {
    this.setState({
      open2: true
    });
  };
  handleClickClose = () => {
    this.setState({
      open2: false
    });
  };

  onDelete = () => {
    if (localStorage.state === this.props.row.user_name) {
      var url =
        "http://localhost:9000/controller/bucket/offbucketcomment/delete?pk=" +
        this.props.row.pk;

      axios
        .get(url)
        .then(responseData => {
          //삭제후 돌아가기
          window.location.reload();
        })
        .catch(error => {
          console.log("delte error");
        });
    } else {
      alert("로그인 정보가 일치하지않습니다");
    }
  };

  onSelect = () => {
    var url =
      "http://localhost:9000/controller/bucket/offbucketcommentData?pk=" +
      this.props.row.pk;

    axios
      .get(url)
      .then(responseData => {
        console.log(responseData.data);
        this.setState({
          commentData: responseData.data,
          subject: responseData.data.subject,
          image: responseData.data.image,
          content: responseData.data.content,
          endday: responseData.data.endday,
          user_name: responseData.data.user_name,
          pk: responseData.data.pk
        });
        console.log("commentData=" + this.state.commentData);
      })
      .catch(error => {
        console.log("commentData error");
      });
  };

  onSubmit = e => {
    e.preventDefault();

    const uploadFile = this.state;
    if (localStorage.state === this.props.row.user_name) {
      console.log("bucketcommentupdate=" + this.state.pk);
      var url =
        "http://localhost:9000/controller/bucket/offbucketcomment/update";
      axios
        .post(url, uploadFile)
        .then(res => {
          this.setState({
            msg: res.data,
            title: "",
            image: "",
            content: "",
            pk: ""
          });
          console.log("updatesuccess");
          window.location.reload();
        })
        .catch(err => {
          console.log("submit 오류:" + err.data);
        });
    } else {
      alert("로그인정보가 일치하지않습니다");
    }
  };

  //  입력시 state 값 변경
  onKeyChange = e => {
    console.log("onKeyChange=" + this.state.subject);
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
      url: "http://localhost:9000/controller/bucket/off/save",
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

  modalClickOpen = () => {
    if (localStorage.state === this.props.row.user_name) {
      this.setState({
        open: true
      });
    } else {
      alert("로그인정보가 일치하지않습니다");
    }
  };

  modalClickClose = () => {
    this.setState({
      open: false,
      subject: "",
      content: "",
      image: "",
      num: "",
      endday: "",
      fileName: "",
      file: null
    });
  };

  componentWillMount = () => {
    this.onSelect();
  };

  render() {
    const url = "http://localhost:9000/controller/save/";
    const { classes } = this.props;
    console.log("pk=" + this.props.row.pk);
    return (
      <div className="board_container" style={{ marginBottom: "0px" }}>
        <table className="board">
          <thead className="board_head">
            <tr height="80px">
              <td colSpan="2">
                <h3>{this.props.row.subject}</h3>
              </td>
            </tr>
          </thead>
          <tbody className="board_body">
            <tr height="66px">
              <td>
                작성자 &nbsp;&nbsp;:&nbsp;&nbsp;
                <b>{this.props.row.user_name}</b>
              </td>
              <td style={{ textAlign: "right" }}>
                작성일 &nbsp;&nbsp;:&nbsp;&nbsp; {this.props.row.day}
              </td>
            </tr>
            <tr>
              <td colSpan="2" width="1000px" height="600px">
                <div style={{ backgroundColor: "#f6f6f6" }}>
                  <p textAlign="center">
                    <img
                      src={url + this.props.row.image}
                      alt=""
                      style={{ maxWidth: "800px" }}
                    ></img>
                  </p>
                  <b>{this.props.row.content}</b>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ textAlign: "right" }}>
                <p>Tick Off Day : {this.props.row.endday}</p>
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ textAlign: "right" }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={this.modalClickOpen}
                >
                  수정
                </Button>
                <Dialog open={this.state.open} onClose={this.modalClickClose}>
                  <DialogTitle Align="center">수정</DialogTitle>
                  <DialogContent align="center">
                    <TextField
                      type="text"
                      name="subject"
                      onChange={this.onKeyChange}
                      margin="dense"
                      value={this.state.subject}
                      required
                    ></TextField>
                    <br></br>
                    <TextField
                      type="text"
                      name="user_name"
                      value={localStorage.state}
                      margin="dense"
                    ></TextField>
                    <br></br>
                    <br></br>
                    <TextFieldAutosize
                      name="content"
                      onChange={this.onKeyChange}
                      placeholder="내용입력"
                      variant="contained"
                      rows="6"
                      margin="dense"
                      value={this.state.content}
                      required
                    ></TextFieldAutosize>
                    <br></br>

                    <input
                      id="raised-button-file"
                      type="file"
                      onChange={this.onImageUpload}
                      file={this.state.fileName}
                    ></input>
                    <label htmlFor="raised-button-file">
                      <Button
                        variant="outlined"
                        color="primary"
                        component="span"
                        name="image"
                      >
                        이미지 추가
                      </Button>
                    </label>
                    <br></br>
                    <br></br>
                    <TextField
                      type="date"
                      name="endday"
                      onChange={this.onKeyChange}
                      value={this.state.endday}
                      margin="dense"
                      required
                    ></TextField>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.onSubmit}
                    >
                      추가
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={this.modalClickClose}
                    >
                      닫기
                    </Button>
                  </DialogActions>
                </Dialog>
                &nbsp;
                <Button
                  variant="contained"
                  color="secondary"
                  type="button"
                  onClick={this.handleClickOpen}
                >
                  삭제
                </Button>
                <Dialog open={this.state.open2} onClose={this.handleClickClose}>
                  <DialogTitle onClose={this.handleClickClose}>
                    삭제 경고
                  </DialogTitle>
                  <DialogContent>
                    <Typography gutterBottom>
                      선택한 게시물이 삭제됩니다
                    </Typography>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.onDelete}
                    >
                      삭제
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleClickClose}
                    >
                      닫기
                    </Button>
                  </DialogActions>
                </Dialog>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default withStyles(styles)(BucketCommentList);
