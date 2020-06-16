import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import Axios from "axios";

export default class OurListItem extends Component {

  constructor() {
    super();

    this.state = {
      withCount: ''
    }
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

  withCountCheck = () => {

    var url = "http://localhost:9000/controller/withcountcheck?num=" + this.props.row.num;

    Axios.get(url)
    .then((resData) => {
      this.setState({
        withCount: resData.data
      })
    })
    .catch(error => {
      console.log("error" + error.data);
    });
  }

  componentDidMount() {
    this.withCountCheck();
  }

  render() {


    const url = "http://localhost:9000/controller/save/";

    let withgo;

    if(this.state.withCount === 1) {
      withgo = <p className="withgo" style={{fontSize:'12px',textAlign:'center'}}>
                    <a href={"/bucketlist/togetherboard/" + this.props.row.num} >
                    함께하기 게시판으로 이동하기
                    </a>
                </p>
    }
    else{
      withgo = <p className="unwithgo" style={{fontSize:'12px',textAlign:'center'}}>
                  함께하기 게시판으로 이동하기
                </p>
    }
    
    
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
          <div className="but_box">
            {withgo}
          </div>
        </div>
    );
  }
}

