import React from 'react'

export default function FormErrorMessage() {
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '0.7rem'}}>
            <i className="fas fa-exclamation-circle text-danger"></i>
            <p className='txt-center'>.אירעה שגיאה בשליחת הטופס. רענן את הדף ונסה שוב בעוד כמה דקות</p>
        </div>
    )
}
