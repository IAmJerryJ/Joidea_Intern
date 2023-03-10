import styles from './index.less';
import { Layout, Menu } from 'antd';
import { Link } from 'umi';
import {EditFilled} from '@ant-design/icons';

//Header, Content, Footer组件只能放在Layout父容器中。在这里使用解构，省去了Layout.Header的写法
const { Header, Content, Footer } = Layout;

const menuData = [
  { route: '/hero', name: '英雄' },
  { route: '/item', name: '局内道具' },
  { route: '/summoner', name: '召唤师技能' },
];

//全局布局，umi自动传入props
function BasicLayout(props) {
  //从props中取出当前路由和children
  const {
    location: { pathname },
    children,
  } = props;
  return (
    <Layout>
      <Header>
        <div className={styles.logo}>王者荣耀资料库</div>
        <Menu
          theme="dark"
          mode="horizontal"
          //defaultSelectedKeys参数是string[],参数为pathname，每次刷新后保持当前界面
          defaultSelectedKeys={[pathname]}
          //JSX中js变量使用{},object也使用一个{}
          style={{ lineHeight: '64px' }}
        >
          {/*key指向当前路由*/}
          {menuData.map((menu) => (
            <Menu.Item key={`/${menu.route}`}>
              <Link to={menu.route}>{menu.name}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Umi 入门教程 Created by xiaohuoni
        <EditFilled />
      </Footer>
      
    </Layout>
  );
}

export default BasicLayout;
