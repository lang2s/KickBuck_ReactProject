import React, { Component } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@material-ui/core';

class TogetherBoardItem extends Component {

    constructor(history){
        super();
  
        this.history=history;
  
        this.state={
            group_num:'',
            num:'',
            user_name: '',
            comment: '',
            display_none: "none",
            display: "table-cell",
            openimg:false,
            opendelete:false
        }
  
        //this.onKeyChange =  this.onKeyChange.bind(this);
  
    }

    visibleEvent=()=>{
        this.setState({
            display: 'none',
            display_none: 'table-row'
        })
      }
    
    unvisibleEvent=()=>{
        this.setState({
            display: 'table-cell',
            display_none: 'none',
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
            console.log(res.data);
          })
          .catch(error => {
            console.log("업로드 오류:" + error.data);
          });
      };
    

      // 스프링으로 데이타 전송
    onSubmit=(e)=>{
        e.preventDefault();

        console.log(
            this.props.row.group_num,
            localStorage.state,
            this.refs.comment.value,
            this.state.image_name
        )
        axios.post(
            "http://localhost:9000/controller/bucket/withreplyinsert",
            {
                group_num: this.props.row.group_num,
                num: 23,
                user_name: localStorage.state,
                comment: this.refs.comment.value,
                image_name: this.state.image_name
            }
            
        )
            .then((responseData)=>{
                
                // 추가를 한 후에 필요한 코드    
                // 코멘트 리스트 다시 호출
                this.props.onList();

                // 코멘트 입력란 지우기
                this.refs.comment.value = '';            
                
            })
            .catch((error)=>{
                console.log("add error");
            });
            
    }


    // 모달 팝업 관련 이벤트
    
    handleClickOpenImg = () =>{
        this.setState({
        openimg: true
        });
    }

    handleClickCloseImg = () =>{
        this.setState({
        openimg: false
        });
    }



    handleClickOpen = () =>{
        this.setState({
        opendelete: true
        });
    }
    
    handleClickClose = () =>{
        this.setState({
        opendelete: false
        });
    }

    // 삭제하는 함수
    onDataDelete=(num)=>{
        
        var url="http://localhost:9000/controller/bucket/withcommentdelete?with_num="+this.props.row.with_num;

        axios.get(url)
        .then((responseData)=>{
            // 코멘트 리스트 다시 호출
            this.props.onList();
            this.setState({      
                display: 'table-cell',
                display_none: 'none'      
              });
              window.location.reload();
        })
        .catch((error)=>{
            console.log("delete error");
        });
    }


    render() {

        let imgbtn = this.props.row.image_name;
        let step = this.props.row.step_num;

        return (
            <tbody className='board_body' style={{fontSize:'12px'}}>
            <tr height="50px">
                <td align="center">
                    {
                        step === 1
                        ? this.props.row.with_num
                        : ""                   
                    }
                </td>
                <td align="center">
                    {this.props.row.user_name}
                </td>
                <td>
                    <pre>{
                        step === 1
                        ? this.props.row.comment
                        :"RE:  "+this.props.row.comment
                    
                    }</pre>
                </td>
                <td align="center">
                    {this.props.row.daytime}
                </td>
                <td align="center">
                    {
                        imgbtn != null
                        ? <Button variant="contained" type="button" style={{fontSize: '11px', width:'90px', height:'40px', margin: '5px'}}
                         onClick={this.handleClickOpenImg} >이미지보기</Button>                        
                        : ''
                    }
                    <Dialog open={this.state.openimg} onClose={this.handleClickCloseImg}>
                            <DialogTitle>{this.props.row.user_name}님의 이미지보기</DialogTitle>
                            <DialogContent>
                                <img src={"http://localhost:9000/controller/save/"+this.props.row.image_name} alt='' style={{maxWidth : "500px"}}/>
                            </DialogContent>
                            <DialogActions>
                                <Button variant="contained" onClick={this.handleClickCloseImg}>닫기</Button>
                            </DialogActions>
                    </Dialog>
                </td>
                <td style={{display:this.state.display}}>
                    <Button  variant="outlined" size='small' style={{fontSize: '11px', height:'40px', margin: '1px'}} onClick={this.visibleEvent.bind(this)}>
                        댓글
                    </Button>  
                    <Button  variant="outlined" size='small' style={{fontSize: '11px', height:'40px', margin: '1px'}} onClick={this.handleClickOpen}>
                        X
                    </Button>
                    <Dialog open={this.state.opendelete} onClose={this.handleClickClose}>
                            <DialogTitle>댓글 삭제</DialogTitle>
                            <DialogContent>
                                <Typography gutterBottom>댓글을 삭제하시겠습니까?</Typography>
                            </DialogContent>
                            <DialogActions>
                                <Button variant="contained" color='secondary'onClick={this.onDataDelete}>삭제</Button>
                                <Button variant="contained" onClick={this.handleClickClose}>닫기</Button>
                            </DialogActions>
                    </Dialog>  
                </td>
            </tr>
        
            <tr style={{display:this.state.display_none}}>
                

                <td align="center">
                    RE:
                </td>
            
                <td style={{height: '50px', textAlign: 'center'}}>
                    {localStorage.state}
                </td>

                <td >
                    <textarea ref="comment" className='input_content input_area' style={{fontSize: '11px', width:'550px', height:'40px', margin: '5px'}} 
                    placeholder="내용을 입력하세요." required="required" />
                </td>

                <td width="180px">
                    <input style={{width:'75px', margin:'5px'}} type="file" name="image_name" onChange={this.onImageUpload}/>                            
                </td>

                
                <td colSpan='2'>
                    <form onSubmit={this.onSubmit}>                             
                        <Button variant="outlined" color='primary' size='small' type="submit" style={{fontSize: '11px', height:'40px', margin: '1px'}}>
                            등록
                        </Button>                            
                      
                    <Button variant="outlined" size='small' style={{fontSize: '11px',  height:'40px', margin: '1px'}} 
                    onClick={this.unvisibleEvent.bind(this)}>
                        취소
                    </Button>
                </form>
                </td>
            </tr> 
            </tbody>
            
        );
    }
}

export default TogetherBoardItem;