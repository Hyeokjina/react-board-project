import styled from 'styled-components';

export const Container = styled.div`
    width: 750px;
    margin: 0 auto;

`

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    flex-wrap: wrap;
    gap: 20px;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: stretch;
    }
`

export const Title = styled.h1`
    font-size: 36px;
    font-weight: 700;
    color: #2C3E50;
`

export const Controls = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;

    @media (max-width: 768px) {
        flex-direction: column;
        width: 100%;
    }
`

export const SearchBar = styled.div`
    display: flex;
    gap: 8px;
    
    @media (max-width: 768px) {
        width: 100%;
    }
`

export const SearchInput = styled.input`
    padding: 12px 16px;
    border: 2px solid #E0E0E0;
    border-radius: 8px;
    font-size: 14px;
    width: 250px;
    transition: all 0.2s;

    &:focus {
        outline: none;
        border-color: #6C63FF;
    }

    @media (max-width: 768px) {
        width: 100%;
        flex: 1;
    }
`

export const SearchButton = styled.button`
    padding: 12px 20px;
    background: #6C63FF;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 18px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: #5a52d5;
    }
`

export const WriteButton = styled.button`
    padding: 12px 24px;
    background: #4ECDC4;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;

    &:hover {
        background: #45b8b0;
        transform: translateY(-2px);
    }

    @media (max-width: 768px) {
        width: 100%;
    }
`

export const DiaryGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`

export const DiaryCard = styled.div`
    background: #ffffff;
    padding: 24px;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(0, 0, 0, 0.06);
    border: 1px solid #f0f0f0; 
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-6px) scale(1.02);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12), 0 12px 36px rgba(0, 0, 0, 0.08);
        background: #f9f9ff; 
    }
    @media (max-width: 768px) {
        padding: 20px;
    }
`

export const DiaryDate = styled.div`
    font-size: 14px;
    color: #7F8C8D;
    margin-bottom: 12px;
`

export const DiaryEmotion = styled.div`
    font-size: 32px;
    margin-bottom: 16px;
`

export const DiaryContent = styled.p`
    font-size: 16px;
    color: #2C3E50;
    line-height: 1.6;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
`

export const EmptyState = styled.div`
    text-align: center;
    padding: 80px 20px;
    color: #7F8C8D;

    div {
        font-size: 64px;
        margin-bottom: 20px;
    }

    h3 {
        font-size: 24px;
        margin-bottom: 12px;
        color: #2C3E50;
    }

    p {
        font-size: 16px;
        margin-bottom: 24px;
    }

    button {
        padding: 12px 32px;
        background: #6C63FF;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
            background: #5a52d5;
            transform: translateY(-2px);
        }
    }
`

export const LoginPrompt = styled.div`
    text-align: center;
    padding: 100px 20px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

    h2 {
        font-size: 32px;
        color: #2C3E50;
        margin-bottom: 16px;
    }

    p {
        font-size: 18px;
        color: #7F8C8D;
        margin-bottom: 32px;
    }

    button {
        padding: 14px 40px;
        background: #6C63FF;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 18px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
            background: #5a52d5;
            transform: translateY(-2px);
        }
    }
`
