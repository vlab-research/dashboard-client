/* eslint-disable */
import React, {useState, useEffect} from 'react'
import  { ApiClient } from '../../../services';
import { List, Skeleton } from 'antd';

const TeamsList = () => {
    const [data, setData] = useState([])
    const getData = () => {
        const prueba = [
            {
              title: 'Title 1',
            },
            {
              title: 'Title 2',
            },
            {
              title: 'Title 3',
            },
          ];
        //ApiClient.fetcher({path: '/teams'})
        setData(prueba)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <List
          //loading={initLoading}
          itemLayout="horizontal"
          //loadMore={loadMore}
          dataSource={data} //dataSource={list}
          renderItem={item => (
            <List.Item actions={[<a key="list-loadmore-edit">edit</a>]}>
              <Skeleton title={false} loading={item.loading} active>
                <List.Item.Meta
                  title={<a>{item.title}</a>}
                  description="description"
                />
              </Skeleton>
            </List.Item>
          )}
        />
      );
    
}

export default TeamsList