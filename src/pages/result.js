import React,{useContext,useState,useEffect} from "react";
import styled from "styled-components";
import axios from "axios";

import {FoodTypeContext,LocationContext} from "../services/EwhaContext";
import {Loading,ResultNotFound} from "../components";

export default function Result({history}){

  const [location]=useContext(LocationContext);
  const [foodType]=useContext(FoodTypeContext);

  const [list,setList]=useState({name:"",address:"",phone:"",imgURL:"",menuList:[]});
  const [loading,setLoading]=useState(true);
  const [restartClicked,setRestartClicked]=useState(0);
  const [resultEmpty,setResultEmpty]=useState({success:true,message:""});

  useEffect(()=>{
    getRandom();
    setResultEmpty({success:true,message:""});
  },[restartClicked]);

  const handleRestartButton=()=>{
    restartClicked ? setRestartClicked(false) : setRestartClicked(true);
    setLoading(true);
    history.push("/result");
  }

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
      if(data.id){
      setList({...list,
        name:data.name,
        address:data.address,
        phone:data.phone,
        imgURL:data.imageUrl,
        menuList:data.menuList});
      }
      else if(!data.success){
        console.log("setResultEmpty로 들어옴");
        setResultEmpty({success:data.success, message:data.message});
      }
      setLoading(false);
    }
    );
    
  }
  return(
    <>
    {loading && <Wrapper><Loading text="결과 가져오는중..."/></Wrapper>}
    {!loading && resultEmpty.success &&
      <Wrapper>
        <Content>그럼 오늘은 <strong>{list.name}</strong> 어때?</Content>
        <Img src={list.imgURL} />
        <Detail>{list.address}</Detail>
        <Detail style={{margin:0}}>{list.phone}</Detail>
        {
          list.menuList.length!==0 && 
          <> 
            <h3 style={{margin:0, marginTop:"0.8rem"}}>대표메뉴</h3>
            <Detail> {list.menuList[0].menuName} {list.menuList[0].price} 원</Detail>
          </>
        }  
        <ButtonGroup>
        <Button onClick={handleRestartButton} >다시하기</Button>
        <Button onClick={()=>{history.push("/list")}} >전체 리스트</Button>
        </ButtonGroup>
      </Wrapper>
    }
    {!loading && !resultEmpty.success &&
      <Wrapper>
        <ResultNotFound message={resultEmpty.message}/>
      </Wrapper>
    }
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
const Content=styled.h2``;

const Img=styled.img`
  width:15rem;
  height:15rem;
  border:none;
  margin:1rem;`;

const Detail=styled.div`
  margin-bottom:0.6rem;
  font-size:1rem;
  `;

const ButtonGroup=styled.div`
  margin-top:0.7rem;
  width:90%;
  display:flex;
  justify-content:space-evenly; 
 `;

const Button=styled.button`
  width:6.5rem;
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