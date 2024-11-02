import React from 'react';

const App = ({ list }) => {
  return (list ?? [])?.map((item) => <div>{item.title}</div>);
};

export default App;
