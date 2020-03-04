### promise
  大量的异步操作 如果需要顺序执行 通过回调函数执行 回调地狱
  
  通过Promise 解决回调地狱

  1. 封装promise函数
  ```
  function test () {
    // 返回 promise
    return new Promise((resolve, reject) => {
      //需要的异步处理
      resolve 成功
      reject 失败
    })
  }
  ```

  2. 根据顺序 形成链式调用
  test().then().then().then()

  3. 捕获错误

### node 操作mongodb数据库
  + mongod
  + mongoose
  + mongodb可视化工具 robo3t