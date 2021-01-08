import React from "react";
import styled from "styled-components";

export default function FoodType({history}){
  const handleButtonClick=()=>{
    history.push("./result");
  }
  return(
    <Wrapper>
      <Question>먹고 싶은 건 모르겠고.. 일단 이건 안땡기는 것 같아 🤔</Question>
      <ButtonGroup>
      <Button onClick={handleButtonClick} >한식</Button>
      <Button onClick={handleButtonClick} >분식</Button>
      <Button onClick={handleButtonClick} >양식</Button>
      <Button onClick={handleButtonClick} >일식</Button>
      <Button onClick={handleButtonClick} >중식</Button>
      <Button onClick={handleButtonClick} >그 외</Button>
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
`;

const Question=styled.h2``;

const ButtonGroup=styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  flex-wrap:wrap;`;
 
const Button=styled.button`
  width:7rem;
  height:2.5rem;
  font-size:1rem;
  border: 3px solid #00462A;
  border-radius:1rem;
  margin: 1rem 1rem;
  color: #00462A;
  background-color:white;
  cursor: pointer;
  outline:none;
  font-family: 'Noto Sans KR', sans-serif;
  `;