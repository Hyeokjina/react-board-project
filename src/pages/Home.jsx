import React from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../stores/useAuthStore'
import useDiaryStore from '../stores/useDiaryStore'
import { ROUTES } from '../routes/routePaths'
import styled from 'styled-components'

const HomeContainer = styled.div`
    padding: 4px 20px;
`

const Title = styled.h1`
    font-size: 48px;
    color: #6C63FF;
    margin-bottom: 40px;
    text-align: center;
`
const Stats = styled.p`
    font-size: 15px;
    padding-bottom: 1px;
    padding-right: 450px;
    color: #6b6b6b;
    font-weight: 800;
`

const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 50px;
    max-width: 600px;
    margin: 0 auto 40px;
`

const StatCard = styled.div`
    background: white;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    border-top: 4px solid ${props => props.color || '#6C63FF'};
`

const StatEmoji = styled.div`
    font-size: 36px;
    margin-bottom: 8px;
`

const StatCount = styled.div`
    font-size: 32px;
    font-weight: 700;
    color: #2C3E50;
    margin-bottom: 4px;
`

const StatLabel = styled.div`
    font-size: 14px;
    color: #7F8C8D;
`

const ButtonGroup = styled.div`
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
    margin-left: 42px;
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

const LoginPrompt = styled.div`
    text-align: center;
    padding: 60px 20px;

    p {
        font-size: 18px;
        color: #7F8C8D;
        margin-bottom: 32px;
    }
`


// 감정 데이터
const EMOTIONS = [
    { value: 'happy', emoji: '😊', label: '좋았어', color: '#4ECDC4' },
    { value: 'sad', emoji: '😢', label: '힘들다..', color: '#5C7AEA' },
    { value: 'normal', emoji: '😐', label: '그냥 그래', color: '#45B649' },
    { value: 'fire', emoji: '🔥', label: '최고!', color: '#FF6B6B' }
]

const Home = () => {
    const navigate = useNavigate();
    
    const currentUser = useAuthStore(state => state.currentUser);
    const isLoggedIn = useAuthStore(state => state.isLoggedIn);
    const filterByEmotion = useDiaryStore(state => state.filterByEmotion);

    // 감정별 개수 계산
    const getEmotionCount = (emotionValue) => {
        if (!isLoggedIn()) return 0;
        return filterByEmotion(currentUser.id, emotionValue).length;
    }

    return (
        <HomeContainer>
            <Title>오늘 한 줄</Title>

            {isLoggedIn() ? (
                <>
                    <Stats>작성된 나의 감정 통계</Stats>
                    <StatsGrid>
                        {EMOTIONS.map(emotion => (
                            <StatCard key={emotion.value} color={emotion.color}>
                                <StatEmoji>{emotion.emoji}</StatEmoji>
                                <StatCount>{getEmotionCount(emotion.value)}</StatCount>
                                <StatLabel>{emotion.label}</StatLabel>
                            </StatCard>
                        ))}
                    </StatsGrid>

                    <ButtonGroup>
                        <Button primary onClick={() => navigate(ROUTES.DIARY_WRITE)}>
                            일기 쓰기
                        </Button>
                        <Button onClick={() => navigate(ROUTES.DIARY_LIST)}>
                            내 일기장 보기
                        </Button>
                    </ButtonGroup>
                </>
            ) : (
                <LoginPrompt>
                    <p>하루를 100자로 기록하는 미니멀 일기장</p>
                    <ButtonGroup>
                        <Button primary onClick={() => navigate(ROUTES.LOGIN)}>
                            로그인
                        </Button>
                        <Button onClick={() => navigate(ROUTES.SIGNUP)}>
                            회원가입
                        </Button>
                    </ButtonGroup>
                </LoginPrompt>
            )}
        </HomeContainer>
    )
}

export default Home
