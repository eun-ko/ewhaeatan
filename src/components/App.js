import React from "react";
import styled from "styled-components";
import 'antd/dist/antd.css';

import Router from "../services/Router";
import {Footer} from ".";
import {LocationProvider,FoodTypeProvider} from "../services/EwhaContext";

function App() {
  return (
    <LocationProvider>
    <FoodTypeProvider> 
    <Wrapper>
      <RouterWrapper><Router/></RouterWrapper>
      <FooterWrapper><Footer/></FooterWrapper>
    </Wrapper>
    </FoodTypeProvider>
    </LocationProvider>
  );
}
const RouterWrapper=styled.div`
`;

const FooterWrapper=styled.div`
  height:10vh;
`;

const Wrapper=styled.div`
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  width: 100%;
  max-width: 26rem;
  margin:0 auto;
  height:100vh;
  font-family: 'Jua', sans-serif;
`;

export default App;
