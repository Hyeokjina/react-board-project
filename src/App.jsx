import React from 'react'
import './App.css'
import AppRoutes from './routes/routes'
import { AuthProvider } from './context/AuthContext'
import { DiaryProvider } from './context/DiaryContext'

function App() {
    return (
        <AuthProvider>
            <DiaryProvider>
                <AppRoutes />
            </DiaryProvider>
        </AuthProvider>
    )
}

export default App