import React,{useContext} from "react";
import styled from "styled-components";
import { withRouter } from 'react-router-dom';

import {FoodTypeContext,LocationContext} from "../services/EwhaContext";

function ResultNotFound({message,history}){

  const [,setLocation]=useContext(LocationContext);
  const [,setFoodType]=useContext(FoodTypeContext);

  const handleBackButton=()=>{
    setLocation("");
    setFoodType([]);
    history.push("/");
  }
  return(
    <Wrapper>
      {message} 😭
      <Button onClick={handleBackButton}>돌아가기</Button>
    </Wrapper>
  )
}

export default withRouter(ResultNotFound);

const Wrapper=styled.div`
  display:flex;
  flex-direction:column;
  font-size:1rem;
  justify-content:center;
  align-items:center;
  width:100%;
`;

const Button=styled.button`
  margin-top:3rem;
  width:6rem;
  height:2.5rem;
  font-size:0.9rem;
  border: 3px solid #00462A;
  border-radius:1rem;
  margin-bottom:1rem;
  color: white ;
  background-color:#00462A;
  cursor: pointer;
  outline:none;
  font-family: 'Noto Sans KR', sans-serif;
  `;