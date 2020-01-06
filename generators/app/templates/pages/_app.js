import App from 'next/app'
import React from 'react'
import styled, {createGlobalStyle} from 'styled-components';

const Global = createGlobalStyle`
    body, html {
        margin: 0;
        padding: 0;
        background: #00aaff;
    }
`;

const MainStyles = styled.div`
    border-radius: 5px 20px;
    box-shadow: 5px 5px 10px #000;
    margin: 20px auto;
    background: white;
    max-width: 1024px;
    padding: 20px;
`;

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <MainStyles>
        <Global />
        <Component {...pageProps} />
      </MainStyles>
    )
  }
}
