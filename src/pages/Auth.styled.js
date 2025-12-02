import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 144px);
`

export const FormCard = styled.div`
    background: white;
    padding: 48px;
    border-radius: 16px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
`

export const Title = styled.h1`
    font-size: 32px;
    font-weight: 700;
    color: #2C3E50;
    margin-bottom: 32px;
    text-align: center;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`

export const Label = styled.label`
    font-size: 14px;
    font-weight: 600;
    color: #2C3E50;
`

export const Input = styled.input`
    padding: 12px 16px;
    border: 2px solid #E0E0E0;
    border-radius: 8px;
    font-size: 16px;
    transition: all 0.2s;

    &:focus {
        outline: none;
        border-color: #6C63FF;
    }

    &::placeholder {
        color: #B0B0B0;
    }
`

export const Button = styled.button`
    padding: 14px;
    background: #6C63FF;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    margin-top: 8px;

    &:hover {
        background: #5a52d5;
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(0);
    }
`

export const LinkText = styled.p`
    text-align: center;
    margin-top: 24px;
    color: #7F8C8D;
    font-size: 14px;

    span {
        color: #6C63FF;
        font-weight: 600;
        cursor: pointer;

        &:hover {
            text-decoration: underline;
        }
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

export const SuccessMessage = styled.div`
    padding: 12px;
    background: #E8F5E9;
    color: #388E3C;
    border-radius: 8px;
    font-size: 14px;
    text-align: center;
`
