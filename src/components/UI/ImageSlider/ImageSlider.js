import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';

export default class ImageSlider extends Component {
  state = {
    images: [
      {
        original: require('../../../assets/images/slide/icecream2.jpg'),
      },
      {
        original: require('../../../assets/images/slide/waffle.jpg'),
      },
      {
        original: require('../../../assets/images/slide/icecream1.jpg'),
      },
      {
        original: require('../../../assets/images/slide/icecream4.jpg'),
      },
      {
        original: require('../../../assets/images/slide/yogurt.jpg'),
      },
      {
        original: require('../../../assets/images/slide/waffle2.jpg'),
      },
    ],
  };
  render() {
    return (
      <ImageGallery
        items={this.state.images}
        autoPlay={true}
        showFullscreenButton={false}
        isRTL={true}
        showThumbnails={false}
        showBullets={true}
        slideInterval={4000}
        slideDuration={550}
      />
    );
  }
}
