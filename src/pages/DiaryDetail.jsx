import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useAuthStore from '../stores/useAuthStore'
import useDiaryStore from '../stores/useDiaryStore'
import { ROUTES } from '../routes/routePaths'
import styled from 'styled-components'

const Container = styled.div`
    max-width: 800px;
    margin: 0 auto;
`

const Card = styled.div`
    background: white;
    padding: 48px;
    border-radius: 16px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 32px;
`

const DateText = styled.div`
    font-size: 18px;
    color: #7F8C8D;
`

const EmotionBadge = styled.div`
    font-size: 48px;
`

const Content = styled.p`
    font-size: 20px;
    line-height: 1.8;
    color: #2C3E50;
    margin-bottom: 40px;
    word-break: keep-all;
`

const ButtonGroup = styled.div`
    display: flex;
    gap: 12px;
    justify-content: flex-end;
`

const Button = styled.button`
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        transform: translateY(-2px);
    }
`

const BackButton = styled(Button)`
    background: #E0E0E0;
    color: #2C3E50;
`

const EditButton = styled(Button)`
    background: #4ECDC4;
    color: white;
`

const DeleteButton = styled(Button)`
    background: #E74C3C;
    color: white;
`

const NotFound = styled.div`
    text-align: center;
    padding: 80px 20px;
    
    h2 {
        font-size: 32px;
        color: #2C3E50;
        margin-bottom: 16px;
    }
    
    p {
        color: #7F8C8D;
        margin-bottom: 24px;
    }
`

// 감정 이모지 매핑
const EMOTIONS = {
    happy: { emoji: '😊', label: '좋았어' },
    sad: { emoji: '😢', label: '힘들었어' },
    normal: { emoji: '😐', label: '그냥 그래' },
    fire: { emoji: '🔥', label: '최고!' }
}

const DiaryDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    
    // Zustand stores 사용
    const currentUser = useAuthStore(state => state.currentUser);
    const isLoggedIn = useAuthStore(state => state.isLoggedIn);
    const getDiaryById = useDiaryStore(state => state.getDiaryById);
    const deleteDiary = useDiaryStore(state => state.deleteDiary);

    // 로그인 체크
    if (!isLoggedIn()) {
        navigate(ROUTES.LOGIN);
        return null;
    }

    const diary = getDiaryById(id);

    // 일기가 없거나 다른 사용자의 일기인 경우
    if (!diary || diary.userId !== currentUser.id) {
        return (
            <Container>
                <Card>
                    <NotFound>
                        <h2>📭 일기를 찾을 수 없습니다</h2>
                        <p>삭제되었거나 존재하지 않는 일기입니다.</p>
                        <BackButton onClick={() => navigate(ROUTES.DIARY_LIST)}>
                            목록으로 돌아가기
                        </BackButton>
                    </NotFound>
                </Card>
            </Container>
        );
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        });
    }

    const handleDelete = () => {
        if (window.confirm('정말 이 일기를 삭제하시겠습니까?')) {
            deleteDiary(diary.id);
            navigate(ROUTES.DIARY_LIST);
        }
    }

    return (
        <Container>
            <Card>
                <Header>
                    <div>
                        <DateText>{formatDate(diary.date)}</DateText>
                    </div>
                    <EmotionBadge>
                        {EMOTIONS[diary.emotion] ? EMOTIONS[diary.emotion].emoji : '😊'}
                    </EmotionBadge>
                </Header>

                <Content>{diary.content}</Content>

                <ButtonGroup>
                    <BackButton onClick={() => navigate(ROUTES.DIARY_LIST)}>
                        목록으로
                    </BackButton>
                    <EditButton onClick={() => navigate(`/diaries/edit/${diary.id}`)}>
                        수정하기
                    </EditButton>
                    <DeleteButton onClick={handleDelete}>
                        삭제하기
                    </DeleteButton>
                </ButtonGroup>
            </Card>
        </Container>
    )
}

export default DiaryDetail
