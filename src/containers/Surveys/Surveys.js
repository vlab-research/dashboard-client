import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import TypeformCreate from '../../components/TypeformCreate';
import { Hook } from '../../services';
import { SurveyScreen } from '..';
import './Surveys.css';

const { Content, Sider } = Layout;

export const Survey = React.createContext(null);

const Surveys = props => {
  const [surveys, setSurveys] = Hook.useMountFetch({ path: '/surveys' }, []);
  const [selected, setSelected] = useState('0');

  return surveys.length ? (
    <Layout style={{ height: '100%' }}>
      <Sider style={{ background: '#fff' }}>
        <Survey.Provider value={{ setSurveys }}>
          <TypeformCreate {...props} />
        </Survey.Provider>
        <Menu
          mode="inline"
          selectedKeys={[selected]}
          onClick={e => setSelected(e.key)}
          style={{ borderRight: 0 }}
        >
          {surveys.map((survey, id) => (
            <Menu.Item key={id}>{survey.title}</Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Content style={{ padding: '30px' }}>
        <SurveyScreen userid={surveys[selected].userid} formid={surveys[selected].formid} />
      </Content>
    </Layout>
  ) : null;
};

export default Surveys;
