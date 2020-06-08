import React from "react";
import styled from "styled-components";
import Icon from "@material-ui/core/Icon";
import Textarea from "react-textarea-autosize";
import Card from "@material-ui/core/Card";

const Container = styled.div`
    width: 284px;
    margin-bottom: 8px;
    `;

const StyledCard = styled(Card)`
    min-height: 85px;
    padding: 6px 8px 2px;
`;

const StyledTextArea = styled(Textarea)`
    resize: none;
    width: 100%;
    overflow: hidden;
    outline: none;
    border: none;
`;

const ButtonContainer = styled.div`
    margin-top: 8px;
    display: flex;
    align-items: center;
    margin-left: 8px;
`;

const StyledIcon = styled(Icon)`
    margin-left: 8px;
    cursor: pointer;
`;

const renderForm = () => {
        const placeholder = listID ? "Enter list title..." : "Enter task for this card..."

        const buttonTitle = listID ? "Add List" : "Add Card"

        return <div>
            <Card style={{
                minHeight: 80,
                minWidth: 272,
                padding: "6px 8px 2px"
            }} >
                <TextArea 
                    placeholder={placeholder}
                    autoFocus
                    onBlur={closeForm}
                    value={text}
                    onChange={handleChange}
                />
            </Card>
            
        </div>
    }
