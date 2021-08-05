/*
 * @Author: Vane
 * @Date: 2021-07-03 02:46:44
 * @LastEditTime: 2021-08-05 23:03:45
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
}

const defaultFieldNames = {};

const ChatPanel: React.FC<ChatPanelProps> = ({
  dataSource,
  fieldNames = defaultFieldNames,
  loginId,
  hasMore,
  isLoading,
  reachedTopThreshold,
}) => {
  const scrollRef = useRef();
  const prefixCls = usePrefixCls('chat-list');

  const largeImgPrefixCls = usePrefixCls('large-img');

  const handleScroll = useCallback(
    function (e) {
      console.log(hasMore, isLoading);
      // if (!hasMore || !isLoading) return;
      const scrollTop = scrollRef.current.scrollTop;

      if (scrollTop < reachedTopThreshold) {
        // queryHistoryMsg();
        console.log(12323);
      }
    },
    [reachedTopThreshold, hasMore, isLoading],
  );

  const throttleFn = useThrottleFn(handleScroll, {
    wait: 200,
  });
  const throttleScroll = throttleFn.run; // 初始化时，将聊天内容拉到最低, 时机：图片获取后

  const scrollToBottom = () => {
    const ele = scrollRef.current;
    const { clientHeight, scrollHeight } = ele;
    ele.scrollTo(0, Math.abs(scrollHeight - clientHeight));
  };

  useEffect(
    function () {
      scrollRef.current.addEventListener('scroll', throttleScroll);
      return function () {
        scrollRef.current.removeEventListener('scroll', throttleScroll);
      };
    },
    [throttleScroll],
  );

  useLayoutEffect(function () {
    const imgArr = document.querySelectorAll(
      `.${prefixCls} .${largeImgPrefixCls}-img`,
    );
    Array.from(imgArr).forEach(function (item: any) {
      item.onload = scrollToBottom;
      item.onerror = scrollToBottom;
    });

    // 聊天列表触底
    scrollToBottom();
  }, []);

  return (
    <div className={classNames(prefixCls)} ref={scrollRef}>
      {hasMore && loading && (
        <div className={`${prefixCls}-loading-msg-panel`}>
          <img src={loading} alt="loading..." />
        </div>
      )}
      {Array.isArray(dataSource)
        ? dataSource.map((item, index) => {
            const preData = index !== 0 ? dataSource[index - 1] : ({} as any);
            const isLoginer = isLoginerFn(loginId, item.userId);
            const contentType = msgTypeToContentType(item.msgType);
            return (
              <div
                key={item.id}
                className={classNames(`${prefixCls}-row-list`)}
              >
                {/* 消息发送时间:当前发送消息为第一条显示时间 */}
                {index === 0 ? (
                  <div className={`${prefixCls}-sender-time-list`}>
                    <span>{getTimeText(item.createTime).parser1()}</span>
                  </div>
                ) : // 当前消息与上一条消息发送时间间隔30(暂定)分钟就显示
                !diffHalfHour(preData.createTime, item.createTime) ? (
                  <div className={`${prefixCls}-sender-time-list`}>
                    <span>{getTimeText(item.createTime).parser1()}</span>
                  </div>
                ) : null}

                {/* 消息内容 */}
                <ChatItem
                  layout={getLayout(isLoginer, contentType)}
                  contentType={contentType}
                  chatItem={item}
                />
              </div>
            );
          })
        : null}
    </div>
  );
};

export default ChatPanel;
