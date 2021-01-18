import React from "react";
import styled from "styled-components";

export default function NotFound({history}){

  return(
    <Wrapper>
      존재하지 않는 페이지 입니다.
      <Button onClick={()=>history.push("/")}>처음으로</Button>
    </Wrapper>
    
  )
}

const Wrapper=styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  width:100%;
  height:90vh;
`;

const Button=styled.button`
  margin-top:3rem;
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

