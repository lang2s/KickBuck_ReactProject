import React, { Component } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Axios from 'axios';

export default class OffListItem extends Component {

  constructor() {
    super();

    this.MyBucketDelete = this.MyBucketDelete.bind(this);
  }

  onClick = (event) => {
    this.detailShow();
    this.bucketSelect();
  }

  detailShow = () => {
      this.props.detailShow();
  }

  bucketSelect = () => {
      this.props.bucketSelect(this.props.idx.num);
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

    console.log(this.props.row)

    const url = "http://localhost:9000/controller/save/"

    return (
      <div className="mybucket_form">
        <div className="list_img" onClick={this.onClick}>
          <img src={url+this.props.row.imgarr[0]} alt="" />
        </div>
        <div className="list_content">
            <p className="day">
              <span>
                {this.props.row.day}
              </span>
            </p>
            <p className="title">
              {this.props.row.subject}
            </p>
            <div className="but_box">
              <p onClick={this.waitComplete} style={{paddingLeft:'75px',width:'100%'}}>
                <DeleteIcon/>
                삭제하기
              </p>
            </div>
        </div>
      </div>
    );
  }
}