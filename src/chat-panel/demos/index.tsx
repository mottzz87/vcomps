/*
 * @Author: Vane
 * @Date: 2021-07-30 15:03:46
 * @LastEditTime: 2021-08-10 16:13:59
 * @LastEditors: Vane
 * @Description:
 * @FilePath: \vcomps\src\chat-panel\demos\index.tsx
 */
import React, { useState, useEffect } from 'react';
import { ChatPanel } from 'vcomps';
import { STATIC_IMG } from '@/_config/index';

const itemLink = {
  id: 222,
  avatarSrc: 'https://gitee.com/assets/no_portrait.png',
  createTime: '2021-04-17 12:12:00',
  msgType: 1 as const, // 文本
  msgId: '121710f399b84322bdecc238199d6888',
  msgContent:
    '/微笑/https://gitee.com/vaned/static/raw/master/img/chat/wallhaven.jpg',
  userId: '222',
  userName: 'zhangshuaiqy',
};
const list = Array.from({ length: 20 }, (v, k) => k)
  .map((v, i) => ({
    id: i, // 消息id
    avatarSrc: 'https://gitee.com/assets/no_portrait.png', // 头像
    createTime: '2021-04-16 16:58:' + i, // 创建时间
    msgType: 3 as const, // 图片
    msgContent: `${STATIC_IMG}/chat/wallhaven.jpg`, // 消息内容
    userId: '111', // 发送消息的用户id
    userName: 'zwen900523', // 用户名
  }))
  .concat(itemLink);

const Base: React.FC = () => {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const getList = () => {
    setData(list);
  };

  const loadMore = () => {
    const list = [
      {
        ...itemLink,
        id: Math.random() * 100,
        msgContent: '/微笑/' + (data.length + 2),
      },
    ].concat(data);
    console.log(11111111, list);
    setData(list);
    if (list.length >= 10) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <ChatPanel
      dataSource={data}
      loginId={'222'}
      isLoading={isLoading}
      hasMore={hasMore}
      loadMore={loadMore}
    />
  );
};

export default Base;
