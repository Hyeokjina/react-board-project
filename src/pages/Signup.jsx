import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../stores/useAuthStore'
import { ROUTES } from '../routes/routePaths'
import {
    Container,
    FormCard,
    Title,
    Form,
    InputGroup,
    Label,
    Input,
    Button,
    LinkText,
    ErrorMessage,
    SuccessMessage
} from './Auth.styled'

const Signup = () => {
    const navigate = useNavigate();
    
    // Zustand store 사용
    const signup = useAuthStore(state => state.signup);

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        passwordConfirm: '',
        nickname: ''
    });

    const [message, setMessage] = useState({ type: '', text: '' });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setMessage({ type: '', text: '' });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // 유효성 검사
        if (!formData.username.trim()) {
            setMessage({ type: 'error', text: '아이디를 입력해주세요.' });
            return;
        }

        if (formData.username.length < 4) {
            setMessage({ type: 'error', text: '아이디는 4자 이상이어야 합니다.' });
            return;
        }

        if (!formData.password) {
            setMessage({ type: 'error', text: '비밀번호를 입력해주세요.' });
            return;
        }

        if (formData.password.length < 6) {
            setMessage({ type: 'error', text: '비밀번호는 6자 이상이어야 합니다.' });
            return;
        }

        if (formData.password !== formData.passwordConfirm) {
            setMessage({ type: 'error', text: '비밀번호가 일치하지 않습니다.' });
            return;
        }

        if (!formData.nickname.trim()) {
            setMessage({ type: 'error', text: '닉네임을 입력해주세요.' });
            return;
        }

        // 회원가입 시도
        const result = signup(formData.username, formData.password, formData.nickname);

        if (result.success) {
            setMessage({ type: 'success', text: result.message });
            setTimeout(() => {
                navigate(ROUTES.LOGIN);
            }, 1500);
        } else {
            setMessage({ type: 'error', text: result.message });
        }
    }

    return (
        <Container>
            <FormCard>
                <Title>회원가입 📝</Title>
                <Form onSubmit={handleSubmit}>
                    <InputGroup>
                        <Label>아이디</Label>
                        <Input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="아이디 (4자 이상)"
                        />
                    </InputGroup>

                    <InputGroup>
                        <Label>비밀번호</Label>
                        <Input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="비밀번호 (6자 이상)"
                        />
                    </InputGroup>

                    <InputGroup>
                        <Label>비밀번호 확인</Label>
                        <Input
                            type="password"
                            name="passwordConfirm"
                            value={formData.passwordConfirm}
                            onChange={handleChange}
                            placeholder="비밀번호 확인"
                        />
                    </InputGroup>

                    <InputGroup>
                        <Label>닉네임</Label>
                        <Input
                            type="text"
                            name="nickname"
                            value={formData.nickname}
                            onChange={handleChange}
                            placeholder="닉네임"
                        />
                    </InputGroup>

                    {message.text && (
                        message.type === 'error' ? (
                            <ErrorMessage>{message.text}</ErrorMessage>
                        ) : (
                            <SuccessMessage>{message.text}</SuccessMessage>
                        )
                    )}

                    <Button type="submit">회원가입</Button>
                </Form>

                <LinkText>
                    이미 계정이 있으신가요?{' '}
                    <span onClick={() => navigate(ROUTES.LOGIN)}>로그인</span>
                </LinkText>
            </FormCard>
        </Container>
    )
}

export default Signup
