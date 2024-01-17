---
id: router
title: 路由
---
# Vue 路由

## 认识前端路由

- 路由其实是网络工程中的一个术语
  - 在架构一个网络时，非常重要的两个设备就是==路由器==和==交换机==
  - 路由器主要维护的是一个==映射表==，映射表会决定==数据的流向==
- 路由的概念在软件工程中出现，最早是在后端路由中实现的



### 路由的发展历程

#### 后端路由阶段

- 早期的网站开发，整个 HTML 页面是由==服务器==来渲染
  - 服务器生成渲染好对应的 HTML 页面，返回给客户端
  - 浏览器接收到服务器响应后，开始从上往下解析整个 HTML 文档
- 后端路由的处理流程
  - 访问页面时，每个页面的 `URL` 会发送给服务器
  - 服务器会通过正则对该 URL 进行匹配，最后交给一个 `Controller` 进行处理
  - 处理完成后，最终生成 HTML 或数据，返回给客户端
- 后端路由的优点
  - 请求不同的路径时，交给服务器来进行处理，服务器渲染好整个页面
  - 对于客户端，不需要单独加载任何的 Js 和 CSS，直接交给浏览器展示，也有利于 ==SEO 优化==
- 后端路由的缺点
  - 整个页面的模块由后端人员来编写和维护
  - 通常情况下 HTML 代码和数据以及对应的逻辑会混在一起 ，不利于编写和维护



#### 前后端分离阶段

- 随着 `Ajax` 的出现，有了前后端分离的开发模式
- 后端只提供 API 来返回数据，前端通过 Ajax 获取数据，通过 JavaScript 将数据渲染到页面中
- 后端专注于数据处理上，前端专注于交互和可视化上



#### 单页面富应用阶段

- 前端框架的发展带来了单页面富应用（SPA）

- SPA 最主要的特点就是在前后端分离的基础上，加了一层==前端路由==
- 前端来维护一套路由映射，不同的 `URL` 来匹配不同的==组件==



### 前端路由的两种模式

#### hash 模式

- URL 的 hash 也就是==锚点== `#`，本质上是改变 `window.location` 的 `href` 属性

  - 直接赋值 `location.hash`，页面不会发生刷新
  - 监听 `hashchange` 事件，不同的 `hash` 渲染不同的内容

  ```html
  <a href="#home">Home</a>
  <a href="#login">Login</a>
  <div id="router-view"></div>
  
  <script>
    const routerView = document.querySelector('#router-view');
    
    window.addEventListener('hashchange', () => {
      console.log('location', location.hash)
      switch(location.hash) {
        case '#home':
          routerView.textContent = 'Home';
          break;
        case '#login':
          routerView.textContent = 'Login';
          break
        default:
          routerView.textContent = 'default';
      }
    });
  </script>
  ```

- `hash` 模式的优缺点
  
  - 优点：浏览器兼容性好
  - 缺点：路径上多了 `#`，不像一个真实的路径



#### history 模式

- `history` 接口是 HTML5 新增的，通过匹配 `location.pathname` 来渲染不同内容

- 跳转方法

  - `replaceState()`：替换原来的路径，不会产生历史记录
  - `pushState()`：使用新的路径
  - `popState()`：路径的回退
  - `go()`：向前或向后改变路径
  - `forward`：向前改变路径
  - `back`：向后改变路径

  ```html
  <a href="/home">Home</a>
  <a href="/login">Login</a>
  <div id="router-view"></div>
  
  <script>
    const routerView = document.querySelector('#router-view');
    const aTagList = document.querySelectorAll('a');
  
    function historyChange() {
      switch (location.pathname) {
        case '/home':
          routerView.textContent = 'Home';
          break;
        case '/login':
          routerView.textContent = 'Login';
          break;
        default:
          routerView.textContent = 'default';
      }
    }
  
    aTagList.forEach(a => {
      const href = a.getAttribute('href');
  
      a.addEventListener('click', (e) => {
        e.preventDefault();
        history.pushState({}, '', href);
        historyChange();
      });
    });
  
    window.addEventListener('popstate', historyChange);
  </script>
  ```



## 认识 Vue Router

