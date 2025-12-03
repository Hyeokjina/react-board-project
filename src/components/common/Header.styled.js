import styled from 'styled-components';

export const HeaderContainer = styled.header`
    background: #ffffff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 100;
    width: 800px;
`

export const Nav = styled.nav`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const Logo = styled.div`
    font-size: 24px;
    font-weight: 700;
    color: #6C63FF;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        transform: scale(1.05);
    }
`

export const NavLinks = styled.div`
    display: flex;
    gap: 32px;
    flex: 1;
    justify-content: center;
`

export const NavLink = styled.div`
    font-size: 16px;
    font-weight: 600;
    color: #2C3E50;
    cursor: pointer;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 0.2s;

    &:hover {
        background: #F7F7F7;
        color: #6C63FF;
    }

    &.active {
        color: #6C63FF;
        background: #F0EFFF;
    }
`

export const AuthButtons = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`

export const UserInfo = styled.span`
    font-size: 14px;
    color: #6C63FF;
    font-weight: 600;
`

export const LogoutButton = styled.button`
    padding: 8px 16px;
    background: #6C63FF;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: #5a52d5;
        transform: translateY(-2px);
    }
`
