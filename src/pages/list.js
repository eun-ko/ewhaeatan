import React,{useState,useEffect} from "react";
import styled from "styled-components";
import axios from "axios";

import {SearchBar,Loading,RestaurantList} from "../components";

export default function List({history}){

  const [foodDetailList,setFoodDetailList]=useState([]);
  const [loading,setLoading]=useState(true);
  const [searchKeyword,setSearchKeyword]=useState();
  const [searchResult,setSearchResult]=useState([]);

  useEffect(()=>{
    getFullList(); 
  },[]);

  useEffect(()=>{
    setSearchResult(filterBySearchKeyword(searchKeyword,foodDetailList));
  },[searchKeyword]);

  const handleRegisterButton=()=>{
    history.push("/register");
  }

  const getFullList=async()=>{
    await axios.get('https://ewha-plate.herokuapp.com/list/all')
    .then(({data})=>{
      //console.log(data);
      setFoodDetailList(data);
      //setSearchResult(foodDetailList); 반영x ,RestaurantList.js에서 set
      setLoading(false);
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  const filterBySearchKeyword=(searchKeyword,foodDetailList)=>{
    return foodDetailList.filter((foodDetail)=>{
      if(foodDetail.name.includes(searchKeyword)){
        return foodDetail;
      }
      else{
        return null;
      };
    });
  }

  return(

    <>
    {loading && <Loading text="전체 맛집 목록 가져오는중..."/>}
    {!loading && 
    <>
      <Wrapper>
        <FilterWrapper>
        <Filter>
          <FilterName>위치</FilterName>
          <Button>정문</Button>
          <Button>후문</Button>
          <Button>신촌</Button>
        </Filter>
        <Filter>
          <FilterName>음식 종류</FilterName>
          <Button>한식</Button>
          <Button>분식</Button>
          <Button>양식</Button>
          <Button>일식</Button>
          <Button>중식</Button>
          <Button>패스트푸드</Button>
        </Filter>
        </FilterWrapper>
        <SearchBar {...{setSearchKeyword}}/>
        <RestaurantList {...{setSearchResult}} {...{searchResult}}/>
      </Wrapper>
      <FloatingButton onClick={handleRegisterButton}><i class="fas fa-pen"></i></FloatingButton>
    </>
    }
    </>
    
  )
}

const Wrapper=styled.div`
  display:flex;
  flex-direction:column;
  width:100%;
`;

const FilterName=styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  margin-right:0.5rem;
`;

const HeaderWrapper=styled.div`
  width:100%;
  position:sticky;
  z-index:100;
  top:0;
  background-color:rgba(255,255,255,0.9);
`;

const FilterWrapper=styled.div`
  padding:0.5rem 0;
  width:100%;
  position:sticky;
  z-index:100;
  top:0;
  background-color:rgba(255,255,255,0.9);
`;

const Filter=styled.div`
  display:flex;
  width:100%;
  text-align:left;
  height:2.3rem;
  margin-top:0.3rem;
  margin-left:1rem;
`;

const Button=styled.button`
  display:flex;
  justify-content:center;
  align-items:center;
  outline:none;
  border:0.1rem solid rgba(0,0,0,0.2);
  border-radius:0.8rem;
  background:none;
  cursor:pointer;
  font-size:0.8rem;
  font-family: 'Noto Sans KR', sans-serif;
  margin:0.1rem;
`;

const FloatingButton=styled.button`
  &:hover {
    opacity:0.75;
    box-shadow : 0rem 0rem 1.5rem 0rem rgba(0, 0, 0, 0.4);
  }
  position:fixed;
  bottom:1.3rem;
  right:1rem;
  margin-right:1rem;
  box-shadow : 0rem 0rem 1rem 0rem rgba(0, 0, 0, 0.2);
  display:flex;
  justify-content:center;
  align-items:center;
  font-weight:600;
  width:3.3rem;
  height:3.3rem;
  font-size:1rem;
  border: 3px solid #00462A;
  border-radius:50%;
  margin-bottom:1rem;
  color: white ;
  background-color:#00462A;
  cursor: pointer;
  outline:none;
  font-family: 'Noto Sans KR', sans-serif;
  `;