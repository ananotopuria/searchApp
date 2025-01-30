import { Component } from 'react';

interface CardProps {
  name: string;
}

class Card extends Component<CardProps> {
  render() {
    return (
      <div className="card">
        <h3>{this.props.name}</h3>
      </div>
    );
  }
}

export default Card;
