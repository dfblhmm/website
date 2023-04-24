---
id: Vue
title: Vue
---
# Vue

## 认识 Vue

### Vue 定义

- Vue 是一套用于==构建用户界面==的==渐进式 JavaScript 框架==

  - 全称是 Vue.js 或 Vuejs
  - 它基于标准 HTML、CSS 和 JavaScript 构建，并提供了一套声明式的、组件化的编程模型
  - 帮助开发者高效地开发用户界面，无论任务是简单还是复杂


- 核心概念：==数据驱动视图==



### 声明式编程

- 原生开发和 Vue 开发的模式是完全不同的，属于==命令式编程== 和 ==声明式编程== 两种不同的开发模式
  - 命令式编程关注的是 **"how to do"**，自己完成整个 how 的过程
  - 声明式编程关注的是 **”what to do"**，由框架完成 how 的过程
- 在原生的实现过程中，操作过程
  - 每完成一个操作，都需要通过 JavaScript 编写一些代码，来给浏览器一个指令
  - 这种编写代码的过程，称之为命令式编程
  - 在早期的原生 JavaScript 和 jQuery 开发的过程中，都是通过这种命令式的方式
- 在 Vue 的实现过程中，操作过程
  - 在 createApp 传入的对象中声明需要的内容，模板（template）、数据（data）、方法（methods）
  - 这种编写代码的过程，称之为声明式编程
  - 目前 Vue、React、Angular、小程序的编程模式，都是属于声明式编程



### MVVM 模型
- MVC 和 MVVM 都是一种软件的体系结构

  - MVC（Model View Controller），是在前期被使用非常框架的架构模式，比如 iOS、前端
  - MVVM（Model View ViewModel），是目前非常流行的架构模式

- Vue 官方说明：Vue 虽然并没有完全遵守 MVVM 的模型，但是整个设计是受到它的启发

  <img src="./images/image-20230319005541558.png" alt="image-20230319005541558" style="zoom:80%;" />





## 模板语法

### Mustache 语法
- 将数据插入到模板中，使用的是 **“Mustache”** 语法 (即双大括号 `{{}}`)

- 可以使用 **data** 中的数据，也可以使用 JavaScript ==表达式==

  ```html
  <div id="root">
    <!-- 基本插值语法 -->
    <div>{{ message }}</div>
    <!-- 插入一个表达式 -->
    <div>{{ Math.pow(count, 2) }}</div>
    <!-- 调用methods方法 -->
    <div>{{ reverse() }}</div>
  </div>
  
  <script>
    const App = {
      data() {
        return {
          message: 'Hello Vue!',
          count: 10
        }
      },
      methods: {
        reverse() {
          return this.message.split(' ').reverse().join(' ');
        }
      }
    };
  
    Vue.createApp(App).mount('#root');
  </script>
  ```



### v-bind 属性绑定

`v-bind` 用于动态绑定 **attribute**，也可以是组件的 **prop**

#### 绑定基本属性

- 绑定语法：`v-bind:属性名 = "属性值"`

  - 缩写：`:属性名 = "属性值"`

  ```vue
  <!-- 完整写法, id来自动态数据 -->
  <h2 v-bind:id="id">111</h2>
  <!-- 语法糖 -->
  <h3 :title="'h2'">222</h3>
  ```

- 动态绑定属性：==属性名==是动态确定的

  ```vue
  <!-- key的值来自动态的数据 -->
  <h2 :[key]="222">2222</h2>
  ```

- 绑定指定对象的所有属性：`v-bind = "obj"`

  ```vue
  <div v-bind="{ id: 'aa', title: 'div' }">3333</div>
  ```

  

#### 绑定 class

- 对象语法：`{ 类名: 布尔值 }`；为 **true** 则添加该类名，为 **false** 则移除该类名

  ```vue
  <div class="static" :class="{ active: true, show: false }">111</div>
  ```

- 数组语法

  ```vue
  <div :class="['active', { show: true }]">222</div>
  ```

  

#### 绑定 style

- 对象语法

  - CSS 属性名可以是==驼峰标识==，也可以使用 `-` 连接（属性名需要加 `""`）
  - 属性值不是变量时要使用字符串表示，否则会解析为变量

  ```vue
  <div :style="{ fontSize: '30px', 'background-color': 'orange' }">Style</div>
  ```

