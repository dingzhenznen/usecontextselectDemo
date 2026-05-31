import React, { useState } from 'react'
import NormalContextDemo from './components/NormalContextDemo'
import SelectorDemo from './components/SelectorDemo'
import CompareDemo from './components/CompareDemo'

function App() {
  const [activeTab, setActiveTab] = useState('compare')

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
    },
    header: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '30px',
      borderRadius: '12px',
      marginBottom: '30px',
    },
    title: {
      fontSize: '28px',
      marginBottom: '10px',
    },
    subtitle: {
      fontSize: '16px',
      opacity: 0.9,
    },
    tabs: {
      display: 'flex',
      gap: '10px',
      marginBottom: '30px',
      flexWrap: 'wrap',
    },
    tab: {
      padding: '12px 24px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.3s',
      background: '#e0e0e0',
      color: '#333',
    },
    activeTab: {
      background: '#667eea',
      color: 'white',
    },
    content: {
      background: 'white',
      borderRadius: '12px',
      padding: '30px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>use-context-selector Demo</h1>
        <p style={styles.subtitle}>
          展示 use-context-selector 如何优化 React Context 性能，避免不必要的重渲染
        </p>
      </div>

      <div style={styles.tabs}>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === 'compare' ? styles.activeTab : {}),
          }}
          onClick={() => setActiveTab('compare')}
        >
          对比演示 (推荐)
        </button>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === 'normal' ? styles.activeTab : {}),
          }}
          onClick={() => setActiveTab('normal')}
        >
          普通 Context (问题)
        </button>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === 'selector' ? styles.activeTab : {}),
          }}
          onClick={() => setActiveTab('selector')}
        >
          use-context-selector (解决)
        </button>
      </div>

      <div style={styles.content}>
        {activeTab === 'compare' && <CompareDemo />}
        {activeTab === 'normal' && <NormalContextDemo />}
        {activeTab === 'selector' && <SelectorDemo />}
      </div>
    </div>
  )
}

export default App
