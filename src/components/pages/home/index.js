import { useState } from 'react';
import { Flex, Table, Typography, Select, Tag } from 'antd';
import { Chart } from 'react-google-charts';
import { FaFlag } from 'react-icons/fa';
import { dataSource, dataActivityLog } from '@/mock/Datasource';
import {
  dataSevenLastDay,
  dataCurrMonth,
  dataThisMonth,
} from '@/mock/DataChart';
import '@/components/pages/home/styles.css';

const { Option } = Select;
const { Title } = Typography;

const tableStyles = { width: '50%', padding: '8px' };

const columnsUrgent = [
  {
    title: 'FLAG',
    dataIndex: 'flag',
    key: 'flag',
    render: (flag) =>
      flag ? <FaFlag color='red' /> : <FaFlag color='green' />,
    width: 70,
  },
  {
    title: 'CASE ID',
    dataIndex: 'caseId',
    key: 'caseId',
  },
  {
    title: 'REG NUMBER',
    dataIndex: 'regNumber',
    key: 'regNumber',
  },
  {
    title: 'DATE OF INCIDENT',
    dataIndex: 'dateOfIncident',
    key: 'dateOfIncident',
  },
  {
    title: 'TIME OF INCIDENT',
    dataIndex: 'timeOfIncident',
    key: 'timeOfIncident',
  },
  {
    title: 'DRIVER NAME',
    dataIndex: 'driverName',
    key: 'driverName',
  },
];

const columnsActivityLog = [
  {
    title: 'Timestamp',
    dataIndex: 'timestamp',
    key: 'timestamp',
  },
  {
    title: 'Case ID',
    dataIndex: 'caseId',
    key: 'caseId',
  },
  {
    title: 'User',
    dataIndex: 'user',
    key: 'user',
  },
  {
    title: 'Activity',
    dataIndex: 'activity',
    key: 'activity',
    render: (activity) => {
      switch (activity) {
        case 'Add':
          return <Tag color='green'>Add</Tag>;
        case 'Edit':
          return <Tag color='red'>Edit</Tag>;
        case 'Submit':
          return <Tag color='blue'>Submit</Tag>;
        case 'Logout':
          return <Tag color='gray'>Logout</Tag>;
        default:
          console.log('Invalid value');
      }
    },
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
];

function Home() {
  const [selectedData, setSelectedData] = useState(dataSevenLastDay);

  const handleChange = (value) => {
    switch (value) {
      case 'dataSevenLastDay':
        setSelectedData(dataSevenLastDay);
        break;
      case 'dataCurrMonth':
        setSelectedData(dataCurrMonth);
        break;
      case 'dataThisMonth':
        setSelectedData(dataThisMonth);
        break;
      default:
        setSelectedData(dataSevenLastDay);
    }
  };

  return (
    <>
      <Flex vertical>
        <Flex
          style={{ width: '100%', height: '98%' }}
          align='center'
          justify='space-between'
        >
          <Table
            size='small'
            title={() => (
              <Title level={3} style={{ margin: 5 }}>
                Urgent new cases
              </Title>
            )}
            columns={columnsUrgent}
            dataSource={dataSource}
            pagination={false}
            scroll={{ y: 210 }}
            style={tableStyles}
          />
          <Table
            size='small'
            title={() => (
              <Title level={3} style={{ margin: 5 }}>
                Activity log
              </Title>
            )}
            columns={columnsActivityLog}
            dataSource={dataActivityLog}
            pagination={false}
            scroll={{ y: 233 }}
            style={tableStyles}
          />
        </Flex>
        <Flex
          style={{
            width: '100%',
            padding: '0.1rem',
          }}
          align='end'
          justify='center'
        >
          <Flex
            style={{
              padding: '2.2rem 0.5rem',
              height: '90%',
              width: '99%',
              borderRadius: '10px',
              backgroundColor: 'white',
            }}
            vertical
          >
            <Flex
              style={{ height: '20%' }}
              align='start'
              justify='space-between'
            >
              <div>
                <Title level={3} style={{ margin: 2 }}>
                  Incident Overview
                </Title>
              </div>
              <Select
                defaultValue='dataSevenLastDay'
                style={{ width: 200 }}
                onChange={handleChange}
              >
                <Option value='dataSevenLastDay'>Last 7 days</Option>
                <Option value='dataCurrMonth'>Current Month</Option>
                <Option value='dataThisMonth'>This Year</Option>
              </Select>
            </Flex>
            <Chart
              options={{
                bar: { groupWidth: '25%' },
                colors: ['orange'],
              }}
              chartType='ColumnChart'
              height='80%'
              width='100%'
              data={selectedData}
            />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default Home;
