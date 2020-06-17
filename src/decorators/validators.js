/*
* @Author: Howie 
* @Date: 2020-03-17 16:02:40 
 * @Last Modified by: Bryan
 * @Last Modified time: 2020-06-17 10:22:14
*/
import { property } from './decoratorsUntils'

export function validateString() {
  return function (target, key, descriptor) {
    return property(target, key, descriptor, function (propertyName, val) {
      const realKey = propertyName.replace('_', '')
      
      if (this[realKey] !== val) { // 生成正常的属性
        if (typeof val !== 'string') {
          if (typeof val === 'number') {
            this[realKey] = String(val)
          } else {
            this[realKey] = val
            console.error(`landz-sensors-fullstack 报错：神策${realKey}格式传入错误，应传入 String 类型，当前${typeof(val)}`)
          }
        } else {
          this[realKey] = val
        }
      }
    })
  }
}

export function validateNumber() {
  return function (target, key, descriptor) {
    return property(target, key, descriptor, function (propertyName, val) {
      const realKey = propertyName.replace('_', '')
      if (this[realKey] !== val) { // 生成正常的属性
        if (typeof val !== 'number') {
          this[realKey] = val
          console.error(`landz-sensors-fullstack 报错：神策${realKey}格式传入错误，应传入 Number 类型，当前${typeof(val)}`)
        } else {
          this[realKey] = val
        }
      }
    })
  }
}

export function validateArray() {
  return function (target, key, descriptor) {
    return property(target, key, descriptor, function (propertyName, val) {
      const realKey = propertyName.replace('_', '')
      if (!(val instanceof Array)) {
        this[realKey] = val
        console.error(`landz-sensors-fullstack 报错：神策${realKey}格式传入错误，应传入 Array 类型，当前${typeof(val)}`)
      } else {
        this[realKey] = val
      }
    })
  }
}

