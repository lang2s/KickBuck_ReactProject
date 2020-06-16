import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Add } from '@material-ui/icons';
import Login from './sign/Login';
import './css/login.css';
import logoimg from './image/main/tick_off_logo2.png';


export default class Menu extends Component {
  constructor() {
    super();

    this.state = {
      active: '-300px',
      opacSide: 0,
      visibiSide: 'hidden',
      visibi: 'hidden',
      classSide: '',
      loginShow: 'none'
    }

    this.onLogin = this.onLogin.bind(this);
    this.onLogOut = this.onLogOut.bind(this);
    this.addActive = this.addActive.bind(this);

  }

  addActive() {
    if (this.state.active === "-300px") {
      this.setState({
        active: "0px",
        opacSide: 1,
        visibiSide: "inherit",
        classSide: "classSide"
      });
    } else {
      this.setState({
        active: "-300px",
        opacSide: 0,
        visibiSide: "hidden",
        classSide: ""
      });
    }
  }



  onLogin() {
    if (this.state.loginShow === "none") {
      this.setState({
        loginShow: "block"
      });
    } else {
      this.setState({
        loginShow: "none"
      });
    }
  }

  onLogOut() {
    localStorage.clear();
    window.location.reload();
  }

  onAlert() {
    alert("로그인후 이용가능 합니다.");
  }

  render() {
    const sideActive = {
      right: this.state.active
    };

    const sideBg = {
      opacity: this.state.opacSide,
      visibility: this.state.visibiSide
    };



    const loginShow = {
      display: this.state.loginShow
    };

    let loginState = null;
    let bucketadd;

    if (localStorage.state) {
      loginState = <p className="plus" onClick={this.onLogOut}>로그아웃</p>
      bucketadd = <NavLink exact to='/add'>
                    <p className="plus">
                      버킷리스트 <Add/>
                    </p>
                  </NavLink>
    }
    else {
      loginState = <p className="plus" onClick={this.onLogin}>로그인ㆍ회원가입</p>
      bucketadd = <p className="plus" onClick={this.onAlert.bind(this)}>
                    버킷리스트 <Add/>
                  </p>
    }


    return (
      <div style={{marginBottom:'120px'}}>
        <div className="menubar">
          <div className="login_bar">
            <p className="login_text">
              {loginState}
              <Login loginShow={loginShow} onLogin={this.onLogin} />
            </p>
          </div>
          <ul>
            <li>
              <p className="logo">
                <NavLink exact to='/'>
                  <img src={logoimg} alt="" />
                </NavLink>
              </p>
            </li>
            <li>
              <NavLink exact to='/SignUp'>
                sign
              </NavLink>
            </li>
            <li>
              <NavLink exact to='/FAQ'>
                FAQ
              </NavLink>
            </li>
            <li>
              <NavLink exact to='/profile'>
                profile
              </NavLink>
            </li>
            <li className="plus_li">
                {bucketadd}
            </li>
            <li>
              <div className={`menu_but ${this.state.classSide}`} onClick={this.addActive}>
                <span className="one"></span>
                <span className="two"></span>
                <span className="thr"></span>
              </div>
            </li>
          </ul>




          <div className="bgon" style={sideBg} onClick={this.addActive}></div>
          <div className="sidebox" style={sideActive}>
            <NavLink exact to='/community/freeboardlist' onClick={this.addActive}>
              <span>
                Free Board. <br/>
                자유롭게 글을 써보세요
              </span>
            </NavLink>
            <NavLink exact to='/community/qnaboard' onClick={this.addActive}>
              <span>
                Q&A Board <br/>
                궁금한게 있으면 질문 해보세요
              </span>
            </NavLink>
            <NavLink exact to='/community/guestboard' onClick={this.addActive}>
              <span>
                Guest Board <br/>
                한줄로 방명록을 남겨보세요
              </span>
            </NavLink>
            <NavLink exact to='/community/FAQ_signup' onClick={this.addActive}>
              <span>
                FAQ Board <br/>
                자주 묻는 질문 여기 있어요
              </span>
            </NavLink>
            
            <div className="info_box">
              <img src={logoimg} alt=""/>
              <p>FACEBOOK</p>
              <p>INSTAGRAM</p>
              <p>KAKAO</p>
            </div>
            <div className="info_box2">
              <p>이용약관</p>
              <p>개인정보 처리방침</p>
            </div>
            <div className="info_box3">
              <p>Tick OFF ㈜ My Life. All rights reserved.</p>
            </div>
            <div className="info_box4">
              <p>DY생명보험 주식회사</p>
              <p>사업자등록번호 19-94-0913</p>
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}
