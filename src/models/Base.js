/*
 * @Author: Bryan 
 * @Date: 2021-02-19 09:35:45 
 * @Last Modified by: Bryan
 * @Last Modified time: 2021-02-19 14:48:33
 */

import { initData } from '../utils/index'
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

