import http from '../utils/http';

//const hosttUrl = 'http://192.168.31.19:8082'
//const hosttUrl = 'http://test.api.punch.games'
const hosttUrl = 'http://api.punch.games'

/**
 * 获取首页列表
 */
function getArticleList(){
  return  http("get",hosttUrl+'/currency/list');
}

//获得验证码
function getCode (param) {
  return http("get",hosttUrl+'/web/send',param)
}

//注册
function registered(param) {
  return http("post",hosttUrl+'/web/register',param)
}


export {
   getArticleList,
   getCode,
   registered
}

