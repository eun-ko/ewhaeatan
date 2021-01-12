import React,{useState,useEffect} from "react";
import styled from "styled-components";
import axios from "axios";

import {Loading} from ".";

export default function RestaurantList({searchResult,setSearchResult}){
  
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    getFullList();
  }
  ,[]);

  const getFullList=async()=>{
    await axios.get('https://ewha-plate.herokuapp.com/list/all')
    .then(({data})=>{
      setSearchResult(data);
      setLoading(false);
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  const restaurantList=searchResult && searchResult.map((restaurant)=>{
    return(
      <Contents key={restaurant.id}>
      <Img src={restaurant.imageUrl}/>
      <Column>
        <h4 style={{margin:0}}>{restaurant.name}</h4>
        <Detail>{restaurant.address}</Detail>
        <Detail>{restaurant.phone}</Detail>
        <h5 style={{margin:0, marginTop:"0.8rem"}}>대표메뉴</h5>
        <Detail>{restaurant.menuList[0] && restaurant.menuList[0].menuName} {restaurant.menuList[0] && restaurant.menuList[0].price}원</Detail>
      </Column>
    </Contents>
    )
  })
  return(
  <>
  {loading && <Loading />}
  {!loading && restaurantList}
  </>
  );
}

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
