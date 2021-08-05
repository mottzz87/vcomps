/*
 * @Author: Vane
 * @Date: 2021-07-30 15:03:46
 * @LastEditTime: 2021-08-05 18:04:14
 * @LastEditors: Please set LastEditors
 * @Description:
 * @FilePath: \vcomps\src\chat-panel\demos\index.tsx
 */
import React, { useState } from 'react';
import { ChatPanel } from 'vcomps';
import { STATIC_IMG } from '@/_config/index';

const itemLink = {
  id: 11111111,
  avatarSrc: 'https://gitee.com/assets/no_portrait.png',
  createTime: '2021-04-17 12:12:00',
  msgType: 1 as const, // 文本
  msgId: '121710f399b84322bdecc238199d6888',
  msgContent:
    '/微笑/https://gitee.com/vaned/static/raw/master/img/chat/wallhaven.jpg',
  userId: '222',
  userName: 'zhangshuaiqy',
};
const list = Array.from({ length: 2 }, (v, k) => k)
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
  const [data, setData] = useState(list);
  return <ChatPanel dataSource={data} loginId={'222'} />;
};

export default Base;