- Vue Router 是 Vue.js 的官方路由，与 Vue.js 核心深度集成
- Vue Router 是基于路由和组件的
  - 路由用于设定访问路径 , 将路径和组件==映射==起来
  - 在单页面应用中 , 页面的路径的改变就是==组件的切换==



## 注册路由

- 安装路由

  ```bash
  npm i vue-router
  ```

- 创建路由映射表

  ```js
  import Test from '../components/Test.vue';
  import Demo from '../components/Demo.vue';
  
  const routes = [
    { path: '/test', component: Test },
    { path: '/demo', component: Demo }
  ];
  ```

- 创建路由对象

  ```js
  import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
  
  import Test from '../components/Test.vue';
  import Demo from '../components/Demo.vue';
  
  const routes = [
    { path: '/test', component: Test },
    { path: '/demo', component: Demo }
  ];
  
  const router = createRouter({
    routes,
    /**
     * 使用 createWebHistory 创建的是 history 模式的路由
     * 使用 createWebHashHistory 创建的是 hash 模式的路由
     */
    history: createWebHistory()
  });
  
  export default router;
  ```

- 全局注册

  ```js
  import { createApp } from 'vue';
  import router from './router';
  
  createApp(App).use(router).mount('#app');
  ```

- 在需要渲染路由组件的地方使用 `<RouterView>` 组件进行占位



## 路由内置组件

### RouterLink

- 用来渲染一个链接的组件，该链接在被点击时会触发导航

- 配置属性

  - `to`：导航目标，一个字符串或配置对象
  - `replace`：导航时使用 `router.replace()` 进行跳转
  - `active-class`：设置激活 a 元素后应用的 `class`

  ```html
  <RouterLink to="/users/1" active-class="router-active" />
  <RouterLink :to="{ path: '/home', replace: true }" />
  ```



### RouterView

用于显示用户当前所处路由的组件，相当于一个==占位符==

```html
<RouterView />
```



## 路由对象的配置

### 重定向

通过 `redirect` 属性可以对路由进行重定向到其他路径

- 以 `path` 进行重定向

  ```js
  const routers = [{ path: '/', redirect: '/home' }];
  ```

- 以 `name` 进行重定向

  ```js
  const routes = [{ path: '/', redirect: { name: 'home' } }];
  ```

- 传入一个函数，动态进行重定向

  ```js
  const routes = [
    {
      // /search/screens -> /search?q=screens
      path: '/search/:searchText',
      redirect: (to) => {
        // 方法接收目标路由作为参数
        // return 重定向的字符串路径/路径对象
        return { path: '/search', query: { q: to.params.searchText } }
      },
    },
    {
      path: '/search'
    }
  ]
  ```

  

### 懒加载

懒加载：使用 `import()` 使路由组件进行==异步加载==

```js
import Test from '../components/Test.vue';

const routes = [
  { path: '/test', component: () => import('../components/Test.vue') }
];
```



### 命名路由

路由配置可以传入一个 `name` 属性，对路由进行命名

```js
const routers = [{ path: '/', redirect: '/home', name: 'home' }];
```



### 路由元信息

通过 `meta` 属性可以为每个路由存储一些自定义数据，用于后续的获取

```js
const routers = [
  { 
    path: '/',
    // 只有经过身份验证的用户才能访问
    meta: { requiresAuth: true }
  }
];
```



### 404

为所有的==未定义路由==进行拦截，导航到固定组件

```js
const routes = [
  // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
  { 
    path: '/:pathMatch(.*)*', 
    name: 'NotFound',
    component: NotFound
  }
];
```



## 动态路由

- 动态路由：将给定匹配模式的路由映射到同一个组件

  - 定义动态路由

    ```js
    const routes = [
      // 动态字段以冒号开始
      { path: '/users/:id' }
    ];
    ```

  - 导航到该动态路由页面

    ```vue
    <RouterLink to="/users/1" />
    ```

- 获取动态路由参数

  ```html
  <script setup>
  import { useRoute } from 'vue-router';
  
  const { id } = useRoute().params;
  </script>
  ```

- 响应路由参数的变化：可以通过 `watch` 监听路由参数的变化

  ```html
  <script setup>
  import { watch } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  
  watch(
    () => route.params, 
    (params) => {
      /** ... */
      console.log(params);
    }
  );
  </script>
  ```



