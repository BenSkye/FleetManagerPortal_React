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
} from 'antd';
import moment from 'moment';
import { FaFlag } from 'react-icons/fa';
import { dataCase } from '@/mock/DataCases';
import { sortAlphanumeric, sortDateNewst, sortAlphabet } from '@/utils/Sort';

const { RangePicker } = DatePicker;
const { Title } = Typography;
const { Search } = Input;

function Cases() {
  const [filteredInfo, setFilteredInfo] = useState({});

  const handleChange = (pagination, filters) => {
    setFilteredInfo(filters);
  };

  const handleSelectFilterStatus = (value) => {
    const filters = { ...filteredInfo };
    filters.status = [value];
    setFilteredInfo(filters);
  };

  const handlePickDate = (dates) => {
    const filters = { ...filteredInfo };
    if (dates && dates.length === 2) {
      filters.dateSubmitted = [
        dates[0].format('YYYY-MM-DD'),
        dates[1].format('YYYY-MM-DD'),
      ];
    } else {
      filters.dateSubmitted = [];
    }
    setFilteredInfo(filters);
    console.log(dates);
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
      filteredValue: filteredInfo.dateSubmitted || null,
      onFilter: (value, record) => {
        if (!value || !value.length) return true; // Nếu không có giá trị hoặc giá trị rỗng, trả về true cho tất cả các bản ghi
        const [startDate, endDate] = value;
        const submittedDate = moment(record.dateSubmitted);
        return submittedDate.isBetween(startDate, endDate, null, '[]'); // Kiểm tra xem ngày đã nộp có nằm trong khoảng ngày lọc hay không
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
      onFilter: (value, record) => record.status.includes(value),
    },
    {
      dataIndex: '',
      key: '',
      render: () => <Button>View</Button>,
    },
  ];

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
        <Search
          placeholder='Search case number / reg / data etc'
          allowClear
          //   onSearch={}
          style={{
            width: 350,
          }}
        />
      </Flex>
      <Flex
        style={{ height: 50, padding: '0 1rem' }}
        justify='start'
        gap='middle'
      >
        <RangePicker style={{ height: '2rem' }} onChange={handlePickDate} />
        <Select
          placeholder='Filter status'
          style={{ width: 120, height: '2rem' }}
          onChange={handleSelectFilterStatus}
          allowClear
          options={[
            { value: 'Not submitted', label: 'Not submitted' },
            { value: 'Submitted', label: 'Submitted' },
            { value: 'Processing', label: 'Processing' },
            { value: 'Closed', label: 'Closed' },
          ]}
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
