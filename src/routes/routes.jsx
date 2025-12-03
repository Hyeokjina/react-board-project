import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ROUTES } from './routePaths'
import Layout from '../components/common/Layout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import DiaryList from '../pages/DiaryList'
import DiaryWrite from '../pages/DiaryWrite'
import DiaryDetail from '../pages/DiaryDetail'
import MyPage from '../pages/MyPage'
import NotFound from '../pages/NotFound'

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTES.HOME} element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path={ROUTES.LOGIN} element={<Login />} />
                    <Route path={ROUTES.SIGNUP} element={<Signup />} />
                    <Route path={ROUTES.DIARY_LIST} element={<DiaryList />} />
                    <Route path={ROUTES.DIARY_WRITE} element={<DiaryWrite />} />
                    <Route path="/diaries/:id" element={<DiaryDetail />} />
                    <Route path={ROUTES.MYPAGE} element={<MyPage />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