- 数组语法

  ```vue
  <div :style="[{ fontSize: '30px' }, { 'background-color': 'orange' }]">Style</div>
  ```

  



### v-on 事件绑定

`v-on` 用于为元素绑定事件监听

#### 绑定语法

- 语法：`v-on:事件名 = "methods处理函数"`

  - 简写：`@事件名 = "methods处理函数"`

  ```vue
  <h2>{{ count }}</h2>
  <button v-on:click="add">+1</button>
  <button @click="sub">-1</button>
  ```

- 绑定多个事件

  ```vue
  <div @click="add" @mouseout="sub">+1</button>
  <div v-on="{ click: add, mouseout: sub }">+1</button>
  ```

  

#### 参数传递

- 如果方法不需要额外参数，方法后可以不添加 `()`

  ```vue
  <button v-on:click="add">+1</button>
  ```

- 如果需要显式地获取浏览器封装的==事件对象 Event==，可以使用 `$event` 进行访问

  ```vue
  <div @click="handleClick($event, 11)">333</div>
  ```

  

#### 事件修饰符

- 事件修饰符修饰符相当于对事件进行了一些特殊的处理

- 常用修饰符

  - `.stop`：自动调用 event.stopPropagation
  - `.prevent`：自动调用 event.preventDefault
  - `.{keyAlias}`： 仅当事件是从特定键触发时才触发回调

  ```vue
  <div>
    <!-- 自动阻止冒泡 -->
    <button @click.stop="add">+1</button>
    <!-- 表单输入时按下回车键触发 -->
    <input @keyup.enter="add">
  </div>
  ```





### 条件渲染

- 某些情况下，需要根据当前的条件决定某些元素或组件是否渲染

- 条件渲染相关的指令

  - `v-if`
  - `v-else`
  - `v-else-if`
  - `v-show`

  ```vue
  <h2 v-if="score > 90">A</h2>
  <h2 v-else-if="score > 80">B</h2>
  <h2 v-else-if="score > 60">C</h2>
  <h2 v-else>D</h2>
  ```

- **v-if** 和 **v-show** 区别

  - `v-if` 为 false 时，DOM 元素都不会被渲染
  - `v-show` 为 false 时，只是设置了 `display: none`，DOM 元素还是会被渲染
  - 如果需要在显示和隐藏之间频繁的切换，使用 **v-show**，只判断一次选择 **v-if**



### v-for 列表渲染

- 基本格式：`v-for = "item in 数据"`

  - 也可以使用 `of` 代替 `in`，实际效果一样

- `v-for` 支持的数据类型

  - 对象

    ```vue
    <div v-for="(value, key, index) in { name: 'Arril', age: 18 }">
      {{ key }} - {{ value }}
    </div>
    ```

  - 可迭代对象

    ```vue
    <ul>
      <li v-for="item in ['a', 'b', 'c']">{{ item }}</li>
    </ul>
    ```

- 使用 **v-for** 进行列表渲染时，官方建议给元素或者组件绑定一个 `key` 属性

  - **key** 属性主要用于 Vue 的 ==虚拟 DOM  的 diff 算法== ，在新旧 nodes 对比时辨识 ==VNodes==（虚拟节点）
  - 如果不使用 key，Vue 会使用一种最大限度减少动态元素、并且尽可能复用相同类型元素的算法
  - 而使用 key 时，会基于 key 的变化重新排列元素顺序，并且会销毁 key 不存在的元素



### v-model 双向绑定

#### v-model 作用

- 在前端处理表单时，常常需要将表单输入框的内容同步给 JavaScript 中相应的变量

  ```vue
  <!-- v-model实现原理 -->
  <input
    :value="text"
    @input="event => text = event.target.value">
  ```

- `v-model` 指令简化了这一步骤

  ```vue
  <input v-model="text">
  ```



#### v-model 绑定表单

>

- 文本 `input`

  ```vue
  <p>Message is: {{ message }}</p>
  <input v-model="message" placeholder="edit me" />
  ```

- 多行文本 `textarea`

  ```vue
  <span>Multiline message is:</span>
  <p style="white-space: pre-line;">{{ message }}</p>
  <textarea v-model="message" placeholder="add multiple lines"></textarea>
  ```

