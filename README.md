## 搭建一个 nodejs 下开发 typescript 项目的基本框架

### 开发编辑器
建议使用 VSCode

### 代码检查
最基本的使用 eslint 做语法上的规范
代码风格使用 Prettier
最终使用 AlloyTeam 的 ESLint 配置（依赖且兼容于 Prettier）

### 使用 AlloyTeam 的 ESLint 配置
安装代码
```
npm install --save-dev typescript ts-node @types/node eslint  @typescript-eslint/parser @typescript-eslint/eslint-plugin  prettier eslint-config-alloy 
```


然后在项目根目录下创建 .eslintrc.js 文件为 eslint 的配置文件
```
module.exports = {
    extends: [
        'alloy',
        'alloy/typescript',
    ],
    env: {
        // 这里填入你的项目用到的环境
        // 它们预定义了不同环境的全局变量，比如：
        //
        // browser: true,
        // node: true,
        // mocha: true,
        // jest: true,
        // jquery: true
    },
    globals: {
        // 这里填入你的项目需要的全局变量
        // false 表示这个全局变量不允许被重新赋值，比如：
        //
        // myGlobal: false
    },
    rules: {
        // 这里填入你的项目需要的个性化配置
    }
};
```

然后在项目根目录下创建 .prettierrc.js 文件为 Prettier 的配置文件
```
module.exports = {
    // 一行最多 100 字符
    printWidth: 100,
    // 使用 2 个空格缩进（ 个人习惯 ）
    tabWidth: 2,
    // 不使用缩进符，而使用空格
    useTabs: false,
    // 行尾需要有分号
    semi: true,
    // 使用单引号
    singleQuote: true,
    // 对象的 key 仅在必要时用引号
    quoteProps: 'as-needed',
    // jsx 不使用单引号，而使用双引号
    jsxSingleQuote: false,
    // 末尾不需要逗号
    trailingComma: 'none',
    // 大括号内的首尾需要空格
    bracketSpacing: true,
    // jsx 标签的反尖括号需要换行
    jsxBracketSameLine: false,
    // 箭头函数，只有一个参数的时候，也需要括号
    arrowParens: 'always',
    // 每个文件格式化的范围是文件的全部内容
    rangeStart: 0,
    rangeEnd: Infinity,
    // 不需要写文件开头的 @prettier
    requirePragma: false,
    // 不需要自动在文件开头插入 @prettier
    insertPragma: false,
    // 使用默认的折行标准
    proseWrap: 'preserve',
    // 根据显示样式决定 html 要不要折行
    htmlWhitespaceSensitivity: 'css',
    // 换行符使用 lf
    endOfLine: 'lf'
};
```

#### vscode 编辑器配置
在项目根目录里创建一个 .vscode 文件夹
然后再  .vscode 里面创建一个 settings.json 文件
输入如下配置
```json
{
    "files.eol": "\n",
    "editor.tabSize": 2, // 设置 tab 键为两个空格（这只是我个人的习惯）
    "editor.formatOnSave": true, // 文件保存时自动格式化
    "editor.defaultFormatter": "esbenp.prettier-vscode", // 将默认的格式化工具设置为 prettier 
    "eslint.autoFixOnSave": true, // 文件保存时自动修复不规范的代码
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        {
            "language": "typescript",
            "autoFix": true // 为 "typescript" 设置为自动修复格式问题
        }
    ],
    "typescript.tsdk": "node_modules/typescript/lib"
}
```

### typescript 基本配置
在安装好基础 npm 包后
就可以在项目根目录下使用如下命令初始化一个 tsconfig.json 作为 typescript 的配置文件
```
npx tsc --init
```

然后就可以修改 tsconfig.json 来做一些自定义的配置
比如：
```
    "compilerOptions": {
        "noUnusedLocals": true,
        "noUnusedParameters": true
    }
```
启用 noUnusedLocals 可以解决有些定义了的变量（比如使用 enum 定义的变量）未使用，ESLint 却没有报错的问题
启用了 noUnusedParameters 之后，只使用了第二个参数，但是又必须传入第一个参数，这就会报错了

```
"compilerOptions": {

  "target": "es2017" /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019' or 'ESNEXT'. */,
  "module": "commonjs" /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */,

  "lib": [
    "es6",
    "es2017",
    "esnext.asynciterable"
  ] /* Specify library files to be included in the compilation. */,
  "outDir": "./dist" /* Redirect output structure to the directory. */,
  "rootDir": "./src" /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */,
  "strict": true /* Enable all strict type-checking options. */,
  "esModuleInterop": true /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
  "noUnusedLocals": true,                /* Report errors on unused locals. */
  "noUnusedParameters": true,            /* Report errors on unused parameters. */
  "declaration": true, // 是否自动创建类型声明

}
   
  "exclude": ["node_modules"],
  "include": ["./src/**/*.tsx", "./src/**/*.ts"]
```

### vscode 基于 ts-node 调试
在 .vscode/launch.json 中可以配置基于 ts-node 的调试：

```
{
  // 使用 IntelliSense 了解相关属性。 
  // 悬停以查看现有属性的描述。
  // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "启动程序",
      // 基于 ts-node 调试
      "program": "${workspaceFolder}/node_modules/ts-node/dist/bin.js",
      "args": [
        "-P",
        "${workspaceRoot}/tests/tsconfig.json",
        "${workspaceRoot}/tests/app.ts", // 入口文件
      ]
    }
  ]
}
```


### jest 测试
安装
```
npm i --save-dev jest ts-jest @types/jest
```

在 package.json 中加入 jest 配置和 npm run test 的脚本：

```
  "scripts": {
    "test": "jest --verbose"
  }
```

项目根目录下添加 jest.config.js 作为 jest 的配置文件
```
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: "tests",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ]
};
```

### 使用日志
注意此处没有 --save-dev 就是说此功能在部署环境也要使用的
```
npm i log4js
```


