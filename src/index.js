/*
 * @Author: Bryan 
 * @Date: 2020-05-28 11:36:21 
 * @Last Modified by: Bryan
 * @Last Modified time: 2021-02-19 14:25:12
 */

// 装饰器依赖的基础类
import Base from './models/Base'

// 基础类型装饰器
import { accessor, required, regex, defineGetter } from './decorators/base'

// 功能性装饰器
import { validateString, validateNumber, validateArray }  from './decorators/validators' 

export {
  Base,
  accessor,
  required,
  regex,
  validateString,
  validateNumber,
  validateArray,
  defineGetter
}
