import React,{useState,useEffect} from "react";
import styled from "styled-components";

export default function SearchBar({setSearchKeyword,setSearchResult,foodDetailList}){

  const [input,setInput]=useState();
  
  useEffect(()=>{

    if(input===undefined){
      /* if the button is selected after input has been empty, 
      input appears as undefined. */
      setSearchResult(foodDetailList);
    }
    else if(input!==""){
      setSearchKeyword(input);
    }
    else{
      /* when input is cleared. */
      setSearchResult(foodDetailList); 
      /* Set searchResult to filtered foodDetailList */
    }
  },[input]);

  const handleInputChange=(e)=>{
    setInput(e.target.value);
  }

  const iconStyle={
    position:"absolute",
    left:"10px",
    opacity:0.4
  }

  return(
    <SearchBarWrapper>
      <Input onChange={handleInputChange} placeholder="음식점 이름을 검색해보세요"></Input>
      <i style={iconStyle} class="fas fa-search"></i>
    </SearchBarWrapper>
  )
}

const SearchBarWrapper=styled.div`
  position:relative;
  display:flex;
  margin:0.6rem 0 0.6rem 1rem;
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
  -webkit-appearance: none;
  box-sizing:border-box;
  -moz-box-sizing:border-box;
  -webkit-box-sizing:border-box;
  box-shadow : 0rem 0rem 0.5rem 0rem rgba(0, 0, 0, 0.15);
`;