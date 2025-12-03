import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAuthStore = create(
    persist(
        (set, get) => ({
            // 상태
            currentUser: null,
            users: [],

            // 로그인 여부 확인
            isLoggedIn: () => !!get().currentUser,

            // 회원가입
            signup: (username, password, nickname) => {
                const { users } = get();
                
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
            },

            // 회원정보 수정
            updateUser: (newUsername, newPassword, newNickname) => {
                const { users, currentUser } = get();
                
                // 아이디 중복 체크 (본인 제외)
                const existingUser = users.find(
                    user => user.username === newUsername && user.id !== currentUser.id
                );
                if (existingUser) {
                    return { success: false, message: '이미 존재하는 아이디입니다.' };
                }

                // users 배열 업데이트
                const updatedUsers = users.map(user => {
                    if (user.id === currentUser.id) {
                        return {
                            ...user,
                            username: newUsername,
                            password: newPassword,
                            nickname: newNickname
                        };
                    }
                    return user;
                });

                // currentUser 업데이트
                const updatedCurrentUser = {
                    ...currentUser,
                    username: newUsername,
                    nickname: newNickname
                };

                set({ 
                    users: updatedUsers, 
                    currentUser: updatedCurrentUser 
                });

                return { success: true, message: '회원정보가 수정되었습니다!' };
            },

            // 현재 유저의 비밀번호 가져오기
            getCurrentUserPassword: () => {
                const { users, currentUser } = get();
                if (!currentUser) return null;
                const user = users.find(u => u.id === currentUser.id);
                return user ? user.password : null;
            },

            // 회원 탈퇴
            deleteUser: () => {
                const { users, currentUser } = get();
                
                const updatedUsers = users.filter(user => user.id !== currentUser.id);
                
                set({ 
                    users: updatedUsers, 
                    currentUser: null 
                });

                return { success: true, message: '회원 탈퇴가 완료되었습니다.' };
            }
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({ 
                currentUser: state.currentUser, 
                users: state.users 
            })
        }
    )
);

export default useAuthStore;
