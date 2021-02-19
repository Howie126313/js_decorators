/*
* @Author: Howie 
* @Date: 2020-03-17 16:02:40 
 * @Last Modified by: Bryan
 * @Last Modified time: 2021-02-19 14:49:24
*/
import { property } from './decoratorsUntils'

export function validateString(notice) {
  return function (target, key, descriptor) {
    return property(target, key, descriptor, function (propertyName, val) {
      const realKey = propertyName.replace('_', '')
      
      if (this[realKey] !== val) { // 生成正常的属性
        if (typeof val !== 'string') {
          if (typeof val === 'number') {
            this[realKey] = String(val)
          } else {
            this[realKey] = val
            if (notice) {
              console.error(notice instanceof Function ? notice(realKey, val) : notice)
            } else {
              console.error(`报错：属性${realKey}格式传入错误，应传入 String 类型，当前值为${val}`)
            }
          }
        } else {
          this[realKey] = val
        }
      }
    })
  }
}

export function validateNumber(notice) {
  return function (target, key, descriptor) {
    return property(target, key, descriptor, function (propertyName, val) {
      const realKey = propertyName.replace('_', '')
      if (this[realKey] !== val) { // 生成正常的属性
        if (typeof val !== 'number') {
          this[realKey] = val
          if (notice) {
            console.error(notice instanceof Function ? notice(realKey, val) : notice)
          } else {
            console.error(`报错：属性${realKey}格式传入错误，应传入 Number 类型，当前值为${val}`)
          }
        } else {
          this[realKey] = val
        }
      }
    })
  }
}

export function validateArray(notice) {
  return function (target, key, descriptor) {
    return property(target, key, descriptor, function (propertyName, val) {
      const realKey = propertyName.replace('_', '')
      if (!(val instanceof Array)) {
        this[realKey] = val
        if (notice) {
          console.error(notice instanceof Function ? notice(realKey, val) : notice)
        } else {
          console.error(`报错：属性${realKey}格式传入错误，应传入 Array 类型，当前值为${val}`)
        }
      } else {
        this[realKey] = val
      }
    })
  }
}

