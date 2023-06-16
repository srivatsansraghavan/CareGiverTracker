import React from 'react';
import ReactDOM from 'react-dom';
import MedicationTracker from './MedicationTracker';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MedicationTracker />, div);
  ReactDOM.unmountComponentAtNode(div);
});