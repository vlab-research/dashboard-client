import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import TypeformCreate from '../../components/TypeformCreate';
import { Hook } from '../../services';
import { SurveyScreen } from '..';
import './Surveys.css';

const { Content, Sider } = Layout;

export const Survey = React.createContext(null);

const Surveys = (props) => {
  const [surveys, setSurveys] = Hook.useMountFetch({ path: '/surveys' }, []);
  const [selected, setSelected] = useState('0');

  return (
    <Layout style={{ height: '100%' }}>
      <Sider width="300" style={{ background: '#fff' }}>
        <Survey.Provider value={{ setSurveys }}>
          <TypeformCreate {...props} />
        </Survey.Provider>
        <Menu
          mode="inline"
          selectedKeys={[selected]}
          onClick={e => setSelected(e.key)}
          style={{ borderRight: 0 }}
        >
          {surveys && surveys.map((survey, id) => (
            <Menu.Item key={id}>
              {survey.shortcode}
              {'-'}
              {survey.title}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Content style={{ padding: '30px' }}>
        {
          surveys && surveys[selected]
            ? <SurveyScreen userid={surveys[selected].userid} formid={surveys[selected].formid} />
            : 'No surveys yet'
        }
      </Content>
    </Layout>
  );
};

export default Surveys;
