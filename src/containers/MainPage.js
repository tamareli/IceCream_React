import React, { Component } from 'react';
import Categories from '../components/Categories/Categories';
import classes from '../css/MainPage.module.css';
import { connect } from 'react-redux';
import * as generalActions from '../store/actions/general';
import { Link } from 'react-router-dom';
import ImageSlider from '../components/UI/ImageSlider/ImageSlider';
import Logo from '../components/Logo/BigLogo';

export class MainPage extends Component {
  componentDidMount() {
    this.props.getCategories();
  }
  render() {
    const icecream = require('../assets/images/icecream.jpg');
    const yogurt = require('../assets/images/yogurt.jpg');
    const waffle = require('../assets/images/waffle.jpg');

    return (
      <div className={['container', classes.MainPage].join(' ')}>
        <div className={[classes.ImageContainer, 'col-md-12'].join(' ')}>
          <div className={[classes.Title, 'col-md-4'].join(' ')}>
            <Logo />
            <p>Your Dream Cream</p>
            <Link to='./products'>
              <button className={classes.BgButton}>הזמן עכשיו</button>
            </Link>
          </div>
          <ImageSlider />{' '}
        </div>{' '}
        <div className={classes.Header}>
          <h1>מי אנחנו</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum natus
            qui nulla maiores. Velit quas, mollitia distinctio recusandae
            exercitationem rem reiciendis non perspiciatis qui voluptates
            consequatur? Autem, reiciendis amet! Eligendi.
          </p>
          <Link to='/AboutUs'>
            <button className={classes.Button}>קרא עוד</button>
          </Link>
        </div>
        <h1
          style={{
            textAlign: 'center',
            paddingTop: '5rem',
            paddingBottom: '2rem',
          }}
        >
          מה אנחנו מציעים
        </h1>
        <div className='row'>
          <div className='col-md-2'></div>
          <div className='col-md-8'>
            <div
              className={['col-md-12 row-reverse', classes.Container].join(' ')}
            >
              <div className={[classes.Item, 'col-md-6'].join(' ')}>
                <div
                  className={[classes.Ilu].join(' ')}
                  style={{ backgroundImage: `url(${waffle})` }}
                ></div>
                <p>טעם ייחודי רק לנו</p>
              </div>
              <div className={[classes.Item, 'col-md-6'].join(' ')}>
                <div
                  className={[classes.Ilu].join(' ')}
                  style={{ backgroundImage: `url(${yogurt})` }}
                ></div>
                <p>רכיבים טבעיים ואיכותיים</p>
              </div>
            </div>
            <div className={['col-md-12 row', classes.Container].join(' ')}>
              <div className={[classes.Item, 'col-md-12'].join(' ')}>
                <div
                  className={[classes.Ilu].join(' ')}
                  style={{ backgroundImage: `url(${icecream})` }}
                ></div>
                <p>שירות מהיר ואנושי</p>
              </div>
            </div>
          </div>
          <div className='col-md-2'></div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    categories: state.general.categories,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: () => {
      dispatch(generalActions.initCategories());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
