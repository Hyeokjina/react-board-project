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
    LinkText
} from './Auth.styled'

const Login = () => {
    const navigate = useNavigate();
    
    const login = useAuthStore(state => state.login);

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.username.trim()) {
            alert('아이디를 입력해주세요.');
            return;
        }

        if (!formData.password) {
            alert('비밀번호를 입력해주세요.');
            return;
        }

        const result = login(formData.username, formData.password);

        if (result.success) {
            alert(result.message);
            navigate(ROUTES.HOME);
        } else {
            alert(result.message);
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
