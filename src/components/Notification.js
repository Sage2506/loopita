import React from 'react'
import Alert from 'react-bootstrap/Alert'

export const Notification = ({ show, variant, textAlert }) => {

    

    return (
        <div>
            <Alert 
                variant={variant}
                show={show} 
                transition={true}
            >
               {textAlert}
            </Alert>
        </div>
    )
}
