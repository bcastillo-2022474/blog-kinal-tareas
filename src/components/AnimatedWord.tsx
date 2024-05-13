import {useEffect, useRef, useState} from "react";

function AnimatedWord({ shouldRenderAnimation = true }) {
  const [currentWord, setCurrentWord] = useState("");
  // trigger render
  const currentWordIndex = useRef(0);
  const isInReverse = useRef(false);
  const words = [
    "ya parele con las tareas",
    "ya puso demasiadas tareas",
    "acepteme las tareas :(((",
    "no sea mala onda!!",
  ];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (!shouldRenderAnimation) return;

    let animationTimeout: number;
    const renderIntervalTime = 100;

    const wait = (time: number) =>
      new Promise((resolve) => {
        animationTimeout = setTimeout(resolve, time);
      });

    async function animateWord() {
      const word = words[wordIndex];
      for (let i = 0; i < word.length; i++) {
        if (isInReverse.current) break;
        if (currentWordIndex.current > i) continue;
        currentWordIndex.current = i;
        setCurrentWord(`${word.slice(0, currentWordIndex.current + 1)}`);
        await wait(renderIntervalTime);
      }
      if (!isInReverse.current) isInReverse.current = true;
      await wait(1000);
      for (let i = word.length; i >= 0; i--) {
        if (!isInReverse.current) break;
        if (currentWordIndex.current < i) continue;

        currentWordIndex.current = i;
        setCurrentWord(`${word.slice(0, currentWordIndex.current)}`);
        await wait(renderIntervalTime);
      }
      await wait(1000);
      isInReverse.current = false;
      setWordIndex(() => (wordIndex !== words.length - 1 ? wordIndex + 1 : 0));
      setCurrentWord("");
    }

    animateWord();

    return () => {
      clearTimeout(animationTimeout);
    };
  }, [wordIndex, shouldRenderAnimation]);

  return <span>{currentWord}</span>;
}

export default AnimatedWord;