import React, { createContext, useContext, useState, useEffect } from 'react';

// 表单上下文
const FormContext = createContext(null);

// Form.Item 组件
function FormItem({ name, label, rules, children }) {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error('Form.Item 必须包裹在 Form 组件内');

  useEffect(() => {
    ctx.registerField(name, { ...rules, label });
  }, [ctx, name, rules, label]);

  const error = ctx.errors[name];

  // 自动给输入控件绑定 value + onChange
  const childNodes = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        value: ctx.values[name] ?? '',
        onChange: (e) => ctx.setFieldValue(name, e.target.value)
      });
    }
    return child;
  });

  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>{label}</label>
      {childNodes}
      {error && <div style={{ color: 'red', fontSize: 12, marginTop: 4 }}>{error}</div>}
    </div>
  );
}

// 外层 Form 容器
function Form({ children, onFinish, initialValues = {} }) {
  // 表单值、错误、字段规则
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [fieldRules, setFieldRules] = useState({});

  // 设置单个字段值
  const setFieldValue = (name, val) => {
    setValues(prev => ({ ...prev, [name]: val }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  // 注册字段校验规则
  const registerField = (name, rule) => {
    setFieldRules(prev => ({ ...prev, [name]: rule }));
  };

  // 重置全部字段
  const resetFields = () => {
    setValues(initialValues);
    setErrors({});
  };

  // 手动校验全部字段
  const validateFields = () => {
    const newErr = {};
    Object.entries(fieldRules).forEach(([name, rule]) => {
      const val = values[name];
      if (rule.required && (!val || String(val).trim() === '')) {
        newErr[name] = `${rule.label}不能为空`;
      }
    });
    setErrors(newErr);
    return Object.keys(newErr).length === 0;
  };

  // 表单原生提交事件
  const handleNativeSubmit = (e) => {
    e.preventDefault();
    const isValid = validateFields();
    if (isValid && onFinish) {
      onFinish(values);
    }
  };

  // 暴露给外部的 form 实例方法
  const formApi = {
    values,
    setFieldsValue: setFieldValue,
    resetFields,
    validateFields
  };

  const contextValue = {
    values,
    errors,
    setFieldValue,
    registerField
  };

  // 判断 children 是否为函数（Render Props）
  const renderChildren = typeof children === 'function' ? children(formApi) : children;

  return (
    <FormContext.Provider value={contextValue}>
      <form onSubmit={handleNativeSubmit} style={{ maxWidth: 480, padding: 20 }}>
        {renderChildren}
      </form>
    </FormContext.Provider>
  );
}

// 挂载静态属性 Form.Item
Form.Item = FormItem;

// 业务页面使用示例
export default function FormDemo() {
  const handleSubmit = (data) => {
    console.log('提交表单数据：', data);
    alert('提交成功：' + JSON.stringify(data, null, 2));
  };

  const styles = {
    container: {
      padding: 20,
    },
    title: {
      fontSize: '24px',
      marginBottom: '20px',
      color: '#333',
    },
    description: {
      fontSize: '14px',
      color: '#666',
      marginBottom: '20px',
      padding: '12px',
      background: '#f5f5f5',
      borderRadius: '8px',
    },
    input: {
      width: '100%',
      padding: '10px 12px',
      border: '1px solid #ddd',
      borderRadius: '6px',
      fontSize: '14px',
      boxSizing: 'border-box',
      transition: 'border-color 0.3s',
    },
    button: {
      padding: '10px 20px',
      cursor: 'pointer',
      border: 'none',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: 500,
      transition: 'all 0.3s',
    },
    submitButton: {
      background: '#667eea',
      color: 'white',
    },
    resetButton: {
      background: '#e0e0e0',
      color: '#333',
    },
    validateButton: {
      background: '#764ba2',
      color: 'white',
    },
    buttonGroup: {
      display: 'flex',
      gap: 12,
      marginTop: 20,
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Form Render Props 完整示例</h2>
      <div style={styles.description}>
        <strong>特性说明：</strong>
        <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
          <li>使用 Context 管理表单状态</li>
          <li>Form.Item 自动绑定 value 和 onChange</li>
          <li>支持必填校验</li>
          <li>Render Props 模式暴露 form API（resetFields, validateFields）</li>
        </ul>
      </div>

      <Form onFinish={handleSubmit} initialValues={{ username: '', phone: '' }}>
        {/* Render Props：接收 form API，外部可调用 resetFields */}
        {(form) => (
          <>
            <Form.Item name="username" label="用户名" rules={{ required: true }}>
              <input
                style={styles.input}
                placeholder="请输入用户名"
              />
            </Form.Item>

            <Form.Item name="phone" label="手机号" rules={{ required: true }}>
              <input
                type="tel"
                style={styles.input}
                placeholder="请输入手机号"
              />
            </Form.Item>

            <div style={styles.buttonGroup}>
              <button
                type="submit"
                style={{ ...styles.button, ...styles.submitButton }}
              >
                提交表单
              </button>
              {/* 调用 render props 透传的 form.resetFields */}
              <button
                type="button"
                onClick={() => form.resetFields()}
                style={{ ...styles.button, ...styles.resetButton }}
              >
                重置表单
              </button>
              {/* 手动校验按钮演示 */}
              <button
                type="button"
                onClick={() => {
                  const pass = form.validateFields();
                  console.log('校验是否通过：', pass);
                  if (!pass) alert('表单存在必填项未填写');
                  else alert('校验通过');
                }}
                style={{ ...styles.button, ...styles.validateButton }}
              >
                仅校验不提交
              </button>
            </div>
          </>
        )}
      </Form>
    </div>
  );
}
