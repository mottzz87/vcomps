/*
 * @Author: Vane
 * @Date: 2021-07-03 02:46:44
 * @LastEditTime: 2021-08-10 16:20:37
 * @LastEditors: Vane
 * @Description:
 * @FilePath: \vcomps\src\chat-panel\components\ChatList\index.tsx
 */
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { usePrefixCls } from '@/_hooks';
import classNames from 'classnames';
import InfiniteScroll from 'react-infinite-scroller';
import { useThrottleFn, usePersistFn } from 'ahooks';
import { getTimeText, diffHalfHour } from '../../utils/getTimeText';
import { STATIC_IMG_CHAT } from '@/_config';
import {
  isLoginerFn,
  getLayout,
  MsgType,
  msgTypeToContentType,
} from '../../utils';
import ChatItem from './ChatItem';

const loading = STATIC_IMG_CHAT + 'loading@2x.png';
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
  hasMore: boolean;
  isLoading: boolean;
  reachedTopThreshold?: number | string;
  loadMore: Function;
}

const defaultFieldNames = {};

const ChatPanel: React.FC<ChatPanelProps> = ({
  dataSource,
  fieldNames = defaultFieldNames,
  loginId,
  hasMore,
  isLoading,
  reachedTopThreshold,
  loadMore,
}) => {
  const scrollRef = useRef();
  const prefixCls = usePrefixCls('chat-list');

  const largeImgPrefixCls = usePrefixCls('large-img');

  const queryHistoryMsg = usePersistFn(loadMore);

  return (
    <div
      ref={scrollRef}
      className={classNames(prefixCls)}
      id="scrollableDiv"
      style={{
        height: 400,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column-reverse',
      }}
    >
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={() => queryHistoryMsg()}
        hasMore={true}
        useWindow={false}
        scrollabletarget="scrollableDiv"
        style={{ display: 'flex', flexDirection: 'column-reverse' }}
      >
        {dataSource.map((item, index) => {
          const preData = index !== 0 ? dataSource[index - 1] : ({} as any);
          const isLoginer = isLoginerFn(loginId, item.userId);
          const contentType = msgTypeToContentType(item.msgType);
          return (
            <div key={item.id} className={classNames(`${prefixCls}-row-list`)}>
              <ChatItem
                layout={getLayout(isLoginer, contentType)}
                contentType={contentType}
                chatItem={item}
              />
            </div>
          );
        })}
      </InfiniteScroll>
    </div>
  );
};

export default ChatPanel;
