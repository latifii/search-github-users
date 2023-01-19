import React from 'react'
import loadingImage from '../images/preloader.gif'
import styled from 'styled-components'
const Loading = () => {
  return (
    <Wrapper>
      <img src={loadingImage} className='loading-img' alt='loding' />
    </Wrapper>
  )
}

export default Loading

const Wrapper = styled.section`
  img {
    width: 150px;
  }
`
