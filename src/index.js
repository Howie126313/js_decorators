/*
 * @Author: Bryan 
 * @Date: 2020-05-28 11:36:21 
 * @Last Modified by: Bryan
 * @Last Modified time: 2020-05-28 15:02:38
 */

// 基础类型装饰器
import { accessor, required, regex } from './decorators/base'

// 功能性装饰器
import { validateString, validateNumber, validateArray }  from './decorators/validators' 

export default {
  accessor,
  required,
  regex,
  validateString,
  validateNumber,
  validateArray
}
