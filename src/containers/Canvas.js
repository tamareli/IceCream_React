import React, { Component } from 'react';

class Canvas extends Component {
  state = {
    canvas: null,
    ctx: null,
    imgWidth: 150,
    imgHeight: 100,
    paddingLeft: 50,
    paddingRight: 30,
    paddingTop: 100,
    paddingBottom: 100,
  };
  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    this.setState({ canvas: canvas, ctx: ctx });
  }
  componentDidUpdate() {
    const {
      imgWidth,
      imgHeight,
      paddingLeft,
      paddingRight,
      paddingTop,
      paddingBottom,
    } = this.state;
    if (this.props.toppings !== null) {
      const context = this.state.ctx;
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      let array = new Array();
      for (let index = 0; index <= this.props.toppings.length; ) {
        for (
          let i = context.canvas.height - (paddingBottom + imgHeight);
          i > paddingTop;
          i -= imgHeight
        ) {
          for (
            let j = paddingLeft;
            j <= context.canvas.width - (paddingRight + imgWidth + 100);
            j += 130
          ) {
            if (index === 3) {
              j += 65;
            }
            array.push({ x: j, y: i });
            index++;
          }
        }
      }
      this.props.toppings.map((top, i) => {
        const img = this.refs[top.reference];
        if (!img.complete) {
          img.onload = () => {
            context.drawImage(img, array[i].x, array[i].y, 150, 100);
          };
        } else {
          context.drawImage(img, array[i].x, array[i].y, 150, 100);
        }
      });
    }
  }

  render() {
    return (
      <div>
        <div
          style={{
            width: '500px',
            height: '400px',
            backgroundImage: 'url(' + this.props.productImagePath + ')',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <canvas ref='canvas' width={600} height={480} />
          {this.props.toppings !== null
            ? this.props.toppings.map((top) => {
                return (
                  <img
                    key={top.key}
                    ref={top.reference}
                    src={top.image}
                    className='hidden'
                  ></img>
                );
              })
            : null}
        </div>
      </div>
    );
  }
}

export default Canvas;
