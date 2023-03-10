import React, { FC } from 'react';
import styles from './summoner.less';
import { connect, SummonerModelState, ConnectProps } from 'umi';
import { Row, Col } from 'antd';

interface PageProps extends ConnectProps {
  summoner: SummonerModelState;
}

const Summoner: FC<PageProps> = (props) => {
  const { summoners = [] } = props.summoner;
  console.log(props.summoner);
  return (
    <div>
      <Row>
        {summoners.reverse().map((summoner) => (
          //span总和是24
          <Col
            key={summoner.summoner_id}
            span={3}
            className={styles.summoneritem}
          >
            <img
              src={`https://game.gtimg.cn/images/yxzj/img201606/summoner/${summoner.summoner_id}.jpg`}
            />
            <p>{summoner.summoner_name}</p>
          </Col>
        ))}
      </Row>
    </div>
  );
};
//?
export default connect(({ summoner }: { summoner: SummonerModelState }) => ({
  summoner,
}))(Summoner);
