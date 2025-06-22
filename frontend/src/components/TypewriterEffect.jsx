import React, { useState, useEffect } from 'react';

const TypewriterEffect = ({ 
  texts = [], 
  text = '', 
  speed = 100, 
  deleteSpeed = 50, 
  pauseTime = 1000, 
  className = "" 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  // Use texts array if provided, otherwise use single text
  const textToType = texts.length > 0 ? texts[textIndex] : text;

  useEffect(() => {
    if (texts.length === 0 && text === '') return;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentIndex < textToType.length) {
          setDisplayText(textToType.slice(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        } else {
          // Finished typing, wait then start deleting
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (currentIndex > 0) {
          setDisplayText(textToType.slice(0, currentIndex - 1));
          setCurrentIndex(currentIndex - 1);
        } else {
          // Finished deleting, move to next text or restart
          setIsDeleting(false);
          if (texts.length > 0) {
            setTextIndex((textIndex + 1) % texts.length);
          }
        }
      }
    }, isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [currentIndex, isDeleting, textToType, speed, deleteSpeed, pauseTime, texts, text, textIndex]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default TypewriterEffect; 