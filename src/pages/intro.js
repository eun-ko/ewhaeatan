import React from "react";
import styled from "styled-components";

export default function Intro({history}){
  const handleStartButton=()=>{
    history.push("/location");
  }
  return(
    <Wrapper>
      <Title>서비스 타이틀</Title>
      <Content>
        <p style={{marginBottom:"0"}}>결정장애 이화인들을 위한 맛집 추천 서비스 입니다</p>
        <p style={{marginBottom:"3rem"}}>시작하시려면 아래 버튼을 눌러주세요!</p>
      </Content>
      <StartButton onClick={handleStartButton}>시작하기</StartButton>
      </Wrapper>
  )
}

const Wrapper=styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  width:100%;
`;
const Title=styled.h2``;
const Content=styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
`;
const StartButton=styled.button`
  width:9rem;
  height:2.5rem;
  font-size:1rem;
  border: 3px solid #00462A;
  border-radius:1rem;
  color: white;
  background-color:#00462A;
  cursor: pointer;
  font-family: 'Noto Sans KR', sans-serif;
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
