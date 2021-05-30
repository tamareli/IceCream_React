import React from 'react'
import OutsideTopping from './OutsideTopping';
import classes from '../../css/OutsideToppings.module.css';

export default function OutsideToppings(props) {
    return ( 
    <div className={classes.Container}>
        {props.toppings.map(top => 
            <OutsideTopping key = {top.key} image = {top.image} />)}
    </div>
    ) 
}
