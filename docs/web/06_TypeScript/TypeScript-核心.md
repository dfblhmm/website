---
id: ts-core
title: 核心
---

# TypeScript

## 认识 TypeScript

### 类型缺失的 JavaScript

- 其实上由于各种历史因素，JavaScript 语言本身存在很多的缺点

  - 随着 ECMAScript 不断提出的新特性，让这门语言更加现代、更加安全、更加方便
  - 然而到目前为止，JavaScript 在==类型检测==上依然是毫无进展

- 缺失类型带来的问题

  <img src="./images/image-20230921224923974.png" alt="image-20230921224923974" style="zoom: 67%;" />

  - 无法在==代码编译期间==就发现代码错误，许多错误必须要等到==代码执行==时才能发现
  - 对于工具/框架的开发者，无法给使用者提供==类型提示==，还需要对各种==错误边界==进行处理
  - 尤其是对于 JavaScript 这一单线程语言而言，错误会导致后续的代码都无法执行

- 为了弥补 JavaScript 类型约束上的缺陷，许多公司推出了自己的方案
  - 2014 年，Facebook 推出了 ==flow== 来对 JavaScript 进行类型检查
  - 同年，Microsoft 也推出了 ==TypeScript== 1.0 版本
  - 目前，TypeScript 已经成为了最为流行的 JavaScript 超集
  
  

### TypeScript 定义和特点

> 定义

<img src="./images/image-20230921230239701.png" alt="image-20230921230239701" style="zoom:50%;" />

- 官方定义：TypeScript is **JavaScript with syntax for types**
- TypeScript 是拥有==类型==的 JavaScript ==超集==



> 特点

- 始于 JavaScript，归于 JavaScript

  - 基于 JavaScript 进行构建，包含 JavaScript 的所有语法特性
  - 可以编译成==普通==、==干净==、==完整==的 JavaScript 代码

- 拥有先进的 JavaScript

  - 包含 ECMAScript 和 ==未来提案== 中的特性
  - 对原有的 JavaScript 进行了==语法扩展==，同时也可以编译成==向下兼容==的代码

- 是一个强大的工具，用于构建大型项目
  - ==静态语法分析==可以实时分析代码错误
  - 类型是可选的，强大的==类型推导==能力
  
  

### TypeScript 运行环境

- 方案一：使用 `ts-node` 工具（Node.js 环境）

  ```shell
  # 对于 ts-node 工具包，全局安装即可
  npm i -g ts-node tslib @types/node
  # 运行 ts 文件
  ts-node index.ts
  ```

- 方案二：使用 `webpack` 搭建环境（浏览器环境）

  ```typescript
  import { resolve } from "path";
  import { Configuration } from "webpack";
  import HtmlWebpackPlugin from "html-webpack-plugin";
  
  const config: Configuration = {
    mode: "development",
    devtool: "source-map",
    entry: "./src/index.ts",
    output: {
      filename: "bundle.js",
      path: resolve(__dirname, "./build")
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: "ts-loader"
        }
      ]
    },
    resolve: {
      extensions: [".ts", "..."]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: resolve(__dirname, "./index.html")
      })
    ]
  };
  
  export default config;
  ```





## 变量声明

### 类型注解

- 在 TypeScript 定义变量（标识符）和 ES6 之后一致，可以使用 `var/let/const` 来定义

- 在 TypeScript 中定义变量需要指定标识符的==类型==

  - 声明了类型后 TypeScript 就会进行==类型检测==，声明的类型可以称之为==类型注解==

  - 完整的声明格式

    ```typescript
    var/let/const 标识符: 数据类型 = 赋值;
    ```

  - TSLint 不推荐使用 `var` 来声明变量

- 在 TypeScript 中的数据类型与 JavaScript 中数据的包装类型是两个不同的概念

  ```typescript
  /*
  * string: TypeScript中字符串的类型
  * String: JavaScript中字符串的包装类
  */
  const str: string = 'Hello, TypeScript!';
  ```



### 类型推导

- 变量==初始化==值时，TypeScript 会根据初始化的值进行==类型推导==，自动推导出变量的类型

  ```typescript
  /*
  * message 变量会自动推导为 string 类型
  */
  let message = "Hello World!";
  
  // Error: 不能将类型“number”分配给类型“string”
  message = 22;
  ```

