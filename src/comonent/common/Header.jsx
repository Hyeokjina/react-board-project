import React, { useEffect } from 'react'
import { HeaderContainer, Logo, Nav, NavLink, NavLinks } from './Layout.styled'
import { ROUTES, CATEGORYS } from '../../routes/routePaths'
import { useLocation } from 'react-router-dom'

const Header = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, [location.pathname])

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  }

  const isCategoryActive = () => {
    return location.pathname.startsWith('/category') ? 'active' : '';
  }

  return (
    <HeaderContainer>
      <Nav>
        <Logo to={ROUTES.HOME}>Todo App</Logo>
        <NavLinks>
          <NavLink to={ROUTES.HOME} className={isActive(ROUTES.HOME)}>홈</NavLink>
          <NavLink to={ROUTES.TODOS} className={isActive(ROUTES.TODOS)}>할일목록</NavLink>
          <NavLink to={ROUTES.CATEGORY(CATEGORYS.WORK)} className={isCategoryActive()}>카테고리</NavLink>
        </NavLinks>
      </Nav>
    </HeaderContainer>
  )
}

export default Header
