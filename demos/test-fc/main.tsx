import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

function App() {
	const [count, setCount] = useState(0);
	window.setCount = setCount;
	return count === 3 ? <Child /> : <div>{count}</div>;
}

function Child() {
  return <span><p>mini-react</p></span>;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<App />
);
