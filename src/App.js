import React from "react";
import styled from "styled-components";

import Router from "./Router";

function App() {
  return (
    <Wrapper>
    <Router/>
    </Wrapper>
  );
}

const Wrapper=styled.div`
  display:flex;
  width: 100%;
  max-width: 37.5rem;
  height: fit-content;
  min-height: 100vh;
  margin:0 auto;
`;

export default App;
