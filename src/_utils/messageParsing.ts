/*
 * @Author: Vane
 * @Date: 2021-08-02 16:49:23
 * @LastEditTime: 2021-08-04 15:34:39
 * @LastEditors: Please set LastEditors
 * @Description:
 * @FilePath: \vcomps\src\_utils\messageParsing.ts
 */

import { emoticonMap } from '@/_config/emoji';
import { STATIC_IMG_EMOJI } from '@/_config';

export const messageParsing = (msgText: string) => {
  const emojiReg = /\/(.+?)\//g;
  const linkReg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;

  //表情
  const emojiMatch = () => {
    msgText = msgText.replace(
      emojiReg,
      function (s: any, val: string | number) {
        // @ts-ignore
        if (emoticonMap[val]) {
          // @ts-ignore
          const { hover, info } = emoticonMap[val] || {};
          return `<img style='width:28px' src='${STATIC_IMG_EMOJI}/${hover}' alt='${info}' />`;
        }
        return s;
      },
    );
  };

  //超链接
  const linkMatch = () => {
    const style = 'height: 28px; line-height: 28px; vertical-align: bottom';
    msgText = msgText.replace(linkReg, function (s: any) {
      return `<a style='${style}' href='${s}' target='_blank'> ${s}</a>`;
    });
  };

  // 这里定义regs数组时，如果emojiReg在前会出现replace标签之后的img标签里的src被linkreg匹配到，导致表情图片异常。
  // 没有想到更好的方法、暂且通过执行顺序这么处理
  const regs = [
    { reg: linkReg, matchCb: () => linkMatch() },
    { reg: emojiReg, matchCb: () => emojiMatch() },
  ];

  regs.forEach((v, i) => {
    if (v.reg.test(msgText)) {
      v.matchCb();
    }
  });

  return msgText;
};
