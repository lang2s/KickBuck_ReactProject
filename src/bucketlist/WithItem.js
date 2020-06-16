import React, { Component } from 'react';
import boxbg from '../image/main/box_bg.png';
import Axios from 'axios';
import { FavoriteBorder, ThumbUp} from '@material-ui/icons';

class WithItem extends Component {

    onClick = () => {
        this.detailShow();
        this.bucketWithSelect();
    }

    detailShow = () => {
        this.props.detailShow();
    }

    bucketWithSelect = () => {
        this.props.bucketWithSelect(this.props.idx.num);
    }

    withCountUp = () => {
        if(localStorage.state) {
            var url = "http://localhost:9000/controller/bucketwithup";
            Axios.post(url,
                {
                    user_name: localStorage.state, 
                    num: this.props.idx.num
                }
            )
            .then( (resData) => {
                alert("성공")
                console.log(resData.data)
            })
            .catch( (error) => {
                console.log("update error" + error)
            })
        }
        else{
            alert("로그인후 가능합니다");
        }
    }

    likeCountUp = () => {
        if(localStorage.state)
        {
            var url = "http://localhost:9000/controller/bucketlikeup";
            Axios.post(url, 
                {
                    user_name: localStorage.state, 
                    num: this.props.idx.num
                }
            )
            .then( (resData) => {

            })
            .catch( (error) => {
                console.log("update error" + error)
            })
        }
        else{
            alert("로그인후 가능합니다");
        }
    }


    render() {

        const url = "http://localhost:9000/controller/save/";

        return (
            <div className="buket_form"  num={this.props.idx.num} >
                <img className="bgimg" src={boxbg} alt=""  />
                <img className="mimg" src={url + this.props.idx.imgarr[0]} alt=""    />     
                <div className="black_bg" onClick={this.onClick}></div>
                <div className="buket_content">
                    <p>{this.props.idx.subject}
                    </p>
                    <div className="bottom_but">
                        <p onClick={this.withCountUp.bind(this)}>
                            <FavoriteBorder/>
                            <span>함께 </span>
                        </p>
                        <p onClick={this.likeCountUp.bind(this)}>
                            <ThumbUp/>
                            <span>공감</span>
                        </p>
                    </div>  
                </div>           
            </div>
        );
    }
}

export default WithItem;