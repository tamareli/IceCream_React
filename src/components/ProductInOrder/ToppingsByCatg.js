import classes from '../../css/ToppingsByCatg.module.css';
import React from 'react';
import BuildControl from './BuildControls/BuildControl/BuildControl';

export default function ToppingsByCatg(props) {
  const categoryId = Object.keys(props.categoryForToppings)[0];
  const price = props.categoryForToppings[categoryId][0].price;
  const categoryName = props.toppingsCatgs.find(
    (x) => x.categoryId === parseInt(categoryId)
  ).categoryName;
  let controls = props.categoryForToppings[categoryId].map((topping) => {
    return (
      <BuildControl
        key={topping.toppingId}
        title={topping.toppingName}
        addClicked={() => props.addTopping(topping.toppingId, categoryId)}
        removeClicked={() => props.removeTopping(topping.toppingId, categoryId)}
        image={topping.image}
        amount={props.toppings[topping.toppingId].amount}
      />
    );
  });
  return (
    <div className={classes.Container}>
      <h3>{categoryName}</h3>
      <p className='bold'>
        {`מחיר ליחידה: ${price}`}
        <span style={{ float: 'left', padding: 0, margin: 0 }}>&#8362;</span>
      </p>

      <div className={classes.Controls}>{controls}</div>
    </div>
  );
}
