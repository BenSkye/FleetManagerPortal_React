import React from 'react';
import { Input, Select, Flex } from 'antd';

const options = [
  {
    value: 'Fleet name 1',
    label: 'Fleet name 1',
  },
  {
    value: 'Fleet name 2',
    label: 'Fleet name 2',
  },
  {
    value: 'Fleet name 3',
    label: 'Fleet name 3',
  },
];

const boxStyle = {
  width: '100%',
  height: 50,
  padding: '0 0.5rem',
};

const SearchBar = ({ onSearch }) => {
  const handleChange = (value) => {};

  return (
    <Flex style={boxStyle} justify='space-between' align='center'>
      <Input.Search
        placeholder='Search case number / reg / data etc'
        allowClear
        onSearch={onSearch}
        style={{
          width: 350,
        }}
      />
      <Select
        defaultValue={options[0]}
        style={{
          width: 140,
        }}
        onChange={handleChange}
        options={options}
      />
    </Flex>
  );
};

export default SearchBar;
