import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [users, setUsers] = useState([]);

    // 초기 데이터 로드
    useEffect(() => {
        const savedUsers = localStorage.getItem('users');
        const savedCurrentUser = localStorage.getItem('currentUser');
        
        if (savedUsers) {
            setUsers(JSON.parse(savedUsers));
        }
        if (savedCurrentUser) {
            setCurrentUser(JSON.parse(savedCurrentUser));
        }
    }, []);

    // users 변경 시 localStorage 저장
    useEffect(() => {
        if (users.length > 0) {
            localStorage.setItem('users', JSON.stringify(users));
        }
    }, [users]);

    // 회원가입
    const signup = (username, password, nickname) => {
        // 아이디 중복 체크
        const existingUser = users.find(user => user.username === username);
        if (existingUser) {
            return { success: false, message: '이미 존재하는 아이디입니다.' };
        }

        const newUser = {
            id: Date.now(),
            username,
            password, // 실제로는 해싱 필요
            nickname,
            createdAt: new Date().toISOString()
        };

        setUsers(prev => [...prev, newUser]);
        return { success: true, message: '회원가입이 완료되었습니다!' };
    }

    // 로그인
    const login = (username, password) => {
        const user = users.find(
            u => u.username === username && u.password === password
        );

        if (user) {
            const userInfo = {
                id: user.id,
                username: user.username,
                nickname: user.nickname
            };
            setCurrentUser(userInfo);
            localStorage.setItem('currentUser', JSON.stringify(userInfo));
            return { success: true, message: '로그인 성공!' };
        } else {
            return { success: false, message: '아이디 또는 비밀번호가 틀렸습니다.' };
        }
    }

    // 로그아웃
    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
    }

    const value = {
        currentUser,
        users,
        signup,
        login,
        logout,
        isLoggedIn: !!currentUser
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
