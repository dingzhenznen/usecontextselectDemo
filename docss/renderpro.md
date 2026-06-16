Render Props 现在使用现状（2026）
一句话结论：新项目几乎不再主动手写 Render Props 做逻辑复用，但它没有被淘汰，依然大量隐性存在、库源码里高频出现，面试必考点。
一、为什么新项目很少主动手写 Render Props
React 16.8 自定义 Hook 出现后，90% 原本要用 Render Props 的场景都被 Hook 替代，核心痛点：
嵌套回调地狱
多个状态组件叠加时多层箭头函数嵌套，可读性极差：
jsx
<Mouse>
  {mouse => (
    <WindowSize>
      {size => (
        <FetchData>
          {data => <Page mouse={mouse} size={size} data={data} />}
        </FetchData>
      )}
    </WindowSize>
  )}
</Mouse>
Hook 平铺写法，清爽无嵌套：
jsx
const mouse = useMouse();
const size = useWindowSize();
const data = useFetchData();
<Page mouse={mouse} size={size} data={data} />
性能隐患
每次渲染都会新建匿名函数，极易触发子组件无效重渲染，需要额外 useCallback 缓存优化。
逻辑复用成本更高
Hook 直接抽离纯状态逻辑；Render Props 必须封装一层容器组件，多一层抽象。
二、但 Render Props 依然大量在用的场景（不可替代）
1. children as function 本质就是 Render Props（你天天在用）
React 官方文档明确：children 是最常见的 render prop。
像你之前写的自定义 <Form.Item>、很多 UI 库都在用这个模式：
jsx
// 典型 children render props
<Table columns={cols}>
  {(tableApi) => <Button onClick={tableApi.refresh}>刷新</Button>}
</Table>

<Form>
  {(formIns) => <>
    <Form.Item name="name" label="姓名"><input/></Form.Item>
    <button onClick={()=>formIns.resetFields()}>重置</button>
  </>}
</Form>
用途：容器组件内部持有实例 / 状态，把能力暴露给外部自定义渲染区域，Hook 很难替代这种 “插槽传参” 需求。
2. 第三方开源库底层大量使用 Render Props
老版 React 生态：react-router v5、react-motion、react-window、antd 大量组件内部实现
通用工具组件：鼠标追踪、尺寸监听、弹窗控制器、表格 / 表单实例透传
库要同时兼容 Class 组件 + 函数组件，Render Props 兼容性远好于 Hook。
3. 维护老旧项目必备
2019 年之前的中大型 React 项目基本铺满 Render Props，日常开发经常要阅读、改造这类代码，不会看不懂老业务。
4. 库开发场景优先选 Render Props
如果你写通用 UI 组件、工具容器，需要让使用者完全自由控制内部渲染结构，Render Props 比 Hook 更合适：
Hook 只能在函数组件顶层调用；
Render Props 可以在任意 JSX 位置拿到容器内部状态 / 实例。
三、Render Props vs 自定义 Hook 选择标准
优先自定义 Hook（业务项目通用逻辑复用）
只复用纯状态 / 副作用逻辑，不控制 UI 渲染结构
多个逻辑组合，追求代码平铺、简洁
纯函数组件新项目，无 Class 兼容需求
优先 Render Props（封装容器 / UI 库组件）
容器内部有实例、API 需要暴露给子元素
需要预留插槽，使用者自定义内部任意 JSX
组件库要兼容 Class 组件、跨版本通用
四、官方态度
React 官网 legacy 文档保留 Render Props 教程，没有废弃标记；
新文档、官方示例全部优先展示自定义 Hook；
定位：历史重要复用方案，仍有专属适用场景，但不再是首选。
五、结合你之前写的 Form 场景举例
你手写的 Form 容器，如果需要把表单实例、校验方法暴露给外部按钮，用 children render props 非常合适：
jsx
<Form onFinish={handleSubmit}>
  {(form) => (
    <>
      <Form.Item name="username" label="用户名">
        <input />
      </Form.Item>
      <button onClick={() => form.resetFields()}>重置</button>
    </>
  )}
</Form>
这种场景 Hook 很难实现，是 Render Props 如今最主流的使用场景。
总结
1 业务新项目：尽量不用 Render Props 做普通逻辑复用，改用自定义 Hook；
2 封装容器、UI 组件、需要插槽透传内部 API：Render Props（children as function）依然是最优解；
3 行业现状：业务代码少见手写，但库源码、老项目、UI 容器中随处可见，属于必须掌握的基础模式。