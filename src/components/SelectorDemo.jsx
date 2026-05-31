import { memo, useState } from 'react'
import { useContextSelector } from 'use-context-selector'
import SelectorContextProvider, { SelectorContext } from '../context/SelectorContext'

// 子组件 - 只使用 count
const Counter = memo(() => {
  const count = useContextSelector(SelectorContext, (v) => v.count)
  console.log('【Selector】Counter 渲染了')

  return (
    <div style={componentStyle('🟢')}>
      <h3>计数器</h3>
      <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{count}</p>
    </div>
  )
})

// 子组件 - 只使用 text
const TextDisplay = memo(() => {
  const text = useContextSelector(SelectorContext, (v) => v.text)
  console.log('【Selector】TextDisplay 渲染了')

  return (
    <div style={componentStyle('🟢')}>
      <h3>文本显示</h3>
      <p>{text}</p>
    </div>
  )
})

// 子组件 - 只使用 user
const UserInfo = memo(() => {
  const user = useContextSelector(SelectorContext, (v) => v.user)
  console.log('【Selector】UserInfo 渲染了')

  return (
    <div style={componentStyle('🟢')}>
      <h3>用户信息</h3>
      <p>名字: {user.name}</p>
      <p>年龄: {user.age}</p>
    </div>
  )
})

// 控制组件
const Controls = () => {
  const incrementCount = useContextSelector(SelectorContext, (v) => v.incrementCount)
  const decrementCount = useContextSelector(SelectorContext, (v) => v.decrementCount)
  const updateText = useContextSelector(SelectorContext, (v) => v.updateText)
  const incrementUserAge = useContextSelector(SelectorContext, (v) => v.incrementUserAge)
  const [inputText, setInputText] = useState('')

  return (
    <div style={{ marginBottom: '20px', padding: '15px', background: '#f0f0f0', borderRadius: '8px' }}>
      <h3>操作区</h3>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
        <button style={btnStyle} onClick={incrementCount}>
          增加 Count
        </button>
        <button style={btnStyle} onClick={decrementCount}>
          减少 Count
        </button>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="输入新文本"
          style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <button style={btnStyle} onClick={() => updateText(inputText)}>
          更新 Text
        </button>
        <button
          style={btnStyle}
          onClick={incrementUserAge}
        >
          User 年龄 +1
        </button>
      </div>
    </div>
  )
}

// 内容组件
const SelectorDemoContent = () => {
  return (
    <div>
      <div
        style={{
          background: '#d4edda',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
          borderLeft: '4px solid #28a745',
        }}
      >
        <h3>✅ use-context-selector 解决方案</h3>
        <p>
          使用 useContextSelector 时，组件可以<strong>精确订阅需要的部分状态</strong>。只有当订阅的值变化时，组件才会重新渲染。
        </p>
        <p style={{ marginTop: '10px', color: '#666' }}>
          💡 Context 已提取到单独模块，使用 useMemo 优化 value
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
  )
}

// 导出带 Provider 的组件
function SelectorDemo() {
  return (
    <SelectorContextProvider>
      <SelectorDemoContent />
    </SelectorContextProvider>
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
    border: '2px solid #28a745',
    borderRadius: '8px',
    background: '#f0fff0',
    position: 'relative',
  }
}

export default SelectorDemo