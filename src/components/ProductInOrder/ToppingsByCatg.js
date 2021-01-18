import classes from '../../css/ToppingsByCatg.module.css';
import React from 'react';
import BuildControl from './BuildControls/BuildControl/BuildControl';

export default function ToppingsByCatg(props) {
  console.log(props.toppingsCatgs, 'category');
  const categoryId = Object.keys(props.categoryForToppings)[0];
  let controls = props.categoryForToppings[categoryId].map((topping) => {
    return (
      <BuildControl
        key={topping.toppingId}
        title={topping.toppingName}
        addClicked={() => props.addTopping(topping.toppingId, categoryId)}
        removeClicked={() => props.removeTopping(topping.toppingId, categoryId)}
      />
    );
  });
  console.log(categoryId, 'catgId');
  return (
    <div className={classes.Container}>
      <h3>
        {
          props.toppingsCatgs.find((x) => x.categoryId === parseInt(categoryId))
            .categoryName
        }
      </h3>
      <div className={classes.Controls}>{controls}</div>
    </div>
  );
}
