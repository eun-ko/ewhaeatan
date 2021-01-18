import React from "react";
import styled from "styled-components";

import {LOGO_IMG} from "../services/config";

export default function Intro({history}){

  const handleStartButton=()=>{
    history.push("/location");
  }
  
  return(
    <Wrapper>
      <LogoImg src={LOGO_IMG} alt="logo" />
      <Content>
        결정장애 이화인들을 위한 맛집 추천 서비스 입니다<br/>
        시작하시려면 아래 버튼을 눌러주세요!
      </Content>
      <StartButton onClick={handleStartButton}>시작하기</StartButton>
    </Wrapper>
    
  )
}

const LogoImg=styled.img`
  width:15rem;
  margin:0 0 2rem 0;
`;

const Wrapper=styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  width:100%;
  height:91vh;
  //box-shadow : 0rem -1rem 0.4rem 0.4rem rgba(0, 0, 0, 0.1);
  box-shadow:0 0 1rem 0 rgba(0, 0, 0, 0.1);
`;

const Content=styled.div`
  display:flex;
  flex-direction:column;
  text-align:center;
  font-family: 'Jua', sans-serif;
  font-size:1rem;
  color:rgba(0,0,0,0.7);
  margin-bottom:2.8rem;
`;

const StartButton=styled.button`
  width:7rem;
  height:2.5rem;
  font-size:1rem;
  border: 3px solid #00462A;
  border-radius:1rem;
  outline:none;
  color: white;
  background-color:#00462A;
  cursor: pointer;
  font-family: 'Jua', sans-serif;
  animation: fadeInUp 1s ;
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translate3d(0, 100%, 0)
    }
    100% {
      opacity: 1;
      transform: none
    }
  }
`;
