/*
 * @Author: pengchun pengchun@example.com
 * @Date: 2024-02-01 14:14:19
 * @LastEditors: pengchun pengchun@example.com
 * @LastEditTime: 2024-02-01 14:18:47
 * @FilePath: \jmc-pad-vue3\src\api\mock\登录.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 接口：登录
curl 'http://jmc.jinghesoftware.com:8052/jmc/sys/login' \
-H 'Accept: */*' \
-H 'Accept-Language: zh-CN,zh;q=0.9' \
-H 'Content-Type: application/json;charset=UTF-8' \
-H 'Origin: http://localhost:1996' \
-H 'Proxy-Connection: keep-alive' \
-H 'Referer: http://localhost:1996/' \
-H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15' \
--data-raw '{"username":"admin","password":"jh@12345"}' \
--compressed \
--insecure

{
    "success": true,
    "message": "登录成功",
    "code": 200,
    "result": {
        "multi_depart": 1,
        "userInfo": {
            "id": "e9ca23d68d884d4ebb19d07889727dae",
            "username": "admin",
            "realname": "管理员",
            "avatar": "蓝底照_1639104203733.jpeg",
            "birthday": "2018-12-05",
            "sex": 2,
            "email": "11@qq.com",
            "phone": "18611788525",
            "orgCode": "A02",
            "orgCodeTxt": null,
            "unitCode": "A02",
            "unitCodeTxt": "武汉鲸禾科技有限公司",
            "departList": [
                {
                    "id": "94ea8dfda0f44a43b7fe5113c37e1ab3",
                    "parentId": "",
                    "departName": "武汉鲸禾科技有限公司",
                    "departNameEn": null,
                    "departNameAbbr": null,
                    "departOrder": 0,
                    "description": null,
                    "orgCategory": "1",
                    "orgType": "1",
                    "orgCode": "A02",
                    "mobile": null,
                    "regulators": "",
                    "fax": null,
                    "address": null,
                    "memo": null,
                    "status": null,
                    "delFlag": "0",
                    "createBy": "admin",
                    "createTime": "2021-10-25 17:04:11",
                    "updateBy": "admin",
                    "updateTime": "2023-08-21 18:38:13",
                    "children": null
                }
            ],
            "status": 1,
            "delFlag": 0,
            "workNo": "A000",
            "post": "leader",
            "telephone": null,
            "createBy": null,
            "createTime": "2019-06-21 17:54:10",
            "updateBy": "admin",
            "updateTime": "2023-12-14 10:21:48",
            "activitiSync": 1,
            "userIdentity": 2,
            "departIds": "94ea8dfda0f44a43b7fe5113c37e1ab3",
            "relTenantIds": "2",
            "clientId": "4afbbba1d5b7df45d4defbb6e6ed4c94",
            "isDefault": "1",
            "userRole": "admin",
            "code": "94ea8dfda0f44a43b7fe5113c37e1ab3",
            "parentCode": "",
            "deptName": null,
            "regulators": "",
            "regulatorsList": null,
            "userDepartment": null,
            "userDepartmentTxt": null
        },
        "sysAllDictItems": {
            "hazard_type": [],
            "ol_form_biz_type": [
                {
                    "value": "demo",
                    "text": "官方示例",
                    "title": "官方示例"
                },
                {
                    "value": "bpm",
                    "text": "流程表单",
                    "title": "流程表单"
                },
                {
                    "value": "temp",
                    "text": "测试表单",
                    "title": "测试表单"
                },
                {
                    "value": "bdfl_include",
                    "text": "导入表单",
                    "title": "导入表单"
                }
            ],
            "shigudengji": [
                {
                    "value": "1",
                    "text": "一般事故",
                    "title": "一般事故"
                },
                {
                    "value": "2",
                    "text": "较大事故",
                    "title": "较大事故"
                },
                {
                    "value": "3",
                    "text": "重大事故",
                    "title": "重大事故"
                },
                {
                    "value": "4",
                    "text": "特别重大事故",
                    "title": "特别重大事故"
                }
            ],
            "the_title": [
                {
                    "value": "0",
                    "text": "初级职称",
                    "title": "初级职称"
                },
                {
                    "value": "1",
                    "text": "中级职称",
                    "title": "中级职称"
                },
                {
                    "value": "2",
                    "text": "副高级职称",
                    "title": "副高级职称"
                },
                {
                    "value": "3",
                    "text": "正高级职称",
                    "title": "正高级职称"
                }
            ],
            "toolbox_zylx": [
                {
                    "value": "3",
                    "text": "图片",
                    "title": "图片"
                },
                {
                    "value": "0",
                    "text": "视频",
                    "title": "视频"
                },
                {
                    "value": "7",
                    "text": "文档",
                    "title": "文档"
                },
                {
                    "value": "6",
                    "text": "网页链接",
                    "title": "网页链接"
                }
            ],
            "position_rank": [
                {
                    "value": "1",
                    "text": "员级",
                    "title": "员级"
                },
                {
                    "value": "2",
                    "text": "助级",
                    "title": "助级"
                },
                {
                    "value": "3",
                    "text": "中级",
                    "title": "中级"
                },
                {
                    "value": "4",
                    "text": "副高级",
                    "title": "副高级"
                },
                {
                    "value": "5",
                    "text": "正高级",
                    "title": "正高级"
                }
            ],
            "rule_conditions": [
                {
                    "value": ">",
                    "text": "大于",
                    "title": "大于"
                },
                {
                    "value": "<",
                    "text": "小于",
                    "title": "小于"
                },
                {
                    "value": "!=",
                    "text": "不等于",
                    "title": "不等于"
                },
                {
                    "value": "=",
                    "text": "等于",
                    "title": "等于"
                },
                {
                    "value": ">=",
                    "text": "大于等于",
                    "title": "大于等于"
                },
                {
                    "value": "<=",
                    "text": "小于等于",
                    "title": "小于等于"
                },
                {
                    "value": "LEFT_LIKE",
                    "text": "左模糊",
                    "title": "左模糊"
                },
                {
                    "value": "RIGHT_LIKE",
                    "text": "右模糊",
                    "title": "右模糊"
                },
                {
                    "value": "LIKE",
                    "text": "模糊",
                    "title": "模糊"
                },
                {
                    "value": "IN",
                    "text": "包含",
                    "title": "包含"
                },
                {
                    "value": "USE_SQL_RULES",
                    "text": "自定义SQL",
                    "title": "自定义SQL"
                }
            ],
            "examine_type": [
                {
                    "value": "0",
                    "text": "人员违章行为",
                    "title": "人员违章行为"
                },
                {
                    "value": "1",
                    "text": "安全管理缺陷",
                    "title": "安全管理缺陷"
                },
                {
                    "value": "2",
                    "text": "机械设备缺陷",
                    "title": "机械设备缺陷"
                },
                {
                    "value": "3",
                    "text": "不安全环境",
                    "title": "不安全环境"
                },
                {
                    "value": "4",
                    "text": "其他事故隐患",
                    "title": "其他事故隐患"
                }
            ],
            "work_task": [
                {
                    "value": "0",
                    "text": "平安工地自评",
                    "title": "平安工地自评"
                },
                {
                    "value": "1",
                    "text": "品质工程自评",
                    "title": "品质工程自评"
                },
                {
                    "value": "2",
                    "text": "智能巡检自评",
                    "title": "智能巡检自评"
                }
            ],
            "online_graph_display_template": [
                {
                    "value": "tab",
                    "text": "Tab风格",
                    "title": "Tab风格"
                },
                {
                    "value": "single",
                    "text": "单排布局",
                    "title": "单排布局"
                },
                {
                    "value": "double",
                    "text": "双排布局",
                    "title": "双排布局"
                },
                {
                    "value": "combination",
                    "text": "组合布局",
                    "title": "组合布局"
                }
            ],
            "remindTime": [
                {
                    "value": "0",
                    "text": "不提醒",
                    "title": "不提醒"
                },
                {
                    "value": "1",
                    "text": "开始时",
                    "title": "开始时"
                },
                {
                    "value": "2",
                    "text": "提前5分钟",
                    "title": "提前5分钟"
                },
                {
                    "value": "3",
                    "text": "提前10分钟",
                    "title": "提前10分钟"
                },
                {
                    "value": "4",
                    "text": "提前15分钟",
                    "title": "提前15分钟"
                },
                {
                    "value": "5",
                    "text": "提前30分钟",
                    "title": "提前30分钟"
                },
                {
                    "value": "6",
                    "text": "提前1小时",
                    "title": "提前1小时"
                },
                {
                    "value": "7",
                    "text": "提前2小时",
                    "title": "提前2小时"
                }
            ],
            "remindMode": [
                {
                    "value": "1",
                    "text": "邮件提醒",
                    "title": "邮件提醒"
                },
                {
                    "value": "2",
                    "text": "短信提醒",
                    "title": "短信提醒"
                },
                {
                    "value": "4",
                    "text": "系统消息",
                    "title": "系统消息"
                }
            ],
            "shiguhouguo": [
                {
                    "value": "1",
                    "text": "100",
                    "title": "100"
                },
                {
                    "value": "2",
                    "text": "40",
                    "title": "40"
                },
                {
                    "value": "3",
                    "text": "15",
                    "title": "15"
                },
                {
                    "value": "4",
                    "text": "7",
                    "title": "7"
                },
                {
                    "value": "5",
                    "text": "3",
                    "title": "3"
                },
                {
                    "value": "6",
                    "text": "1",
                    "title": "1"
                }
            ],
            "desform_route_type": [
                {
                    "value": "1",
                    "text": "跳转到表单",
                    "title": "跳转到表单"
                },
                {
                    "value": "2",
                    "text": "跳转到菜单",
                    "title": "跳转到菜单"
                },
                {
                    "value": "3",
                    "text": "跳转到外部",
                    "title": "跳转到外部"
                }
            ],
            "tenant_status": [
                {
                    "value": "1",
                    "text": "正常",
                    "title": "正常"
                },
                {
                    "value": "0",
                    "text": "冻结",
                    "title": "冻结"
                }
            ],
            "ins_type": [
                {
                    "value": "0",
                    "text": "综合安全检查",
                    "title": "综合安全检查"
                },
                {
                    "value": "1",
                    "text": "专项安全检查",
                    "title": "专项安全检查"
                },
                {
                    "value": "2",
                    "text": "定期安全检查",
                    "title": "定期安全检查"
                },
                {
                    "value": "3",
                    "text": "季节性安全检查",
                    "title": "季节性安全检查"
                },
                {
                    "value": "4",
                    "text": "日常安全检查",
                    "title": "日常安全检查"
                }
            ],
            "toolbox_cslx": [
                {
                    "value": "0",
                    "text": "合同名称",
                    "title": "合同名称"
                },
                {
                    "value": "1",
                    "text": "客户名称",
                    "title": "客户名称"
                },
                {
                    "value": "3",
                    "text": "客户名称",
                    "title": "客户名称"
                }
            ],
            "jidu": [
                {
                    "value": "1",
                    "text": "第一季度",
                    "title": "第一季度"
                },
                {
                    "value": "2",
                    "text": "第二季度",
                    "title": "第二季度"
                },
                {
                    "value": "3",
                    "text": "第三季度",
                    "title": "第三季度"
                },
                {
                    "value": "4",
                    "text": "第四季度",
                    "title": "第四季度"
                }
            ],
            "hazard_level": [
                {
                    "value": "0",
                    "text": "一般事故隐患",
                    "title": "一般事故隐患"
                },
                {
                    "value": "1",
                    "text": "重大事故隐患",
                    "title": "重大事故隐患"
                }
            ],
            "yes_no": [
                {
                    "value": "0",
                    "text": "是",
                    "title": "是"
                },
                {
                    "value": "1",
                    "text": "否",
                    "title": "否"
                }
            ],
            "contract": [
                {
                    "value": "0",
                    "text": "设计合同",
                    "title": "设计合同"
                },
                {
                    "value": "1",
                    "text": "施工合同",
                    "title": "施工合同"
                },
                {
                    "value": "2",
                    "text": "采购合同",
                    "title": "采购合同"
                },
                {
                    "value": "3",
                    "text": "其他",
                    "title": "其他"
                }
            ],
            "shigu": [
                {
                    "value": "01",
                    "text": "物体打击",
                    "title": "物体打击"
                },
                {
                    "value": "02",
                    "text": "车辆伤害",
                    "title": "车辆伤害"
                },
                {
                    "value": "03",
                    "text": "机械伤害",
                    "title": "机械伤害"
                },
                {
                    "value": "04",
                    "text": "起重伤害",
                    "title": "起重伤害"
                },
                {
                    "value": "05",
                    "text": "触电",
                    "title": "触电"
                },
                {
                    "value": "06",
                    "text": "淹溺",
                    "title": "淹溺"
                },
                {
                    "value": "07",
                    "text": "灼烫",
                    "title": "灼烫"
                },
                {
                    "value": "08",
                    "text": "火灾",
                    "title": "火灾"
                },
                {
                    "value": "09",
                    "text": "高处坠落",
                    "title": "高处坠落"
                },
                {
                    "value": "10",
                    "text": "坍塌",
                    "title": "坍塌"
                },
                {
                    "value": "011",
                    "text": "冒顶片帮",
                    "title": "冒顶片帮"
                },
                {
                    "value": "012",
                    "text": "透水",
                    "title": "透水"
                },
                {
                    "value": "013",
                    "text": "放炮",
                    "title": "放炮"
                },
                {
                    "value": "014",
                    "text": "火药爆炸",
                    "title": "火药爆炸"
                },
                {
                    "value": "015",
                    "text": "瓦斯爆炸",
                    "title": "瓦斯爆炸"
                },
                {
                    "value": "016",
                    "text": "锅炉爆炸",
                    "title": "锅炉爆炸"
                },
                {
                    "value": "017",
                    "text": "容器爆炸",
                    "title": "容器爆炸"
                },
                {
                    "value": "018",
                    "text": "其他爆炸",
                    "title": "其他爆炸"
                },
                {
                    "value": "019",
                    "text": "中毒和窒息",
                    "title": "中毒和窒息"
                },
                {
                    "value": "020",
                    "text": "其他伤害",
                    "title": "其他伤害"
                }
            ],
            "propulsion": [
                {
                    "value": "0",
                    "text": "正常实施",
                    "title": "正常实施"
                },
                {
                    "value": "1",
                    "text": "项目终止",
                    "title": "项目终止"
                },
                {
                    "value": "2",
                    "text": "完成验收",
                    "title": "完成验收"
                }
            ],
            "org_category": [
                {
                    "value": "3",
                    "text": "岗位",
                    "title": "岗位"
                },
                {
                    "value": "1",
                    "text": "公司",
                    "title": "公司"
                },
                {
                    "value": "2",
                    "text": "部门",
                    "title": "部门"
                }
            ],
            "priority": [
                {
                    "value": "H",
                    "text": "高",
                    "title": "高"
                },
                {
                    "value": "M",
                    "text": "中",
                    "title": "中"
                },
                {
                    "value": "L",
                    "text": "低",
                    "title": "低"
                }
            ],
            "meeting_scale": [
                {
                    "value": "S",
                    "text": "小型",
                    "title": "小型"
                },
                {
                    "value": "M",
                    "text": "中型",
                    "title": "中型"
                },
                {
                    "value": "L",
                    "text": "大型",
                    "title": "大型"
                }
            ],
            "toolbox_bqlx": [
                {
                    "value": "0",
                    "text": "工程可视化",
                    "title": "工程可视化"
                },
                {
                    "value": "1",
                    "text": "智慧工程",
                    "title": "智慧工程"
                },
                {
                    "value": "2",
                    "text": "工程咨询",
                    "title": "工程咨询"
                },
                {
                    "value": "3",
                    "text": "工程展馆",
                    "title": "工程展馆"
                }
            ],
            "activiti_sync": [
                {
                    "value": "1",
                    "text": "同步",
                    "title": "同步"
                },
                {
                    "value": "0",
                    "text": "不同步",
                    "title": "不同步"
                }
            ],
            "fengxianleibie": [
                {
                    "value": "1",
                    "text": "人身伤害",
                    "title": "人身伤害"
                },
                {
                    "value": "2",
                    "text": "设备损害",
                    "title": "设备损害"
                },
                {
                    "value": "3",
                    "text": "自然灾害",
                    "title": "自然灾害"
                },
                {
                    "value": "4",
                    "text": "其他",
                    "title": "其他"
                }
            ],
            "zg_status": [
                {
                    "value": "1",
                    "text": "待整改",
                    "title": "待整改"
                },
                {
                    "value": "2",
                    "text": "待验收",
                    "title": "待验收"
                },
                {
                    "value": "3",
                    "text": "已验收",
                    "title": "已验收"
                }
            ],
            "status": [
                {
                    "value": "0",
                    "text": "待验收",
                    "title": "待验收"
                },
                {
                    "value": "1",
                    "text": "已验收",
                    "title": "已验收"
                }
            ],
            "patent_status": [
                {
                    "value": "0",
                    "text": "受理",
                    "title": "受理"
                },
                {
                    "value": "1",
                    "text": "初审",
                    "title": "初审"
                },
                {
                    "value": "2",
                    "text": "实审",
                    "title": "实审"
                },
                {
                    "value": "3",
                    "text": "授权",
                    "title": "授权"
                },
                {
                    "value": "4",
                    "text": "专利驳回",
                    "title": "专利驳回"
                }
            ],
            "msgType": [
                {
                    "value": "4",
                    "text": "系统",
                    "title": "系统"
                },
                {
                    "value": "1",
                    "text": "短信",
                    "title": "短信"
                },
                {
                    "value": "2",
                    "text": "邮件",
                    "title": "邮件"
                },
                {
                    "value": "3",
                    "text": "微信",
                    "title": "微信"
                }
            ],
            "pingfancd": [
                {
                    "value": "1",
                    "text": "10",
                    "title": "10"
                },
                {
                    "value": "2",
                    "text": "6",
                    "title": "6"
                },
                {
                    "value": "3",
                    "text": "3",
                    "title": "3"
                },
                {
                    "value": "4",
                    "text": "2",
                    "title": "2"
                },
                {
                    "value": "5",
                    "text": "1",
                    "title": "1"
                },
                {
                    "value": "7",
                    "text": "0.6",
                    "title": "0.6"
                }
            ],
            "award_type": [
                {
                    "value": "0",
                    "text": "政府设奖",
                    "title": "政府设奖"
                },
                {
                    "value": "1",
                    "text": "社会力量",
                    "title": "社会力量"
                },
                {
                    "value": "2",
                    "text": "其他",
                    "title": "其他"
                }
            ],
            "log_type": [
                {
                    "value": "2",
                    "text": "操作日志",
                    "title": "操作日志"
                },
                {
                    "value": "1",
                    "text": "登录日志",
                    "title": "登录日志"
                }
            ],
            "ceshi_code": [
                {
                    "value": "1",
                    "text": "普通员工",
                    "title": "普通员工"
                },
                {
                    "value": "2",
                    "text": "领导",
                    "title": "领导"
                }
            ],
            "jibie": [
                {
                    "value": "1",
                    "text": "部级",
                    "title": "部级"
                },
                {
                    "value": "2",
                    "text": "市级",
                    "title": "市级"
                },
                {
                    "value": "3",
                    "text": "省级",
                    "title": "省级"
                }
            ],
            "form_perms_type": [
                {
                    "value": "1",
                    "text": "可见(未授权不可见)",
                    "title": "可见(未授权不可见)"
                },
                {
                    "value": "2",
                    "text": "可编辑(未授权禁用)",
                    "title": "可编辑(未授权禁用)"
                }
            ],
            "valid_status": [
                {
                    "value": "1",
                    "text": "有效",
                    "title": "有效"
                },
                {
                    "value": "0",
                    "text": "无效",
                    "title": "无效"
                }
            ],
            "Results_type": [
                {
                    "value": "1",
                    "text": "科学科技奖",
                    "title": "科学科技奖"
                },
                {
                    "value": "2",
                    "text": "工法",
                    "title": "工法"
                },
                {
                    "value": "3",
                    "text": "标准",
                    "title": "标准"
                },
                {
                    "value": "4",
                    "text": "论文",
                    "title": "论文"
                },
                {
                    "value": "5",
                    "text": "QC成果",
                    "title": "QC成果"
                },
                {
                    "value": "6",
                    "text": "专利",
                    "title": "专利"
                }
            ],
            "sex": [
                {
                    "value": "1",
                    "text": "男",
                    "title": "男"
                },
                {
                    "value": "2",
                    "text": "女",
                    "title": "女"
                }
            ],
            "perms_type": [
                {
                    "value": "1",
                    "text": "显示",
                    "title": "显示"
                },
                {
                    "value": "2",
                    "text": "禁用",
                    "title": "禁用"
                }
            ],
            "faguibiaozhun_jibie": [
                {
                    "value": "2",
                    "text": "行业法规",
                    "title": "行业法规"
                },
                {
                    "value": "3",
                    "text": "地方法规",
                    "title": "地方法规"
                }
            ],
            "actor": [
                {
                    "value": "0",
                    "text": "管理员",
                    "title": "管理员"
                },
                {
                    "value": "1",
                    "text": "安全管理",
                    "title": "安全管理"
                },
                {
                    "value": "2",
                    "text": "质量管控",
                    "title": "质量管控"
                },
                {
                    "value": "3",
                    "text": "综合管理",
                    "title": "综合管理"
                },
                {
                    "value": "4",
                    "text": "科创管理",
                    "title": "科创管理"
                }
            ],
            "stage": [
                {
                    "value": "0",
                    "text": "前期研究阶段",
                    "title": "前期研究阶段"
                },
                {
                    "value": "1",
                    "text": "立项阶段",
                    "title": "立项阶段"
                },
                {
                    "value": "2",
                    "text": "招采阶段",
                    "title": "招采阶段"
                },
                {
                    "value": "3",
                    "text": "研发阶段",
                    "title": "研发阶段"
                },
                {
                    "value": "4",
                    "text": "验收阶段",
                    "title": "验收阶段"
                },
                {
                    "value": "5",
                    "text": "推广应用",
                    "title": "推广应用"
                },
                {
                    "value": "6",
                    "text": "报奖阶段",
                    "title": "报奖阶段"
                }
            ],
            "bpm_status": [
                {
                    "value": "1",
                    "text": "待整改",
                    "title": "待整改"
                },
                {
                    "value": "2",
                    "text": "验收中",
                    "title": "验收中"
                },
                {
                    "value": "3",
                    "text": "已完成",
                    "title": "已完成"
                },
                {
                    "value": "4",
                    "text": "已作废",
                    "title": "已作废"
                },
                {
                    "value": "5",
                    "text": "已挂起",
                    "title": "已挂起"
                }
            ],
            "secret_level": [
                {
                    "value": "0",
                    "text": "一般",
                    "title": "一般"
                },
                {
                    "value": "1",
                    "text": "秘密",
                    "title": "秘密"
                },
                {
                    "value": "2",
                    "text": "机密",
                    "title": "机密"
                },
                {
                    "value": "3",
                    "text": "绝密",
                    "title": "绝密"
                }
            ],
            "depart_status": [
                {
                    "value": "0",
                    "text": "不启用",
                    "title": "不启用"
                },
                {
                    "value": "1",
                    "text": "启用",
                    "title": "启用"
                }
            ],
            "experts": [
                {
                    "value": "1",
                    "text": "品质工程专家组",
                    "title": "品质工程专家组"
                },
                {
                    "value": "2",
                    "text": "平安工地专家组",
                    "title": "平安工地专家组"
                },
                {
                    "value": "3",
                    "text": "智能巡检咨询专家",
                    "title": "智能巡检咨询专家"
                }
            ],
            "mettingType": [
                {
                    "value": "depart",
                    "text": "部门会议",
                    "title": "部门会议"
                },
                {
                    "value": "temp",
                    "text": "临时会议",
                    "title": "临时会议"
                },
                {
                    "value": "company",
                    "text": "公司会议",
                    "title": "公司会议"
                },
                {
                    "value": "train",
                    "text": "培训会议",
                    "title": "培训会议"
                },
                {
                    "value": "common",
                    "text": "普通会议",
                    "title": "普通会议"
                }
            ],
            "reminders": [
                {
                    "value": "0",
                    "text": "不重复",
                    "title": "不重复"
                },
                {
                    "value": "1",
                    "text": "每天",
                    "title": "每天"
                },
                {
                    "value": "2",
                    "text": "每周",
                    "title": "每周"
                },
                {
                    "value": "3",
                    "text": "每月（当日）",
                    "title": "每月（当日）"
                },
                {
                    "value": "4",
                    "text": "每年（当日）",
                    "title": "每年（当日）"
                }
            ],
            "kenengxing_matrix": [
                {
                    "value": "5",
                    "text": "5",
                    "title": "5"
                },
                {
                    "value": "4",
                    "text": "4",
                    "title": "4"
                },
                {
                    "value": "3",
                    "text": "3",
                    "title": "3"
                },
                {
                    "value": "2",
                    "text": "2",
                    "title": "2"
                },
                {
                    "value": "1",
                    "text": "1",
                    "title": "1"
                }
            ],
            "fund_input": [],
            "bonus": [],
            "air_china_ supplier": [
                {
                    "value": "2",
                    "text": "耐克供应商",
                    "title": "耐克供应商"
                },
                {
                    "value": "1",
                    "text": "阿迪供应商",
                    "title": "阿迪供应商"
                }
            ],
            "online_graph_data_type": [
                {
                    "value": "sql",
                    "text": "SQL",
                    "title": "SQL"
                },
                {
                    "value": "json",
                    "text": "JSON",
                    "title": "JSON"
                },
                {
                    "value": "api",
                    "text": "API",
                    "title": "API"
                }
            ],
            "not_project": [
                {
                    "value": "1",
                    "text": "四新类应用",
                    "title": "四新类应用"
                },
                {
                    "value": "2",
                    "text": "工程建设类",
                    "title": "工程建设类"
                }
            ],
            "approval_remarks": [
                {
                    "value": "同意",
                    "text": "同意",
                    "title": "同意"
                },
                {
                    "value": "同意***的意见",
                    "text": "同意***的意见",
                    "title": "同意***的意见"
                },
                {
                    "value": "请指示",
                    "text": "请指示",
                    "title": "请指示"
                },
                {
                    "value": "请***阅示",
                    "text": "请***阅示",
                    "title": "请***阅示"
                },
                {
                    "value": "请处理",
                    "text": "请处理",
                    "title": "请处理"
                },
                {
                    "value": "不同意",
                    "text": "不同意",
                    "title": "不同意"
                },
                {
                    "value": "呈领导阅示",
                    "text": "呈领导阅示",
                    "title": "呈领导阅示"
                },
                {
                    "value": "请审批",
                    "text": "请审批",
                    "title": "请审批"
                },
                {
                    "value": "审核无误",
                    "text": "审核无误",
                    "title": "审核无误"
                }
            ],
            "kenengxing": [
                {
                    "value": "1",
                    "text": "10",
                    "title": "10"
                },
                {
                    "value": "2",
                    "text": "6",
                    "title": "6"
                },
                {
                    "value": "3",
                    "text": "3",
                    "title": "3"
                },
                {
                    "value": "4",
                    "text": "1",
                    "title": "1"
                },
                {
                    "value": "5",
                    "text": "0.5",
                    "title": "0.5"
                },
                {
                    "value": "6",
                    "text": "0.2",
                    "title": "0.2"
                },
                {
                    "value": "7",
                    "text": "0.1",
                    "title": "0.1"
                }
            ],
            "sign_type": [
                {
                    "value": "1",
                    "text": "上班打卡",
                    "title": "上班打卡"
                },
                {
                    "value": "2",
                    "text": "下班打卡",
                    "title": "下班打卡"
                },
                {
                    "value": "3",
                    "text": "外出打卡",
                    "title": "外出打卡"
                },
                {
                    "value": "4",
                    "text": "请假",
                    "title": "请假"
                },
                {
                    "value": "5",
                    "text": "出差",
                    "title": "出差"
                }
            ],
            "group": [
                {
                    "value": "1",
                    "text": "组长",
                    "title": "组长"
                },
                {
                    "value": "2",
                    "text": "组员",
                    "title": "组员"
                }
            ],
            "area": [
                {
                    "value": "0",
                    "text": "全国",
                    "title": "全国"
                },
                {
                    "value": "1",
                    "text": "黑龙江省",
                    "title": "黑龙江省"
                },
                {
                    "value": "2",
                    "text": "辽宁省",
                    "title": "辽宁省"
                },
                {
                    "value": "3",
                    "text": "吉林省",
                    "title": "吉林省"
                },
                {
                    "value": "4",
                    "text": "河北省",
                    "title": "河北省"
                },
                {
                    "value": "5",
                    "text": "山西省",
                    "title": "山西省"
                },
                {
                    "value": "6",
                    "text": "山东省",
                    "title": "山东省"
                },
                {
                    "value": "7",
                    "text": "江苏省",
                    "title": "江苏省"
                },
                {
                    "value": "8",
                    "text": "浙江省",
                    "title": "浙江省"
                },
                {
                    "value": "9",
                    "text": "安徽省",
                    "title": "安徽省"
                },
                {
                    "value": "10",
                    "text": "福建省",
                    "title": "福建省"
                },
                {
                    "value": "11",
                    "text": "江西省",
                    "title": "江西省"
                },
                {
                    "value": "12",
                    "text": "河南省",
                    "title": "河南省"
                },
                {
                    "value": "13",
                    "text": "湖北省",
                    "title": "湖北省"
                },
                {
                    "value": "14",
                    "text": "湖南省",
                    "title": "湖南省"
                },
                {
                    "value": "15",
                    "text": "广东省",
                    "title": "广东省"
                },
                {
                    "value": "16",
                    "text": "海南省",
                    "title": "海南省"
                },
                {
                    "value": "17",
                    "text": "四川省",
                    "title": "四川省"
                },
                {
                    "value": "18",
                    "text": "贵州省",
                    "title": "贵州省"
                },
                {
                    "value": "19",
                    "text": "云南省",
                    "title": "云南省"
                },
                {
                    "value": "20",
                    "text": "陕西省",
                    "title": "陕西省"
                },
                {
                    "value": "21",
                    "text": "甘肃省",
                    "title": "甘肃省"
                },
                {
                    "value": "22",
                    "text": "青海省",
                    "title": "青海省"
                },
                {
                    "value": "23",
                    "text": "台湾省",
                    "title": "台湾省"
                },
                {
                    "value": "24",
                    "text": "北京市",
                    "title": "北京市"
                },
                {
                    "value": "25",
                    "text": "上海市",
                    "title": "上海市"
                },
                {
                    "value": "26",
                    "text": "重庆市",
                    "title": "重庆市"
                },
                {
                    "value": "27",
                    "text": "天津市",
                    "title": "天津市"
                },
                {
                    "value": "28",
                    "text": "内蒙古自治区",
                    "title": "内蒙古自治区"
                },
                {
                    "value": "29",
                    "text": "新疆维吾尔自治区",
                    "title": "新疆维吾尔自治区"
                },
                {
                    "value": "30",
                    "text": "广西壮族自治区",
                    "title": "广西壮族自治区"
                },
                {
                    "value": "31",
                    "text": "宁夏回族自治区",
                    "title": "宁夏回族自治区"
                },
                {
                    "value": "32",
                    "text": "西藏自治区",
                    "title": "西藏自治区"
                },
                {
                    "value": "33",
                    "text": "香港特别行政区",
                    "title": "香港特别行政区"
                },
                {
                    "value": "34",
                    "text": "澳门特别行政区",
                    "title": "澳门特别行政区"
                }
            ],
            "del_flag": [
                {
                    "value": "1",
                    "text": "已删除",
                    "title": "已删除"
                },
                {
                    "value": "0",
                    "text": "正常",
                    "title": "正常"
                }
            ],
            "record_shooling": [
                {
                    "value": "0",
                    "text": "大专",
                    "title": "大专"
                },
                {
                    "value": "1",
                    "text": "本科",
                    "title": "本科"
                },
                {
                    "value": "2",
                    "text": "硕士研究生",
                    "title": "硕士研究生"
                },
                {
                    "value": "3",
                    "text": "博士研究生",
                    "title": "博士研究生"
                }
            ],
            "cgform_table_type": [
                {
                    "value": "1",
                    "text": "单表",
                    "title": "单表"
                },
                {
                    "value": "2",
                    "text": "主表",
                    "title": "主表"
                },
                {
                    "value": "3",
                    "text": "附表",
                    "title": "附表"
                }
            ],
            "level": [
                {
                    "value": "0",
                    "text": "省内领先",
                    "title": "省内领先"
                },
                {
                    "value": "1",
                    "text": "省内先进",
                    "title": "省内先进"
                },
                {
                    "value": "2",
                    "text": "国内领先",
                    "title": "国内领先"
                },
                {
                    "value": "3",
                    "text": "国内先进",
                    "title": "国内先进"
                },
                {
                    "value": "4",
                    "text": "国际领先",
                    "title": "国际领先"
                },
                {
                    "value": "5",
                    "text": "国际先进",
                    "title": "国际先进"
                }
            ],
            "msg_category": [
                {
                    "value": "1",
                    "text": "通知公告",
                    "title": "通知公告"
                },
                {
                    "value": "2",
                    "text": "系统消息",
                    "title": "系统消息"
                }
            ],
            "dict_item_status": [
                {
                    "value": "0",
                    "text": "不启用",
                    "title": "不启用"
                }
            ],
            "project_research_engineering": [
                {
                    "value": "0",
                    "text": "龙溪口航电枢纽工程",
                    "title": "龙溪口航电枢纽工程"
                },
                {
                    "value": "1",
                    "text": "犍为航电枢纽工程",
                    "title": "犍为航电枢纽工程"
                },
                {
                    "value": "2",
                    "text": "测试工程",
                    "title": "测试工程"
                }
            ],
            "air_china_unit": [
                {
                    "value": "1",
                    "text": "件",
                    "title": "件"
                },
                {
                    "value": "2",
                    "text": "套",
                    "title": "套"
                },
                {
                    "value": "3",
                    "text": "条",
                    "title": "条"
                },
                {
                    "value": "4",
                    "text": "双",
                    "title": "双"
                },
                {
                    "value": "5",
                    "text": "个",
                    "title": "个"
                },
                {
                    "value": "7",
                    "text": "块",
                    "title": "块"
                },
                {
                    "value": "8",
                    "text": "包",
                    "title": "包"
                }
            ],
            "msgSendStatus": [
                {
                    "value": "0",
                    "text": "未发送",
                    "title": "未发送"
                },
                {
                    "value": "1",
                    "text": "发送成功",
                    "title": "发送成功"
                },
                {
                    "value": "2",
                    "text": "发送失败",
                    "title": "发送失败"
                }
            ],
            "msg_type": [
                {
                    "value": "USER",
                    "text": "指定用户",
                    "title": "指定用户"
                },
                {
                    "value": "ALL",
                    "text": "全体用户",
                    "title": "全体用户"
                }
            ],
            "patent_type": [
                {
                    "value": "0",
                    "text": "国际专利",
                    "title": "国际专利"
                },
                {
                    "value": "1",
                    "text": "国家发明",
                    "title": "国家发明"
                },
                {
                    "value": "2",
                    "text": "国家实用新型",
                    "title": "国家实用新型"
                },
                {
                    "value": "3",
                    "text": "国家外观设计",
                    "title": "国家外观设计"
                },
                {
                    "value": "4",
                    "text": "软件著作权",
                    "title": "软件著作权"
                }
            ],
            "eoa_plan_type": [
                {
                    "value": "1",
                    "text": "日常记录",
                    "title": "日常记录"
                },
                {
                    "value": "2",
                    "text": "本周工作",
                    "title": "本周工作"
                },
                {
                    "value": "3",
                    "text": "下周计划",
                    "title": "下周计划"
                }
            ],
            "toolbox_xs": [
                {
                    "value": "0",
                    "text": "是",
                    "title": "是"
                },
                {
                    "value": "1",
                    "text": "否",
                    "title": "否"
                }
            ],
            "eoa_plan_status": [
                {
                    "value": "0",
                    "text": "未开始",
                    "title": "未开始"
                },
                {
                    "value": "1",
                    "text": "已提醒",
                    "title": "已提醒"
                },
                {
                    "value": "2",
                    "text": "进行中",
                    "title": "进行中"
                },
                {
                    "value": "3",
                    "text": "已完成",
                    "title": "已完成"
                },
                {
                    "value": "4",
                    "text": "已接受",
                    "title": "已接受"
                },
                {
                    "value": "5",
                    "text": "已取消",
                    "title": "已取消"
                }
            ],
            "The_honor_level": [
                {
                    "value": "3",
                    "text": "国际性奖项",
                    "title": "国际性奖项"
                },
                {
                    "value": "0",
                    "text": "国家级",
                    "title": "国家级"
                },
                {
                    "value": "1",
                    "text": "省级",
                    "title": "省级"
                },
                {
                    "value": "2",
                    "text": "市级",
                    "title": "市级"
                },
                {
                    "value": "4",
                    "text": "其他奖项",
                    "title": "其他奖项"
                }
            ],
            "air_china_size": [
                {
                    "value": "1",
                    "text": "量体类",
                    "title": "量体类"
                },
                {
                    "value": "2",
                    "text": "男衬衫类",
                    "title": "男衬衫类"
                },
                {
                    "value": "3",
                    "text": "羊毛衫及毛背心类",
                    "title": "羊毛衫及毛背心类"
                },
                {
                    "value": "4",
                    "text": "标准尺码类",
                    "title": "标准尺码类"
                },
                {
                    "value": "5",
                    "text": "固定型号",
                    "title": "固定型号"
                }
            ],
            "unit_type": [
                {
                    "value": "0",
                    "text": "勘察设计单位",
                    "title": "勘察设计单位"
                },
                {
                    "value": "1",
                    "text": "施工单位",
                    "title": "施工单位"
                },
                {
                    "value": "3",
                    "text": "监理单位",
                    "title": "监理单位"
                },
                {
                    "value": "4",
                    "text": "建设单位",
                    "title": "建设单位"
                }
            ],
            "title": [
                {
                    "value": "0",
                    "text": "中国科学院院士",
                    "title": "中国科学院院士"
                },
                {
                    "value": "1",
                    "text": "中国工程院院士",
                    "title": "中国工程院院士"
                },
                {
                    "value": "2",
                    "text": "有突出贡献的中青年专家",
                    "title": "有突出贡献的中青年专家"
                },
                {
                    "value": "3",
                    "text": "青年杰出人才",
                    "title": "青年杰出人才"
                },
                {
                    "value": "4",
                    "text": "国家杰青",
                    "title": "国家杰青"
                },
                {
                    "value": "5",
                    "text": "杰出专业技术人才",
                    "title": "杰出专业技术人才"
                },
                {
                    "value": "6",
                    "text": "新世纪高层次人才工程",
                    "title": "新世纪高层次人才工程"
                },
                {
                    "value": "7",
                    "text": "省政府特殊津贴",
                    "title": "省政府特殊津贴"
                },
                {
                    "value": "8",
                    "text": "百千万人才工程",
                    "title": "百千万人才工程"
                },
                {
                    "value": "9",
                    "text": "政府专项津贴",
                    "title": "政府专项津贴"
                },
                {
                    "value": "10",
                    "text": "国家优青",
                    "title": "国家优青"
                },
                {
                    "value": "11",
                    "text": "国家有突出贡献中青年专家",
                    "title": "国家有突出贡献中青年专家"
                },
                {
                    "value": "12",
                    "text": "新世纪优秀人才",
                    "title": "新世纪优秀人才"
                },
                {
                    "value": "13",
                    "text": "国务院特殊津贴",
                    "title": "国务院特殊津贴"
                },
                {
                    "value": "14",
                    "text": "创新人才推进计划",
                    "title": "创新人才推进计划"
                },
                {
                    "value": "15",
                    "text": "其他",
                    "title": "其他"
                }
            ],
            "database_type": [
                {
                    "value": "1",
                    "text": "MySQL5.5",
                    "title": "MySQL5.5"
                },
                {
                    "value": "4",
                    "text": "MYSQL5.7",
                    "title": "MYSQL5.7"
                },
                {
                    "value": "2",
                    "text": "Oracle",
                    "title": "Oracle"
                },
                {
                    "value": "3",
                    "text": "SQLServer",
                    "title": "SQLServer"
                }
            ],
            "Post_properties": [
                {
                    "value": "1",
                    "text": "研发",
                    "title": "研发"
                },
                {
                    "value": "2",
                    "text": "管理",
                    "title": "管理"
                }
            ],
            "urgency": [
                {
                    "value": "0",
                    "text": "一般",
                    "title": "一般"
                },
                {
                    "value": "1",
                    "text": "平急",
                    "title": "平急"
                },
                {
                    "value": "2",
                    "text": "加急",
                    "title": "加急"
                },
                {
                    "value": "3",
                    "text": "特急",
                    "title": "特急"
                },
                {
                    "value": "4",
                    "text": "特提",
                    "title": "特提"
                }
            ],
            "shiguhouguo_matrix": [
                {
                    "value": "5",
                    "text": "5",
                    "title": "5"
                },
                {
                    "value": "4",
                    "text": "4",
                    "title": "4"
                },
                {
                    "value": "3",
                    "text": "3",
                    "title": "3"
                },
                {
                    "value": "2",
                    "text": "2",
                    "title": "2"
                },
                {
                    "value": "1",
                    "text": "1",
                    "title": "1"
                }
            ],
            "sign_status": [
                {
                    "value": "0",
                    "text": "缺卡",
                    "title": "缺卡"
                },
                {
                    "value": "1",
                    "text": "正常",
                    "title": "正常"
                },
                {
                    "value": "2",
                    "text": "迟到",
                    "title": "迟到"
                },
                {
                    "value": "3",
                    "text": "旷工",
                    "title": "旷工"
                },
                {
                    "value": "4",
                    "text": "早退",
                    "title": "早退"
                }
            ],
            "send_status": [
                {
                    "value": "0",
                    "text": "未发布",
                    "title": "未发布"
                },
                {
                    "value": "1",
                    "text": "已发布",
                    "title": "已发布"
                },
                {
                    "value": "2",
                    "text": "已撤销",
                    "title": "已撤销"
                }
            ],
            "bpm_process_type": [
                {
                    "value": "test",
                    "text": "测试流程",
                    "title": "测试流程"
                },
                {
                    "value": "oa",
                    "text": "OA办公",
                    "title": "OA办公"
                },
                {
                    "value": "business",
                    "text": "业务办理",
                    "title": "业务办理"
                }
            ],
            "urgent_level": [
                {
                    "value": "1",
                    "text": "一般",
                    "title": "一般"
                },
                {
                    "value": "2",
                    "text": "重要",
                    "title": "重要"
                },
                {
                    "value": "3",
                    "text": "紧急",
                    "title": "紧急"
                }
            ],
            "air_china_valid": [
                {
                    "value": "2",
                    "text": "不启动",
                    "title": "不启动"
                },
                {
                    "value": "1",
                    "text": "启动",
                    "title": "启动"
                }
            ],
            "user_status": [
                {
                    "value": "1",
                    "text": "正常",
                    "title": "正常"
                },
                {
                    "value": "2",
                    "text": "冻结",
                    "title": "冻结"
                }
            ],
            "operate_type": [
                {
                    "value": "1",
                    "text": "查询",
                    "title": "查询"
                },
                {
                    "value": "2",
                    "text": "添加",
                    "title": "添加"
                },
                {
                    "value": "3",
                    "text": "修改",
                    "title": "修改"
                },
                {
                    "value": "4",
                    "text": "删除",
                    "title": "删除"
                },
                {
                    "value": "5",
                    "text": "导入",
                    "title": "导入"
                },
                {
                    "value": "6",
                    "text": "导出",
                    "title": "导出"
                }
            ],
            "quartz_status": [
                {
                    "value": "0",
                    "text": "正常",
                    "title": "正常"
                },
                {
                    "value": "-1",
                    "text": "停止",
                    "title": "停止"
                }
            ],
            "nature": [
                {
                    "value": "0",
                    "text": "计划内培训",
                    "title": "计划内培训"
                },
                {
                    "value": "1",
                    "text": "计划外培训",
                    "title": "计划外培训"
                }
            ],
            "menu_type": [
                {
                    "value": "2",
                    "text": "按钮权限",
                    "title": "按钮权限"
                },
                {
                    "value": "1",
                    "text": "子菜单",
                    "title": "子菜单"
                },
                {
                    "value": "0",
                    "text": "一级菜单",
                    "title": "一级菜单"
                }
            ],
            "wz_cc_type": [
                {
                    "value": "yifu",
                    "text": "衣服",
                    "title": "衣服"
                },
                {
                    "value": "dd",
                    "text": "dd",
                    "title": "dd"
                }
            ],
            "issue_type": [
                {
                    "value": "0",
                    "text": "工程设计",
                    "title": "工程设计"
                },
                {
                    "value": "1",
                    "text": "工程管理",
                    "title": "工程管理"
                },
                {
                    "value": "2",
                    "text": "科技创新",
                    "title": "科技创新"
                },
                {
                    "value": "3",
                    "text": "工程质量",
                    "title": "工程质量"
                },
                {
                    "value": "4",
                    "text": "安全保障",
                    "title": "安全保障"
                },
                {
                    "value": "5",
                    "text": "绿色环保",
                    "title": "绿色环保"
                },
                {
                    "value": "6",
                    "text": "软实力",
                    "title": "软实力"
                }
            ],
            "whether_not": [
                {
                    "value": "0",
                    "text": "是",
                    "title": "是"
                },
                {
                    "value": "1",
                    "text": "否",
                    "title": "否"
                }
            ],
            "global_perms_type": [
                {
                    "value": "1",
                    "text": "可见/可访问(授权后可见/可访问)",
                    "title": "可见/可访问(授权后可见/可访问)"
                },
                {
                    "value": "2",
                    "text": "可编辑(未授权时禁用)",
                    "title": "可编辑(未授权时禁用)"
                }
            ],
            "online_graph_type": [
                {
                    "value": "bar",
                    "text": "柱状图",
                    "title": "柱状图"
                },
                {
                    "value": "line",
                    "text": "曲线图",
                    "title": "曲线图"
                },
                {
                    "value": "pie",
                    "text": "饼图",
                    "title": "饼图"
                },
                {
                    "value": "table",
                    "text": "数据列表",
                    "title": "数据列表"
                }
            ],
            "cms_menu_type": [
                {
                    "value": "1",
                    "text": "列表",
                    "title": "列表"
                },
                {
                    "value": "2",
                    "text": "链接",
                    "title": "链接"
                }
            ],
            "performance": [
                {
                    "value": "0",
                    "text": "实施中",
                    "title": "实施中"
                },
                {
                    "value": "1",
                    "text": "已完成",
                    "title": "已完成"
                },
                {
                    "value": "2",
                    "text": "终止",
                    "title": "终止"
                }
            ],
            "pinggu": [
                {
                    "value": "1",
                    "text": "LEC",
                    "title": "LEC"
                },
                {
                    "value": "2",
                    "text": "风险矩阵",
                    "title": "风险矩阵"
                }
            ],
            "category": [
                {
                    "value": "0",
                    "text": "国际标准",
                    "title": "国际标准"
                },
                {
                    "value": "1",
                    "text": "国家标准",
                    "title": "国家标准"
                },
                {
                    "value": "2",
                    "text": "行业标准",
                    "title": "行业标准"
                },
                {
                    "value": "3",
                    "text": "地方标准",
                    "title": "地方标准"
                },
                {
                    "value": "4",
                    "text": "企业标准",
                    "title": "企业标准"
                }
            ],
            "Business_category": [
                {
                    "value": "0",
                    "text": "企业专职",
                    "title": "企业专职"
                },
                {
                    "value": "1",
                    "text": "企业外聘",
                    "title": "企业外聘"
                }
            ]
        },
        "departs": [
            {
                "id": "94ea8dfda0f44a43b7fe5113c37e1ab3",
                "parentId": "",
                "departName": "武汉鲸禾科技有限公司",
                "departNameEn": null,
                "departNameAbbr": null,
                "departOrder": 0,
                "description": null,
                "orgCategory": "1",
                "orgType": "1",
                "orgCode": "A02",
                "mobile": null,
                "regulators": "",
                "fax": null,
                "address": null,
                "memo": null,
                "status": null,
                "delFlag": "0",
                "createBy": "admin",
                "createTime": "2021-10-25 17:04:11",
                "updateBy": "admin",
                "updateTime": "2023-08-21 18:38:13",
                "children": null
            }
        ],
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MDY3Njk0MzUsInVzZXJuYW1lIjoiYWRtaW4ifQ.90PYgroo0OhyD5cAIkifXlbmOzd_uxRNUpMkURLK4gg"
    },
    "timestamp": 1706767635193
}