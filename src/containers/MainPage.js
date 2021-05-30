import React, { Component } from 'react';
import Layout from '../hoc/Layout/Layout';
import classes from '../css/MainPage.module.css';
import { connect } from 'react-redux';
import * as generalActions from '../store/actions/general';
import { Link } from 'react-router-dom';
import ImageSlider from '../components/UI/ImageSlider/ImageSlider';
import Logo from '../components/Logo/BigLogo';
import ErrorBoundary from '../components/ErrorBoundary';


export class MainPage extends Component {
  componentDidMount() {
    this.props.getCategories();
  }
  render() {
    const icecream = require('../assets/images/icecream.jpg');
    const yogurt = require('../assets/images/yogurt.jpg');
    const waffle = require('../assets/images/waffle.jpg');
    const dreamCream = 'Dream Cream';
    return (
      <Layout>
      <div className={['container', classes.MainPage].join(' ')}>
        <div className={[classes.ImageContainer, 'col-md-12'].join(' ')}>
          <div className={[classes.Title, 'col-md-4'].join(' ')}>
            <Logo />
            <p>Your Dream Cream</p>
            <Link to='./products'>
              <button className={classes.BgButton}>הזמן עכשיו</button>
            </Link>
          </div>
          <ErrorBoundary>
            <ImageSlider />
          </ErrorBoundary>
        </div>
        <div className={classes.Header}>
          <h1>מי אנחנו</h1>
          <p> 
          .אצלינו תמצאו גלידה איכותית עם אין סוף של טעמים, צבעים ומרקמים. כל זה תוך שמירה על אותנטיות ואיכות חומרי הגלם המיובאים במיוחד עבורינו<br /> .באתר תוכלו להרגיש את חווית הקניה בגלידריה שלנו ואנו בטוחים שתרצו לבקר בו שוב
          </p>
          <Link to='/AboutUs'>
            <button className={classes.Button}>קרא עוד</button>
          </Link>
        </div>
        <div className={classes.Container}>
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
            <div className='col-lg-6 col-md-12 d-flex justify-content-center'>
              <Link to='/Products'>
                <div className={[classes.Item].join(' ')}>
                  <div
                    className={[classes.Ilu].join(' ')}
                    style={{ backgroundImage: `url(${waffle})` }}
                  ></div>
                  <p>טעם ייחודי רק לנו</p>
                </div>
              </Link>
            </div>
            <div className='col-lg-6 col-md-12 d-flex justify-content-center'>
              <Link to='AboutUs'>
                <div className={[classes.Item].join(' ')}>
                  <div
                    className={[classes.Ilu].join(' ')}
                    style={{ backgroundImage: `url(${yogurt})` }}
                  ></div>
                  <p>רכיבים טבעיים ואיכותיים</p>
                </div>
              </Link>
            </div>

            <div className='col-md-12 d-flex justify-content-center'>
              <Link to='Contact'>
                <div className={[classes.Item].join(' ')}>
                  <div
                    className={[classes.Ilu].join(' ')}
                    style={{ backgroundImage: `url(${icecream})` }}
                  ></div>
                  <p>שירות מהיר ואנושי</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      </Layout>
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
