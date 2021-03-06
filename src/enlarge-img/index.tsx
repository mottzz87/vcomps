/*
 * @Author: Vane
 * @Date: 2021-07-02 10:33:57
 * @LastEditTime: 2021-08-10 10:34:23
 * @LastEditors: Please set LastEditors
 * @Description:
 * @FilePath: \vcomps\src\enlarge-img\index.tsx
 */
import React, { FC, useState } from 'react';
import classNames from 'classnames';
import { usePrefixCls } from '@/_hooks';

export interface EnlargeImgProps {
  /**
   * @description 图片地址
   * @default
   */
  src: string;
  /**
   * @description 如果无法显示图像，浏览器将显示替代文本
   * @default
   */
  alt?: string;
  /**
   * @description 图片类名
   * @default
   */
  className?: string;
  /**
   * @description 外层类名
   * @default
   */
  warpClassName?: string;
  /**
   * @description 图片点击事件
   * @default
   */
  onClick?(): void;
}

const EnlargeImg: FC<EnlargeImgProps> = ({
  src,
  alt = '图片',
  onClick,
  className,
  warpClassName,
}) => {
  const [visible, setVisible] = useState(false);
  const prefixCls = usePrefixCls('large-img');
  const handleClick = () => {
    onClick && onClick();
    setVisible(true);
  };
  const handleClickLarge = () => {
    setVisible(!visible);
  };
  return (
    <div className={warpClassName}>
      <img
        className={classNames(`${prefixCls}-img`, className)}
        src={src}
        alt={alt}
        onClick={handleClick}
      />
      <div
        className={classNames(`${prefixCls}-large-modal`, {
          [`${prefixCls}-hide`]: !visible,
        })}
        onClick={handleClickLarge}
      >
        <p>
          <img src={src} alt={alt} />
        </p>
      </div>
    </div>
  );
};

export default EnlargeImg;
