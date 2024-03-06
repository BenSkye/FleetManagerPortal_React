import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Outlet, Link } from 'react-router-dom';
import { Layout, Menu, theme, Image } from 'antd';
import { BsFillMenuButtonWideFill } from 'react-icons/bs';
import { IoFolderOutline } from 'react-icons/io5';
import { LuBus } from 'react-icons/lu';
import { CiUser, CiSettings } from 'react-icons/ci';
import { FiActivity } from 'react-icons/fi';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import '@/components/layout/components/SearchBar';
import '@/components/layout/styles.css';
import SearchBar from './components/SearchBar';

const menuItems = [
  {
    key: '1',
    icon: <BsFillMenuButtonWideFill />,
    label: 'Home',
    path: '/',
  },
  { key: '2', icon: <IoFolderOutline />, label: 'Cases', path: '/cases' },
  { key: '3', icon: <LuBus />, label: 'Vehicles', path: '/vehicles' },
  { key: '4', icon: <CiUser />, label: 'Drivers', path: '/drivers' },
  { key: '5', icon: <FiActivity />, label: 'Activity', path: '/activity' },
  {
    key: '6',
    icon: <HiOutlineDocumentReport />,
    label: 'Reports',
    path: '/reports',
  },
  { key: '7', icon: <CiSettings />, label: 'Admin', path: '/admin' },
];

const { Content, Sider } = Layout;

const LayoutMain = () => {
  const {
    token: { colorBgLayout },
  } = theme.useToken();

  const [selectedKey, setSelectedKey] = useState('1');
  const location = useLocation();
  useEffect(() => {
    // Lấy đường dẫn hiện tại từ useLocation và tìm kiếm nó trong menuItems
    const selectedItem = menuItems.find(
      (item) => item.path === location.pathname
    );
    if (selectedItem) {
      setSelectedKey(selectedItem.key); // Nếu tìm thấy, đặt selectedKey tương ứng
    }
  }, [location.pathname]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint='lg' collapsedWidth='0'>
        <Image width={200} src='logo.png' style={{ margin: '30px 0' }} />
        <Menu theme='dark' mode='inline' selectedKeys={[selectedKey]}>
          {menuItems.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.path}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout style={{ background: colorBgLayout }}>
        <Content>
          <SearchBar />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutMain;