## 路由嵌套

路由嵌套用于配置==子路由==

```js
const routes = [
  {
    path: '/user/:id',
    component: User,
    children: [
      {
        // 当 /user/:id/profile 匹配成功
        // UserProfile 将被渲染到 User 的 <router-view> 内部
        path: 'profile',
        component: UserProfile
      },
      {
        // 当 /user/:id/posts 匹配成功
        // UserPosts 将被渲染到 User 的 <router-view> 内部
        path: 'posts',
        component: UserPosts
      }
    ]
  }
];
```



## 编程式路由导航

- 借助 router 的实例方法，通过编写代码来实现页面的跳转

- 这些实例方法，与 history API 的跳转方法类似

  ```html
  <script setup>
  import { watch } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  // 跳转
  router.push('/users/eduardo');
  
  // 不保留历史记录跳转
  router.replace({ path: '/home' });
  
  // 向前一步
  router.forward();
  
  // 向后一步
  router.back();
  
  // 指定步数跳转
  router.go(5);
  </script>
  ```



## 路由传参

- `params` 参数（动态路由）

  - 跳转时传递动态 params 参数

    ```html
    <RouterLink to="/users/1" />
    ```

  - 获取参数：通过当前 `route` 对象的 `params` 属性获取

    ```html
    <script setup>
    import { useRoute } from 'vue-router';
    
    const route = useRoute();
    // 获取 params 参数
    console.log(route.params); // { id: 1 }
    </script>
    ```

- `query` 参数（查询字符串）

  - 跳转时传递 query 参数

    ```html
    <script setup>
    import { useRouter } from 'vue-router';
    
    const router = useRouter();
    // 传递 query 参数
    router.push({
      path: '/home',
      query: {
        username: 'Vue'
      }
    });
    </script>
    ```

  - 获取参数：通过当前 `route` 对象的 `query` 属性获取

    ```html
    <script setup>
    import { useRoute } from 'vue-router';
    
    const route = useRoute();
    // 获取 query 参数
    console.log(route.query); // { username: 'Vue' }
    </script>
    ```

    

## 动态管理路由

- 某些情况下，可能需要动态的来添加路由

  - 比如根据用户不同的权限，注册不同的路由

- 动态添加路由：`addRoute()`

  - 传入一个路由对象，默认会在路由表的末端进行追加

    ```js
    router.addRoute({
      path: '/version',
      component: () => import('./pages/version.vue')
    });
    ```

  - 如果要为一个路由添加子路由，需要传入当前路由的 `name` 

    ```js
    router.addRoute('about', {
      path: '/version',
      name: 'version',
      component: () => import('./pages/version.vue')
    });
    ```

- 动态删除路由：`removeRoute()`

  ```js
  router.removeRoute('version');
  ```

- 获取一个包含所有路由记录的数组：`getRoutes()`



## 导航守卫

- 导航守卫主要用来通过跳转或取消的方式守卫导航
- 完整的导航解析流程
  - 导航被触发
  - 在失活的组件里调用 `beforeRouteLeave` 守卫
  - 调用全局的 `beforeEach` 守卫
  - 在重用的组件里调用 `beforeRouteUpdate` 守卫(2.2+)
  - 在路由配置里调用 `beforeEnter`
  - 解析异步路由组件
  - 在被激活的组件里调用 `beforeRouteEnter`
  - 调用全局的 `beforeResolve` 守卫
  - 导航被确认
  - 调用全局的 `afterEach` 钩子
  - 触发 DOM 更新
  - 调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入



>全局的前置守卫

全局的前置守卫 `beforeEach` 是在导航触发时会被回调的

- 它有两个参数

  - `to`：即将进入的路由 Route 对象
  - `from`：即将离开的路由 Route 对象

- 返回值

  - `false`：取消当前导航
  - 无返回值：进行默认导航
  - 返回一个路由地址

- 实例：身份验证

  ```html
  <script setup>
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  
  // 全局前置守卫
  router.beforeEach((from, { path }) => {
    if (path === '/login') return;
  
    const token = sessionStorage.getItem('TOKEN');
    // 未登录，导航至登录页进行登录操作
    if (!token) return '/login'
  });
  </script>
  ```
