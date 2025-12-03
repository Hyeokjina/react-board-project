import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../stores/useAuthStore'
import useDiaryStore from '../stores/useDiaryStore'
import { ROUTES } from '../routes/routePaths'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    justify-content: center;
    padding: 20px;
`

const Card = styled.div`
    background: white;
    padding: 48px;
    border-radius: 16px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px;
`

const Title = styled.h1`
    font-size: 32px;
    font-weight: 700;
    color: #2C3E50;
    margin-bottom: 32px;
    text-align: center;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`

const Label = styled.label`
    font-size: 14px;
    font-weight: 600;
    color: #2C3E50;
`

const Input = styled.input`
    padding: 12px 16px;
    border: 2px solid #E0E0E0;
    border-radius: 8px;
    font-size: 16px;
    transition: all 0.2s;

    &:focus {
        outline: none;
        border-color: #6C63FF;
    }
`

const ButtonGroup = styled.div`
    display: flex;
    gap: 12px;
    margin-top: 16px;
`

const SaveButton = styled.button`
    flex: 2;
    padding: 14px;
    background: #6C63FF;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: #5a52d5;
    }
`

const CancelButton = styled.button`
    flex: 1;
    padding: 14px;
    background: #E0E0E0;
    color: #2C3E50;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: #D0D0D0;
    }
`

const Divider = styled.hr`
    border: none;
    border-top: 1px solid #E0E0E0;
    margin: 32px 0;
`

const DangerZone = styled.div`
    text-align: center;
`

const DeleteButton = styled.button`
    padding: 14px 32px;
    background: #E74C3C;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: #c0392b;
    }
`

const MyPage = () => {
    const navigate = useNavigate();
    
    const currentUser = useAuthStore(state => state.currentUser);
    const isLoggedIn = useAuthStore(state => state.isLoggedIn);
    const updateUser = useAuthStore(state => state.updateUser);
    const deleteUser = useAuthStore(state => state.deleteUser);
    const getCurrentUserPassword = useAuthStore(state => state.getCurrentUserPassword);
    
    // 유저의 일기도 삭제하기 위해
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

    // 로그인 체크
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
             {
                const result = deleteUser();
                alert(result.message);
                navigate(ROUTES.HOME);
            }
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
    )
}

export default MyPage
