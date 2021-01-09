import React from "react";
import styled from "styled-components";

export default function Result({history}){
  return(
    <Wrapper>
      <Content>그럼 오늘은 ~~어때?</Content>
      <Img>이미지</Img>
      <Detail>상세 정보. 지도. 메뉴판 보기</Detail>
      <ButtonGroup>
      <Button onClick={()=>{history.push("/result")}} >다시하기</Button>
      <Button onClick={()=>{history.push("/list")}} >전체리스트 보기</Button>
      </ButtonGroup>
    </Wrapper>
  )
}

const Wrapper=styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  width:100%;
  height:100vh;
`;

const Content=styled.h2``;
const Img=styled.div`
  width:14rem;
  height:14rem;
  border:1px solid gray;`;
const Detail=styled.div`
  margin-bottom:2rem;`;

const ButtonGroup=styled.div`
  width:90%;
  display:flex;
  justify-content:space-evenly; 
 `;

const Button=styled.button`
  width:8rem;
  height:2.5rem;
  font-size:1rem;
  border: 3px solid #00462A;
  border-radius:1rem;
  margin-bottom:1rem;
  color: white ;
  background-color:#00462A;
  cursor: pointer;
  outline:none;
  font-family: 'Noto Sans KR', sans-serif;
  `;