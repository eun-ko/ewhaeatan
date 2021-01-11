import React from "react";
import styled from "styled-components";

export default function NotFound({history}){

  return(
    <Wrapper>
      존재하지 않는 페이지 입니다.
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
