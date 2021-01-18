import React from "react";
import styled from "styled-components";

export default function Loading(props){

  return(
    <Wrapper>
      {props.text}
      <LineWrapper>
        <Line/>
        <Line/>
        <Line/>
        <Line/>
        <Line/>
      </LineWrapper>
    </Wrapper>
    
  )
}

const Wrapper=styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width:100%;
  height:90vh;
`;

const LineWrapper=styled.div`
  width: 6rem;
  display: flex;
  justify-content: space-around;
  margin:2rem 0;
`;

const Line=styled.div`
  width:0.6rem;
  height:3rem;
  background-color:#00462A;
  animation:lineAnimation 1s ease-in-out infinite;
  @keyframes lineAnimation {
    0% {
      transform: none;
    }
    25% {
      transform: scaleY(1.6);
    }
    50%,
    100% {
      transform: none;
    }
  }
  &:nth-child(2) {
    animation-delay: 0.1s;
  }
  &:nth-child(3) {
    animation-delay: 0.2s;
  }
  &:nth-child(4) {
    animation-delay: 0.3s;
  }
  &:nth-child(5) {
    animation-delay: 0.4s;
  }
`;