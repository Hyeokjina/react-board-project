import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../stores/useAuthStore'
import useDiaryStore from '../stores/useDiaryStore'
import { ROUTES } from '../routes/routePaths'
import {
    Container,
    Header,
    Title,
    Controls,
    SearchBar,
    SearchInput,
    SearchButton,
    WriteButton,
    DiaryGrid,
    DiaryCard,
    DiaryDate,
    DiaryEmotion,
    DiaryContent,
    EmptyState,
    LoginPrompt
} from './DiaryList.styled'

// 감정 이모지 매핑
const EMOTIONS = {
    happy: { emoji: '😊', label: '좋았어' },
    sad: { emoji: '😢', label: '힘들었어' },
    normal: { emoji: '😐', label: '그냥 그래' },
    fire: { emoji: '🔥', label: '최고!' }
}

const DiaryList = () => {
    const navigate = useNavigate();
    
    // Zustand stores 사용
    const currentUser = useAuthStore(state => state.currentUser);
    const isLoggedIn = useAuthStore(state => state.isLoggedIn);
    const getUserDiaries = useDiaryStore(state => state.getUserDiaries);
    const searchDiaries = useDiaryStore(state => state.searchDiaries);

    const [searchKeyword, setSearchKeyword] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    // 로그인하지 않은 경우
    if (!isLoggedIn()) {
        return (
            <Container>
                <LoginPrompt>
                    <h2>로그인이 필요합니다</h2>
                    <p>일기를 작성하고 관리하려면 로그인해주세요.</p>
                    <button onClick={() => navigate(ROUTES.LOGIN)}>
                        로그인하러 가기
                    </button>
                </LoginPrompt>
            </Container>
        )
    }

    // 현재 유저의 일기 가져오기
    const userDiaries = isSearching
        ? searchDiaries(currentUser.id, searchKeyword)
        : getUserDiaries(currentUser.id);

    // 최신순 정렬
    const sortedDiaries = [...userDiaries].sort((a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
    );

    const handleSearch = () => {
        if (searchKeyword.trim()) {
            setIsSearching(true);
        } else {
            setIsSearching(false);
        }
    }

    const handleSearchKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    return (
        <Container>
            <Header>
                <Title>내 일기장 📚</Title>
                <Controls>
                    <SearchBar>
                        <SearchInput
                            type="text"
                            placeholder="일기 검색..."
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            onKeyDown={handleSearchKeyDown}
                        />
                        <SearchButton onClick={handleSearch}>
                            🔍
                        </SearchButton>
                    </SearchBar>
                    <WriteButton onClick={() => navigate(ROUTES.DIARY_WRITE)}>
                        ✏️ 일기 쓰기
                    </WriteButton>
                </Controls>
            </Header>

            {isSearching && (
                <div style={{ marginBottom: '20px', color: '#7F8C8D' }}>
                    "{searchKeyword}" 검색 결과: {sortedDiaries.length}개
                    <button
                        onClick={() => {
                            setSearchKeyword('');
                            setIsSearching(false);
                        }}
                        style={{
                            marginLeft: '10px',
                            padding: '4px 12px',
                            background: '#E0E0E0',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        초기화
                    </button>
                </div>
            )}

            {sortedDiaries.length === 0 ? (
                <EmptyState>
                    <div>📝</div>
                    <h3>{isSearching ? '검색 결과가 없습니다' : '아직 작성한 일기가 없습니다'}</h3>
                    <p>{isSearching ? '다른 키워드로 검색해보세요' : '첫 일기를 작성해보세요!'}</p>
                    {!isSearching && (
                        <button onClick={() => navigate(ROUTES.DIARY_WRITE)}>
                            일기 쓰러 가기
                        </button>
                    )}
                </EmptyState>
            ) : (
                <DiaryGrid>
                    {sortedDiaries.map(diary => (
                        <DiaryCard
                            key={diary.id}
                            onClick={() => navigate(ROUTES.DIARY_DETAIL(diary.id))}
                        >
                            <DiaryDate>{formatDate(diary.date)}</DiaryDate>
                            <DiaryEmotion>
                                {EMOTIONS[diary.emotion] ? EMOTIONS[diary.emotion].emoji : '😊'}
                            </DiaryEmotion>
                            <DiaryContent>{diary.content}</DiaryContent>
                        </DiaryCard>
                    ))}
                </DiaryGrid>
            )}
        </Container>
    )
}

export default DiaryList