- 复选框 `checkbox`

  - 单一复选框

    ```vue
    <input type="checkbox" id="checkbox" v-model="checked" />
    <label for="checkbox">{{ checked }}</label>
    ```

  - 多选复选框

    ```vue
    <template>
      <div>Checked names: {{ checkedNames }}</div>
    
      <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
      <label for="jack">Jack</label>
    
      <input type="checkbox" id="john" value="John" v-model="checkedNames">
      <label for="john">John</label>
    
      <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
      <label for="mike">Mike</label>
    </template>
    
    <script>
      export default {
        data() {
          return {
            checkedNames: []
          }
        }
      }
    </script>
    ```

- 单选按钮 `radio`

  ```vue
  <div>Picked: {{ picked }}</div>
  
  <input type="radio" id="one" value="One" v-model="picked" />
  <label for="one">One</label>
  
  <input type="radio" id="two" value="Two" v-model="picked" />
  <label for="two">Two</label>
  ```

- 选择器 `select`

  ```vue
  <div>Selected: {{ selected }}</div>
  
  <select v-model="selected">
    <option disabled value="">Please select one</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  ```



#### 修饰符

- `.lazy`：将触发事件修改为 **change** 事件，默认为 **input** 事件
- `.number`：让用户输入自动转换为数字
- `.trim`：默认自动去除用户输入内容中两端的空格





### template 元素

- 如果想要对多个元素应用指令，又不想多渲染一层 DOM 元素

- 可以使用 `template` 元素，该元素真实渲染时不会被渲染出来，类似 React 中的 `Fragment`

  ```vue
  <template v-if="count > 15">
    <h2>{{count}}</h2>
  </template>
  ```



### 其他指令

#### v-once 指令

`v-once` 用于指定元素或者组件只渲染一次

- 当数据发生变化时，元素或组件以及其所有的子元素将视为==静态内容==，并且跳过更新。该指令可以用于性能优化

  ```vue
  <h2 v-once>{{ count }}</h2>
  <button @click="count++">+1</button>
  ```

- 如果是子节点，也只会渲染一次

  ```vue
  <div v-once>
    <h2 v-once>{{ count }}</h2>
  	<button @click="count++">+1</button>
  </div>
  ```



#### v-text 指令

`v-text` 用于指定元素 **textContent**，会覆盖元素中所有现有的内容

```vue
<div v-text="Math.pow(count, 2)"></div>
```



#### v-html 指令

`v-html` 用于指定元素的 **innerHTML**，会覆盖元素中所有现有的内容

```vue
<div v-html="'<span>11</span>'"></div>
```



#### v-pre 指令

`v-pre` 用于跳过该元素及其所有子元素的编译

- 使用该指令后可以显示原始双大括号标签及内容

```vue
<span v-pre>{{ this will not be compiled }}</span>
```



#### v-cloak 指令

`v-cloak` 用于隐藏尚未完成编译的 DOM 模板

- 当使用直接在 DOM 中书写的模板时，用户可能先看到的是还没编译完成的双大括号标签，直到挂载的组件将它们替换为实际渲染的内容
- 该指令还需要配合 `[v-cloak] { display: none }` 的 CSS 规则

```vue
<style>
  [v-cloak] {
    display: none;
  }
</style>

<div v-cloak>{{ count }}</div>
```



#### v-memo 指令

`v-memo` 用于缓存一个模板的子树，直到其依赖的数据发生更新

- 该指令一定程度上可以减少计算次数，提高渲染性能

```vue
<div v-memo="[count, message]">
 	{{ Math.pow(count, 2) }} - {{ message }}
</div>
```





## Options API

### data

`data` 是用于声明组件初始响应式状态的==函数==

- 该函数应当返回一个普通 JavaScript 对象，Vue 会将它转换为==响应式==对象
- 组件实例代理了该数据对象上所有的属性
- 当数据发生变化时，引用的模板片段会自动刷新

```vue
<template>
	<h2>{{ count }}</h2>
	<button @click="count++">+1</button>
</template>

<script>
  export default {
    data() {
      return {
        count: 0
      }
    }
  }
</script>
```



### methods

`methods` 用于声明要混入到组件实例中的方法

