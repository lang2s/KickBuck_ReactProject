import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import search_icon from './image/main/search_icon.png';
import SearchBar from './SearchBar';
import mygobut from './image/main/tick_my_logo.png';


class Category extends Component {

        state = {
            opac: 0,
            visibi: 'hidden',
        }


    goSearch() {
        if(this.state.visibi === 'hidden') {
          this.setState({
            opac: 1,
            visibi: 'inherit'
          })
        }
        else {
          this.setState({
            opac: 0,
            visibi: 'hidden'
          })
        }
      }


    render() {

        const searchBg = {
            opacity: this.state.opac,
            visibility: this.state.visibi
        }

        const activeStyle = {
            borderBottom: '2px solid #3886CE',
            height: '50px',
            boxSizing: 'border-box'
        };

        let mypage_but;

        if(localStorage.state)
        {
            mypage_but = <div className="mygo_but">
                            <NavLink exact to='/mypage/mylist'>
                            <img src={mygobut} alt=""/>
                            </NavLink>
                        </div>
        }

        return (
            <div className="category_bar">
                <ul>
                    <NavLink exact to='/' activeStyle={activeStyle}>
                        <li>
                            모두보기    
                        </li>
                    </NavLink>
                    <NavLink exact to='/solo' activeStyle={activeStyle} style={{borderLeft:'1px solid #ddd'}}>
                        <li>
                            개인  
                        </li>
                    </NavLink>
                    <NavLink exact to='/with' activeStyle={activeStyle} style={{borderLeft:'1px solid #ddd'}}>
                        <li>
                            함께하는
                        </li>
                    </NavLink>
                    <NavLink exact to='/off' activeStyle={activeStyle} style={{borderLeft:'1px solid #ddd'}}>
                        <li>
                            OFF
                        </li>
                    </NavLink>
                </ul>
                <div className="search_box" onClick={this.goSearch.bind(this)}>
                  SEARCH <img src={search_icon} alt=""  />
                </div>

                <div className="searchbox" style={searchBg}>
                    <SearchBar goSearch={this.goSearch.bind(this)}/>
                </div>
                {mypage_but}
            </div>
        );
    }
}

export default Category;