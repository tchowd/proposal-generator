'use client';

import React, { useState } from 'react';

function FadingTextInput() {
  const [words, setWords] = useState([]);

  const handleInputChange = (event: any) => {
    const newWords = event.target.value.split(' ');
    setWords(newWords);
  };

  return (
    <div className="p-4 bg-blue-200">
      <input
        type="text"
        className="border p-2 text-black"
        onChange={handleInputChange}
      />
      <div className="mt-4">
        {words.map((word, index) => (
          <span
            key={index}
            className={`text-gray-${Math.max(100, 700 - index * 100)}`}
            style={{ marginRight: '0.25rem' }}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}

export default FadingTextInput;
