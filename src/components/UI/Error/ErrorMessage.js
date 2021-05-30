import React from 'react'

export default function ErrorMessage() {
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '0.7rem'}}>
            <i className="fas fa-exclamation-circle text-danger"></i>
            <p className='txt-center'>.אירעה שגיאה. רענן את הדף או נסה שוב בעוד כמה דקות</p>
        </div>
    )
}
