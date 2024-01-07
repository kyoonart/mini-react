import React from 'react'
import ReactDOM from 'react-dom/client'

function App() {
  return (
    <div>
      <span>mini-react24</span>
    </div>
  );
};
const root = document.querySelector('#root') as any;
console.log('App', App);
ReactDOM.createRoot(root).render(App);
