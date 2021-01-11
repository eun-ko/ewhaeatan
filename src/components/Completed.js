import React from "react";
import styled from "styled-components";
import {CopyToClipboard} from 'react-copy-to-clipboard';

export default function Completed(){
  
  const url = window.location.href;

  return(
    <Wrapper>
      <h2>✨</h2>
      <h2>등록 완료</h2>
      <p>맛집이 등록되었습니다. 감사합니다.</p>
      <Row>
      <p style={{fontSize:"0.9rem"}}>공유하기</p>
      <i class="fas fa-comment-dots"></i>
      <CopyToClipboard text={url}><i class="fas fa-link"></i></CopyToClipboard>
      </Row>
      <Button>처음으로</Button>
    </Wrapper>
  )
}

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
  font-family: 'Noto Sans KR', sans-serif;
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