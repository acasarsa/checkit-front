import React, { useState } from 'react'
import TextArea from 'react-textarea-autosize'
import styled from "styled-components";


const StyledTextArea = styled(TextArea)`
    resize: none;
    width: 300px;
    min-height: 50px;
    max-height: 90px;
    overflow: hidden;
    outline: none;
    border: none;
    margin-left: 10px;
    margin-bottom: 10px;
`;



const Notes = () => {
    return (
            <form >
                <h4>Notes:</h4>
                <StyledTextArea
                    // onChange={handleChange}
                    
                    // value={taskText}
                    placeholder="Add Notes..."

                />
            </form>
                
    )
}

export default Notes
