import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useAuthStore from '../../stores/useAuthStore'
import { ROUTES } from '../../routes/routePaths'
import {
    HeaderContainer,
    Nav,
    Logo,
    NavLinks,
    NavLink,
    AuthButtons,
    UserInfo,
    LogoutButton
} from './Header.styled'

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Zustand store 사용
    const currentUser = useAuthStore(state => state.currentUser);
    const logout = useAuthStore(state => state.logout);
    const isLoggedIn = useAuthStore(state => state.isLoggedIn);

    const handleLogout = () => {
        logout();
        navigate(ROUTES.HOME);
    }

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    }

    return (
        <HeaderContainer>
            <Nav>
                <Logo onClick={() => navigate(ROUTES.HOME)}>
                    📖 오늘 한 줄
                </Logo>

                <NavLinks>
                    <NavLink
                        onClick={() => navigate(ROUTES.HOME)}
                        className={isActive(ROUTES.HOME)}
                    >
                        홈
                    </NavLink>
                    <NavLink
                        onClick={() => navigate(ROUTES.DIARY_LIST)}
                        className={isActive(ROUTES.DIARY_LIST)}
                    >
                        게시판
                    </NavLink>
                </NavLinks>

                <AuthButtons>
                    {isLoggedIn() ? (
                        <>
                            <UserInfo>{currentUser.nickname}님</UserInfo>
                            <LogoutButton onClick={handleLogout}>
                                로그아웃
                            </LogoutButton>
                        </>
                    ) : (
                        <>
                            <NavLink onClick={() => navigate(ROUTES.LOGIN)}>
                                로그인
                            </NavLink>
                            <NavLink onClick={() => navigate(ROUTES.SIGNUP)}>
                                회원가입
                            </NavLink>
                        </>
                    )}
                </AuthButtons>
            </Nav>
        </HeaderContainer>
    )
}

export default Header
