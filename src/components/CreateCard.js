// import React, { useState } from 'react'
// import styled from "styled-components";
// import { Icon, Card, Button} from "@material-ui/core";
// import Textarea from "react-textarea-autosize";

// // const Container = styled.div`
// //     width: 284px;
// //     margin-bottom: 8px;
// //     `;

// // const StyledCard = styled(Card)`
// //     min-height: 85px;
// //     padding: 6px 8px 2px;
// // `;

// // const StyledTextArea = styled(Textarea)`
// //     resize: none;
// //     width: 100%;
// //     overflow: hidden;
// //     outline: none;
// //     border: none;
// // `;


// // const ButtonContainer = styled.div`
// //     margin-top: 8px;
// //     display: flex;
// //     align-items: center;
// //     margin-left: 8px;
// // `;

// // const StyledIcon = styled(Icon)`
// //     margin-left: 8px;
// //     cursor: pointer;
// // `;

// const CreateCard = ( { listID, handleAddList, handleAddTask } ) => {

//     const OpenFormButton = styled.div`
//     display: flex;
//     align-items: center;
//     cursor: pointer;
//     border-radius: 3px;
//     height: 36px;
//     margin-left: 8px;
//     width: 300px;
//     padding-left: 10px;
//     padding-right: 10px;
//     opacity: ${buttonTextOpacity};
//     color: ${buttonTextColor};
//     background-color: ${buttonTextBackground};
// `;

//     const [text, setText] = useState('')
//     /// if this fucks up switch it all to title instead of text // i think it shouldn't matter though. 
//     const [formOpen, setFormOpen] = useState(false)

//     const handleChange = (event) => {
//         setText(event.target.value)
//     }


//     const handleOpenForm = () => {
//         setFormOpen(true)
//     }

//     const handleCloseForm = () => {
//         setFormOpen(false)
//     }

//     const renderOpenFormButton = () => {
//         // it will recieve 1 prop to determine if it should render a list button or a card button 

//         const buttonText = listID ? "Add another list" : "Add a card"
//         const buttonTextOpacity = listID ? 1 : 0.5
//         const buttonTextColor = listID ? "white" : "inherit"
//         const buttonTextBackground = listID ? "rgba(0,0,0,.15)" : "inherit"


//         return (
//             <OpenFormButton  onClick={handleOpenForm} >
//                 <Icon>add</Icon>
//                 <p style={{ flexShrink: 0 }}>{buttonText}</p>
//             </OpenFormButton>
//         )
//     }

//     return formOpen ? (
//             <Form  >

//             </Form>
            
    
//     ) : (
//             {renderOpenFormButton}
//     )
        
// }



// export default CreateCard
