import './notFound.css';
import { Link } from 'react-router-dom';
import PinkButton from '../../components/UI/Button/PinkButton';
import notFound from '../../assets/images/404-website.png'
import React, { Component } from 'react';
import Layout from '../../hoc/Layout/Layout'

class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Layout>
        <div className='not-found-container'>
          <img src={notFound} alt='not found' />
          <p>הדף לא נמצא</p>
          <Link to='/'>
            <PinkButton text='דף הבית'/>
          </Link>
        </div>
      </Layout>
    );
  }
}

export default NotFound;
