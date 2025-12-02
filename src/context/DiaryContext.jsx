import React, { createContext, useContext, useState, useEffect } from 'react'

const DiaryContext = createContext();

export const useDiary = () => {
    const context = useContext(DiaryContext);
    return context;
}

export const DiaryProvider = ({ children }) => {
    const [diaries, setDiaries] = useState([]);

    // 초기 데이터 로드
    useEffect(() => {
        const savedDiaries = localStorage.getItem('diaries');
        if (savedDiaries) {
            setDiaries(JSON.parse(savedDiaries));
        }
    }, []);

    // diaries 변경 시 localStorage 저장
    useEffect(() => {
        localStorage.setItem('diaries', JSON.stringify(diaries));
    }, [diaries]);

    // 일기 추가
    const addDiary = (userId, content, emotion) => {
        const newDiary = {
            id: Date.now(),
            userId,
            date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
            content,
            emotion,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        setDiaries(prev => [...prev, newDiary]);
        return newDiary;
    }

    // 일기 수정
    const updateDiary = (id, content, emotion) => {
        setDiaries(prev =>
            prev.map(diary =>
                diary.id === id
                    ? { ...diary, content, emotion, updatedAt: new Date().toISOString() }
                    : diary
            )
        );
    }

    // 일기 삭제
    const deleteDiary = (id) => {
        setDiaries(prev => prev.filter(diary => diary.id !== id));
    }

    // 특정 유저의 일기 가져오기
    const getUserDiaries = (userId) => {
        return diaries.filter(diary => diary.userId === userId);
    }

    // 검색
    const searchDiaries = (userId, keyword) => {
        return diaries.filter(diary =>
            diary.userId === userId &&
            diary.content.toLowerCase().includes(keyword.toLowerCase())
        );
    }

    // 감정별 필터
    const filterByEmotion = (userId, emotion) => {
        return diaries.filter(diary =>
            diary.userId === userId &&
            diary.emotion === emotion
        );
    }

    const value = {
        diaries,
        addDiary,
        updateDiary,
        deleteDiary,
        getUserDiaries,
        searchDiaries,
        filterByEmotion
    }

    return (
        <DiaryContext.Provider value={value}>
            {children}
        </DiaryContext.Provider>
    )
}
