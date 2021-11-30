var logger = {}

logger.error= function(...args){
  console.log('\x1b[31m%s\x1b[0m',new Date(),"==>",...args,"\x1b[0m")
}
logger.info= function(...args){
  console.log('\x1b[34m%s\x1b[0m',new Date(),">",...args,"\x1b[0m")
}
logger.success= function(...args){
  console.log('\x1b[32m%s\x1b[0m',new Date(),">",...args)

}

module.exports= logger;