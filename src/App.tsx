import React from 'react';
import './App.css';
import { LayoutDefault } from 'layout';

function App() {
  return (
    <LayoutDefault>
      <div className="h-[1000px]">
        <h1 className="text-red-600 underline">Hello</h1>
      </div>
    </LayoutDefault>
  );
}

export default App;
