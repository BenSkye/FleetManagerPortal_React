import { useState } from 'react';
import { Flex, Table, Typography, Select } from 'antd';
import { Chart } from 'react-google-charts';
import { FaFlag } from 'react-icons/fa';
import { dataSource } from '@/mock/Datasource';
import '@/components/pages/home/styles.css';

const { Option } = Select;
const { Title } = Typography;

const tableStyles = { width: '50%', padding: '8px' };

const columns = [
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

const dataSevenLastDay = [
  ['Element', 'Case Number'],
  ['27 May', 8],
  ['28 May', 10],
  ['29 May', 2],
  ['30 May', 1],
  ['31 May', 4],
  ['1 June', 19],
  ['Today', 4],
];
const dataCurrMonth = [
  ['Element', 'Case Number'],
  ['27 May', 8],
  ['28 May', 10],
  ['29 May', 2],
  ['30 May', 1],
  ['31 May', 4],
  ['1 June', 19],
  ['27 May', 8],
  ['28 May', 10],
  ['29 May', 2],
  ['30 May', 1],
  ['31 May', 4],
  ['1 June', 19],
  ['27 May', 8],
  ['28 May', 10],
  ['29 May', 2],
  ['30 May', 1],
  ['31 May', 4],
  ['1 June', 19],
  ['27 May', 8],
  ['28 May', 10],
  ['29 May', 2],
  ['30 May', 1],
  ['31 May', 4],
  ['1 June', 19],
  ['1 June', 19],
  ['1 June', 19],
  ['1 June', 19],
  ['1 June', 19],
  ['1 June', 5],
  ['1 June', 9],
  ['1 June', 19],
  ['1 June', 10],
  ['1 June', 19],
  ['1 June', 19],
  ['1 June', 5],
  ['1 June', 19],
  ['1 June', 6],
  ['1 June', 19],
  ['1 June', 7],
  ['1 June', 2],
  ['1 June', 9],
  ['1 June', 8],
  ['1 June', 7],
];
const dataThisMonth = [
  ['Element', 'Case Number'],
  ['27 May', 8],
  ['28 May', 10],
  ['29 May', 2],
  ['30 May', 1],
  ['31 May', 4],
  ['1 June', 19],
  ['1 June', 19],
  ['1 June', 19],
  ['1 June', 19],
  ['1 June', 19],
  ['1 June', 19],
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
            columns={columns}
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
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            scroll={{ y: 210 }}
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
