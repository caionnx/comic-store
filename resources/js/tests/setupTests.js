import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import DotEnv from 'dotenv'

Enzyme.configure({
  adapter: new Adapter()
})

DotEnv.config({ path: '.env.test' })

// Polyfill
// https://github.com/tc39/proposal-object-values-entries/blob/master/polyfill.js
if (!Object.entries) {
  const reduce = Function.bind.call(Function.call, Array.prototype.reduce)
  const isEnumerable = Function.bind.call(Function.call, Object.prototype.propertyIsEnumerable)
  const concat = Function.bind.call(Function.call, Array.prototype.concat)
  const keys = Reflect.ownKeys
  Object.entries = function entries (O) {
    return reduce(keys(O), (e, k) => concat(e, typeof k === 'string' && isEnumerable(O, k) ? [[k, O[k]]] : []), []);
  }
}