- 声明的方法可以直接通过组件实例访问，或者在模板语法表达式中使用
- 所有的方法都会将它们的 `this` 上下文自动绑定为==组件实例==
- 在声明方法时避免使用箭头函数，因为它们不能通过 `this` 访问组件实例

```vue
<template>
  <h2>{{ count }}</h2>
  <button @click="add">+1</button>
</template>

<script>
  export default {
    data() {
      return {
        count: 0
      }
    },
    methods: {
      add() {
        this.count++;
      }
    }
  }
</script>
```



### computed

`computed` 用于声明要在组件实例上暴露的计算属性

- 官方推荐使用**计算属性**来描述依赖响应式状态的复杂逻辑

  ```vue
  <template>
  	<h2>{{ fullName }}</h2>
  </template>
  
  <script>
    export default {
      data() {
        return {
          firstName: 'Avril',
          lastName: 'Lavigne'
        }
      },
      computed: {
        fullName() {
          return this.firstName + this.lastName;
        }
      }
    }
  </script>

- 计算属性会基于==依赖==关系进行==缓存==，如果采用 **methods** 来实现计算，每次都会重新计算

  ```vue
  <template>
  	<!-- 使用两次，只会进行一次计算 -->
  	<h2>{{ fullName }}</h2>
  	<h2>{{ fullName }}</h2>
  
  	<!-- 使用两次，每次都会计算 -->
  	<h2>{{ getFullName() }}</h2>
  	<h2>{{ getFullName() }}</h2>
  </template>
  
  <script>
    export default {
      data() {
        return {
          firstName: 'Avril',
          lastName: 'Lavigne'
        }
      },
      methods: {
        getFullName() {
          return this.firstName + this.lastName;
        }
      },
      computed: {
        fullName() {
          return this.firstName + this.lastName;
        }
      }
    }
  </script>
  ```

- 在大多数情况下，计算属性只需要一个 **getter** 方法 即可

  - 所以通常将计算属性直接写成一个函数
  - 实际上计算属性也可以进行 **getter** 和 **setter** 的同时控制

  ```vue
  <script>
    export default {
      data() {
        return {
          firstName: 'Avril',
          lastName: 'Lavigne'
        }
      },
      computed: {
        fullName: {
          get() {
          	return this.firstName + this.lastName;
          },
          set(newValue) {
            // ......
          }
        }
      }
    }
  </script>
  ```



### watch

`watch` 可以在每次响应式属性发生变化时触发一个函数

- 可以为数据添加监听器，监听其改变

  ```vue
  <template>
  	<input @oninput="handleInput" :value="search">
  </template>
  
  <script>
    export default {
      data() {
        return {
          search: '',
          info: { name: 'Avril' }
        }
      },
      methods: {
        handleInput({ target }) {
          this.search = target.value;
        }
      },
      watch: {
        // 每当 search 改变时，这个函数就会执行
        search(newValue, oldValue) {
          console.log(newValue, oldValue);
        },
        // watch 选项也支持把键设置成用 . 分隔的路径
        'info.name'(newValue) {
          // ...
        }
      }
    }
  </script>
  ```

- 监听器的其他选项

  - `deep`：默认是浅层监听
    - 被侦听的属性，仅在被赋新值时，才会触发回调函数——而嵌套属性的变化不会触发
    - 设置 `deep: true` 则可以监听响应对象深层的属性
  - `immediate`：在创建侦听器时，立即执行一遍回调
  - `flush`：默认情况下，创建的侦听器回调，都会在 Vue 组件==更新之前==被调用
    - 这意味着在侦听器回调中访问的 DOM 将是被 Vue 更新之前的状态
    - 设置 `flush: 'post'`  可以在侦听器回调中能访问被 Vue ==更新之后==的 DOM

- 可以使用组件实例的 `$watch()` 方法来命令式地创建一个侦听器

  ```vue
  <script>
    export default {
      created() {
        // 创建一个侦听器
        const unwatch = this.$watch('question', (newQuestion) => {
          // ...
        }, { immediate: true });
      }
    }
  </script>
  ```

- 添加的侦听器，会在宿主组件卸载时自动停止。也可以手动取消

  ```vue
  <script>
    export default {
      created() {
        const unwatch = this.$watch('foo', callback);
        // ...当该侦听器不再需要时
        unwatch();
      }
    }
  </script>
  ```

  



## 组件化
