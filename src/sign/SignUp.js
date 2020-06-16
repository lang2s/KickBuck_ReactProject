import React, { Component } from 'react';
import '../css/sign.css';
import { NavLink } from 'react-router-dom';
import Axios from 'axios';

class SignUp extends Component {

  constructor( {history} ) {
    super();
    
    this.history = history;
    
    this.state = {
      emailState: '',
      user_nameState: '',
      emailType: '',
      passwordState: ''
    }

  }

  MemberInsert = (data) => {
    const { user_name, email1, email2, password } = this.refs;
    const emailState = this.state.emailState;
    const user_nameState = this.state.user_nameState;
    const passwordState = this.state.passwordState;

    if(email1.value === '' || user_name.value === '' || password.value === '')
    {
      if(email1.value === '')
      {
        alert("이메일을 입력 해주세요");
      }
      
      if(user_name.value === '')
      {
        alert("사용자 이름을 입력 해주세요.");
      }

      if(password.value === '')
      {
        alert("비밀번호를 입력 해주세요");
      }
    }
    else
    {
      if(emailState === true && user_nameState === true && passwordState === true)
      {
        var url = "http://localhost:9000/controller/signup";
        Axios.post( url, 
          {
            user_name: user_name.value,
            email: email1.value + '@' + email2.value,
            password: password.value,
          })
          .then( (resData) => {
            this.history.push("/");
          })
          .catch( (error) => {
            console.log("insert error");
          })
      }

      if(emailState === false)
      {
        alert("중복된 이메일 입니다. 확인 해주세요.");
      }

      if(user_nameState === false)
      {
        alert("중복된 사용자이름 입니다. 확인 해주세요.");
      }

      if(passwordState === false)
      {
        alert("비밀번호가 일치하지 않습니다. 확인 해주세요.");
      }
    }

    
    

  }

  emailCheck = () => {
    const { email1, email2 } = this.refs;
    const email = email1.value + '@' + email2.value;

    var url = "http://localhost:9000/controller/emailcheck?email=" + email;
    Axios.get(url)
      .then( (resData) => {
        if(resData.data === 0)
        {
          this.setState({
            emailState: true
          })
        }
        else
        {
          this.setState({
            emailState: false
          })
        }
      })
      .catch( (error) => {
        console.log("check error : " + error);
      })
  }


  userNameSend = () => {
    const { user_name } = this.refs;

    var url = "http://localhost:9000/controller/usernamecheck?user_name=" + user_name.value;
    Axios.get(url)
     .then( (resData) => {
      if(resData.data === 0)
      {
        this.setState({
          user_nameState: true
        })
      }
      else
      {
        this.setState({
          user_nameState: false
        })
      }
       this.setState({
         user_name: user_name.value
       })
     })
     .catch( (error) => {
       console.log("user_name check error : " + error);
     })
  }

  emailType = () => {
    const { emailtype } = this.refs;

    this.setState({
      emailType: emailtype.value
    })

    emailtype.text(this.state.emailType)
  }

  passwordCheck = () => {
    const { password, password2 } = this.refs;

    if(password.value === password2.value)
    {
      this.setState({
        passwordState: true
      })
    }
    else if (password.value !== password2.value)
    {
      this.setState({
        passwordState: false
      })
    }
  }

  render() {

    let stateP;
    let stateP2;
    let stateP3;

    if(this.state.emailState) {
      stateP = <p className="check_text">사용가능한 이메일 입니다.</p>
    }
    else if(this.state.emailState === false)
    {
      stateP = <p className="check_text_red">중복된 이메일 입니다.</p>
    }

    if(this.state.user_nameState) {
      stateP2 = <p className="check_text">사용가능한 사용자이름 입니다.</p>
    }
    else if(this.state.user_nameState === false)
    {
      stateP2 = <p className="check_text_red">중복된 사용자이름 입니다.</p>
    }

    if(this.state.passwordState) {
      stateP3 = <p className="check_text">비밀번호가 일치 합니다.</p>
    }
    else if(this.state.passwordState === false) {
      stateP3 = <p className="check_text_red">비밀번호가 일치하지 않습니다.</p>
    }

    return (
      <div>
        <div className="sign_box"> 
          <p className="title">이메일 주소 회원가입</p>
          <div className="input_box">
            <div className="mb">
              <input type="text" placeholder="사용자 이름" className="pull" ref="user_name" onBlur={this.userNameSend.bind(this)} />
              {stateP2}
            </div>
            <div className="mb">
              <input type="text" placeholder="이메일" className="pull email" ref="email1" onBlur={this.emailCheck.bind(this)}  />
              @
              <input type="text" className="pull email2" ref="email2" onBlur={this.emailCheck.bind(this)} />
              <select className="pull sel" ref="emailtype" onChange={this.emailType.bind(this)}>
                <option>직접입력</option>
                <option value="naver.com">naver.com</option>
                <option value="daum.net">daum.net</option>
                <option value="gmail.com">gmail.com</option>
              </select>
              {stateP}
            </div>
            <div className="mb">
              <input className="pull mb5" placeholder="비밀번호" type="password" ref="password" onChange={this.passwordCheck.bind(this)} /> 
              <input className="pull" placeholder="비밀번호 확인" type="password" ref="password2" onChange={this.passwordCheck.bind(this)} /> 
              {stateP3}
            </div>
            {/* <div>
              <p>이용약관 동의</p>
              <div className="agree">
                이용약관
              </div>
            </div>
            <div>
              <p>개인정보 수집 및 이용 동의</p>
              <div className="agree">
                개인정보 수집 약관
              </div>
            </div>
            <p className="all_agree">위 약관에 전체 동의</p> */}
            <div className="but_box">
              {/* <NavLink className="ok" exact to='/' onClick={this.MemberInsert.bind(this)}>
                회 원 가 입
              </NavLink> */}
              <span className="ok" onClick={this.MemberInsert.bind(this)}> 
                회원가입
              </span>
              <NavLink className="cancel" exact to='/'>
                취소
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
