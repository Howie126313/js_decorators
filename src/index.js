/*
 * @Author: Bryan 
 * @Date: 2020-05-28 11:36:21 
 * @Last Modified by: Bryan
 * @Last Modified time: 2021-01-22 11:02:45
 */

// 基础类型装饰器
import { accessor, required, regex, defineGetter } from './decorators/base'

// 功能性装饰器
import { validateString, validateNumber, validateArray }  from './decorators/validators' 

export default {
  accessor,
  required,
  regex,
  validateString,
  validateNumber,
  validateArray,
  defineGetter
}
