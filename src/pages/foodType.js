import React,{useContext} from "react";
import styled from "styled-components";

import {FoodTypeContext} from "../services/EwhaContext";

export default function FoodType({history}){

  const[foodType,setFoodType]=useContext(FoodTypeContext);

  const addFoodTypes=(foodType)=>{
    setFoodType(prevFoodTypes=>[...prevFoodTypes,foodType]);
  }

  const deleteFoodTypes=(food)=>{
    setFoodType(foodType.filter(f=>f!==food));
  }

  const checkFoodTypeSelected=(food)=>{
    if(foodType.includes(food)) return true;
    else return false;
  }

  const checkFoodState=(foodType)=>{

    if(checkFoodTypeSelected(foodType)){
      deleteFoodTypes(foodType);
    }
    else{
      addFoodTypes(foodType);
    }
  }

  const handleButtonClick=(event)=>{

    const {target:{innerText}}=event;

    if(innerText==="한식") {
      checkFoodState("한식");
    }
    else if(innerText==="분식"){
     checkFoodState("분식");
    }
    else if(innerText.substring(0,1)==="양"){
      checkFoodState("양식");
    }
    else if(innerText.substring(0,1)==="회"){
      checkFoodState("일식");
    }
    else if(innerText==="중식"){
      checkFoodState("중식");
    }
    else if(innerText==="패스트푸드"){
      checkFoodState("패스트푸드");
    }
  }

  const handleSubmit=()=>{
    history.push("/result");
  }

  return(
    <Wrapper>
      <QuestionWrapper>
        <Question>먹고 싶은 건 모르겠고...</Question>
        <Question>일단 이건 <Highlight>안땡기는 것</Highlight> 같아 🤔</Question>
        <Warning> ※ 다 먹고싶다면 아무것도 선택하지 말고<br/> 결과보기를 눌러주세요!</Warning>
      </QuestionWrapper>
      <ButtonGroup>
        <Button selected={checkFoodTypeSelected("한식")} onClick={handleButtonClick} >한식</Button>
        <Button selected={checkFoodTypeSelected("분식")} onClick={handleButtonClick} >분식</Button>
        <Button selected={checkFoodTypeSelected("양식")} onClick={handleButtonClick} >양식 • 아시안</Button>
        <Button selected={checkFoodTypeSelected("일식")} onClick={handleButtonClick} >회 • 돈까스 • 일식</Button>
        <Button selected={checkFoodTypeSelected("중식")} onClick={handleButtonClick} >중식</Button>
        <Button selected={checkFoodTypeSelected("패스트푸드")} onClick={handleButtonClick} >패스트푸드</Button>
      </ButtonGroup>
      <Question>다 골랐다면...?</Question>
      <ConfirmButton onClick={handleSubmit}>결과보기</ConfirmButton>
    </Wrapper>
  )
}

const Question=styled.p`
  margin:0;
  font-size:1.2rem;
`;

const Highlight=styled.span`
  background-color:#00462A;
  color:white;
`;

const Warning=styled.p`
  font-size:0.8rem;
  margin:0.7rem 0 0 0;
  text-align:center;
  color:rgba(192, 57, 43,0.9);
`;

const Wrapper=styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  width:100%;
  height:90vh;
`;

const QuestionWrapper=styled.h3`
  display:flex;
  flex-direction:column;
  align-items:center;
  padding:1.5rem;
  font-size:1.2rem;
  font-weight:600;
  text-align:center;
  `;

const ButtonGroup=styled.div`
  width:100%;
  display:flex;
  justify-content:center;
  align-items:center;
  flex-wrap:wrap;
  margin-bottom:1.2rem;
  `;

const ConfirmButton=styled.button` 
  width:6.7rem;
  height:2.5rem;
  background-color:#00462A;
  color:white;
  outline:none;
  border:none;
  border-radius:1rem;
  cursor: pointer;
  margin-top:1.5rem;
  animation: bounceIn 4s ease-in-out ;
  font-size:1.1rem;
  font-family: 'Jua', sans-serif;
  @keyframes bounceIn {
    0%, 100%, 20%, 40%, 60%, 80% {
      transition-timing-function: cubic-bezier(0.215, .61, .355, 1)
    }
    0% {
      opacity: 0;
      transform: scale3d(.3, .3, .3)
    }
    20% {
      transform: scale3d(1.1, 1.1, 1.1)
    }
    40% {
      transform: scale3d(.9, .9, .9)
    }
    60% {
      opacity: 1;
      transform: scale3d(1.03, 1.03, 1.03)
    }
    80% {
    
      transform: scale3d(.97, .97, .97)
    }
    100% {
      opacity: 1;
      transform: scale3d(1, 1, 1)
    }
  }
  animation-delay: 2s;
`;

const Button=styled.button`
  width:9rem;
  height:2.5rem;
  font-size:1rem;
  border: none;
  border-radius:1rem;
  margin: 1rem 1rem;
  color: #00462A;
  background-color:white;
  box-shadow: ${props=>props.selected ? "0 0 1rem 0 rgba(0, 70, 42, 0.5)" : 0};
  cursor: pointer;
  outline:none;
  font-family: 'Jua', sans-serif;
  transition: box-shadow 0.2s ease-in-out;
`;