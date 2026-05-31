import React, { createContext as reactCreateContext, useContext, useState, memo, useRef, useEffect } from 'react'
import { createContext, useContextSelector } from 'use-context-selector'

// ============== 普通 Context ==============
const NormalContext = reactCreateContext(null)

const NormalCounter = memo(() => {
  const { count, renderCount } = useContext(NormalContext)

  useEffect(() => {
    renderCount.counter++
  })

  return (
    <div style={cardStyle('#fff3cd', '#ffc107')}>
      <div style={badgeStyle('#ffc107')}>普通 Context</div>
      <h4>计数器 (只用 count)</h4>
      <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#667eea' }}>{count}</p>
      <p style={{ color: '#666', fontSize: '12px' }}>渲染次数: {renderCount.counter}</p>
    </div>
  )
})

const NormalText = memo(() => {
  const { text, renderCount } = useContext(NormalContext)

  useEffect(() => {
    renderCount.text++
  })

  return (
    <div style={cardStyle('#fff3cd', '#ffc107')}>
      <div style={badgeStyle('#ffc107')}>普通 Context</div>
      <h4>文本显示 (只用 text)</h4>
      <p style={{ fontSize: '18px', padding: '10px', background: '#f5f5f5', borderRadius: '4px' }}>{text}</p>
      <p style={{ color: '#666', fontSize: '12px' }}>渲染次数: {renderCount.text}</p>
    </div>
  )
})

const NormalUser = memo(() => {
  const { user, renderCount } = useContext(NormalContext)

  useEffect(() => {
    renderCount.user++
  })

  return (
    <div style={cardStyle('#fff3cd', '#ffc107')}>
      <div style={badgeStyle('#ffc107')}>普通 Context</div>
      <h4>用户信息 (只用 user)</h4>
      <p>名字: <strong>{user.name}</strong></p>
      <p>年龄: <strong>{user.age}</strong></p>
      <p style={{ color: '#666', fontSize: '12px' }}>渲染次数: {renderCount.user}</p>
    </div>
  )
})

// ============== Selector Context ==============
const SelectorContext = createContext(null)

const SelectorCounter = memo(() => {
  const count = useContextSelector(SelectorContext, v => v.count)
  const renderCount = useContextSelector(SelectorContext, v => v.renderCounts)

  useEffect(() => {
    renderCount.counter++
  })

  return (
    <div style={cardStyle('#d4edda', '#28a745')}>
      <div style={badgeStyle('#28a745')}>useContextSelector</div>
      <h4>计数器 (只用 count)</h4>
      <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#667eea' }}>{count}</p>
      <p style={{ color: '#666', fontSize: '12px' }}>渲染次数: {renderCount.counter}</p>
    </div>
  )
})

const SelectorText = memo(() => {
  const text = useContextSelector(SelectorContext, v => v.text)
  const renderCount = useContextSelector(SelectorContext, v => v.renderCounts)

  useEffect(() => {
    renderCount.text++
  })

  return (
    <div style={cardStyle('#d4edda', '#28a745')}>
      <div style={badgeStyle('#28a745')}>useContextSelector</div>
      <h4>文本显示 (只用 text)</h4>
      <p style={{ fontSize: '18px', padding: '10px', background: '#f5f5f5', borderRadius: '4px' }}>{text}</p>
      <p style={{ color: '#666', fontSize: '12px' }}>渲染次数: {renderCount.text}</p>
    </div>
  )
})

const SelectorUser = memo(() => {
  const user = useContextSelector(SelectorContext, v => v.user)
  const renderCount = useContextSelector(SelectorContext, v => v.renderCounts)

  useEffect(() => {
    renderCount.user++
  })

  return (
    <div style={cardStyle('#d4edda', '#28a745')}>
      <div style={badgeStyle('#28a745')}>useContextSelector</div>
      <h4>用户信息 (只用 user)</h4>
      <p>名字: <strong>{user.name}</strong></p>
      <p>年龄: <strong>{user.age}</strong></p>
      <p style={{ color: '#666', fontSize: '12px' }}>渲染次数: {renderCount.user}</p>
    </div>
  )
})

