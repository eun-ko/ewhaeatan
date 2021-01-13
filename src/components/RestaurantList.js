import React from "react";
import styled from "styled-components";

export default function RestaurantList({searchResult,foodDetailList}){

  //필터링 버튼 클릭 후, 서치바 input change 있어야지 업데이트됨
  //foodDetailList로 하면 필터링은 바로 업데이트 되는데 검색결과 업데이트 x
  const filteredList=searchResult && searchResult.map((restaurant)=>{
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
  {filteredList}
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
