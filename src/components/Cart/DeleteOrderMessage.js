import React from 'react'

export default function DeleteOrderMessage(props) {
    return (
        <div>
            <div>
                <p style={{ textAlign: 'center' }}>ההזמנה תמחק לצמיתות</p>
                <hr />
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <button className='GreenWhiteButton' onClick={props.deleteOrder}>אישור</button>
                <button className='PinkWhiteButton' onClick={props.cancelDelete}>ביטול</button>
            </div>
        </div>
    )
}
