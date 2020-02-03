function compose(middleware) {
  return function(ctx,next) {
    let index = -1;
    return dispatch(0)
    function dispatch(i) {
      if(i <= index) {
        return Promise.reject('暂时也不知道这个啥时候会出现')
      }
      index = i
      let fn = middleware[i]
      // !out custom next
      if(i === middleware.length) fn = next
      if(!fn) {
        return Promise.resolve()
      }
      return Promise.resolve(fn(ctx,dispatch.bind(null,i+1)))
    }
  }
}

async function rest(time=1) {
  return new Promise((resolve,reject) => {
    console.log('rest' + time + 's...');
    setTimeout(() => {
      resolve('ok')
    },time * 1000)
  })
}

async function a(ctx,next) {
  console.log('a-start')
  const hello = await rest(2)
  console.log(hello)
  await next()
  console.log('a-end')
}

async function b(ctx,next) {
  console.log('b-start')
  const hello = await rest(1)
  console.log(hello)
  await next()
  console.log('b-end');
}

compose([a,b])({},(ctx,next) => {
  console.log('haha')
  next()
})