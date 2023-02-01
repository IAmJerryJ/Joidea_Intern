import React, { FC } from 'react';
import styles from './hero.less';
import { connect, HeroModelState, ConnectProps } from 'umi';
import { Row, Col } from 'antd';

interface PageProps extends ConnectProps {
  hero: HeroModelState;
}
interface heroFnStateType {
  hero: HeroModelState;
}

const Hero: FC<PageProps> = (props) => {
  const { heros = [] } = props.hero;
  console.log(props.hero);
  console.log(heros);
  return (
    <div>
      <Row>
        {heros.reverse().map((item) => (
          //span总和是24
          <Col key={item.ename} span={3} className={styles.heroitem}>
            <img
              src={`https://game.gtimg.cn/images/yxzj/img201606/heroimg/${item.ename}/${item.ename}.jpg`}
            />
            <p>{item.cname}</p>
          </Col>
        ))}
      </Row>
    </div>
  );
};
//{hero}因为需要是一个对象
export default connect(({ hero }: heroFnStateType) => ({ hero }))(Hero);
