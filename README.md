# landz-decorators

_常用的 JavaScript 装饰器_

# Install
Using npm:

`
  npm install landz-decorators --save-dev
`

# Usage
```
import decorators from 'landz-decorators'
```

# decorators

## 修饰类属性：
- @accessor
- @required
- @defineGetter
- @regex
- @validateString
- @validateNumber
- @validateArray

# Docs
> Note: 使用以上修饰类属性的装饰器时，需注意以下内容：
- 新建的的类需要先继承 Base 类；
- 在声明类时需要在对应的属性名前添加下划线”_“,且属性名不可以用下划线开头；


```
class Test extend Base {
  constructor (args) {
    super(args)
  }

  @accessor()
  _person: ''

  @accessor()
  age: ''
}

const obj = new Test({
  person: 'Bryan',
  age: 27
})

console.log(obj) // person: Bryan, age: ''
```

**@accessor**

常用的访问器装饰器，使用访问器修饰后的属性才可以被获取到。
```
import { Base, accessor } from 'landz-decorators'

class Test extend Base {
  constructor (args) {
    super(args)
  }

  @accessor()
  _person: ''

  _age: ''
}

const obj = new Test({
  person: 'Bryan',
  age: 27
})

console.log(obj) // person: Bryan, age: undefined
```

**@required**

必要属性的装饰器，使用该装饰器修饰的类属性在实例化过程中，如果没有进行赋值会在控制台报错。具体报错内容可以自定义，装饰器接收一个参数可以使字符串也可以是函数。函数可以获取到对应描述的属性名称。
```
import { Base, required } from 'landz-decorators'

class Test extend Base {
  constructor (args) {
    super(args)
  }

  @required('person 为必传属性')
  _person: ''

  @required(requiredErrorNotice)
  _age: ''

  @required()
  _sex: ''
}

function requiredErrorNotice (key) {
  return `报错：属性${key}为必传属性`
}

const obj = new Test({})

// person 为必传属性
// 报错：属性 age 为必传属性
// 报错：属性 sex 为必要属性，不能为空

```

**@regex**

正则装饰器，对实例化类时的属性值进行判断。如果不满足正则条件，会在控制台报错。具体报错内容可以自定义，装饰器接收一个参数可以使字符串也可以是函数。函数可以获取到对应描述的属性名称和当前属性值。
```
import { Base, regex } from 'landz-decorators'

class Test extend Base {
  constructor (args) {
    super(args)
  }

  @regex(/\p{Unified_Ideograph}/ug, requiredErrorNotice)
  _person: ''
}

function requiredErrorNotice (k, v) {
  return `报错：属性${key}不符合规则，当前属性值为${v}`
}

const obj = new Test({
  person: 'Bryan'
})

// 报错：属性person不符合规则，当前属性值为Bryan
```

**@defineGetter**

属性的 getter 装饰器，用来修改实例化后获取该属性的属性值。
```
import { Base, defineGetter } from 'landz-decorators'

class Test extend Base {
  constructor (args) {
    super(args)
  }

  @defineGetter(fn)
  _person: ''
}

function fn (k) {
  return 'Howie'
}

const obj = new Test({
  person: 'Bryan'
})

obj.person // Howie
```

**@validateXXX**

判断实例化属性值类型的装饰器（@validateString、@validateNumber、@validateArray），如果不符合类型要求会在控制台报错。具体报错内容可以自定义，装饰器接收一个参数可以使字符串也可以是函数。函数可以获取到对应描述的属性名称和当前属性值。
```
import { Base, validateString } from 'landz-decorators'

class Test extend Base {
  constructor (args) {
    super(args)
  }

  @validateString()
  _person: ''
}

const obj = new Test({
  person: {}
})

// 报错：属性 person 格式传入错误，应传入 String 类型，当前值为{}
```
