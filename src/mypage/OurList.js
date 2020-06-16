import React, { Component } from 'react';
import Axios from 'axios';
import OurListItem from './OurListItem';
import MyPage from './MyPage';
import CardDetail from '../CardDetail';

export default class OurList extends Component {
  constructor() {
    super();
    this.state = {
      ourPageData: [],//스프링에서 게시물 목록을 받아서 저장할 변수
      bucketOneData: [],
    };

    this.detailShow = this.detailShow.bind(this);
    this.detailHide = this.detailHide.bind(this);
    this.bucketSelect = this.bucketSelect.bind(this);
  }

  detailShow = () => {
    this.setState({
        show : true
    })

  }

  detailHide = () => {
      this.setState({
          show : false
      })
  }

  //리스트를 가져올 함수
  ourlist = () => {
    var url = "http://localhost:9000/controller/mypage/ourlist?user_name=" +
    localStorage.state;
    Axios.get(url)
      .then((responseData) => {
        this.setState({
          ourPageData: responseData.data
          
        });
      })
      .catch(error => {
        console.log("mypage ourlist error" + error.data);
      });
  };

  bucketSelect = (num) => {
    var url = "http://localhost:9000/controller/oneselect?num=" + num ;

    Axios.get(url)
    .then( (resData) => {
        
        this.setState({
            bucketOneData: resData.data
        })
    })
    .catch( (error) => {
        console.log("select 오류 : " + error);
    })
  }

  componentDidMount() {
    //랜더링 직전 스프링으로부터 목록을 받아온다
    this.ourlist();
  }

  render() {

    let box;

    if(this.state.show) {
        box = <CardDetail detailHide={this.detailHide} bucketOneData={this.state.bucketOneData} />
    }

    return (
      <div className="list_my">
        <MyPage />
        <div className="mybucket_box">
            {   
              this.state.ourPageData.map((row, idx) => (
              <OurListItem detailShow={this.detailShow} bucketSelect={this.bucketSelect} idx={idx} key={row.num} row={row} />))
            }
        </div>
        {box}
      </div>
    );
  }
}
