import { Table, Flex, Typography, Input, Button } from 'antd';
import { dataCase } from '@/mock/Datasource';

const { Title } = Typography;
const { Search } = Input;

function Cases() {
  const columns = [
    {
      title: 'Case Number',
      dataIndex: 'caseNumber',
      key: 'caseNumber',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Date Submitted',
      dataIndex: 'dateSubmitted',
      key: 'dateSubmitted',
    },
    {
      title: 'Driver Name',
      dataIndex: 'driverName',
      key: 'driverName',
    },
    {
      title: 'Vehicle Registration',
      dataIndex: 'vehicleRegistration',
      key: 'vehicleRegistration',
    },
    {
      title: 'Vehicle Make and Model',
      dataIndex: 'vehicleMakeModel',
      key: 'vehicleMakeModel',
    },
    {
      title: 'New Vehicle',
      dataIndex: 'newVehicle',
      key: 'newVehicle',
      render: (newVehicle) => (newVehicle ? 'True' : 'False'),
    },
    {
      title: 'Date of Last Edit',
      dataIndex: 'dateLastEdit',
      key: 'dateLastEdit',
    },
    {
      title: 'Case Flag',
      dataIndex: 'caseFlag',
      key: 'caseFlag',
    },
    {
      dataIndex: 'caseFlag',
      key: 'caseFlag',
      render: () => <Button>View</Button>,
    },
  ];
  return (
    <Flex style={{}} justify='center' vertical>
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
      <Flex></Flex>
      <Flex justify='center'>
        <Table
          style={{ width: '98%' }}
          dataSource={dataCase}
          columns={columns}
          pagination={{ pageSize: 10, position: ['bottomCenter'] }}
          scroll={{ y: 450 }}
        />
      </Flex>
    </Flex>
  );
}

export default Cases;
