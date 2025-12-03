import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../routes/routePaths'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 200px);
    text-align: center;
    padding: 20px;
`

const ErrorCode = styled.h1`
    font-size: 120px;
    font-weight: 700;
    color: #6C63FF;
    margin: 0;
`

const Title = styled.h2`
    font-size: 28px;
    color: #2C3E50;
    margin: 16px 0;
`

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <ErrorCode>404</ErrorCode>
            <Title>페이지를 찾을 수 없습니다</Title>
            
        </Container>
    )
}

export default NotFound