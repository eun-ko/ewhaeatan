import React from "react";
import styled from "styled-components";

export default function Loading({history}){

  return(
    <Wrapper>
      로딩중..
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
