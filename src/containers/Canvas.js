import React, { Component } from 'react';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canvas: null,
      ctx: null,
      right: 0,
      left: 40,
      top: 50,
      bottom: 0,
      imgWidth: 150,
      imgHeight: 100,
      addToBorder: 50,
    };
  }

  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    this.setState({ canvas: canvas, ctx: ctx });
    if (this.props.categoryId === 22) {
      //yogurt
      this.setState({ bottom: ctx.canvas.height - 100 });
      this.setState({ right: ctx.canvas.width - 100 });
    } else {
      if (this.props.categoryId === 20) {
        //icecream
        this.setState({
          bottom: ctx.canvas.height - 200,
          top: 10,
          right: ctx.canvas.width - 100,
          left: 100,
          addToBorder: 10,
          imgHeight: 90,
        });
      } else {
        if (this.props.categoryId === 26) {
          //waffle
          this.setState({
            bottom: ctx.canvas.height - 115,
            top: 60,
            right: ctx.canvas.width - 200,
            left: 80,
            addToBorder: 0,
          });
        }
      }
    }
  }
  componentDidUpdate() {
    const { imgWidth, imgHeight, left, right, top, bottom } = this.state;
    let leftBorder = left;
    let rightBorder = right;
    let margin = 0;
    if (this.props.toppings !== null) {
      const context = this.state.ctx;
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      let toppingsToDraw = new Array();
      for (let index = 0; index <= this.props.toppings.length; ) {
        leftBorder = left;
        rightBorder = right;
        for (let i = bottom - imgHeight; i > top; i -= imgHeight) {
          for (let j = leftBorder; j <= rightBorder - imgWidth; j += imgWidth) {
            toppingsToDraw.push({ x: j + margin, y: i - margin });
            index++;
          }
          leftBorder += this.state.addToBorder;
          rightBorder -= this.state.addToBorder;
        }
        margin += 20;
      }
      this.props.toppings.map((top, i) => {
        const img = this.refs[top.reference];
        if (!img.complete) {
          img.onload = () => {
            context.drawImage(
              img,
              toppingsToDraw[i].x,
              toppingsToDraw[i].y,
              this.state.imgWidth,
              this.state.imgHeight
            );
          };
        } else {
          context.drawImage(
            img,
            toppingsToDraw[i].x,
            toppingsToDraw[i].y,
            this.state.imgWidth,
            this.state.imgHeight
          );
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
                    alt=''
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
