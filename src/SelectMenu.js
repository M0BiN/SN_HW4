import React from 'react';
import { Select } from 'antd';




const ways = [{
    value: 'k_shell',
    label: 'K-Shell',
    },
    {
    value: 'label_propagation',
    label: 'Label Propagation',
    },
    {
    value: 'infomap',
    label: 'InfoMap',
    },
    {
    value: 'louvain',
    label: 'Louvain',
    },
    {
      value: 'spectral',
      label: 'Spectral Partitioning',
      },
]
const App = ({state, setState}) => {
    
    const handleChange = (value) => {
        setState(value)
      };
    


return (
<Select
    labelInValue
    defaultValue={state}
    size='large'
    placeholder="Select one algorithm..."
    style={{
      width: 200,
    }}
    onChange={handleChange}
    options={ways}
  />
);}
export default App;