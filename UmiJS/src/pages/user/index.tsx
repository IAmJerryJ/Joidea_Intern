import { Link, NavLink } from 'umi';
import './index.less';

export default (props) => {
  return (
    <>
      <div>user</div>
      <hr />
      <NavLink to="/user/center">User center</NavLink>
      <div>{props.children}</div>
    </>
  );
};
