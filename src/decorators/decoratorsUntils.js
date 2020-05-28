/*
 * @Author: Howie 
 * @Date: 2020-03-19 08:59:44 
 * @Last Modified by: Bryan
 * @Last Modified time: 2020-05-28 11:42:12
 */

 /**
  * 
  * @param {*} target 对象实例
  * @param {*} key 对象属性
  * @param {*} descriptor 对象属性的描述
  * @param {*} cb 对象属性 setter 方法回调
  */
 export function property(target, key, descriptor, cb) {
  const realKey = key.replace('_', '')
  let v = descriptor.initializer && descriptor.initializer()
  target[realKey] = v

  return {
    enumerable: true,
    configurable: true,
    get: function getter() {
      return v;
    },
    set: function setter(val) {
      Object.defineProperty(target, key, { // 修改原_属性，不可枚举
        enumerable: false,
        configurable: true
      })

      cb.call(this, key, val)
    }
  }
}
