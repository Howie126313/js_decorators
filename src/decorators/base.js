 /*
 * @Author: Bryan 
 * @Date: 2020-05-28 11:41:06 
 * @Last Modified by: Bryan
 * @Last Modified time: 2021-01-22 16:48:41
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

export function required () {
  return function (target, key, descriptor) {
    const realKey = key.replace('_', '')
    if (target.hasOwnProperty("requiredList")) {
      target.requiredList.push(realKey)
    } else {
      target.requiredList = [realKey]
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
 * @param {*} notice 当不符合正则规则时，报错的提示文案
 */
export function regex (regex, notice = '') {
  return function (target, key, descriptor) {
    return property (target, key, descriptor, function (propertyName, val) {
      const realKey = propertyName.replace('_', '')
      if (typeof val === 'number' || typeof val === 'string') {
        this[realKey] = val
        let reg = new RegExp(regex)
        if (!reg.test(val)) {
          console.error(`landz-sensors-fullstack 报错：神策对象中${realKey}异常不符合 regex 规则，当前值为${val}，${notice}`)
        }
      } else {
        console.error(`landz-sensors-fullstack 报错：装饰器 regex 只能用来修饰字符串或数字类型属性值；${realKey}格式传入错误，当前${typeof(val)}`)
      }
    })
  }
} 

/**
 * 自定义属性的 getter 函数
 * @param {*} dealFn 设置的 getter 函数
 */
export function defineGetter (dealFn) {
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

