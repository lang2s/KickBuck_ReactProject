import React, { Component } from 'react';
import '../css/add.css';
import Axios from 'axios';
import { NavLink } from 'react-router-dom';



class Add extends Component {

    constructor(props) {
        super(props);

        this.displayData = [];
        this.hashtagDiv = [];

        this.state = {
            image: '',
            imageArray: '',
            dday: '',
            calendar: '',
            hashtag: '',
            showdata: this.displayData,
            hashtagShow: this.hashtagDiv,
            hashArray: '',
            openSet: 'on',  
        }
        
    }

    BucketInsert = (data) => {
        const {subject, area, content, calendar} = this.refs;

        var url = "http://localhost:9000/controller/bucketadd";
        Axios.post( url,
            {
                subject: subject.value,
                area: area.value,
                content: content.value,
                user_name: localStorage.state,
                image: this.state.imageArray,
                dday: calendar.value,
                hashtag: this.state.hashArray,
                open: this.state.openSet,
            })
            .then( (resData) => {
                window.location.reload();
            })
            .catch( (error) => {
                console.log("insert error" + error.data);
            })

            
    }

    onImageUpload = (e) => {
        const uploadFile = e.target.files[0];
        const image = e.target.files[0].name;
        console.log("uploadFile : " + uploadFile);
        console.log("image : " + image);

        this.setState({
            image
        })

        const bucketfile = new FormData();
        bucketfile.append('uploadFile',uploadFile);

        Axios({
            method: 'post',
            url: 'http://localhost:9000/controller/save',
            data: bucketfile,
            headers: {'Content-Type' : 'multipart/form-data'}
        })
        .then( (resData) => {
            console.log("resData: " + resData.data);
        })
        .catch( (error) => {
            console.log("이미지 업로드 오류" + error.data);
        })

        this.setState({
            imageArray : this.state.imageArray.concat(image) + ","
        })
    }

    onImageAdd = () => {
        const url = "http://localhost:9000/controller/save/";
        const imgsrc = this.state.image;

        this.displayData.push( <span className="imgtag"><img src={url + imgsrc} alt='' /></span>);

        this.setState({
            showdata: this.displayData
        })

    }

    onChangeDay = () => {

        const { calendar,dday } = this.refs;

        let _date1 = calendar.value;
        let _date2 = new Date();

        let diffDate_1 = _date1 instanceof Date ? _date1 :new Date(_date1);
        let diffDate_2 = _date2 instanceof Date ? _date2 :new Date(_date2);
    
        diffDate_1 =new Date(diffDate_1.getFullYear(), diffDate_1.getMonth()+1, diffDate_1.getDate());
        diffDate_2 =new Date(diffDate_2.getFullYear(), diffDate_2.getMonth()+1, diffDate_2.getDate());
    
        let diff = Math.abs(diffDate_2.getTime() - diffDate_1.getTime());
        diff = Math.ceil(diff / (1000 * 3600 * 24));
    

        this.setState({
            dday: '-' + diff,
            calendar: calendar.value
        })
        
    }

    

    onHashTagWords = (e) => {
        const { hashtag } = this.refs;

        this.setState({
            hashtag: hashtag.value,
        })
    }

    onHashDelete = (num) => {
        this.state.hashtagShow.splice(num,1);

        this.setState({
            hashtagShow: this.hashtagDiv,
        })
    }

    onHashTagAdd = (e) => {

        const { hashtag } = this.refs;

        if (e.key === 'Enter')
        {
            this.hashtagDiv.push( this.state.hashtag );

            this.setState({
                hashtagShow: this.hashtagDiv,
                hashArray: this.state.hashArray.concat(this.state.hashtag) + ','
            })

            hashtag.value = '';
        }

    }

    onOpenSet = (e) => {

        this.setState({
            openSet: e.target.value
        })
    }
    
       
 

    render() {



        return (
            <div className="add_box">
                <p className="title">버킷리스트 등록하기</p>
                <div className="input_box">
                    <div className="mb">
                        <input  type="text" placeholder="타이틀을 입력해주세요 20자 까지 입력 가능합니다" className="pull" ref="subject" maxLength="20" />
                    </div>
                    <div className="mb">
                        <span>버킷리스트와 관련된 사진을 올려주세요</span>
                        <label for="fileupload" className="fileupload">
                            <span>파일 업로드</span>
                            <input id="fileupload" type="file" onChange={this.onImageUpload.bind(this)} /> 
                        </label>
                        <span className="imgadd_but" onClick={this.onImageAdd.bind(this)}>이미지 추가</span><br/>
                        <span className="imgtext"> - 첫번째 올린사진이 메인 이미지로 등록되고, 최대 10장까지 등록 가능합니다</span>
                        <div className="img_box">
                            {this.state.showdata}
                        </div>
                    </div>
                    <div className="mb">
                        <input type="text" placeholder="위치를 입력해주세요" ref="area" /><br/>
                        <span className="imgtext"> - 버킷리스트를 하기위해 가는 장소를 적어주세요</span>
                    </div>
                    <div className="mb">
                        <input type="date" ref="calendar" onChange={this.onChangeDay.bind(this)} />
                        <span className="ddaytext">D-Day</span>
                        <input ref="dday" type="text" readOnly="readonly" value={ this.state.dday}/><br/>
                        <span className="imgtext"> - 자신만의 D-Day를 지정해보세요</span>
                    </div>
                    <div className="mb">
                        <textarea placeholder="내용을 입력해주세요" ref="content" maxLength="200"></textarea>
                    </div>
                    <div className="mb">
                        <input type="text" placeholder="해시태그를 설정해 검색 키워드로 이용해보세요." className="pull mb5" ref="hashtag" onChange={this.onHashTagWords.bind(this)}  onKeyPress={this.onHashTagAdd.bind(this)} />
                        <br/>
                        <span className="imgtext"> - 단어를 입력하고 'Enter' 키를 입력하면 자동으로 생성됩니다</span>
                        <div className="hashtagbox">
                            {
                                this.state.hashtagShow.map( (item,idx) => (
                                        <span key={idx} className="hashstyle">{item}
                                            <span  className="del_but" onClick={(e) => {this.onHashDelete(idx)}}>
                                                <span></span>
                                                <span></span>
                                            </span>
                                        </span>
                                    )
                                )
                            }
                        </div>
                    </div>
                    <div className="mb">
                        <div className="checks">                            
                            <input type="radio" id="on"  name="onoff" value="on"  checked={this.state.openSet === 'on'} onChange={this.onOpenSet.bind(this)} />
                            <label for="on">공개</label>
                        </div>
                        <div className="checks">
                            <input type="radio" id="off"  name="onoff" value="off"  checked={this.state.openSet === 'off'} onChange={this.onOpenSet.bind(this)} /> 
                            <label for="off">비공개</label>
                        </div><br/>
                        <span className="imgtext"> - 비공개를 선택하면 마이페이지 안에서만 확인 할수있습니다</span>
                    </div>
                    <div className="but_box">
                        <NavLink className="ok" exact to='/' onClick={this.BucketInsert.bind(this)}>
                            등록
                        </NavLink>
                        <NavLink className="cancel" exact to='/'>
                            취소
                        </NavLink>
                    </div>    
                </div>
            </div>
        );
    }
}

export default Add;