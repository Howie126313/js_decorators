 /*
 * @Author: Bryan 
 * @Date: 2020-05-28 11:41:06 
 * @Last Modified by: Bryan
 * @Last Modified time: 2021-02-19 16:09:24
 */

import { property } from './decoratorsUntils'

export function accessor () {
  return function (target, key, descriptor) {
    return property (target, key, descriptor, function (propertyName, val) {
      const realKey = propertyName.replace('_', '')
      this[realKey] = val
    })
  }
}

/**
 * 必要属性装饰器
 * @param {*} notice 报错文案，字符串或函数类型（为函数时函数可以获取当前属性名，需设置返回值）
 */
export function required (notice) {
  return function (target, key, descriptor) {
    const realKey = key.replace('_', '')
    if (target.hasOwnProperty("requiredList")) {
      target.requiredList.push(realKey)
    } else {
      target.requiredList = [realKey]
    }
    
    if (!target.hasOwnProperty("requiredListNotice")) {
      target.requiredListNotice = new Map()
    }
    if (!target.requiredListNotice.has(realKey)) {
      target.requiredListNotice.set(realKey, notice instanceof Function ? notice(realKey) : notice)
    } 

    let fn = property (target, key, descriptor, function (propertyName, val) {
      this[realKey] = val
    })
    return fn
  }
}

/**
 * 
 * @param {*} regex 判断的正则规则表达式 e.g:/^[0-9]+.?[0-9]*$/
 * @param {*} notice 报错文案，字符串或函数类型（为函数时函数可以获取当前属性名及属性值，需设置返回值）
 */
export function regex (regex, notice) {
  return function (target, key, descriptor) {
    return property (target, key, descriptor, function (propertyName, val) {
      const realKey = propertyName.replace('_', '')
      if (typeof val === 'number' || typeof val === 'string') {
        this[realKey] = val
        let reg = new RegExp(regex)
        if (!reg.test(val)) {
          if (notice) {
            console.error(notice instanceof Function ? notice(realKey, val) : notice)
          } else {
            console.error(`报错：${realKey}异常不符合 regex 规则，当前值为${val}`)
          }
        }
      } else {
        console.error(`报错：regex 只能用来修饰字符串或数字类型属性值；${realKey}格式传入错误，当前格式为${typeof(val)}`)
      }
    })
  }
} 

/**
 * 自定义属性的 getter 函数
 * @param {*} dealFn 设置的 getter 函数
 */
export function defineGetter (dealFn) {
  if (!dealFn instanceof Function) {
    throw Error('defineGetter 的参数只能是函数')
  }
  return function (target, key, descriptor) {
    return property(target, key, descriptor, function(propertyName, val) {
      const realKey = propertyName.replace('_', '')
      Object.defineProperty(this, realKey, {
        enumerable: true,
        get: function () {
          return dealFn(val)
        }
      })
    })
  }
}

