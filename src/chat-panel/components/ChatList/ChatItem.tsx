/*
 * @Author: Vane
 * @Date: 2021-07-02 10:32:46
 * @LastEditTime: 2021-07-02 17:13:14
 * @LastEditors: Vane
 * @Description: 
 * @FilePath: \vcomps\src\chat-panel\components\ChatList\ChatItem.tsx
 */
import React, { FC, useCallback, useMemo } from 'react';
import { usePrefixCls } from '@/_hooks';
import classNames from 'classnames';
import { EnlargeImg } from 'vcomps';
import { ContentType } from '../../utils';

interface ChatItemProps {
  layout: 'left' | 'right' | 'center';
  chatItem: any;
  contentType: ContentType;
}
 

const ChatItem: FC <ChatItemProps> = ({
  layout,
  chatItem,
  contentType,
}) => {
  const prefixCls = usePrefixCls('chat-item');
  const { isLeftLayout, isRightLayout, isCenterLayout } = useMemo(() => {
    return {
      isLeftLayout: layout === 'left',
      isRightLayout: layout === 'right',
      isCenterLayout: layout === 'center',
    };
  }, [layout]);

  const getContent = useCallback(
    (msgContent: string) => {
      let content = null;
      switch (contentType) {
        case 'img':
          content = <EnlargeImg src={msgContent} />;
          break;
        case 'text':
          content = msgContent;
          break;
      }
      return content;
    },
    [contentType],
  );

  return (
    <div
      className={classNames(prefixCls, {
        [`${prefixCls}-left`]: layout === 'left',
        [`${prefixCls}-right`]: layout === 'right',
        [`${prefixCls}-center`]: layout === 'center',
      })}
    >
      {/* 左侧头像 */}
      {isLeftLayout ? (
        <div className={`${prefixCls}-avatar`}>
          <img src={chatItem.avatarSrc} alt="头像" />
        </div>
      ) : null}
      {/* 中间内容 */}
      <div className={`${prefixCls}-contentbox`}>
        {/* 用户名 */}
        {chatItem.userName ? (
          <div className={`${prefixCls}-userName`}>{chatItem.userName}</div>
        ) : null}
        <div className={`${prefixCls}-content`}>
          {getContent(chatItem.msgContent)}
        </div>
      </div>
      {/* 右侧头像 */}
      {isRightLayout ? (
        <div className={`${prefixCls}-avatar`}>
          <img src={chatItem.avatarSrc} alt="头像" />
        </div>
      ) : null}
    </div>
  );
};

export default ChatItem;
