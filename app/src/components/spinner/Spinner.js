import React from 'react'

const Spinner = ({style,text}) => {

    return (
        <div style={{height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', ...style}}>
            <em>{text || "Loading..."}</em>
        </div>
    )
}

export default Spinner;
