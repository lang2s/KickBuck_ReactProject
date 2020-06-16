import React, { Component } from 'react';

export default class LikeListItem extends Component {

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

  render() {

    console.log(this.props.row)

    const url = "http://localhost:9000/controller/save/"

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
        </div>
      </div>
    );
  }
}