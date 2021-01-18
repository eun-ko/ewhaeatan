import React,{useContext,useState,useEffect} from "react";
import styled from "styled-components";
import axios from "axios";

import {FoodTypeContext,LocationContext} from "../services/EwhaContext";
import {Loading,ResultNotFound} from "../components";
import {HOST,URL,KAKAO_JS_KEY,KAKAO_SHARE_IMG} from "../services/config";

export default function Result({history}){

  const [location]=useContext(LocationContext);
  const [foodType]=useContext(FoodTypeContext);

  const [list,setList]=useState({name:"",address:"",phone:"",imgURL:"",menuName:"",price:0,url:""});
  const [loading,setLoading]=useState(true);
  const [restartClicked,setRestartClicked]=useState(false);
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
    await axios.post(`${HOST}/random`,{
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
        menuName:data.menu.menuName,
        price:data.menu.price,
        url:data.url
      });
      }
      else if(!data.success){
        setResultEmpty({success:data.success, message:data.message});
      }
      setLoading(false);
    }
    );
    
  }

  const handleKakaoShareButton = () => {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_JS_KEY);
      }
      window.Kakao.Link.createDefaultButton({
        container: `${ShareButton}`,
        objectType: 'feed',
        content: {
          title: `오늘 한 끼는 ${list.name} 어떤가요 ?`,
          description: `${list.address}`,
          imageUrl:
            `${list.imgURL}`,
          link: {
            webUrl: `${URL}`,
            mobileWebUrl: `${URL}`,
          },
        },
        buttons: [
          {
            title: '나도 해보기',
            link: {
              webUrl: `${URL}`,
              mobileWebUrl: `${URL}`,
            },
          },
        ],
        success: function (response) {
          console.log(response);
        },
        fail: function (error) {
          console.log(error);
        },
      });
  }

  return(
    <>
      {
        loading && 
        <Wrapper>
          <Loading text="결과 가져오는중..."/>
        </Wrapper>
      }
      {
        !loading && 
        resultEmpty.success &&
        <Wrapper>
          <Content>그럼 오늘은 <Name>{list.name}</Name> 어때?</Content>
          <Img src={list.imgURL} />
          <Detail><i class="fas fa-map-marker-alt"></i> {list.address}</Detail>
          <Row>
            <Link href={`tel:${list.phone}`}><i class="fas fa-phone-alt"></i> 전화</Link>
            <Link target="blank" href={list.url}><i class="fas fa-link"></i> 링크</Link>
            <ShareButton onClick={handleKakaoShareButton}>
              <KakaoImg src={KAKAO_SHARE_IMG}/> 공유
            </ShareButton>
          </Row>
          <Detail>대표메뉴 : {list.menuName} {list.price} 원</Detail> 
          <ButtonGroup>
            <Button onClick={handleRestartButton} >다시하기</Button>
            <Button onClick={()=>{history.push("/list")}} >전체 리스트</Button>
          </ButtonGroup>
        </Wrapper>
      }
      {
        !loading && 
        !resultEmpty.success &&
        <Wrapper>
          <ResultNotFound message={resultEmpty.message}/>
        </Wrapper>
      }
    </>
  )
}

const KakaoImg=styled.img`
  width:1.5rem;
`;

const ShareButton=styled.button`
  font-size:0.9rem;
  outline: none;
  padding:0.2rem;
  color:#00462A;
  border: 0.1rem solid rgba(0,0,0,0.1);
  border-radius:1rem;
  width:5.5rem;
  background-color:white;
  height:2rem;
  cursor:pointer;
  &:hover,active{
    text-decoration: none;
    color:rgba(0,0,0,0.7);
  }
`;

const Name=styled.strong``;

const Row=styled.div`
  display:flex;
  margin:0.5rem 0;
`;

const Link=styled.a`
  margin-right:0.2rem;
  text-align:center;
  padding:0.2rem;
  font-size:0.9rem;
  text-decoration:none;
  outline: none;
  color:#00462A;
  border: 0.1rem solid rgba(0,0,0,0.1);
  border-radius:1rem;
  width:4.5rem;
  height:2rem;
  &:hover,active{
    text-decoration: none;
    color:rgba(0,0,0,0.7);
  }
`;

const Wrapper=styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  width:100%;
  height:90vh;
  margin:3.5rem 0 0 0;
  box-sizing:border-box;
`;

const Content=styled.h2``;

const Img=styled.img`
  width:15rem;
  height:15rem;
  border:none;
  margin:1rem;
`;

const Detail=styled.div`
  font-size:1rem;
  margin:0.2rem;
`;

const ButtonGroup=styled.div`
  margin:1rem;
  width:80%;
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
  font-family: 'Jua', sans-serif;
`;