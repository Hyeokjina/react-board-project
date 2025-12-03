import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    padding: 20px;
`;

export const Card = styled.div`
    background: white;
    padding: 48px;
    border-radius: 16px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px;
`;

export const Title = styled.h1`
    font-size: 32px;
    font-weight: 700;
    color: #2C3E50;
    margin-bottom: 32px;
    text-align: center;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const Label = styled.label`
    font-size: 14px;
    font-weight: 600;
    color: #2C3E50;
`;

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
`;

export const ButtonGroup = styled.div`
    display: flex;
    gap: 12px;
    margin-top: 16px;
`;

export const SaveButton = styled.button`
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
    }
`;

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
`;

export const Divider = styled.hr`
    border: none;
    border-top: 1px solid #E0E0E0;
    margin: 32px 0;
`;

export const DangerZone = styled.div`
    text-align: center;
`;

export const DeleteButton = styled.button`
    padding: 14px 32px;
    background: #E74C3C;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: #c0392b;
    }
`;
