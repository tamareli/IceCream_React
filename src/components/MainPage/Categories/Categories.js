import React from 'react';
import Category from './Category/Category';

export default function Categories(props) {
  const state = {
    selected: [
      { type: 'Belgian-Waffels', description: 'jfijvitfipe' },
      { type: 'Ice-Creams', description: 'jfijivjtjfipe' },
      { type: 'Yogurte', description: 'nggt' },
    ],
  };

  return (
    <>
      {state.selected.map((mainpage) => {
        return (
          <button>
            {' '}
            <Category
              type={mainpage.type}
              description={mainpage.description}
            />{' '}
          </button>
        );
      })}
    </>
  );
}
