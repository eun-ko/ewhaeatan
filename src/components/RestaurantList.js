import React from "react";
import styled from "styled-components";

export default function RestaurantList({searchResult}){

  const restuarantList=
        Array.isArray(searchResult) && 
        searchResult.map((restaurant)=>{
          return(
            <Contents key={restaurant.id}>
              <ImgLink target="blank" href={restaurant.url}><Img src={restaurant.imageUrl}/></ImgLink>
              <Column>
                <Name>{restaurant.name}</Name>
                <Address><i class="fas fa-map-marker-alt"></i> {restaurant.address}</Address>
                <Link href={`tel:${restaurant.phone}`}><i class="fas fa-phone-alt"></i> {restaurant.phone}</Link>
                <Label>대표메뉴</Label>
                <Detail>{restaurant.menu && restaurant.menu.menuName} {restaurant.menu && restaurant.menu.price}원</Detail>
              </Column>
            </Contents>
          )
        })

  return(
        <>
          {
            !Array.isArray(searchResult) && 
            !searchResult.success &&
            <Wrapper>
              해당 맛집이 아직 없습니다<br/>
              추가해주세요!
            </Wrapper>
          }

          {
            searchResult.length===0 &&
            <Wrapper>
              검색 결과가 없습니다
            </Wrapper>
          }

          {
            searchResult && restuarantList
          }
        </>
  );
}

const Link=styled.a`
  font-size:0.8rem;
  text-decoration:none;
  text-decoration: none; 
  outline: none;
  color:#00462A;
  &:hover,active{
    text-decoration: none;
    color:rgba(0,0,0,0.7);
  }
`;

const ImgLink=styled.a`
  &:hover,active{
    opacity:0.7;
  }
`;

const Name=styled.h3`
  margin:0;
`;

const Address=styled.div`
  font-size:0.8rem;
  `;

const Label=styled.div`
  font-size:0.8rem;
  margin:0.6rem 0 0 0;
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
  width:57%;
  `;

const Img=styled.img`
  width:8.3rem;
  height:8.3rem;
  border-radius:0.3rem;
  `;

  const Wrapper=styled.div`
  display:flex;
  width:100%;  
  heifht:100%;
  height:65.5vh;
  justify-content:center;
  align-items:center;
  text-align:center;
`;