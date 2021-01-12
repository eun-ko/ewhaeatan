import React,{useContext, useState} from "react";
import styled from "styled-components";

import {FoodTypeContext} from "../EwhaContext";

export default function FoodType({history}){

  const[foodType,setFoodType]=useContext(FoodTypeContext);

  const [kor,setKor]=useState(false);
  const [school,setSchool]=useState(false);
  const [west,setWest]=useState(false);
  const [jap,setJap]=useState(false);
  const [chi,setChi]=useState(false);
  const [fast,setFast]=useState(false);

  const addFoodTypes=(foodType)=>{
    setFoodType(prevFoodTypes=>[...prevFoodTypes,foodType]);
  }

  const deleteFoodTypes=(food)=>{
    foodType.splice(foodType.indexOf(food),1);
    setFoodType(foodType);
  }

  const checkFoodState=(state,setFunction,foodType)=>{

    if(state){
      setFunction(false);
      deleteFoodTypes(foodType);
    }
    else{
      setFunction(true);
      addFoodTypes(foodType);
    }
  }
  
  const handleButtonClick=(event)=>{

    const {target:{innerText}}=event;

    if(innerText==="한식") {
      checkFoodState(kor,setKor,"한식");
    }
    else if(innerText==="분식"){
     checkFoodState(school,setSchool,"분식");
    }
    else if(innerText.substring(0,1)==="양"){
      checkFoodState(west,setWest,"양식");
    }
    else if(innerText.substring(0,1)==="회"){
      checkFoodState(jap,setJap,"일식");
    }
    else if(innerText==="중식"){
      checkFoodState(chi,setChi,"중식");
    }
    else if(innerText==="패스트푸드"){
      checkFoodState(fast,setFast,"패스트푸드");
    }
  }

  const handleSubmit=()=>{
    history.push("/result");
  }

  return(
    <Wrapper>
      <Question>
        <p style={{fontWeight:"600",margin:"0"}}>먹고 싶은 건 모르겠고..</p>
        <p style={{fontWeight:"600",margin:"0"}}>일단 이건 안땡기는 것 같아 🤔</p>
      </Question>
      <ButtonGroup>
        <Button selected={kor} onClick={handleButtonClick} >한식</Button>
        <Button selected={school} onClick={handleButtonClick} >분식</Button>
        <Button selected={west} onClick={handleButtonClick} >양식 • 아시안</Button>
        <Button selected={jap} onClick={handleButtonClick} >회 • 돈까스 • 일식</Button>
        <Button selected={chi} onClick={handleButtonClick} >중식</Button>
        <Button selected={fast} onClick={handleButtonClick} >패스트푸드</Button>
      </ButtonGroup>
      <strong style={{fontSize:"1rem"}}>다 골랐다면...?</strong>
      <ConfirmButton onClick={handleSubmit}>결과보기</ConfirmButton>
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

const Question=styled.h3`
  display:flex;
  flex-direction:column;
  align-items:center;
  padding:1.5rem;
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
  width:7rem;
  height:2.5rem;
  background-color:#00462A;
  color:white;
  outline:none;
  border:none;
  border-radius:1rem;
  cursor: pointer;
  margin-top:1.5rem;
  animation: bounceIn 4s ease-in-out ;
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
  width:8rem;
  height:2.5rem;
  font-size:0.9rem;
  border: none;
  border-radius:1rem;
  margin: 1rem 1rem;
  color: #00462A;
  background-color:white;
  box-shadow: ${props=>props.selected ? "0 0 1rem 0 rgba(0, 70, 42, 0.5)" : 0};
  cursor: pointer;
  outline:none;
  font-family: 'Noto Sans KR', sans-serif;
  transition: box-shadow 0.2s ease-in-out;
`;