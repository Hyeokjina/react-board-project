import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAuthStore = create(
    persist(
        (set, get) => ({
            // 상태
            currentUser: null,
            users: [],

            // 로그인 여부 확인 (getter 역할)
            isLoggedIn: () => !!get().currentUser,

            // 회원가입
            signup: (username, password, nickname) => {
                const { users } = get();
                
                // 아이디 중복 체크
                const existingUser = users.find(user => user.username === username);
                if (existingUser) {
                    return { success: false, message: '이미 존재하는 아이디입니다.' };
                }

                const newUser = {
                    id: Date.now(),
                    username,
                    password,
                    nickname,
                    createdAt: new Date().toISOString()
                };

                set({ users: [...users, newUser] });
                return { success: true, message: '회원가입이 완료되었습니다!' };
            },

            // 로그인
            login: (username, password) => {
                const { users } = get();
                const user = users.find(
                    u => u.username === username && u.password === password
                );

                if (user) {
                    const userInfo = {
                        id: user.id,
                        username: user.username,
                        nickname: user.nickname
                    };
                    set({ currentUser: userInfo });
                    return { success: true, message: '로그인 성공!' };
                } else {
                    return { success: false, message: '아이디 또는 비밀번호가 틀렸습니다.' };
                }
            },

            // 로그아웃
            logout: () => {
                set({ currentUser: null });
            }
        }),
        {
            name: 'auth-storage', // localStorage 키 이름
            partialize: (state) => ({ 
                currentUser: state.currentUser, 
                users: state.users 
            })
        }
    )
);

export default useAuthStore;
