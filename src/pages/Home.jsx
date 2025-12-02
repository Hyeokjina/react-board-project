import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ROUTES } from '../routes/routePaths'
import styled from 'styled-components'

const HomeContainer = styled.div`
    text-align: center;
    padding: 80px 20px;
`

const Title = styled.h1`
    font-size: 48px;
    color: #6C63FF;
    margin-bottom: 24px;
`

const Subtitle = styled.p`
    font-size: 20px;
    color: #7F8C8D;
    margin-bottom: 40px;
`

const ButtonGroup = styled.div`
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
`

const Button = styled.button`
    padding: 16px 32px;
    background: ${props => props.primary ? '#6C63FF' : '#4ECDC4'};
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
`

const Home = () => {
    const navigate = useNavigate();
    const { isLoggedIn, currentUser } = useAuth();

    return (
        <HomeContainer>
            <Title>📖 오늘 한 줄</Title>
            <Subtitle>
                {isLoggedIn
                    ? `환영합니다, ${currentUser.nickname}님! 오늘의 하루를 기록해보세요.`
                    : '하루를 100자로 기록하는 미니멀 일기장'}
            </Subtitle>

            <ButtonGroup>
                {isLoggedIn ? (
                    <>
                        <Button primary onClick={() => navigate(ROUTES.DIARY_WRITE)}>
                            일기 쓰기
                        </Button>
                        <Button onClick={() => navigate(ROUTES.DIARY_LIST)}>
                            내 일기장 보기
                        </Button>
                    </>
                ) : (
                    <>
                        <Button primary onClick={() => navigate(ROUTES.LOGIN)}>
                            로그인
                        </Button>
                        <Button onClick={() => navigate(ROUTES.SIGNUP)}>
                            회원가입
                        </Button>
                    </>
                )}
            </ButtonGroup>
        </HomeContainer>
    )
}

export default Home
