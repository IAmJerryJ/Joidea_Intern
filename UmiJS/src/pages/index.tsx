import styles from './index.less';
import { Button } from 'antd';
import axios from 'axios';

export default function IndexPage() {
  const getHandler = () => {
    axios
      .get('api/index')
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <Button onClick={getHandler}>Click</Button>
    </div>
  );
}
