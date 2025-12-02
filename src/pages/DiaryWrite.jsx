import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useDiary } from '../context/DiaryContext'
import { ROUTES } from '../routes/routePaths'
import {
    Container,
    FormCard,
    Title,
    Form,
    DateDisplay,
    EmotionPicker,
    EmotionButton,
    TextareaGroup,
    Label,
    Textarea,
    CharCount,
    ButtonGroup,
    SubmitButton,
    CancelButton,
    ErrorMessage
} from './DiaryWrite.styled'

// 감정 옵션
const EMOTIONS = [
    { value: 'happy', emoji: '😊', label: '좋았어' },
    { value: 'sad', emoji: '😢', label: '힘들었어' },
    { value: 'normal', emoji: '😐', label: '그냥 그래' },
    { value: 'fire', emoji: '🔥', label: '최고!' }
]

const DiaryWrite = () => {
    const navigate = useNavigate();
    const { currentUser, isLoggedIn } = useAuth();
    const { addDiary } = useDiary();

    const [content, setContent] = useState('');
    const [emotion, setEmotion] = useState('happy');
    const [error, setError] = useState('');

    // 로그인 체크
    if (!isLoggedIn) {
        navigate(ROUTES.LOGIN);
        return null;
    }

    const today = new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    });

    const handleContentChange = (e) => {
        const text = e.target.value;
        if (text.length <= 100) {
            setContent(text);
            setError('');
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (content.trim().length === 0) {
            setError('일기 내용을 입력해주세요.');
            return;
        }

        if (content.trim().length < 5) {
            setError('최소 5자 이상 입력해주세요.');
            return;
        }

        // 일기 저장
        addDiary(currentUser.id, content.trim(), emotion);

        // 목록으로 이동
        navigate(ROUTES.DIARY_LIST);
    }

    const handleCancel = () => {
        if (content.trim().length > 0) {
            if (window.confirm('작성 중인 내용이 있습니다. 정말 취소하시겠습니까?')) {
                navigate(ROUTES.DIARY_LIST);
            }
        } else {
            navigate(ROUTES.DIARY_LIST);
        }
    }

    return (
        <Container>
            <FormCard>
                <Title>오늘 한 줄 📝</Title>
                <DateDisplay>{today}</DateDisplay>

                <Form onSubmit={handleSubmit}>
                    <EmotionPicker>
                        <Label>오늘의 기분</Label>
                        <div>
                            {EMOTIONS.map(emo => (
                                <EmotionButton
                                    key={emo.value}
                                    type="button"
                                    active={emotion === emo.value}
                                    onClick={() => setEmotion(emo.value)}
                                >
                                    <span className="emoji">{emo.emoji}</span>
                                    <span className="label">{emo.label}</span>
                                </EmotionButton>
                            ))}
                        </div>
                    </EmotionPicker>

                    <TextareaGroup>
                        <Label>오늘 하루를 한 줄로 표현해보세요</Label>
                        <Textarea
                            value={content}
                            onChange={handleContentChange}
                            placeholder="오늘은 어떤 하루였나요? (100자 이내)"
                            rows={4}
                        />
                        <CharCount>
                            {content.length} / 100
                        </CharCount>
                    </TextareaGroup>

                    {error && <ErrorMessage>{error}</ErrorMessage>}

                    <ButtonGroup>
                        <CancelButton type="button" onClick={handleCancel}>
                            취소
                        </CancelButton>
                        <SubmitButton type="submit">
                            저장하기
                        </SubmitButton>
                    </ButtonGroup>
                </Form>
            </FormCard>
        </Container>
    )
}

export default DiaryWrite
