/*
 * @Author: Vane
 * @Date: 2021-07-01 11:40:02
 * @LastEditTime: 2021-07-02 10:30:11
 * @LastEditors: Vane
 * @Description: 
 * @FilePath: \vcomps\src\Transition\demos\Base.tsx
 */
import React, { useState } from 'react';
import { Transition } from 'vcomps';
import { AnimationName } from '@/transition';
import { Button } from 'antd';

export default () => {
  const [show, setShow] = useState(false);
  const [animation, setAnimation] = useState<AnimationName>('top');
  const handleClick = (animation: AnimationName) => {
    setShow(!show);
    setAnimation(animation);
  };

  return (
    <>
      <Button onClick={() => handleClick('top')}>从上向下</Button>
      <Button onClick={() => handleClick('bottom')}>从下向上</Button>
      <Button onClick={() => handleClick('left')}>从左向右</Button>
      <Button onClick={() => handleClick('right')}>从右向左</Button>
      <Button onClick={() => handleClick('center')}>从中间向四周</Button>

      <Transition animation={animation} in={show} timeout={3000}>
        <div style={{ background: '#1890ff', height: 100 }}>我是内容</div>
      </Transition>
    </>
  );
};
