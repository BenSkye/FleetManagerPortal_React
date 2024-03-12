import React, { useState } from 'react';
import {
  Table,
  Flex,
  Typography,
  Input,
  Button,
  DatePicker,
  Select,
  Tag,
  AutoComplete,
} from 'antd';
import { FaFlag } from 'react-icons/fa';
import { dataCase } from '@/mock/DataCases';
import { sortAlphanumeric, sortDateNewst, sortAlphabet } from '@/utils/Sort';

const { RangePicker } = DatePicker;
const { Title } = Typography;
const { Search } = Input;

function Cases() {
  const [filteredInfo, setFilteredInfo] = useState({});
  const handleChange = (_pagination, filters) => {
    setFilteredInfo(filters);
  };

  const handleSelectFilterStatus = (value) => {
    const filters = { ...filteredInfo };
    filters.status = [value];
    setFilteredInfo(filters);
  };

  const handleRangePickerChange = (dates) => {
    const filters = { ...filteredInfo };
    filters.dateSubmitted = dates;
    setFilteredInfo(filters);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const columns = [
    {
      title: 'Case ID',
      dataIndex: 'caseId',
      key: 'caseId',
    },
    {
      title: 'Date Submitted',
      dataIndex: 'dateSubmitted',
      key: 'dateSubmitted',
      sorter: sortDateNewst('dateSubmitted'),
      filteredValue: filteredInfo.dateSubmitted || null, // Giá trị filter
      onFilter: (_value, record) => {
        const { dateSubmitted } = record;
        const [startDate, endDate] = filteredInfo.dateSubmitted || [];

        if (startDate && endDate) {
          const currentDate = new Date(dateSubmitted);
          const start = new Date(startDate);
          const end = new Date(endDate);

          if (currentDate >= start && currentDate <= end) {
            return true;
          }

          return false;
        }

        return true;
      },
    },
    {
      title: 'Date of Last Edit',
      dataIndex: 'dateLastEdit',
      key: 'dateLastEdit',
      sorter: sortDateNewst('dateLastEdit'),
    },
    {
      title: 'Driver Name',
      dataIndex: 'driverName',
      key: 'driverName',
      sorter: sortAlphabet('driverName'),
    },
    {
      title: 'Vehicle Registration',
      dataIndex: 'vehicleRegistration',
      key: 'vehicleRegistration',
      sorter: sortAlphanumeric('vehicleRegistration'),
    },
    {
      title: 'Make',
      dataIndex: 'vehicleMakeModel',
      key: 'vehicleMakeModel',
      sorter: sortAlphabet('vehicleMakeModel'),
    },
    {
      title: 'Model',
      dataIndex: 'vehicleModel',
      key: 'vehicleModel',
      sorter: sortAlphabet('vehicleModel'),
    },
    {
      title: 'Case Flag',
      dataIndex: 'caseFlag',
      key: 'caseFlag',
      render: (caseFlag) => {
        switch (caseFlag) {
          case 'green':
            return <FaFlag color='green' />;
          case 'blue':
            return <FaFlag color='blue' />;
          case 'yellow':
            return <FaFlag color='yellow' />;
          case 'red':
            return <FaFlag color='red' />;
          case 'black':
            return <FaFlag color='black' />;
          default:
            console.log('Invalid value');
        }
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        switch (status) {
          case 'Submitted':
            return <Tag color='green'>Submitted</Tag>;
          case 'Not submitted':
            return <Tag color='warning'>Not submitted</Tag>;
          case 'Closed':
            return <Tag color='gray'>Closed</Tag>;
          case 'Processing':
            return <Tag color='blue'>Processing</Tag>;
          default:
            console.log('Invalid value');
        }
      },
      sorter: sortAlphabet('status'),
      filters: [
        {
          text: 'All',
          value: 'All',
        },
        {
          text: 'Submitted',
          value: 'Submitted',
        },
        {
          text: 'Not submitted',
          value: 'Not submitted',
        },
        {
          text: 'Processing',
          value: 'Processing',
        },
        {
          text: 'Closed',
          value: 'Closed',
        },
      ],
      filteredValue: filteredInfo.status || null,
      onFilter: (value, record) => {
        if (value === 'All') {
          return true; //
        } else {
          return record.status.includes(value);
        }
      },
    },
    {
      dataIndex: '',
      key: '',
      render: () => <Button>View</Button>,
    },
  ];

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
    <Flex
      justify='center'
      vertical
      style={{ backgroundColor: 'white', margin: '0 0.5rem', borderRadius: 10 }}
    >
      <Flex
        justify='space-between'
        align='center'
        style={{ padding: '0.5rem' }}
      >
        <Title level={2} style={{ margin: 5 }}>
          Cases
        </Title>
        <AutoComplete options={options} onSearch={handleSearch}>
          <Input.Search
            placeholder='Search case number / reg / data etc'
            allowClear
            style={{ width: 350 }}
            enterButton
          />
        </AutoComplete>
      </Flex>
      <Flex
        style={{ height: 50, padding: '0 1rem' }}
        justify='start'
        gap='middle'
      >
        <RangePicker
          style={{ height: '2rem' }}
          onChange={handleRangePickerChange}
        />
        <Select
          style={{ width: 120, height: '2rem' }}
          onChange={handleSelectFilterStatus}
          options={[
            { value: 'All', label: 'All' },
            { value: 'Submitted', label: 'Submitted' },
            { value: 'Not submitted', label: 'Not submitted' },
            { value: 'Processing', label: 'Processing' },
            { value: 'Closed', label: 'Closed' },
          ]}
          defaultValue='All'
        />
        <Button onClick={clearFilters}>Clear filters</Button>
      </Flex>
      <Flex justify='center'>
        <Table
          style={{ width: '98%' }}
          dataSource={dataCase}
          columns={columns}
          pagination={{ pageSize: 10, position: ['bottomCenter'] }}
          scroll={{ y: 400 }}
          onChange={handleChange}
        />
      </Flex>
    </Flex>
  );
}

export default Cases;
