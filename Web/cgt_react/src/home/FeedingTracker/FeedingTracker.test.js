import React from 'react';
import ReactDOM from 'react-dom';
import FeedingTracker from './FeedingTracker';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FeedingTracker />, div);
  ReactDOM.unmountComponentAtNode(div);
});