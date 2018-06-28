const type = (obj) => {
    var toString = Object.prototype.toString;
    var map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object',
        '[object Symbol]': 'symbol'
    };
    if (obj instanceof Element) {//因为对不同标签，toString会返回对应不同标签的构造函数
        return 'element';
    }
    return map[toString.call(obj)];
}
/**
* deep clone
* @param  {[type]} oldObj object 需要进行克隆的对象
* @return {[type]}        深克隆后的对象
*/
const deepClone = oldObj => {
    // 维护两个储存循环引用的数组
    const oldObjArr = [];
    //   const newObjArr = [];

    const clone = oldObj => {

        let newObj, proto;

        const type1 = type(oldObj);

        switch (type1) {
            case 'boolean':
            case 'number':
            case 'string':
            case 'null':
            case 'undefined':
            case 'function': {
                return oldObj;
            }
            case 'symbol': {
                return Symbol(Symbol.keyFor(oldObj).toString());
            }
            case 'array': {
                newObj = [];
                for (let i = 0; i < oldObj.length; i++) {// 递归     
                    newObj[i] = clone(oldObj[i]);
                }
                return newObj;
            }
            case 'regExp': {
                newObj = new RegExp(oldObj.source, oldObj.flags);
                if (oldObj.lastIndex) newObj.lastIndex = oldObj.lastIndex;
                return newObj;
            }
            case 'date': {
                newObj = new Date(oldObj.getTime());
                return newObj;
            }
            //对象的情况
            default: {

                if (oldObj.constructor.name === "Object") {//非自定义对象
                    newObj = {};
                } else {
                    // 处理自定义对象原型以保证constructor指针的正确性
                    proto = Object.getPrototypeOf(oldObj);
                    // 利用Object.create切断原型链
                    newObj = Object.create(proto);
                }
                break;
            }
        }

        // 处理循环引用
        const index = oldObjArr.indexOf(oldObj);
        if (index != -1) {// 如果父数组存在本对象,说明之前已经被引用过,直接返回此对象    
            return newObj;
        }

        oldObjArr.push(oldObj);

        for (let i in oldObj) {// 递归     
            newObj[i] = clone(oldObj[i]);
        }

        return newObj;
    };


    return clone(oldObj);
}


const oldObj = { b: [{ c: 3, d: [0, 5] }] };

oldObj.a = oldObj;

const newObj = deepClone(oldObj);
