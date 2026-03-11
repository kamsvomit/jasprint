import React from 'react';

function toTwemojiUrl(emoji: string): string {
  const codepoint = [...emoji]
    .map(c => c.codePointAt(0)!.toString(16))
    .filter(c => c !== 'fe0f')
    .join('-');
  return `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${codepoint}.svg`;
}

function EmojiIcon({ emoji }: { emoji: string }) {
  return (
    <img
      src={toTwemojiUrl(emoji)}
      alt={emoji}
      width={32}
      height={32}
      className="w-7 h-7 sm:w-8 sm:h-8 select-none"
      draggable={false}
    />
  );
}

const productEmojis: Record<string, string> = {
  'brosur':      '📄',
  'spanduk':     '🚩',
  'kartu-nama':  '📇',
  'sticker':     '🏷️',
  'nota':        '📒',
  'undangan':    '✉️',
};

export function getToolIcon(productId: string) {
  const emoji = productEmojis[productId] ?? '🖨️';
  return {
    svg: <EmojiIcon emoji={emoji} />,
  };
}