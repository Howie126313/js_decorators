/*
 * @Author: Bryan 
 * @Date: 2021-02-19 09:35:45 
 * @Last Modified by: Bryan
 * @Last Modified time: 2021-02-19 10:20:39
 */


export default class Base {
  constructor (args) {
    initData.call(this, args)
    this.validateRequired()
  }

  validateRequired () {
    this.requiredList && this.requiredList.forEach(o => {
      if (!this.hasOwnProperty(o) && !this[o]) {
        console.error(`${this.requiredListNotice.get(o) ? this.requiredListNotice.get(o) : `报错：属性${o}为必要属性，不能为空`}`)
      }
    })
  }
}

// 初始化数据
function initData (args) {
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
