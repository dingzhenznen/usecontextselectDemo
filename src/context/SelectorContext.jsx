import { useState, useMemo, useCallback } from 'react';
import { createContext } from 'use-context-selector';

export const SelectorContext = createContext(null);

const SelectorContextProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('Hello World');
  const [user, setUser] = useState({ name: '张三', age: 25 });

  // 使用 useCallback 优化函数
  const incrementCount = useCallback(() => setCount(c => c + 1), []);
  const decrementCount = useCallback(() => setCount(c => c - 1), []);
  const updateText = useCallback((newText) => setText(newText), []);
  const incrementUserAge = useCallback(() => {
    setUser(u => ({ ...u, age: u.age + 1 }));
  }, []);

  // 使用 useMemo 优化 context value
  const contextValue = useMemo(
    () => ({
      count,
      text,
      user,
      setCount,
      setText,
      setUser,
      incrementCount,
      decrementCount,
      updateText,
      incrementUserAge,
    }),
    [count, text, user, incrementCount, decrementCount, updateText, incrementUserAge]
  );

  return (
    <SelectorContext.Provider value={contextValue}>
      {children}
    </SelectorContext.Provider>
  );
};

export default SelectorContextProvider;
