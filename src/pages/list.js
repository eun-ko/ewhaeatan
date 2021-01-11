import React,{useState,useEffect} from "react";
import styled from "styled-components";
import axios from "axios";

import {Header,SearchBar} from "../components";
import {Loading} from "../components";

export default function List({history}){

  const [foodList,setFoodList]=useState([]);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    getFullList();
  },[]);

  const getFullList=async()=>{
    await axios.get('https://ewha-plate.herokuapp.com/list/all')
    .then(({data})=>{
      console.log(data);
      setFoodList(data);
      setLoading(false);
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  const handleRegisterButton=()=>{
    history.push("/register");
  }

  const list=foodList.map((food)=>{
    return (
      <Contents key={food.id}>
      <Img src={food.imageUrl}/>
      <Column>
        <h4 style={{margin:0}}>{food.name}</h4>
        <Detail>{food.address}</Detail>
        <Detail>{food.phone}</Detail>
        <h5 style={{margin:0, marginTop:"0.8rem"}}>대표메뉴</h5>
        <Detail>{food.menuList[0] && food.menuList[0].menuName} {food.menuList[0] && food.menuList[0].price}원</Detail>
      </Column>
    </Contents>
    );
  });

  return(

    <>
    {loading && <Loading text="전체 맛집 목록 가져오는중..."/>}
    {!loading && 
    <>
      <Wrapper>
        <HeaderWrapper><Header/></HeaderWrapper>
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
        <SearchBar/>
        {list}
      </Wrapper>
      <RButton onClick={handleRegisterButton}>+</RButton>
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
`;

const Filter=styled.div`
  display:flex;
  width:100%;
  text-align:left;
  height:2.3rem;
  margin-top:0.3rem;
  margin-left:1rem;
`;

const Contents=styled.div`
  display:flex;
  justify-content:space-around;
  width:99%;
  padding:1rem 0.5rem;
  box-sizing:border-box;
  border-bottom:0.1rem solid rgba(0,0,0,0.07);
  &:last-child {
    margin-bottom:1rem;
  }
`;

const Detail=styled.div`
  font-size:0.9rem;
`;

const Column =styled.div`
  display:flex;
  flex-direction:column;
  width:60%;
  `;

const Img=styled.img`
  width:7rem;
  height:7rem;`;

const Button=styled.button`
  display:flex;
  justify-content:center;
  align-items:center;
  outline:none;
  border:0.1rem solid rgba(0,0,0,0.2);
  border-radius:0.8rem;
  background:none;
  cursor:pointer;
  font-family: 'Noto Sans KR', sans-serif;
  margin:0.1rem;
`;

const RButton=styled.button`
  &:hover {
    background-color: rgb(0, 80, 40);
    border: 3px solid rgb(0, 80, 40);
  }
  position:sticky;
  bottom:2rem;
  left:50rem;
  margin-right:1rem;
  box-shadow : 0rem 0rem 1rem 0rem rgba(0, 0, 0, 0.2);
  display:flex;
  justify-content:center;
  align-items:center;
  font-weight:600;
  width:3rem;
  height:3rem;
  font-size:2rem;
  border: 3px solid #00462A;
  border-radius:50%;
  margin-bottom:1rem;
  color: white ;
  background-color:#00462A;
  cursor: pointer;
  outline:none;
  font-family: 'Noto Sans KR', sans-serif;
  `;