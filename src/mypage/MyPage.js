import React, { Component } from 'react';
import Category from './Category';
import '../css/mypage.css'
import Axios from 'axios';

export default class MyPage extends Component {
  constructor() {
    super();
    this.state = {
      selectData: "",
      num: 1,
      image: ""
    };
  }
  //마이메이지 호출되는 함수
  onSelect = () => {
    var url =
      "http://localhost:9000/controller/profile/image?num=" + this.state.num;

    Axios.get(url)
      .then(responseData => {
        this.setState({
          image: responseData.data.image
        });
      })
      .catch(error => {
        console.log("select one error");
      });
  };
  componentWillMount() {
    //렌더링 직전 스프링으로부터 목록을 받아온다
    this.onSelect(); //누르기전에 실행해주기위해 필요함
    //버튼이 없으면 무조건 필요함
  }
  render() {
    const url = "http://localhost:9000/controller/save/";
    return (
      <div>
        <div className="top_logo"></div>
        <div className="profile_img">
        </div>
        <div className="profile_name">
        <b><a href="http://localhost:3000/mypage/profile">{localStorage.state}</a></b> 님의 마이페이지
        </div>
        <Category />
      </div>
    );
  }
}
