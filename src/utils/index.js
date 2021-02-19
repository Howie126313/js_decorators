/*
 * @Author: Bryan 
 * @Date: 2021-02-19 14:47:53 
 * @Last Modified by:   Bryan 
 * @Last Modified time: 2021-02-19 14:47:53 
 */

// 初始化数据
export function initData (args) {
  for (let key in args) {
    if (/^\_/.test(key)) {
      console.error(`属性 ${key} 不可以使用'_'开头`)
    } else {
      let _key = ''
      if (key.includes('_')) {
        _key = key
      } else {
        _key = toLine(key)
      }
      this[`_${_key}`] = args[key]
    }
  }
}

export function toLine(name) {
  return name.replace(/([A-Z])/g,"_$1").toLowerCase();
}
