import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useDiaryStore = create(
    persist(
        (set, get) => ({
            // 상태
            diaries: [],

            // 일기 추가
            addDiary: (userId, content, emotion) => {
                const newDiary = {
                    id: Date.now(),
                    userId,
                    date: new Date().toISOString().split('T')[0],
                    content,
                    emotion,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };

                set(state => ({ diaries: [...state.diaries, newDiary] }));
                return newDiary;
            },

            // 일기 수정
            updateDiary: (id, content, emotion) => {
                set(state => ({
                    diaries: state.diaries.map(diary =>
                        diary.id === id
                            ? { ...diary, content, emotion, updatedAt: new Date().toISOString() }
                            : diary
                    )
                }));
            },

            // 일기 삭제
            deleteDiary: (id) => {
                set(state => ({
                    diaries: state.diaries.filter(diary => diary.id !== id)
                }));
            },

            // 특정 유저의 일기 가져오기
            getUserDiaries: (userId) => {
                const { diaries } = get();
                return diaries.filter(diary => diary.userId === userId);
            },

            // 검색
            searchDiaries: (userId, keyword) => {
                const { diaries } = get();
                return diaries.filter(diary =>
                    diary.userId === userId &&
                    diary.content.toLowerCase().includes(keyword.toLowerCase())
                );
            },

            // 감정별 필터
            filterByEmotion: (userId, emotion) => {
                const { diaries } = get();
                return diaries.filter(diary =>
                    diary.userId === userId &&
                    diary.emotion === emotion
                );
            },

            // 특정 일기 가져오기
            getDiaryById: (id) => {
                const { diaries } = get();
                return diaries.find(diary => diary.id === Number(id));
            }
        }),
        {
            name: 'diary-storage'
        }
    )
);

export default useDiaryStore;