- 使用 `let` 声明推导出来的类型比 `const` 更为宽泛

  <img src="./images/image-20231001000131360.png" alt="image-20231001000131360" style="zoom: 80%;" />

  ```typescript
  /*
  * message 变量推导为 string 类型
  */
  let message = "Hello World";
  
  /*
  * age 变量推导为字面量类型 18
  */
  const age = 18;
  ```





## 数据类型

### JavaScript 类型

#### number

- 与 JavaScript 一样，TypeScript 不区分整数类型和浮点型，统一为 `number` 类型

  ```typescript
  const num: number = 10;
  ```

- TypeScript 同样支持二进制、八进制、十六进制的表示

  ```typescript
  const n1: number = 0b101;
  const n2: number = 0o123;
  const n3: number = 0xff;
  ```



#### bigint

- `bigint` 用于表示绝对值大于或等于 2^53^ 的数字

  ```typescript
  const number: bigint = 12345678900000001n;
  ```

- 使用 `typeof` 测试时，返回 `"bigint"`

  ```typescript
  typeof 1n === "bigint"; // true
  ```



#### boolean

`boolean` 类型只有两个取值：`true` 和 `false`

```typescript
let flag: boolean = true;
flag = Date.now() % 2 === 0;
```



#### string

`string` 类型表示字符串类型，可以使用单引号或者双引号表示

```typescript
const message: string = "Hello World";
```



#### null / undefined

- 在 JavaScript 中，`undefined` 和 `null` 是两个基本数据类型

- 在TypeScript中，它们既是实际的值，也是自己的类型

  ```typescript
  const s1: null = null;
  const s2: undefined = undefined;
  ```



#### symbol

`symbol` 表示符号类型，用于生成一个独一无二的值

```typescript
const t1 = Symbol('title');
const t2 = Symbol('title');

const info = {
  [t1]: 'a',
  [t2]: 'b'
};
```



#### Array

- `Array` 用于表示数组类型，数组中存放的元素属于同一类型

- 数组类型存在两种定义方式

  - `类型[]` 方式

    ```typescript
    const arr: number[] = [1, 2, 3];
    ```

  - `Array<类型>` 方式（泛型）

    ```typescript
    const arr: Array<string> = ['JavaScript', 'TypeScript'];
    ```



#### object

- `object` 表示对象类型，但是此类型约束表示的是==空对象==，无法添加属性和方法

  ```typescript
  const info: object = {};
  /*
  * 类型“object”上不存在属性“name”
  */
  info.name = '';
  ```

- 通常使用接口 `interface` 来约束对象的属性和行为

  ```typescript
  interface Info {
    name: string;
    age: number;
  }
  
  const info: Info = {
    name: 'Avril',
    age: 17
  };
  ```



### TypeScript 类型

#### any

- 无法确定一个变量的类型，并且可能它会发生一些变化，这种情况使用 `any` 类型

- 一旦使用了 `any` 类型，TS 会关闭对其的类型检测

  - 此时所有的操作都变成合法的
  - 这会带来类型安全问题，要尽量避免使用 `any` 类型

  ```typescript
  const num: any = 10;
  /*
  * 类型安全隐患
  */
  num.length = 10;
  num.split('');
  ```

- `any` 类型的变量可以赋值给任意类型

  ```typescript
  let a: any = "str";
  a = 123;
  a = false;
  ```



#### unknown

- `unknown` 类型用于描述类型==不确定==的变量

  - 与 `any` 相反，其做任何操作都是==不合法==的
  - 必须要先进行类型缩小后，才可以进行对象类型的操作

  ```typescript
  function foo(variable: unknown) {
    if (typeof variable === "number") {
      console.log(variable.toFixed(2));
    } else if (typeof variable === 'string') {
      variable.split(' ');
    }
  }
  ```

- 只能赋值给 `any` 和 `unknown` 类型，防止去干扰其他==确定的类型==

  ```typescript
  let b: unknown;
  /**
   * 不能将类型“unknown”分配给类型“string”
   */
  const c: string = b;
  ```

  

#### void

