import React from 'react';

const App = ({ list }) => {
  return (list ?? [])?.map((item) => <img src={item.image} alt={item.title} width={100} height={100} />);
};

export default App;
