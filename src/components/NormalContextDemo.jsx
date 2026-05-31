import React, { createContext, useContext, useState, memo } from 'react'

// 创建普通的 Context
const NormalContext = createContext(null)

// 子组件 - 只使用 count
const Counter = memo(() => {
  const { count } = useContext(NormalContext)
  console.log('【普通Context】Counter 渲染了')

  return (
    <div style={componentStyle('🟡')}>
      <h3>计数器</h3>
      <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{count}</p>
    </div>
  )
})

// 子组件 - 只使用 text
const TextDisplay = memo(() => {
  const { text } = useContext(NormalContext)
  console.log('【普通Context】TextDisplay 渲染了')

  return (
    <div style={componentStyle('🟡')}>
      <h3>文本显示</h3>
      <p>{text}</p>
    </div>
  )
})

// 子组件 - 只使用 user
const UserInfo = memo(() => {
  const { user } = useContext(NormalContext)
  console.log('【普通Context】UserInfo 渲染了')

  return (
    <div style={componentStyle('🟡')}>
      <h3>用户信息</h3>
      <p>名字: {user.name}</p>
      <p>年龄: {user.age}</p>
    </div>
  )
})

// 控制组件
const Controls = () => {
  const { setCount, setText, setUser } = useContext(NormalContext)
  const [inputText, setInputText] = useState('')

  return (
    <div style={{ marginBottom: '20px', padding: '15px', background: '#f0f0f0', borderRadius: '8px' }}>
      <h3>操作区</h3>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
        <button style={btnStyle} onClick={() => setCount(c => c + 1)}>
          增加 Count
        </button>
        <button style={btnStyle} onClick={() => setCount(c => c - 1)}>
          减少 Count
        </button>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="输入新文本"
          style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <button style={btnStyle} onClick={() => setText(inputText)}>
          更新 Text
        </button>
        <button
          style={btnStyle}
          onClick={() => setUser((u) => ({ ...u, age: u.age + 1 }))}
        >
          User 年龄 +1
        </button>
      </div>
    </div>
  )
}

function NormalContextDemo() {
  const [count, setCount] = useState(0)
  const [text, setText] = useState('Hello World')
  const [user, setUser] = useState({ name: '张三', age: 25 })

  const value = { count, setCount, text, setText, user, setUser }

  return (
    <NormalContext.Provider value={value}>
      <div>
        <div
          style={{
            background: '#fff3cd',
            padding: '15px',
            borderRadius: '8px',
            marginBottom: '20px',
            borderLeft: '4px solid #ffc107',
          }}
        >
          <h3>⚠️ 普通 Context 的问题</h3>
          <p>
            使用普通 useContext 时，当 Context 中的任何值变化，<strong>所有订阅该 Context 的组件都会重新渲染</strong>，即使它们只使用了未变化的部分。
          </p>
          <p style={{ marginTop: '10px', color: '#666' }}>
            💡 打开控制台，点击不同按钮，观察哪些组件被重新渲染了
          </p>
        </div>

        <Controls />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
          }}
        >
          <Counter />
          <TextDisplay />
          <UserInfo />
        </div>
      </div>
    </NormalContext.Provider>
  )
}

const btnStyle = {
  padding: '8px 16px',
  background: '#667eea',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
}

function componentStyle(emoji) {
  return {
    padding: '20px',
    border: '2px solid #ffc107',
    borderRadius: '8px',
    background: '#fffbf0',
    position: 'relative',
  }
}

export default NormalContextDemo
