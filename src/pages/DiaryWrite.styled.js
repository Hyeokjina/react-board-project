import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    padding: 20px;
`

export const FormCard = styled.div`
    background: white;
    padding: 48px;
    border-radius: 16px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 600px;

    @media (max-width: 768px) {
        padding: 32px 24px;
    }
`

export const Title = styled.h1`
    font-size: 32px;
    font-weight: 700;
    color: #2C3E50;
    margin-bottom: 16px;
    text-align: center;
`

export const DateDisplay = styled.div`
    text-align: center;
    font-size: 18px;
    color: #7F8C8D;
    margin-bottom: 32px;
    font-weight: 500;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 32px;
`

export const EmotionPicker = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;

    > div {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 12px;

        @media (max-width: 768px) {
            grid-template-columns: repeat(2, 1fr);
        }
    }
`

export const EmotionButton = styled.button`
    padding: 16px;
    border: 3px solid ${props => props.active ? '#6C63FF' : '#E0E0E0'};
    background: ${props => props.active ? '#F0EFFF' : 'white'};
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;

    .emoji {
        font-size: 32px;
    }

    .label {
        font-size: 14px;
        font-weight: 600;
        color: ${props => props.active ? '#6C63FF' : '#7F8C8D'};
    }

    &:hover {
        border-color: #6C63FF;
        transform: translateY(-2px);
    }
`

export const TextareaGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`

export const Label = styled.label`
    font-size: 16px;
    font-weight: 600;
    color: #2C3E50;
`

export const Textarea = styled.textarea`
    padding: 16px;
    border: 2px solid #E0E0E0;
    border-radius: 12px;
    font-size: 16px;
    font-family: 'Noto Sans KR', sans-serif;
    resize: vertical;
    min-height: 120px;
    transition: all 0.2s;
    line-height: 1.6;

    &:focus {
        outline: none;
        border-color: #6C63FF;
    }

    &::placeholder {
        color: #B0B0B0;
    }
`

export const ButtonGroup = styled.div`
    display: flex;
    gap: 12px;
    margin-top: 8px;
`

export const CancelButton = styled.button`
    flex: 1;
    padding: 14px;
    background: #E0E0E0;
    color: #2C3E50;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: #D0D0D0;
    }
`

export const SubmitButton = styled.button`
    flex: 2;
    padding: 14px;
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

    &:active {
        transform: translateY(0);
    }
`

export const ErrorMessage = styled.div`
    padding: 12px;
    background: #FFE5E5;
    color: #D32F2F;
    border-radius: 8px;
    font-size: 14px;
    text-align: center;
`
