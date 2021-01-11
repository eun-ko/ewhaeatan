import React from "react";
import styled from "styled-components";

export default function Header(){
  return(
    <Wrapper>
      EWHA
    </Wrapper>
  )
}

const Wrapper=styled.div`
  display:flex;
  box-sizing:border-box;
  padding:1rem;
  font-size:1.2rem;
  justify-content:center;
  box-shadow : 0 0 1rem 0 rgba(0, 0, 0, 0.1);
  height:4rem;
  width:100%;
 
`;