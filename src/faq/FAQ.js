import React, { Component } from 'react';
import '../css/faq.css';

export default class FAQ extends Component {
  state = {
    isActive: false
  }

  handleShow = () => {
    this.setState({
      isActive: true
    })
  }
  handleHide = () => {
    this.setState({
      isActive: false
    })
  }

  render() {
    return (
      <div className="faqwrap">
        <div className="container">
          <div>
          </div>
          <span>FAQ</span>
          <ul>
            <li>
              <p className="question" onClick={this.handleShow}>
                kickbuck이란 무슨뜻인가요?
              </p>
              {this.state.isActive && <p className="answer">
                영어 속어 중에 kick the bucket이라는 있는데 속어는 죽다라는 의미를 가지고 있습니다.<br />
                이 속어에서 버킷리스트라는 말이 유래해서 쓰게되었습니다.
                누구나 죽기전에 해보고싶은것들이 있는데 혼자서는 도전하기가 힘든분들을 위해 만들었습
              </p>}
            </li>
            <li>
              <p className="question" onClick={this.handleShow}>
                이용하는 방법
                </p>
              {this.state.isActive && <p className="answer">
                회원가입 후 로그인을하고 자신이 원하는 버킷리스트를 작성or참여하기를 눌러 시작하면됩니다.<br />
                작성시 같이하고 싶으면 공개를 선택 혼자하고 싶다면 비공개를 선택할 수 있습니다.
                </p>}
            </li>
            <li>
              <p className="question" onClick={this.handleShow}>
                나이제한은 없나요?
                </p>
              {this.state.isActive && <p className="answer">
                나이와 관계없이 누구나 참여할 수 있습니다.
                </p>}
            </li>
            <li>
              <p className="question" onClick={this.handleShow}>
                비회원으로는 참여할 수 없나요?
                </p>
              {this.state.isActive && <p className="answer">
                회원만 이용가능 합니다. 참여하는 부분에 있어 회원이 아닐경우 문제가 생길 수 있으므로
                회원가입하시어 이용부탁드립니다.
                </p>}
            </li>

            <li>
              <p className="question" onClick={this.handleHide}>
              </p>
              <p className="answer"></p>
            </li>
            <li>
              <p className="question"></p>
              <p className="answer"></p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
