import React, { Component } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Image } from "semantic-ui-react";
import axios from 'axios';
import TogetherBoardItem from './TogetherBoardItem';
import '../../community/Board.css';
import Button from '@material-ui/core/Button';



const responsive = {
    
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
 

class TogetherBoard extends Component {

  constructor({history,match}){
      super();

      this.history=history;

      this.num = match.params.num;

      this.state={
          withBoardData: [],
          imageNameList: [],
          withuserselect: [],
          num:'',
          user_name: '',
          comment: '',
          display_none: "none",
          display: "table-row"
      }
  }

  // 목록을 가져올 함수
  withBoardList=()=>{
    var url="http://localhost:9000/controller/bucket/withboardlist?num=" + this.num;
    axios.get(url)
    .then((resData)=>{
        // 스프링 서버로부터 받은 데이타로 qnaData로 수정
        this.setState({
            withBoardData: resData.data
        })

    })
    .catch((error)=>{
        console.log("withBoard list 오류!");
    })
  }

  componentDidMount(){
    // 랜더링 직전 스프링으로 목록을 받아온다
    this.withBoardList();
    this.withImageNameList();
    this.withuserselect();
  }


  visibleEvent=()=>{
    this.setState({
        display: 'none',
        display_none: 'table-row'
    })
  }

  unvisibleEvent=()=>{
    

    this.setState({      
      display: 'table-row',
      display_none: 'none'      
    })

    this.refs.comment.value = '';
  }

  

 
  onImageUpload = e => {
    const uploadFile = e.target.files[0];
    const image_name = e.target.files[0].name; //이미지파일명
    console.log("이미지 파일명:" + image_name);
    this.setState({
      image_name
    });

    //서버로  사진 업로드
    const stufile = new FormData();
    stufile.append("uploadFile", uploadFile);
    axios({
      method: "post",
      url: "http://localhost:9000/controller/bucket/withboard/save",
      data: stufile,
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(res => {
      })
      .catch(error => {
        console.log("업로드 오류:" + error.data);
      });
  };

  // 스프링으로 데이타 전송
  onSubmit=(e)=>{
    e.preventDefault();

    axios.post(
        "http://localhost:9000/controller/bucket/withboardinsert",
        {
            num: this.num,
            user_name: localStorage.state,
            comment: this.refs.comment.value,
            image_name: this.state.image_name
        }
    )
        .then((responseData)=>{
            // 추가를 한 후에 필요한 코드    
            // 코멘트 리스트 다시 호출
            this.withBoardList();
            this.setState({      
                  display: 'table-row',
                  display_none: 'none'      
                })
            // 코멘트 입력란 지우기
            this.refs.comment.value = '';      
            window.location.reload();      
            
        })
        .catch((error)=>{
            console.log("add error");
        });
           
  }

  // 이미지 네임 목록을 가져올 함수
  withImageNameList=()=>{
    var url="http://localhost:9000/controller/bucket/withimagenames?num=" + this.num;
    axios.get(url)
    .then((resData)=>{
        // 스프링 서버로부터 받은 데이타로 qnaData로 수정
        this.setState({
          imageNameList: resData.data
        })

    })
    .catch((error)=>{
        console.log("imageNameList 오류!"+error);
    })
  }

  withuserselect = () => {
    var url = "http://localhost:9000/controller/with_user?num=" + this.num

    axios.get(url)
    .then( (resData) => {
        this.setState({
          withuserselect:resData.data
        })
    })
    .catch( (error) => {
      console.log(error.data)
    })
  }

 

    render() {

        var imgurl = "http://localhost:9000/controller/save/";

        return (
            <div>
              <Carousel responsive={responsive} 
                ssr
                // partialVisbile
                // deviceType={deviceType}
                itemClass="image-item">
                   {
                     this.state.imageNameList.map((item,idx)=>(
                        <Image
                            draggable={false}
                            style={{ width: "640px", height: "360px" }}
                            src={imgurl+item}
                        />
                        ))
                   }                
              </Carousel>
                
                
                <div className='board_container'> 
                    <table className="board">
                      <tbody className='board_body'>
                        <tr style={{display:this.state.display_none}}>
                      
                          <td style={{width:'120px', height: '30px', textAlign: 'center'}}>
                              {localStorage.state}
                          </td>

                          <td>
                              <textarea className='input_content input_area'ref="comment"
                              style={{width:'700px', height:'30px', margin: '10px'}} 
                              placeholder="내용을 입력하세요." required="required"/>
                          </td>

                          <td>
                            <label for="fileupload" className="fileupload">
                              <span className="imgadd_but">파일 업로드</span>
                              <input id="fileupload" style={{width:'150px', height: '50px', textAlign: 'center'}} type="file" name="image_name" onChange={this.onImageUpload}/>                            
                            </label>
                          </td>

                          <td>   
                              <form onSubmit={this.onSubmit}>                             
                                  <Button className='btn_function' variant="contained" color="primary" 
                                  type="submit" style={{width:'120px', height:'40px'}}>
                                      등록
                                  </Button>                            
                              </form>                                                                
                          </td>
                         </tr> 
                      </tbody>
                    </table>
                    <Button className='btn_function' variant="contained"
                    style={{width:'120px', height:'40px', display:this.state.display_none}}
                      onClick={this.unvisibleEvent.bind(this)}>
                        취소
                    </Button>
                </div>
                <div className='board_container'>                   
                    <Button className='btn_function' variant="contained" color="primary" 
                    style={{width:'120px', height:'40px', display:this.state.display}}
                    onClick={this.visibleEvent.bind(this)}>
                            글쓰기
                    </Button>
                    
                </div>
                <hr/>
                <div className='board_container'>
                  <table className="board">
                      <thead className='board_head'>
                          <tr>
                            <th colSpan="6" style={{padding: '10px'}}>
                                <b>함께하는 사람들</b>
                            </th>
                          </tr>
                          <tr>
                            <td colSpan="6" style={{textAlign:'center'}}>
                                {/* 함께하기를 클릭한 사람들의 사용자 이름을 노출 */}
                                <b>{this.state.withuserselect}</b>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="6"><br/></td>
                          </tr>
                          <tr style={{height: '50px', textAlign:'center',fontSize:'13px'}}>
                              <th width="70px">번호</th>
                              <th width="150px">사용자 이름</th>
                              <th width="550px">내용</th>
                              <th width="180px">작성일</th>
                              <th width="90px">이미지</th>
                              <th width="206px"></th>
                              
                          </tr>
                      </thead> 
                      
                          {
                            this.state.withBoardData.map((row,idx)=>(
                              <TogetherBoardItem row={row} idx={idx} key={row.with_num} onList={this.withBoardList}/>
                            ))                        
                          }                    
                  </table>
                </div>
                <hr/>
                <br/><br/>
            </div>
        );
    }
}

export default TogetherBoard;