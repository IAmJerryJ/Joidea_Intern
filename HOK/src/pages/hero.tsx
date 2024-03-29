import React, { FC } from 'react';
import styles from './hero.less';
import { connect, HeroModelState, ConnectProps } from 'umi';
import { Row, Col, Card, Radio } from 'antd';
import FreeHeroItem from '@/components/FreeHeroItem';
const RadioGroup = Radio.Group;
const heroType = [
  { key: 0, value: '全部' },
  { key: 1, value: '战士' },
  { key: 2, value: '法师' },
  { key: 3, value: '坦克' },
  { key: 4, value: '刺客' },
  { key: 5, value: '射手' },
  { key: 6, value: '辅助' },
];

interface PageProps extends ConnectProps {
  hero: HeroModelState;
}

const Hero: FC<PageProps> = ({ hero, dispatch }) => {
  const { heros = [], filterKey = 0, freeheros = [], itemHover = 0 } = hero;
  const onChange = (e) => {
    dispatch!({
      type: 'hero/save',
      payload: {
        filterKey: e.target.value,
      },
    });
  };

  const onItemHover = (e) => {
    dispatch!({
      type: 'hero/save',
      payload: {
        itemHover: e,
      },
    });
  };
  return (
    <div className={styles.normal}>
      <div className={styles.info}>
        <Row className={styles.freehero}>
          <Col span={24}>
            <p>周免英雄</p>
            <div>
              {freeheros.map((data, index) => (
                <FreeHeroItem
                  data={data}
                  itemHover={itemHover}
                  onItemHover={onItemHover}
                  thisIndex={index}
                  key={index}
                />
              ))}
            </div>
          </Col>
        </Row>
      </div>
      <Card className={styles.radioPanel}>
        <RadioGroup onChange={onChange} value={filterKey}>
          {heroType.map((data) => (
            <Radio value={data.key} key={`hero-rodio-${data.key}`}>
              {data.value}
            </Radio>
          ))}
        </RadioGroup>
      </Card>
      <Row>
        {heros
          .filter((hero) => filterKey === 0 || hero.hero_type === filterKey)
          .reverse()
          .map((hero) => (
            //span总和是24
            <Col key={hero.ename} span={3} className={styles.heroitem}>
              <img
                src={`https://game.gtimg.cn/images/yxzj/img201606/heroimg/${hero.ename}/${hero.ename}.jpg`}
              />
              <p>{hero.cname}</p>
            </Col>
          ))}
      </Row>
    </div>
  );
};
//{hero}因为需要是一个对象
export default connect(({ hero }: { hero: HeroModelState }) => ({ hero }))(
  Hero,
);
