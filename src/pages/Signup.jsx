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

const Signup = () => {
    const navigate = useNavigate();
    
    const signup = useAuthStore(state => state.signup);

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        passwordConfirm: '',
        nickname: ''
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

        if (formData.username.length < 4) {
            alert('아이디는 4자 이상이어야 합니다.');
            return;
        }

        if (!formData.password) {
            alert('비밀번호를 입력해주세요.');
            return;
        }

        if (formData.password.length < 6) {
            alert('비밀번호는 6자 이상이어야 합니다.');
            return;
        }

        if (formData.password !== formData.passwordConfirm) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        if (!formData.nickname.trim()) {
            alert('닉네임을 입력해주세요.');
            return;
        }

        const result = signup(formData.username, formData.password, formData.nickname);

        if (result.success) {
            alert(result.message);
            navigate(ROUTES.LOGIN);
        } else {
            alert(result.message);
        }
    }

    return (
        <Container>
            <FormCard>
                <Title>회원가입</Title>
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
