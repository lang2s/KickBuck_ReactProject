import React, { Component } from 'react';
import { FavoriteBorder, Archive, HighlightOff, TimerSharp, NoteOutlined} from '@material-ui/icons';
import { Slide } from 'react-slideshow-image';
import Bucketdetail from './offbucket/Bucketdetail';
import BucketComment from './BucketComment';
import './css/off.css';

class CardDetail extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            bucketArrImg: this.props.bucketOneData,
            imgarr: [],
            off: this.props.off,
            num: ''
        }
        
    }

  
    detailHide = () => {
        this.props.detailHide();
    }


    shouldComponentUpdate(nextProps, nextState){
        if(this.state.imgarr !== nextProps.bucketOneData.imgarr)
        {
            this.setState({
                imgarr: nextProps.bucketOneData.imgarr,
                num: nextProps.bucketOneData.num
            })
        }

        console.log("this.props.bucketOneData :" + this.props.bucketOneData.num)


        return true;
    }



    render() {

        
        const properties = {
            duration: 5000,
            transitionDuration: 500,
            infinite: true,
            indicators: true,
            arrows: true,
        }
        
        let offshow;

        
        if(this.state.off === 'off')
        {
            offshow = <div className="offcomment" style={{'display' : 'block'}}>
                            <Bucketdetail/>
                        </div>
        }
        

        const url = "http://localhost:9000/controller/save/";
        const bucketData = this.props.bucketOneData;

        return (
            <div className="card_popup_box">
                <div className="card_popup_bg"></div>
                <div className="card_popup">
                    <div className="slide-container">
                        <Slide {...properties}>
                        { 
                            this.state.imgarr.map((item,idx) => (
                                    // <img style={{width:'100px'}} src={url + item} alt="" /> 
                                    <div className="each-slide" key={idx} style={{height: '80vh'}}>
                                        <div style={{'backgroundImage': `url(${url + item})`}}></div>
                                    </div>
                                )
                            ) 
                        }
                        </Slide>
                    </div>
                    <div className="popup_content">
                        <div className="content_title">
                            <div className="title_left">
                                <p>{bucketData.subject}</p>
                            </div>
                        </div>
                        <div className="content_info">
                            <div className="info_left">
                                <p>{bucketData.content}</p>
                            </div>
                            <div className="info_right">
                                <p>
                                    
                                </p>
                            </div>
                        </div>
                    </div>
                    <p className="close_but" onClick={this.detailHide}>
                        <HighlightOff/>
                    </p>
                    {offshow}
                    <BucketComment qnanum={this.props.bucketOneData.num}/>
                </div>
            </div>
        );
    }
}

export default CardDetail;