// ============== 主组件 ==============
function CompareDemo() {
  // 普通 Context 状态
  const [normalCount, setNormalCount] = useState(0)
  const [normalText, setNormalText] = useState('Hello World')
  const [normalUser, setNormalUser] = useState({ name: '张三', age: 25 })
  const normalRenderCounts = useRef({
    counter: 0,
    text: 0,
    user: 0
  })

  // Selector Context 状态
  const [selectorCount, setSelectorCount] = useState(0)
  const [selectorText, setSelectorText] = useState('Hello World')
  const [selectorUser, setSelectorUser] = useState({ name: '张三', age: 25 })
  const selectorRenderCounts = useRef({
    counter: 0,
    text: 0,
    user: 0
  })

  const [inputValue, setInputValue] = useState('')

  // 重置计数器
  const resetCounts = () => {
    normalRenderCounts.current = { counter: 0, text: 0, user: 0 }
    selectorRenderCounts.current = { counter: 0, text: 0, user: 0 }
    // 强制刷新
    setNormalCount(c => c)
    setSelectorCount(c => c)
  }

  const normalValue = {
    count: normalCount,
    setCount: setNormalCount,
    text: normalText,
    setText: setNormalText,
    user: normalUser,
    setUser: setNormalUser,
    renderCount: normalRenderCounts.current
  }

  const selectorValue = {
    count: selectorCount,
    setCount: setSelectorCount,
    text: selectorText,
    setText: setSelectorText,
    user: selectorUser,
    setUser: setSelectorUser,
    renderCounts: selectorRenderCounts.current
  }

  return (
    <div>
      <div style={{
        background: '#e3f2fd',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
        borderLeft: '4px solid #2196f3'
      }}>
        <h3>📊 并排对比演示</h3>
        <p style={{ marginTop: '8px', lineHeight: 1.6 }}>
          左右两列分别使用普通 Context 和 use-context-selector。点击操作按钮，观察两边组件的<strong>渲染次数</strong>差异。
        </p>
        <ul style={{ marginTop: '10px', marginLeft: '20px', color: '#666' }}>
          <li>🟡 黄色卡片：使用普通 useContext，任何状态变化都会导致所有组件渲染</li>
          <li>🟢 绿色卡片：使用 useContextSelector，只会在依赖的状态变化时渲染</li>
        </ul>
      </div>

      {/* 操作区 */}
      <div style={{
        marginBottom: '20px',
        padding: '20px',
        background: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #e0e0e0'
      }}>
        <h3 style={{ marginBottom: '15px' }}>🎮 操作台（同时影响两边）</h3>

        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold', color: '#667eea' }}>Count:</span>
            <button style={btnStyle} onClick={() => { setNormalCount(c => c + 1); setSelectorCount(c => c + 1); }}>
              +1
            </button>
            <button style={btnStyle} onClick={() => { setNormalCount(c => c - 1); setSelectorCount(c => c - 1); }}>
              -1
            </button>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold', color: '#667eea' }}>Text:</span>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="输入文本"
              style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #ddd', width: '150px' }}
            />
            <button style={btnStyle} onClick={() => { setNormalText(inputValue); setSelectorText(inputValue); }}>
              更新
            </button>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold', color: '#667eea' }}>User:</span>
            <button style={btnStyle} onClick={() => {
              setNormalUser(u => ({ ...u, age: u.age + 1 }));
              setSelectorUser(u => ({ ...u, age: u.age + 1 }));
            }}>
              年龄+1
            </button>
          </div>

          <button style={{ ...btnStyle, background: '#ff5722' }} onClick={resetCounts}>
            重置计数器
          </button>
        </div>
      </div>

      {/* 对比展示区 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* 左侧：普通 Context */}
        <div>
          <h3 style={{ textAlign: 'center', marginBottom: '15px', color: '#f57c00' }}>
            普通 Context (useContext)
          </h3>
          <NormalContext.Provider value={normalValue}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <NormalCounter />
              <NormalText />
              <NormalUser />
            </div>
          </NormalContext.Provider>
        </div>

        {/* 右侧：Selector */}
        <div>
          <h3 style={{ textAlign: 'center', marginBottom: '15px', color: '#388e3c' }}>
            use-context-selector
          </h3>
          <SelectorContext.Provider value={selectorValue}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <SelectorCounter />
              <SelectorText />
              <SelectorUser />
            </div>
          </SelectorContext.Provider>
        </div>
      </div>

      {/* 结果说明 */}
      <div style={{
        marginTop: '30px',
        padding: '20px',
        background: '#fff8e1',
        borderRadius: '8px',
        border: '1px solid #ffe082'
      }}>
        <h4>📈 预期结果</h4>
        <table style={{ width: '100%', marginTop: '10px', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              <th style={thStyle}>操作</th>
              <th style={thStyle}>普通 Context</th>
              <th style={thStyle}>use-context-selector</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdStyle}>点击 Count +1</td>
              <td style={tdStyle}>所有 3 个组件都渲染</td>
              <td style={tdStyle}>只有 Counter 渲染</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={tdStyle}>更新 Text</td>
              <td style={tdStyle}>所有 3 个组件都渲染</td>
              <td style={tdStyle}>只有 TextDisplay 渲染</td>
            </tr>
            <tr>
              <td style={tdStyle}>User 年龄+1</td>
              <td style={tdStyle}>所有 3 个组件都渲染</td>
              <td style={tdStyle}>只有 UserInfo 渲染</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

const btnStyle = {
  padding: '8px 16px',
  background: '#667eea',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px'
}

const cardStyle = (bg, border) => ({
  padding: '20px',
  background: bg,
  borderRadius: '8px',
  border: `2px solid ${border}`,
  position: 'relative',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
})

const badgeStyle = (color) => ({
  position: 'absolute',
  top: '-10px',
  right: '10px',
  background: color,
  color: 'white',
  padding: '4px 8px',
  borderRadius: '4px',
  fontSize: '11px',
  fontWeight: 'bold'
})

const thStyle = {
  padding: '12px',
  textAlign: 'left',
  borderBottom: '2px solid #ddd',
  fontWeight: 'bold'
}

const tdStyle = {
  padding: '12px',
  borderBottom: '1px solid #eee'
}

export default CompareDemo
