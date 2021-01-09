import React,{useState} from "react";
import styled from "styled-components";

export default function FoodType({history}){

  const [kor,setKor]=useState(false);
  const [school,setSchool]=useState(false);
  const [west,setWest]=useState(false);
  const [jap,setJap]=useState(false);
  const [chi,setChi]=useState(false);
  const [fast,setFast]=useState(false);

  const handleButtonClick=(event)=>{
    const {target:{innerText}}=event;

    if(innerText==="한식") kor ? setKor(false) : setKor(true);
    else if(innerText==="분식") school ? setSchool(false) : setSchool(true);
    else if(innerText==="양식 • 아시안") west ? setWest(false): setWest(true);
    else if(innerText==="회 • 돈까스 • 일식") jap ? setJap(false): setJap(true);
    else if(innerText==="중식") chi?setChi(false):setChi(true);
    else if(innerText==="패스트푸드") fast ? setFast(false) : setFast(true);
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
  `;