import React from 'react';
import { EmojiconTab } from 'vcomps';

export default () => {
  return (
    <>
      <div> 底部（默认）</div>
      <EmojiconTab
        onEmojiChange={(emoji: string) => alert('点击了:' + emoji)}
      />
      <div> 顶部:</div>
      <EmojiconTab
        placement="top"
        onEmojiChange={(emoji: string) => alert('点击了:' + emoji)}
      />
    </>
  );
};
