import React, { Component } from "react";
import Mylist from "./mypage/MyList";
import OurList from "./mypage/OurList";
import OffList from "./mypage/OffList";
import LikeList from "./mypage/LikeList";
import Standby from "./mypage/Standby";
import MyPage from "./mypage/MyPage";
import SignUp from "./sign/SignUp";
import Menu from "./Menu";
import Solo from "./bucketlist/Solo";
import Off from "./bucketlist/Off";
import With from "./bucketlist/With";
import All from "./bucketlist/All";
import Add from "./bucketlist/Add";
import Category from "./Category";
import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import "./css/main.css";
import {
  FreeBoard,
  FreeBoardDetail,
  FreeBoardInsert,
  FreeBoardUpdate,
  FreeBoardComment
} from "./community/FreeBoard/Export";
import QnaBoardDetail from "./community/QnaBoard/QnaBoardDetail";
import QnaBoardUpdate from "./community/QnaBoard/QnaBoardUpdate";
import QnaComment from "./community/QnaBoard/QnaComment";
import QnaBoard from "./community/QnaBoard/QnaBoard";
import QnaBoardWrite from "./community/QnaBoard/QnaBoardWrite";
import Bucketdetail from "./offbucket/Bucketdetail";
import OffbucketCommentInsert from "./offbucket/OffbucketCommentInsert";
import OffBucketCommentUpdate from "./offbucket/OffBucketCommentUpdate";
import TogetherBoard from "./bucketlist/TogetherBoard/TogetherBoard";
import FAQ_signup from "./community/FAQ/FAQ_signup";
import FAQ_contents from "./community/FAQ/FAQ_contents";
import FAQ_etc from "./community/FAQ/FAQ_etc";
import Bmrlist from "./community/FAQ/Bmrlist";
import MyProfile from "./profile/MyProfile";

export default class Main extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          {/* 메인페이지 로딩 되는 컴포넌트 */}
          <Menu />

          <Route exact path="/" component={Category} />
          <Route exact path="/all" component={Category} />
          <Route exact path="/solo" component={Category} />
          <Route exact path="/with" component={Category} />
          <Route exact path="/off" component={Category} />

          {/* 페이지 이동 로딩 컴포넌트 */}
          <Route exact path="/" component={All} />
          <Route exact path="/mypage" component={MyPage} />
          <Route exact path="/signup" component={SignUp} />

          {/* 메인 버킷리스트 카테고리 변경시 출력 컴포넌트 */}
          <Route exact path="/solo" component={Solo} />
          <Route exact path="/off" component={Off} />
          <Route exact path="/with" component={With} />
          <Route exact path="/all" component={All} />
          <Route exact path="/add" component={Add} />

          {/* 마이페이지 카테고리 변경시 이동 로딩 컴포넌트 */}
          <Route exact path="/mypage/mylist" component={Mylist} />
          <Route exact path="/mypage/ourlist" component={OurList} />
          <Route exact path="/mypage/offlist" component={OffList} />
          <Route exact path="/mypage/likelist" component={LikeList} />
          <Route exact path="/mypage/Standby" component={Standby} />

          {/* 자유게시판 */}
          <Route exact path="/community/freeboardlist" component={FreeBoard} />
          <Route exact
            path="/community/freeboarddetail/:num"
            component={FreeBoardDetail}
          />
          <Route
            exact
            path="/community/freeboardinsert"
            component={FreeBoardInsert}
          />
          <Route
            exact
            path="/community/freeboardupdate/:num"
            component={FreeBoardUpdate}
          />

          {/* 자유게시판 댓글 */}
          <Route
            exact
            path="/community/freeboardcomment/:num"
            component={FreeBoardComment}
          />

          {/* QnA게시판 */}
          <Route exact path="/community/qnaboard" component={QnaBoard} />
          <Route
            exact
            path="/community/qnaboardwrite"
            component={QnaBoardWrite}
          />
          <Route
            exact
            path="/community/qnaboarddetail/:num"
            component={QnaBoardDetail}
          />
          <Route
            exact
            path="/community/qnaboardupdate/:num"
            component={QnaBoardUpdate}
          />
          <Route
            exact
            path="/community/qnacomment/:num"
            component={QnaComment}
          />

          {/* 오프후기 */}
          <Route
            exact
            path="/bucket/offbucketdetail"
            component={Bucketdetail}
          />

          <Route
            exact
            path="/bucket/offbucketdetail/CommentInsert"
            component={OffbucketCommentInsert}
          />

          <Route
            exact
            path="/bucketlist/togetherboard/:num"
            component={TogetherBoard}
          />

       

          {/* FAQ  */}
          <Route exact path='/community/FAQ_signup' component={FAQ_signup}/>
          <Route exact path='/community/FAQ_contents' component={FAQ_contents}/>
          <Route exact path='/community/FAQ_etc' component={FAQ_etc}/>
         

          {/* GuestBook  */}
          <Route export path='/community/guestboard' component={Bmrlist}/>

          <Route exact path="/mypage/profile" component={MyProfile} />


        </div>
      </BrowserRouter>
    );
  }
}
