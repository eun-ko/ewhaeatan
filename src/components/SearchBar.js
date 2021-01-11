import React from "react";
import styled from "styled-components";

export default function SearchBar(){

  const style={
    position:"absolute",
    left:"10px",
    opacity:0.4
  }

  return(
    <Wrapper>
      <Input placeholder="음식점 이름을 검색해보세요"></Input>
      <i style={style} class="fas fa-search"></i>
    </Wrapper>
  )
}

const Wrapper=styled.div`
  position:relative;
  display:flex;
  margin:0.6rem 0 0 1rem;
  height:2.3rem;
  width:92%;
  align-items:center;
`;

const Input=styled.input`
  padding:0.4rem;
  padding-left:2.5rem;
  width:95%;
  height:80%;
  border-radius:0.5rem;
  border:none;
  outline:none;
  box-shadow : 0rem 0rem 0.5rem 0rem rgba(0, 0, 0, 0.15);
`;