- `void` 通常用来指定一个函数是==没有返回值==

  - 可以将 `undefined` 赋值给 `void` 类型

  ```typescript
  function foo(): void {
    console.log(11);
    return undefined;
  }
  ```

- 当基于==上下文==的类型推导出返回类型为 void 的时候，并不会强制函数一定不能返回内容

  ```typescript
  const numbers = [1, 2, 3];
  /**
   * forEach 传入的回调函数没有返回值，但在此处也可以返回值
   */
  numbers.forEach(n => n.toFixed(2));
  ```



#### never

- `never` 表示永远不会发生值的类型

  - 比如一个函数中是一个死循环或者抛出一个异常，此时函数无返回值，可以指定为 `never` 类型

  ```typescript
  function throwError(): never {
    throw new Error('error');
  }
  ```

- 应用场景：强制完成类型穷举

  ```typescript
  /**
   * 接收 string/number 类型参数，强制对类型进行完整穷举
   */
  function getType(variable: string | boolean) {
    switch (typeof variable) {
      case 'string':
        console.log('string类型');
        break;
      default:
        /**
         * 编译时就会报错 (不能将类型“boolean”分配给类型“never”)
         * 强制要求完成类型穷举
         */
        const extract: never = variable;
    }
  }
  ```

  

#### tuple

- `tuple` 表示==元组==类型(固定长度的数组)

  - 相比数组，元组可以存放不同类型的元素，并且可以指定每一个元素的类型
  - 元组中每个元素都有自己特定的类型，根据索引值获取到的值可以得到确定的类型

  ```typescript
  const tuple: [string, number] = ['aaa', 11];
  const [str, num] = tuple;
  
  console.log(str.charAt(1));
  console.log(num.toFixed(2));
  ```

- 元组类型通常用于指定==函数返回值==的类型

  ```typescript
  function useState<T>(init: T): [T, (v: T) => void] {
    const state = init;
    const setState = (newValue: T): void => {};
  
    return [state, setState];
  }
  ```





## 类型系统

### 类型别名和接口

> 类型别名 type

- 类型别名使用 `type` 关键字，可以对需要复用的类型进行抽取

  ```typescript
  type IDType = string | number;
  const variable: IDType = 11;
  ```



> 接口 interface

- 接口使用 `interface` 关键字，主要用于声明对象类型

  ```typescript
  interface Info {
    name: string;
    id: string;
  }
  ```

- 对于对象类型，使用 `?` 可以声明==可选==属性，可选属性是声明类型和 `undefined` 的联合类型

  ```typescript
  interface Position {
    x: number;
    y: number;
    z?: number;
  }
  
  const position2d: Position = { x: 100, y: 100 };
  const position3d: Position = { x: 100, y: 100, z: 100 };
  ```



> 类型别名和接口区别

- 类型别名通常用于定义 ==非对象==类型，接口通常用于定义对象类型

  - 类型别名可以声明任意类型
  - 接口只能声明对象类型和函数签名

- 类型别名不可重复声明

  - 接口可以==重复声明==，且类型声明会进行合并
  - 合并时，同一属性的类型需要相同

  ```typescript
  interface Person {
    name: string;
  }
  
  interface Person {
    age: number;
  }
  
  const person: Person = {
    name: 'Avril',
    age: 17
  };
  ```

- 接口可以使用==继承== 等扩展语法



### 联合类型

- 联合类型是由两个或者多个其他类型组成的类型，使用 `|` 操作符

  - 表示可以是这些类型中的任何一个值
  - 联合类型中的每一个类型被称之为联合成员

  ```typescript
  interface Info {
    id: string | number;
    name: string;
  }
  
  const info: Info = { id: 10, name: 'Enemy' };
  const info2: Info = { id: '_10032104', name: 'Airwaves' };
  ```

- 在使用联合类型的变量时，需要进行==类型缩小==后再使用

  ```typescript
  function getLength(id: string | number) {
    if (typeof id === 'string') {
      return id.length;
    }
    return id.toString().length;
  }
  ```



### 交叉类型

- 交叉类型表示需要==同时满足==多个类型的条件，使用 `&` 操作符

  - 使用交叉类型，在定义类型时可以对原有类型进行扩展

  ```typescript
  interface Info {
    name: string;
    color: string;
  }
  
  interface IAction {
    run: () => void;
  }
  
  const dog: IAction & Info = {
    name: '小白',
    color: 'white',
    run() {
      console.log(`${this.name} is running!`);
    }
  }
  ```

