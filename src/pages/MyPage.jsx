import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore';
import useDiaryStore from '../stores/useDiaryStore';
import { ROUTES } from '../routes/routePaths';
import {
    Container,
    Card,
    Title,
    Form,
    InputGroup,
    Label,
    Input,
    ButtonGroup,
    SaveButton,
    CancelButton,
    Divider,
    DangerZone,
    DeleteButton
} from './Mypage.styled';

const MyPage = () => {
    const navigate = useNavigate();
    
    const currentUser = useAuthStore(state => state.currentUser);
    const isLoggedIn = useAuthStore(state => state.isLoggedIn);
    const updateUser = useAuthStore(state => state.updateUser);
    const deleteUser = useAuthStore(state => state.deleteUser);
    const getCurrentUserPassword = useAuthStore(state => state.getCurrentUserPassword);
    
    const diaries = useDiaryStore(state => state.diaries);

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        passwordConfirm: '',
        nickname: ''
    });

    useEffect(() => {
        if (isLoggedIn() && currentUser) {
            const currentPassword = getCurrentUserPassword();
            setFormData({
                username: currentUser.username,
                password: currentPassword || '',
                passwordConfirm: currentPassword || '',
                nickname: currentUser.nickname
            });
        }
    }, [currentUser, isLoggedIn, getCurrentUserPassword]);

    if (!isLoggedIn()) {
        navigate(ROUTES.LOGIN);
        return null;
    }

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

        const result = updateUser(formData.username, formData.password, formData.nickname);
        alert(result.message);
        
        if (result.success) {
            navigate(ROUTES.HOME);
        }
    }

    const handleDelete = () => {
        if (window.confirm('정말 탈퇴하시겠습니까?')) {
            const result = deleteUser();
            alert(result.message);
            navigate(ROUTES.HOME);
        }
    }

    return (
        <Container>
            <Card>
                <Title>내 정보 수정</Title>
                
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

                    <ButtonGroup>
                        <CancelButton type="button" onClick={() => navigate(ROUTES.HOME)}>
                            취소
                        </CancelButton>
                        <SaveButton type="submit">
                            저장하기
                        </SaveButton>
                    </ButtonGroup>
                </Form>

                <Divider />

                <DangerZone>
                    <DeleteButton onClick={handleDelete}>
                        회원 탈퇴
                    </DeleteButton>
                </DangerZone>
            </Card>
        </Container>
    );
}

export default MyPage;
