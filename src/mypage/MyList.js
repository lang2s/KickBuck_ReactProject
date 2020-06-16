import React, { Component } from 'react';
import MyListItem from './MyListItem';
import MyPage from './MyPage';
import Axios from 'axios';
import CardDetail from '../CardDetail';
import '../css/mypage.css';

export default class MyList extends Component {
  constructor() {
    super();
    this.state = {
      mypageData: [],
      bucketOneData: [],
    };

    this.bucketSelect = this.bucketSelect.bind(this);
    this.detailShow = this.detailShow.bind(this);
    this.detailHide = this.detailHide.bind(this);
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
  list = () => {
    var url = "http://localhost:9000/controller/mypage/mylist?user_name=" +
    localStorage.state;
    Axios.get(url)
      .then((responseData) => {
        console.log(responseData.data);
        //스프링 서버로부터 받은 데이타로 mypageData 수정
        this.setState({
          mypageData: responseData.data
        });
      })
      .catch(error => {
        console.log("mypage list error" + error.data);
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
    this.list();
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
            this.state.mypageData.map((row, idx) => (
              <MyListItem detailShow={this.detailShow} bucketSelect={this.bucketSelect} idx={idx} key={row.num} row={row} />))
          }
        </div>
        {box}
      </div>
    );
  }
}
