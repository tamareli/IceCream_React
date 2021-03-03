import classes from '../../css/ToppingsByCatg.module.css';
import React from 'react';
import BuildControl from './BuildControls/BuildControl/BuildControl';

export default function ToppingsByCatg(props) {
  const categoryId = Object.keys(props.categoryForToppings)[0];
  const price = props.categoryForToppings[categoryId][0].price;
  const categoryName = props.toppingsCatgs.find(
    (x) => x.categoryId === parseInt(categoryId)
  ).categoryName;
  let chosen;
  let controls = props.categoryForToppings[categoryId].map((topping) => {
    chosen = false;
    props.toppings.map((top) => {
      if (top.toppingId === topping.toppingId) {
        chosen = true;
      }
    });
    return (
      <BuildControl
        key={topping.toppingId}
        title={topping.toppingName}
        addClicked={() => props.addTopping(topping)}
        removeClicked={() => props.removeTopping(topping)}
        image={topping.image}
        chosen={chosen}
        active={topping.active}
      />
    );
  });
  return (
    <div className='container' style={{ paddingBottom: '2rem' }}>
      <div className={classes.Header}>
        <h3 style={{ paddingBottom: '0' }}>{categoryName}</h3>
        <p className='bold'>
          {`מחיר ליחידה: `}
          <span style={{ padding: 0, margin: 0, fontWeight: '500' }}>
            &#8362;{price}
          </span>
        </p>
      </div>
      <div className='row' style={{ paddingTop: '1.5rem' }}>
        {controls}
      </div>
    </div>
  );
}
