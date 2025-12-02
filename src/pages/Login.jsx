import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
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

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        username: '',
        password: ''
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

        if (!formData.username.trim()) {
            setMessage({ type: 'error', text: '아이디를 입력해주세요.' });
            return;
        }

        if (!formData.password) {
            setMessage({ type: 'error', text: '비밀번호를 입력해주세요.' });
            return;
        }

        const result = login(formData.username, formData.password);

        if (result.success) {
            setMessage({ type: 'success', text: result.message });
            setTimeout(() => {
                navigate(ROUTES.HOME);
            }, 1000);
        } else {
            setMessage({ type: 'error', text: result.message });
        }
    }

    return (
        <Container>
            <FormCard>
                <Title>로그인</Title>
                <Form onSubmit={handleSubmit}>
                    <InputGroup>
                        <Label>아이디</Label>
                        <Input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="아이디"
                        />
                    </InputGroup>

                    <InputGroup>
                        <Label>비밀번호</Label>
                        <Input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="비밀번호"
                        />
                    </InputGroup>

                    {message.text && (
                        message.type === 'error' ? (
                            <ErrorMessage>{message.text}</ErrorMessage>
                        ) : (
                            <SuccessMessage>{message.text}</SuccessMessage>
                        )
                    )}

                    <Button type="submit">로그인</Button>
                </Form>

                <LinkText>
                    계정이 없으신가요?{' '}
                    <span onClick={() => navigate(ROUTES.SIGNUP)}>회원가입</span>
                </LinkText>
            </FormCard>
        </Container>
    )
}

export default Login
