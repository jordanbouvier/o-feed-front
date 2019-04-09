/*
 * Npm import
 */
import React from 'react';

/*
 * Functions
 */
const newMessage = (parts) => {
  // console.log(parts);
  const message = (
    <div>
      {parts.map(part => part)}
    </div>
  );
  // console.log(message);
  return message;
};

export const groupParts = (parts) => {
  const newParts = [];
  let currentString = '';
  parts.forEach((part) => {
    if (typeof part === 'string') {
      currentString = `${currentString} ${part}`;
    }
    else {
      newParts.push(currentString);
      newParts.push(part);
    }
  });
  return newParts;
};
