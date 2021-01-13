import React,{useContext,useState,useEffect} from "react";
import styled from "styled-components";
import axios from "axios";

import {FoodTypeContext,LocationContext} from "../services/EwhaContext";
import {Loading} from "../components";

export default function Result({history}){

  const [location]=useContext(LocationContext);
  const [foodType]=useContext(FoodTypeContext);

  const [list,setList]=useState({name:"",address:"",phone:"",imgURL:""});
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    getRandom();
  },[]);

  const getRandom=async()=>{
    await axios.post("https://ewha-plate.herokuapp.com/random",{
      "categories":foodType,
      "ewhaType":location
    },{
      headers:{
      'Content-Type': 'application/json'
    }
  }).then(
    ({data})=>{
      console.log(data);
      setList({...list,
        name:data.name,
        address:data.address,
        phone:data.phone,
        imgURL:data.imageUrl});
      setLoading(false);
    }
    );
    
  }
  return(
    <>
    {loading && <Wrapper><Loading text="결과 가져오는중..."/></Wrapper>}
    {!loading && <Wrapper>
      <Content>그럼 오늘은 <strong>{list.name}</strong> 어때?</Content>
      <Img src={list.imgURL} />
      <Detail>{list.address}</Detail>
      <Detail>{list.phone}</Detail>
      <ButtonGroup>
      <Button onClick={()=>{history.push("/result")}} >다시하기</Button>
      <Button onClick={()=>{history.push("/list")}} >전체리스트 보기</Button>
      </ButtonGroup>
    </Wrapper>}
    </>
  )
}

const Wrapper=styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  width:100%;
  height:90vh;
`;
const Content=styled.h3``;

const Img=styled.img`
  width:14rem;
  height:14rem;
  border:1px solid gray;
  margin:1rem;`;

const Detail=styled.div`
  margin-bottom:1rem;`;

const ButtonGroup=styled.div`
  width:90%;
  display:flex;
  justify-content:space-evenly; 
 `;

const Button=styled.button`
  width:7rem;
  height:2.5rem;
  font-size:0.8rem;
  border: 3px solid #00462A;
  border-radius:1rem;
  margin-bottom:1rem;
  color: white ;
  background-color:#00462A;
  cursor: pointer;
  outline:none;
  font-family: 'Noto Sans KR', sans-serif;
  `;