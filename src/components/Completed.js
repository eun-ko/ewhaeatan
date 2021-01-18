import React,{useContext,useEffect} from "react";
import styled from "styled-components";
import { withRouter } from 'react-router-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import {FoodTypeContext,LocationContext} from "../services/EwhaContext";
import {KAKAO_JS_KEY,URL,LOGO_IMG} from "../services/config";

function Completed({history}){

  const [,setLocation]=useContext(LocationContext);
  const [,setFoodType]=useContext(FoodTypeContext);

  useEffect(()=>{
    if (!window.Kakao.isInitialized())
      window.Kakao.init(KAKAO_JS_KEY);
  },[])

  const handleBackButton=()=>{
    setLocation("");
    setFoodType([]);
    history.push("/");
  }

  const handleKakaoShareButton = () => {
    window.Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: `결정장애 이화인들을 위한 맛집 추천 서비스`,
        description: `시작하시려면 아래 버튼을 눌러주세요!`,
        imageUrl:
          `${LOGO_IMG}`,
        link: {
          webUrl: `${URL}`,
          mobileWebUrl: `${URL}`,
        },
      },
      buttons: [
        {
          title: '바로보기',
          link: {
            webUrl: `${URL}`,
            mobileWebUrl: `${URL}`,
          },
        },
      ],
      success: function (response) {
        console.log(response);
      },
      fail: function (error) {
        console.log(error);
      },
    });
  }

  const linkIconStyle={
    cursor:"pointer"
  }

  const successIconStyle={
    fontSize:"1.8rem",
    color:"#00462A",
    marginBottom:"0.8rem"
  }

  return(
    <Wrapper>
      <i style={successIconStyle} class="fas fa-check-circle"></i>
      <Status>등록 완료</Status>
      <Comment>맛집이 등록되었습니다. 감사합니다.</Comment>
      <Row>
        <ShareLabel>공유하기</ShareLabel>
        <KakaoShareIcon>
          <i onClick={handleKakaoShareButton} style={linkIconStyle} class="fas fa-comment-dots"></i>
        </KakaoShareIcon>
        <CopyToClipboard text={URL}><i style={linkIconStyle} onClick={()=>alert("클립보드에 복사되었습니다💚")} class="fas fa-link"></i></CopyToClipboard>
      </Row>
      <Button onClick={handleBackButton}>처음으로</Button>
    </Wrapper>
  )
}
export default withRouter(Completed);

const KakaoShareIcon=styled.div`
  padding-bottom:0.5rem;
`;

const ShareLabel=styled.p`
  font-size:0.9rem;
`;

const Comment=styled.p``;

const Status=styled.h2``;

const Row=styled.div`
  display:flex;
  justify-content:space-around;
  width:90%;
  font-size:1rem;
  margin-top:1.3rem;
  opacity:0.8;
`;

const Button=styled.button`
  margin-top:0.5rem;
  width:5rem;
  height:2rem;
  border: 3px solid #00462A;
  border-radius:0.8rem;
  outline:none;
  color: white;
  background-color:#00462A;
  cursor: pointer;
  font-family: 'Jua', sans-serif;
`;

const Wrapper=styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  font-size:0.8rem;
  border-radius:1rem;
  justify-content:center;
  box-shadow : 0 0 1rem 0 rgba(0, 0, 0, 0.1);
  height:15rem;
  width:70%;
`;