- 对两个无交集的类型进行交叉，会得到 `never` 类型

  ```typescript
  /**
   * type ID = never
   */
  type ID = number & string;
  ```

- 对两个联合类型进行交叉，会取==交集==

  ```typescript
  type T1 = number | string;
  type T2 = string | boolean;
  
  /**
   * type T = string
   */
  type T = T1 & T2;
  ```

  

### 类型断言

- 使用 `as` 关键字进行类型断言，可以缩小类型范围

  ```typescript
  /**
   * 将 Element 类型断言为 HTMLDivElement
   */
  const div = document.querySelector('#root') as HTMLDivElement;
  ```

- 只允许类型断言转换为 **更具体** 或者 **不太具体** 的类型范围

  ```typescript
  /**
   * 向更具体的类型进行断言
   */
  const v1: string | undefined = '11';
  const v2 = v1 as string;
  
  /**
   * 向更宽泛的类型进行断言(不推荐，可能出现类型安全问题)
   */
  const v3: string = '22';
  const v4 = v3 as any;
  ```

- 使用 `!` 可以进行==非空断言==，去除类型中的 `undefined/null` 类型

  - 除非确定值一定存在，否则非空断言会导致类型安全问题

  ```typescript
  /**
   * 去除获取的 null 类型
   */
  const { scrollTop } = document.querySelector('div')!;
  ```



### 字面量类型

- 字面量类型类似于==枚举==，将取值在有限的范围内

  - 字面量类型结合联合类型，可以实现枚举的效果，并且可以获取很好的代码提示

  ```typescript
  type Direction = 'left' | 'right';
  
  function action(direction: Direction) {
    if (direction === 'left') {
      console.log('Turn Left');
    } else {
      console.log('Turn Right');
    }
  }
  ```

- 对象在进行字面量推理的时候，会推导为==更通用==的类型

  - 添加 `as const` 可以强制推导成字面量类型

  ```typescript
  /**
   * const info: {
      readonly name: "Avril";
      readonly age: 17;
    }
   */
  const info = {
    name: 'Avril',
    age: 17
  } as const;
  ```



### 类型缩小

类型缩小旨在将==不确定的类型==向==确定的类型==缩小

> typeof

- 在 TypeScript 中，`typeof` 是一种类型保护

  - 在 `typeof` 的条件作用域内，类型会被缩小约束

  ```typescript
  function getLength(id: string | number) {
    if (typeof id === 'string') {
      return id.length;
    }
    return id.toString().length;
  }
  ```

- 除了能用于类型保护外，`typeof` 还可以获取一个标识符的类型，起到==提取类型==的作用

  ```typescript
  const info = {
    name: 'Avril',
    age: 17
  };
  
  /**
   * type ID = {
      name: string;
      age: number;
    }
   */
  type ID = typeof info;
  ```



> 平等缩小

使用 `switch` 或相等的一些运算符（`===`、`!==`）来表达相等性

```typescript
function action(direction: 'left' | 'right') {
  if (direction === 'left') {
    console.log('Turn Left');
  } else {
    console.log('Turn Right');
  }

  switch (direction) {
    case 'left':
      console.log('Turn Left');
      break;
    case 'right':
      console.log('Turn Right');
  }
}
```



> instanceof

使用 `instanceof` 检查一个值是否是另一个值的 ==实例==

```typescript
function validateJson(json: string) {
  try {
    return true;
  } catch (error) {
    return error as Error;
  }
}

const result = validateJson("{}")

if (result instanceof Error) {
  console.log(result.message);
}
```



> in

`in` 操作符用于确定对象是否具有给定名称的属性

```typescript
interface Teacher {
  teaching: () => void;
}

interface Student {
  studying: () => void;
}

function action2(person: Teacher | Student) {
  if ('studying' in person) {
    /**
     * 此作用域内确定为 Student 类型
     */
    person.studying();
  } else {
    /**
     * 此作用域内确定为 Teacher 类型
     */
    person.teaching();
  }
}
```





## 函数类型
