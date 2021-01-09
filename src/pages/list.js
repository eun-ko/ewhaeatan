import React from "react";
import styled from "styled-components";
import axios from "axios";

export default function List(){

  const getFullList=async()=>{
    console.log("get all list");
    const data = await axios.get('https://ewha-plate.herokuapp.com/list/all')
    .then((res)=>{
      console.log(res);
    }).catch((err)=>{
      console.log(err);
    });
    console.log(data);
  }

  return(
    <Wrapper>
      <header>
        <Filter>위치별</Filter>
        <Filter>음식 종류별</Filter>
      </header>
      <Contents>
        <Item>1</Item>
        <Item>2</Item>
      </Contents>
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

const Filter=styled.div``;
const Contents=styled.div``;
const Item=styled.div``;
