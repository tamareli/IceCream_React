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
    <div className='container'>
      <h3>{categoryName}</h3>
      <p className='bold'>
        {`מחיר ליחידה: ${price}`}
        <span style={{ padding: 0, margin: 0 }}>&#8362;</span>
      </p>
      <div className='row'>{controls}</div>
    </div>
  );
}
