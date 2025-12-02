import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import styled from 'styled-components'

const LayoutContainer = styled.div`
    min-height: 100vh;
    background: #F7F7F7;
`

const MainContent = styled.main`
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 24px;
`

const Layout = () => {
    return (
        <LayoutContainer>
            <Header />
            <MainContent>
                <Outlet />
            </MainContent>
        </LayoutContainer>
    )
}

export default Layout
