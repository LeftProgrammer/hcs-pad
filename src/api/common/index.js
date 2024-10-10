/*
 * @Author: pengchun pengchun@example.com
 * @Date: 2023-12-05 15:21:50
 * @LastEditors: pengchun pengchun@example.com
 * @LastEditTime: 2024-02-22 17:37:02
 * @FilePath: \jmc_pad\lib\api.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request/index.js'
import { baseURL } from '@/configs/request.js'

/**
 * @desc 获取客户端信息
 * @param {object} data app信息
 * @param {string} data.appid appid
 * @param {string} data.version 当前版本
 * @param {string} data.imei 设备身份码
 */
// export const getAppInfo = (data) => request.get(baseURL + `/appClient/version/lastVersion?appId=abc`, data);
export const getAppInfo = (data) => request.get(baseURL + `/appClient/version/lastVersion`, data);
export const getAppInfoUrl = baseURL + `/appClient/version/lastVersion`;
/**
 * @desc 登录接口
 * @param {object} data 登录信息
 * @param {string} data.username 用户名
 * @param {string} data.password 密码
 */
export const userLogin = (data) => request.post(baseURL + `/sys/login`, data);
export const userLogout = () => request.post(baseURL + `/sys/logout`, null);
/**
 * @desc 修改密码
 * @param {object} data 密码信息
 */
export const updatePassword = (data) => request.put(baseURL + `/sys/user/updatePassword`, data);
// 一级菜单
// export const getMenus = (data) => request.get(baseURL + `/toolbox/toolboxClass/childList`, data);
export const getMenus = (data) => request.get(baseURL + `/toolbox/toolboxClass/childList?isVisible=0`, data);
// 二级菜单
// export const getSecondMenus = (data) => request.get(baseURL + `/toolbox/toolboxClass/rootList`, data);
// 查询所有资源
// export const downLoadListAll = (data) => request.get(baseURL + `/toolbox/toolboxResource/listAll`, data);
export const downLoadListAll = (data) => request.get(baseURL + `/toolbox/toolboxResource/listAll?isEnabled=0`, data); // isEnabled 显示/隐藏
// 页面列表
// export const toolboxResourceList = (data) => request.get(baseURL + `/toolbox/toolboxResource/list`, data);
// 搜索结果列表-无分页
// export const searchAllList = (data) => request.get(baseURL + `/toolbox/toolboxResource/labelsLists`, data);
// 资料预下载列表
// export const downLoadList = (data) => request.get(baseURL + `/toolbox/toolboxResource/list`, data);
