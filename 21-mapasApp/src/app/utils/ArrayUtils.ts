
export class ArrayUtils {

  static equal(arr1: Array<unknown>, arr2: Array<unknown>){
    return Array.isArray(arr1) && Array.isArray(arr2) &&
          arr1.length === arr2.length &&
          arr1.every((val,index)=> val == arr2[index]);
  }

  static removeFirst(arr:Array<unknown>, target:unknown) {
    const idx = arr.indexOf(target);
    if (idx > -1) {
      arr.splice(idx, 1);
    }
    return arr;
  }
}
