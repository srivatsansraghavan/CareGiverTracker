import React from 'react';
import ReactDOM from 'react-dom';
import InventoryTracker from './InventoryTracker';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<InventoryTracker />, div);
  ReactDOM.unmountComponentAtNode(div);
});