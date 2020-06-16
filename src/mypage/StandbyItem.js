import React, { Component } from 'react';
import CheckIcon from '@material-ui/icons/Check';
import Axios from 'axios';

export default class StandbyItem extends Component {

  constructor() {
    super();

    this.waitComplete = this.waitComplete.bind(this);

  }

  onClick = (event) => {
    this.detailShow();
    this.bucketSelect();
  }

  detailShow = () => {
    this.props.detailShow();
  }

  bucketSelect = () => {
    this.props.bucketSelect(this.props.row.num);
  }

  waitComplete = () => {
    var url = "http://localhost:9000/controller/withopenupdate?num=" + this.props.row.num;

    Axios.get(url)
    .then( (resData) => {
      alert("함께하는 버킷 게시판이 승인 되었습니다.");
      window.location.reload();
    })
    .catch( (error) => {
      console.log("complete error: " + error.data);
    })
  }


  render() {
    
    const url = "http://localhost:9000/controller/save/";

    return (
      <div className="mybucket_form">
        <div className="list_img" onClick={this.onClick}>
          <img src={url+this.props.row.imgarr[0]} alt=""/>
        </div>
        <div className="list_content">
          <p className="day">
            <span>
              D-Day <span className="red">{this.props.row.dday}</span>
            </span>
            <span>
              {this.props.row.day}
            </span>
          </p>
          <p className="title">
            {this.props.row.subject}
          </p>
          <div className="but_box">
            <p onClick={this.waitComplete} style={{paddingLeft:'75px',width:'100%'}}>
              <CheckIcon/>
              승인하기
            </p>
          </div>
        </div>
      </div>
    );
  }
}