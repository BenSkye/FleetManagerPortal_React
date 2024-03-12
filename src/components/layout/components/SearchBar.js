import React, { useState } from 'react';
import { Input, Select, Flex, AutoComplete } from 'antd';
import { dataCase } from '@/mock/DataCases';

const optionsFleet = [
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
  const [options, setOptions] = useState([]);
  const handleSearch = (value) => {
    const filteredOptions = dataCase.filter(
      (item) =>
        item.driverName.toLowerCase().includes(value.toLowerCase()) ||
        item.caseId.toLowerCase().includes(value.toLowerCase()) ||
        item.vehicleRegistration.toLowerCase().includes(value.toLowerCase())
    );

    const options = filteredOptions.map((item) => ({
      value: item.caseId,
      label: (
        <div>
          <div>{item.caseId}</div>
          <div>{item.driverName}</div>
          <div>{item.vehicleRegistration}</div>
        </div>
      ),
    }));

    setOptions(options);
  };

  return (
    <Flex style={boxStyle} justify='space-between' align='center'>
      <AutoComplete options={options} onSearch={handleSearch}>
        <Input.Search
          placeholder='Search case number / reg / data etc'
          allowClear
          style={{ width: 350 }}
          enterButton
        />
      </AutoComplete>
      <Select
        defaultValue='Fleet name 1'
        style={{
          width: 140,
        }}
        options={optionsFleet}
      />
    </Flex>
  );
};

export default SearchBar;
