import React, { Component } from 'react';
import { HighlightOff } from '@material-ui/icons';
import search_icon from './image/main/search_icon.png';
import boxbg from './image/main/box_bg.png';
import Axios from 'axios';
import { FavoriteBorder, ThumbUp} from '@material-ui/icons';
import './css/searchbar.css';

class SearchBar extends Component {

    constructor() {
        super();

        this.state = {
            searchData: [],
            keyword: '',
            show: false
        }
        
    }

    goSearch = () => {
        this.props.goSearch();
    }

    searchList = (e) => {

        const { keyword } = this.refs;
        
        var url = "http://localhost:9000/controller/searchselect?keyword=" + keyword.value;
        
        if(e.key === 'Enter')
        {
            Axios.get(url)
            .then( (resData) => {
                this.setState({
                    searchData: resData.data,
                    keyword: keyword.value,
                    show: true
                })
                
            })
            .catch( (error) => {
                console.log("search error : " + error);
            })

        }
    }

    

    render() {

        const url = "http://localhost:9000/controller/save/";

        let title;
        
        if(this.state.show) {
            title = <p className="result_title">
                        <span className="blue_color">'{this.state.keyword}'</span> 에 대한 검색 결과 입니다.
                    </p>;
        }

        return (
            <div>
                <div className="search_bar">
                    <img src={search_icon} alt="" />
                    <input type="text" placeholder="여기에 검색어를 입력하세요" ref="keyword" onKeyPress={this.searchList.bind(this)}/>
                </div>
                <div className="close_but" onClick={this.goSearch}>
                    <HighlightOff/>
                </div>
                <div className="result_box">
                    {title}
                    {
                        this.state.searchData.map( (item,idx) => (
                            <div className="buket_form" num={item.num}>
                                <img className="bgimg" src={boxbg} alt="" />
                                <img className="mimg" src={url + item.imgarr[0]} alt="" />
                                <div className="buket_content">
                                    <p>{item.subject}</p>
                                    <div className="bottom_but">
                                        <p>
                                            <FavoriteBorder/>
                                            <span>함께 </span>  
                                        </p>
                                        <p>
                                            <ThumbUp/>
                                            <span>공감</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default SearchBar;