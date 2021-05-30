import classes from '../../css/OutsideTopping.module.css'
import React from 'react'

export default function OutsideTopping(props) {
    return (
        <img className={classes.Image} src = {props.image} alt=''></img>
    )
}

