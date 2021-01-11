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
        <p style={{margin:"0"}}>먹고 싶은 건 모르겠고..</p>
        <p style={{margin:"0"}}>일단 이건 안땡기는 것 같아 🤔</p>
      </Question>
      <ButtonGroup>
        <Button selected={kor} onClick={handleButtonClick} >한식</Button>
        <Button selected={school} onClick={handleButtonClick} >분식</Button>
        <Button selected={west} onClick={handleButtonClick} >양식 • 아시안</Button>
        <Button selected={jap} onClick={handleButtonClick} >회 • 돈까스 • 일식</Button>
        <Button selected={chi} onClick={handleButtonClick} >중식</Button>
        <Button selected={fast} onClick={handleButtonClick} >패스트푸드</Button>
      </ButtonGroup>
      <h3>다 골랐다면...?</h3>
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
  height:100vh;
`;

const Question=styled.h3`
  display:flex;
  flex-direction:column;
  align-items:center;`;

const ButtonGroup=styled.div`
  width:100%;
  display:flex;
  justify-content:center;
  align-items:center;
  flex-wrap:wrap;`;

const ConfirmButton=styled.button` 
  width:7rem;
  height:2.5rem;
  background-color:#00462A;
  color:white;
  outline:none;
  border:none;
  border-radius:1rem;
  cursor: pointer;
`;

const Button=styled.button`
  width:7rem;
  height:2.5rem;
  font-size:0.8rem;
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