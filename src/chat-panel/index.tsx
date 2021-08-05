/*
 * @Author: your name
 * @Date: 2021-07-30 15:03:46
 * @LastEditTime: 2021-08-05 22:49:51
 * @LastEditors: Vane
 * @Description: In User Settings Edit
 * @FilePath: \vcomps\src\chat-panel\index.tsx
 */
import React from 'react';
import { usePrefixCls } from '@/_hooks';
import classNames from 'classnames';
import ChatList from './components/ChatList';
import { MsgType } from './utils';

export interface ChatDataSource {
  id: number | string;
  msgType: MsgType;
  [props: string]: any;
}
export interface FieldNames {}
export interface ChatPanelProps {
  dataSource: ChatDataSource[];
  // 自定义 dataSource 中 label name children 的字段
  fieldNames?: FieldNames;
  loginId: number | string;
}

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const defaultFieldNames = {};

const ChatPanel: React.FC<ChatPanelProps> = ({
  dataSource,
  fieldNames = defaultFieldNames,
  loginId,
}) => {
  const prefixCls = usePrefixCls('chat-panel');

  return (
    <div
      className={classNames(prefixCls, `${prefixCls}-transparent-scroll-bar`)}
    >
      {/* 聊天内容区域 */}
      <ChatList
        dataSource={dataSource}
        loginId={loginId}
        hasMore={true}
        reachedTopThreshold={20}
        isLoading={true}
      />
    </div>
  );
};

export default ChatPanel;
