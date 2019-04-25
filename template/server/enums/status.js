'use strict';

exports.STATUS_TIMEOUT = 8001; //请求服务器超时
exports.STATUS_ERROR = 8002; //请求服务出错
exports.STATUS_PARAMS = 8003;//参数请求错误
exports.STATUS_SERVER_ERROR = 8004;//后端服务器错误
exports.STATUS_SERVER_RESPONSE_ERROR = 8005;//后端服务器返回数据有问题

//前端请求参数错误
exports.STATUS_REQUEST_PARAMS_ERROR = 400; 

//自己接入层内部出错
exports.STATUS_RESPONSE_ERROR = 500; 

//没有权限，禁止访问
exports.STATUS_FORBIDDEN = 403; 

//没有找到
exports.STATUS_NOT_FOUND = 404; 

//未登录
exports.STATUS_NOT_LOGIN = 10888;

//详情
exports.STATUS_DETAIL_ERROR = 20001;

//历史记录
exports.STATUS_HISTORY_ERROR = 30001;

//撤销
exports.STATUS_HISTORY_CANCEL_ERROR = 30002;

// 新股列表
exports.STATUS_LIST_ERROR = 40001;

//认购数据获取错误
exports.STATUS_APPLY_ERROR = 500001;
//购买力获取失败
exports.STATUS_ASSET_POWER_ERROR = 500002;
//认购失败
exports.STATUS_APPLY_STOCK_ERROR = 500003;
//存在任务
exports.STATUS_APPLY_STOCK_EXIST_ERROR = 500004;