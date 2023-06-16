import React from 'react';
import ReactDOM from 'react-dom';
import ExcretionTracker from './ExcretionTracker';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ExcretionTracker />, div);
  ReactDOM.unmountComponentAtNode(div);
});