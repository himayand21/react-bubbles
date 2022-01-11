import React from 'react';
import { BubbleContainer, bubble, useInterval } from '../../dist';

import './stories.css';

const Container = () => {
  useInterval(() => {
    bubble.add(Date.now().toString().slice(-2));
  }, 100);

  return (
    <div className="story-container">
      <BubbleContainer />
    </div>
  );
};

export default {
  title: 'Bubbles',
  component: Container,
};

const Template = (args) => <Container {...args} />;

export const Default = Template.bind({});
