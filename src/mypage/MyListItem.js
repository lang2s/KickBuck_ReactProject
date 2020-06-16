import React, { Component } from 'react';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import Axios from 'axios';

export default class MyListItem extends Component {

  constructor(props){
    super(props);

    this.state = {
      
    }

    this.TickOffBucket = this.TickOffBucket.bind(this);
    this.MyBucketDelete = this.MyBucketDelete.bind(this);
  }


  onClick = () => {
    this.detailShow();
    this.bucketSelect();
  }

  detailShow = () => {
    this.props.detailShow();
  }

  bucketSelect = () => {
      this.props.bucketSelect(this.props.row.num);
  }


  

  TickOffBucket = () => {
    var url = "http://localhost:9000/controller/offupdate?num=" + this.props.row.num;

    Axios.get(url)
    .then( (resData) => {
      alert("버킷을 완료했습니다.");
      window.location.reload();
    })
    .catch( (error) => {
      console.log("tickoff error : " + error.data);
    })
  }

  MyBucketDelete = () => {
    var url = "http://localhost:9000/controller/myage/mydelete?num=" + this.props.row.num;

    Axios.get(url)
    .then( (resData) => {
      alert("버킷을 삭제 했습니다.");
      window.location.reload();
    })
    .catch( (error) => {
      console.log("delete error : " + error.data);
    })
  }

  


  render() {

    const url = "http://localhost:9000/controller/save/"

    

    return (
      <div className="mybucket_form" >
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
            <p onClick={this.TickOffBucket}>
              <CheckIcon/>
              완료하기
            </p>
            <p onClick={this.MyBucketDelete}>
              <DeleteIcon/>삭제하기
            </p>
          </div>
        </div>
      </div>
    );
  }
} 