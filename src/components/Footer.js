import React from "react";
import styled from "styled-components";

export default function Footer(){
  return(
    <Wrapper>
      EWHA PLATE Copyright © 2021 by Eun & Ayoung
    </Wrapper>
  )
}

const Wrapper=styled.div`
display:flex;
box-sizing:border-box;
padding:1rem;
font-size:0.7rem;
justify-content:flex-end;
background-color:#f2f2f2;
height:3rem;
width:100%;
`;