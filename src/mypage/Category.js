import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Category extends Component {
  render() {

    const activeStyle = {
        borderBottom: '2px solid #3886CE',
        height: '50px',
        boxSizing: 'border-box'
    };

    return (
      <div className="category_bar">
          <ul>
              <NavLink exact to='/mypage/mylist' activeStyle={activeStyle}>
                  <li>나의 버킷리스트</li>
              </NavLink>
              <NavLink exact to='/mypage/ourlist' activeStyle={activeStyle}>
                  <li>함께하는 버킷리스트</li>
              </NavLink>
              <NavLink exact to='/mypage/standby' activeStyle={activeStyle}>
                  <li>대기중인 버킷리스트</li>
              </NavLink>
              <NavLink exact to='/mypage/offlist' activeStyle={activeStyle}>
                  <li>오프 버킷리스트</li>
              </NavLink>
              <NavLink exact to='/mypage/likelist' activeStyle={activeStyle}>
                  <li>공감한 버킷리스트</li>
              </NavLink>
          </ul>
      </div>
    );
  }
}
