import React from 'react'

const Spinner = ({style}) => {

    return (
        <div style={{height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', ...style}}>
            <em>Loading...</em>
        </div>
    )
}

export default Spinner;
