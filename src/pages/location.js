import React,{useContext} from "react";
import styled from "styled-components";

import {LocationContext} from "../services/EwhaContext";

export default function Location({history}){

  const [location,setLocation]=useContext(LocationContext);

  const checkLocationSelected=(loc)=>{
    if(location===loc) return true;
    else return false;
  }

  const handleButtonClick=(event)=>{

    const {target:{innerText}}=event;
    if(innerText.substring(0,1)==="정") {
      setLocation("정문"); 
    }
    else if(innerText.substring(0,1)==="학"){
      setLocation("후문"); 
    } 
    else if(innerText.substring(0,1)==="신") {
      setLocation("신촌"); 
    }
    setTimeout(()=>{history.push("./foodtype");},400);

  }
  return(
    <Wrapper>
      <Question>지금 나의 위치는 ❓🧐</Question>
      <ButtonGroup>
      <Button clicked={checkLocationSelected("정문")} onClick={handleButtonClick} >정문쪽에서 수업끝났어</Button>
      <Button clicked={checkLocationSelected("후문")} onClick={handleButtonClick} >학관,교육관,공대야.. 후문 쪽으로 부탁해</Button>
      <Button clicked={checkLocationSelected("신촌")} onClick={handleButtonClick} >신촌까지 걸어가서 먹고 싶은걸?</Button>
      </ButtonGroup>
    </Wrapper>
  )
}

const Wrapper=styled.div`
  display:flex;
  height:90vh;
  width:100%;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  box-shadow:0 0 1rem 0 rgba(0, 0, 0, 0.1);
`;

const Question=styled.h2`
  margin-bottom:2rem;
`;

const ButtonGroup=styled.div`
  width:100%;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
`;
  
const Button=styled.button`
  width:80%;
  height:2.5rem;
  font-size:1rem;
  border: 0.2rem solid #00462A;
  border-radius:1rem;
  margin-bottom:1rem;
  color: ${props=>props.clicked ? "white" : "#00462A"};
  background-color: ${props=>props.clicked ? "#00462A":"white"};
  cursor: pointer;
  outline:none;
  font-family: 'Jua', sans-serif;
  transition: background-color 0.2s ease-in-out;
`;
