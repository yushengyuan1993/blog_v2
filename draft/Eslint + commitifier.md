## Eslint + Husky + Lint-staged + Commitlint

> vue@2.6.10 + vuex@3.1.0 + vue-router@3.0.6

### Eslint
1. 安装依赖
```sh
# 一下依赖会在项目创建阶段，自己选择添加
eslint
babel-eslint
eslint-plugin-vue
@vue/cli-plugin-eslint
```

2. 配置 `eslint`
- 添加 `.eslintrc` 到根目录
[eslint-config-vue](https://github.com/vuejs/eslint-config-vue)
```
module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended'],

  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    "vue/max-attributes-per-line": [2, {
      "singleline": 10,
      "multiline": {
        "max": 1,
        "allowFirstLine": false
      }
    }],
    "vue/singleline-html-element-content-newline": "off",
    "vue/multiline-html-element-content-newline":"off",
    "vue/name-property-casing": ["error", "PascalCase"],
    "vue/no-v-html": "off",
    'accessor-pairs': 2,
    'arrow-spacing': [2, {
      'before': true,
      'after': true
    }],
    'block-spacing': [2, 'always'],
    'brace-style': [2, '1tbs', {
      'allowSingleLine': true
    }],
    'camelcase': [0, {
      'properties': 'always'
    }],
    'comma-dangle': [2, 'never'],
    'comma-spacing': [2, {
      'before': false,
      'after': true
    }],
    'comma-style': [2, 'last'],
    'constructor-super': 2,
    'curly': [2, 'multi-line'],
    'dot-location': [2, 'property'],
    'eol-last': 2,
    'eqeqeq': ["error", "always", {"null": "ignore"}],
    'generator-star-spacing': [2, {
      'before': true,
      'after': true
    }],
    'handle-callback-err': [2, '^(err|error)$'],
    'indent': [2, 2, {
      'SwitchCase': 1
    }],
    'jsx-quotes': [2, 'prefer-single'],
    'key-spacing': [2, {
      'beforeColon': false,
      'afterColon': true
    }],
    'keyword-spacing': [2, {
      'before': true,
      'after': true
    }],
    'new-cap': [2, {
      'newIsCap': true,
      'capIsNew': false
    }],
    'new-parens': 2,
    'no-array-constructor': 2,
    'no-caller': 2,
    'no-console': 'off',
    'no-class-assign': 2,
    'no-cond-assign': 2,
    'no-const-assign': 2,
    'no-control-regex': 0,
    'no-delete-var': 2,
    'no-dupe-args': 2,
    'no-dupe-class-members': 2,
    'no-dupe-keys': 2,
    'no-duplicate-case': 2,
    'no-empty-character-class': 2,
    'no-empty-pattern': 2,
    'no-eval': 2,
    'no-ex-assign': 2,
    'no-extend-native': 2,
    'no-extra-bind': 2,
    'no-extra-boolean-cast': 2,
    'no-extra-parens': [2, 'functions'],
    'no-fallthrough': 2,
    'no-floating-decimal': 2,
    'no-func-assign': 2,
    'no-implied-eval': 2,
    'no-inner-declarations': [2, 'functions'],
    'no-invalid-regexp': 2,
    'no-irregular-whitespace': 2,
    'no-iterator': 2,
    'no-label-var': 2,
    'no-labels': [2, {
      'allowLoop': false,
      'allowSwitch': false
    }],
    'no-lone-blocks': 2,
    'no-mixed-spaces-and-tabs': 2,
    'no-multi-spaces': 2,
    'no-multi-str': 2,
    'no-multiple-empty-lines': [2, {
      'max': 1
    }],
    'no-native-reassign': 2,
    'no-negated-in-lhs': 2,
    'no-new-object': 2,
    'no-new-require': 2,
    'no-new-symbol': 2,
    'no-new-wrappers': 2,
    'no-obj-calls': 2,
    'no-octal': 2,
    'no-octal-escape': 2,
    'no-path-concat': 2,
    'no-proto': 2,
    'no-redeclare': 2,
    'no-regex-spaces': 2,
    'no-return-assign': [2, 'except-parens'],
    'no-self-assign': 2,
    'no-self-compare': 2,
    'no-sequences': 2,
    'no-shadow-restricted-names': 2,
    'no-spaced-func': 2,
    'no-sparse-arrays': 2,
    'no-this-before-super': 2,
    'no-throw-literal': 2,
    'no-trailing-spaces': 2,
    'no-undef': 2,
    'no-undef-init': 2,
    'no-unexpected-multiline': 2,
    'no-unmodified-loop-condition': 2,
    'no-unneeded-ternary': [2, {
      'defaultAssignment': false
    }],
    'no-unreachable': 2,
    'no-unsafe-finally': 2,
    'no-unused-vars': [2, {
      'vars': 'all',
      'args': 'none'
    }],
    'no-useless-call': 2,
    'no-useless-computed-key': 2,
    'no-useless-constructor': 2,
    'no-useless-escape': 0,
    'no-whitespace-before-property': 2,
    'no-with': 2,
    'one-var': [2, {
      'initialized': 'never'
    }],
    'operator-linebreak': [2, 'after', {
      'overrides': {
        '?': 'before',
        ':': 'before'
      }
    }],
    'padded-blocks': [2, 'never'],
    'quotes': [2, 'single', {
      'avoidEscape': true,
      'allowTemplateLiterals': true
    }],
    'semi': [2, 'always'],
    'semi-spacing': [2, {
      'before': false,
      'after': true
    }],
    'space-before-blocks': [2, 'always'],
    'space-before-function-paren': [2, 'never'],
    'space-in-parens': [2, 'never'],
    'space-infix-ops': 2,
    'space-unary-ops': [2, {
      'words': true,
      'nonwords': false
    }],
    'spaced-comment': [2, 'always', {
      'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
    }],
    'template-curly-spacing': [2, 'never'],
    'use-isnan': 2,
    'valid-typeof': 2,
    'wrap-iife': [2, 'any'],
    'yield-star-spacing': [2, 'both'],
    'yoda': [2, 'never'],
    'prefer-const': 2,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'object-curly-spacing': [2, 'always', {
      objectsInObjects: false
    }],
    'array-bracket-spacing': [2, 'never']
  }
}
```

- 添加 `.eslintignore` 到根目录
忽略 lint 的文件
```
node_modules
dist
```

### Husky
1. 安装 `husky`
```sh
npm npm install husky -D
```
2. 添加 `scripts`
```sh
# 1. 在 package.json 文件中添加 scripts 
"scripts": {
  # ...
  "prepare": "husky install"
  # ...
}

# 2. 运行命令
npm run prepare
```
3. 添加 `hook`
注意：这里的 `npm test` 就是你最终要运行的钩子命令，一般就是 **npm run lint** 
```sh
npx husky add .husky/pre-commit "npm test" # npm test ==> npm run lint
git add .husky/pre-commit

```
4. 添加一个 `commit`
```sh
git commit -m "Keep calm and commit"
# `npm test` will run every time you commit
```
最终 `husky` 会在根目录下生成一个 `.husky/` 文件夹，里面就是对应的配置




### Lint-staged
1. 安装 `lint-staged`
```sh
npx mrm@2 lint-staged
```
2. 运行完毕:
- 会在 `.husky/pre-commit` 文件中添加一行 `npx lint-staged`
- 会在 `package.json` 文件中添加一行配置
  ```json
  // 这是默认配置
  "lint-staged": {
    "*.js": "eslint --fix"
  },

  // 建议改成
  "lint-staged": {
    "src/**/*.{js,vue}": [
      "npm run lint"
    ]
  },
  ```

### Commitlint
1. 安装依赖
[@commitlint](https://github.com/conventional-changelog/commitlint)
```sh
# 会自动安装 @commitlint/cli 和 @commitlint/config-conventional 两个依赖
npm install --save-dev @commitlint/{config-conventional,cli}
```

2. 生成规范配置文件
```sh
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```
生成一个如下的配置文件，默认使用 `@commitlint/config-conventional` 规范
```js
// commitlint.config.js

module.exports = {
  extends: ['@commitlint/config-conventional'],
};

```
3. 添加到 `husky` 的 `commit-msg` hook 中
```sh
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```
运行完毕，会在 `.husky/` 目录下生成一个 `commit-msg` 文件，内容如下
```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no -- commitlint --edit "$1"
```
配置完毕，可以体验 `commitlint` 带来的良好体验了
