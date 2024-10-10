<!--
 * @Author: pengchun pengchun@example.com
 * @Date: 2023-12-13 09:50:22
 * @LastEditors: pengchun pengchun@example.com
 * @LastEditTime: 2024-02-28 12:00:25
 * @FilePath: \jmc_pad\pages\mine\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<view class="mine-page">
        <uv-loading-page :loading="pageLoading" loading-text="资源加载中..." font-size="12rpx"></uv-loading-page>
		<BaseNavbar title="我的"></BaseNavbar>
        <view class="mine-main">
            <view class="mine-section mine-info">
                <view class="section-header">
                    <view class="header-line"></view>
                    <view class="header-title">个人信息</view>
                    <view class="header-btn info-btn"  @click="handlePassword">
                        修改密码 >
                    </view>
                </view>
                <view class="info-content">
                    <view class="info-content-left">
                        <image v-if="imgSuccess" class="user-avatar" :src="avatarImg" @error="onErrorImag" />
                        <image v-else class="user-avatar" :src="defaultAvatar" />
                        <!-- <uv-icon class="user-edit-icon" name="edit-pen" size="24"></uv-icon> -->
                    </view>
                    <view class="info-content-right">
                        <view class="right-row">
                            <view class="row-item">
                                <view class="item-label">用户账号:</view>
                                <view class="item-value">{{ userInfo.username }}</view>
                            </view>
                            <view class="row-item">
                                <view class="item-label">所属部门:</view>
                                <view class="item-value">{{ userInfo.departList && userInfo.departList[0]['departName'] }}</view>
                            </view>
                        </view>
                        <view class="right-row">
                            <view class="row-item">
                                <view class="item-label">用户名称:</view>
                                <view class="item-value">{{ userInfo.realname }}</view>
                            </view>
                            <view class="row-item">
                                <view class="item-label">手机号码:</view>
                                <view class="item-value">{{ userInfo.phone }}</view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="mine-section mine-system">
                <view class="section-header">
                    <view class="header-line"></view>
                    <view class="header-title">系统设置</view>
                    <view class="header-btn system-btn" @click="handleUpdate">
                        开始更新
                        <image class="update" src="@/static/mine/icon_update.png" />
                    </view>
                </view>
                <view class="system-content">
                    <view class="system-content-left">
                        <view class="item-label">当前版本:</view>
                        <view class="item-value">{{ nowVersion }}</view>
                    </view>
                    <view class="system-content-right">
                        <view class="item-label">最新版本:</view>
                        <view class="item-value new-version">{{ version }}</view>
                    </view>
                </view>
            </view>
            <view class="mine-btn">
                <!-- <uv-button type="primary" text="清除缓存" @click="handleClear"></uv-button> -->
                <!-- <uv-button type="primary" text="一键刷新" @click="handleRefresh"></uv-button> -->
                <uv-button type="error" text="退出登录" @click="handleLogout"></uv-button>
            </view>
        </view>

        <view>
            <uv-popup class="password-popup" ref="popup" mode="center" :round="10" closeable @close="handleClose" @open="handleOpen">
                <view class="popup-title">修改密码</view>
                <uv-form
                    labelPosition="left"
                    :model="passwordModel"
                    :rules="passwordRules"
                    ref="passwordForm"
                    labelWidth="90"
                    class="password-form"
		        >
                    <uv-form-item label="原始密码" prop="oldpassword" borderBottom ref="oldpassword">
                        <uv-input type="password" placeholder="请输入原始密码" v-model="passwordModel.oldpassword"
                            border="none" clearable></uv-input>
                    </uv-form-item>
                    <uv-form-item label="新密码" prop="password" borderBottom ref="password">
                        <uv-input type="password" placeholder="请输入新密码" v-model="passwordModel.password"
                            border="none" clearable></uv-input>
                    </uv-form-item>
                    <uv-form-item label="确认密码" prop="confirmpassword" borderBottom ref="confirmpassword">
                        <uv-input type="password" placeholder="请再次输入新密码" v-model="passwordModel.confirmpassword"
                            border="none" clearable></uv-input>
                    </uv-form-item>
                </uv-form>
                <uv-button class="sure-btn" @click="handleSure" type="primary">确定</uv-button>
            </uv-popup>
        </view>
	</view>
</template>

<script>
	import BaseNavbar from '../../components/baseNavbar/index.vue';
    import { updatePassword } from '@/api/common/index'
    import { useToast, useDialog } from '@/utils/modals'
    import appUpdate from '@/utils/appUpdate.js';
    import defaultAvatar from '@/static/avatar.png'
	export default {
		components: {
			BaseNavbar
		},
		data() {
			return {
                pageLoading: false,
                defaultAvatar,
                imgSuccess: true,
				userInfo: JSON.parse(uni.getStorageSync('userInfo') || '{}'),
                // versionInfo: JSON.parse(uni.getStorageSync('versionInfo') || '{}'),
                nowVersion: '',
                version: '',
                passwordModel: {
                    oldpassword: '',
                    password: '',
                    confirmpassword: ''
                },
                passwordRules: {
                    'oldpassword': [
                        { type: 'string', required: true, message: '请输入原始密码', trigger: ['blur', 'change']}
                    ],
                    'password': [
                        { type: 'string', required: true, message: '密码由数字、字母和特殊符号组成，长度8-16位', trigger: ['blur', 'change']},
                        // { min: 8, max: 16, message: '密码由数字、字母和特殊符号组成，长度8-16位', trigger: ['blur', 'change'] },
                        { pattern: /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\da-zA-Z~!@#$%^&*]{8,16}$/ , message: '密码由数字、字母和特殊符号组成，长度8-16位', trigger: ['blur', 'change']}
                    ],
                    'confirmpassword': {
                        type: 'string',
                        required: true,
                        trigger: ['blur', 'change'],
                        validator: (rule, value, callback) => {
                            if (!value && this.passwordModel.password) {
                                callback(new Error('请再次输入新密码'));
                            } else if (value !== this.passwordModel.password) {
                                callback(new Error("两次密码输入不一致"));
                            } else {
                                callback();
                            }
                        }
                    },
                }
			}
		},
        computed: {
            networkStatus() {
                return this.$store.app?.getNetworkStatus
            },
            avatarImg() {
                return this.userInfo?.avatar
            }
        },
        async onShow() {
           await appUpdate({tips: false, isUpdate: false})
           let versionInfo = JSON.parse(uni.getStorageSync('versionInfo') || '{}')
           this.nowVersion = versionInfo.nowVersion
           this.version = versionInfo.version
        },
		methods: {
			//返回上一级
			back() {
				uni.navigateBack()
			},
            onErrorImag() {
                console.error('onErrorImag====>', 'onErrorImag')
                this.imgSuccess = false
            },
            handlePassword() {
                if (!this.networkStatus) {
                    useToast('当前无网络连接，请在有网状态下操作')
                    return
                }
                this.handleOpen()
            },
            handleClose() {
                this.$refs.popup.close();
                this.passwordModel.oldpassword = '';
                this.passwordModel.password = '';
                this.passwordModel.confirmpassword = '';
            },
            handleOpen() {
                this.$refs.popup.open();
            },
            handleSure() {
                this.$refs.passwordForm.validate().then(res => {
                    this.passwordModel.username = this.userInfo.username;
                    this.passwordModel.isDefault = '1';
                    updatePassword(this.passwordModel).then(res => {
                        if (res.code === 200) {
                            plus.nativeUI.toast('密码修改成功');
                            this.handleClose();
                            uni.clearStorageSync()
                            this.$store.user.logout()
                        } else {
                            plus.nativeUI.toast(res.message);
                        }
                    }).catch(() => {
                        plus.nativeUI.toast('网络异常');
                    })
                }).catch((errors) => {
                    console.log("失败信息:" + JSON.stringify(errors));
                })
            },
            handleUpdate() {
                if (!this.networkStatus) {
                    useToast('当前无网络连接，请在有网状态下操作')
                    return
                }
                appUpdate({tips: true, isUpdate: true})
            },
            // 清除所有缓存
            handleClear() {
                console.error('this.networkStatus===>', this.networkStatus);
                let tips = '确认清除所有缓存？'
                if (!this.networkStatus) {
                    tips = '当前无网络连接,确认清除所有缓存？'
                }
                useDialog(tips).then(() => {
                    uni.clearStorageSync()
                    this.$store.user.logout()
                })
            },
            handleLogout() {
                if (!this.networkStatus) {
                    useToast('当前无网络连接，请在有网状态下操作')
                    return
                }
                useDialog('确认退出？').then(() => {
                    uni.clearStorageSync()
                    this.$store.user.logout()
                })
                
                // logout().then((res) => {
                //     if (res.code === 200) {
                //         uni.removeStorageSync('cookie')
                //         uni.removeStorageSync('menus')
                //         uni.removeStorageSync('userInfo')
                //         uni.reLaunch({
                //             url: '/pages/login/index'
                //         })
                //     } else {
                //         plus.nativeUI.toast('退出失败');
                //     }
                // })
            }
		}
	}
</script>

<style lang="scss" scoped>
.mine-page {
	background-color: #F2F3F5;
	min-height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .mine-main {
        padding-top: 75rpx;
        width: 404rpx;
        display: flex;
        flex-direction: column;
        font-size: 12rpx;
        .mine-section {
            width: 100%;
            padding: 10rpx 16.41rpx 10rpx 15.21rpx;
            background: #E0ECF8;
            border-radius: 7rpx;
            .section-header {
                display: flex;
                align-items: center;
                .header-line {
                    width: 4rpx;
                    height: 9rpx;
                    background: #1690FF;
                    margin-right: 6.45rpx;
                }
                .header-title {
                    flex: 1;
                    font-size: 11rpx;
                    font-weight: 600;
                }
                .info-btn {
                    font-size: 9rpx;
                    color: #666666;
                }
            }
            .row-item {
                display: flex;
                align-items: center;
                &:first-child {
                    flex-shrink: 0;
                    margin-right: 12rpx;
                    width: 32%;
                }
                &:last-child {
                    width: 64%;
                }
            }
            .item-label {
                flex-shrink: 0;
                width: 40rpx;
                font-size: 9rpx;
                color: #666666;
                font-weight: 600;
            }
            .item-value {
                font-size: 9rpx;
                color: #333333;
                margin-left: 8rpx;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        .mine-info {
            // height:  125rpx;
            .info-content {
                display: flex;
                margin-top: 16.44rpx;
                .info-content-left {
                    position: relative;
                    width: 85rpx;
                    flex-shrink: 0;
                    margin-left: 10rpx;
                    .user-avatar {
                        width: 71rpx;
                        height: 71rpx;
                        border-radius: 50%;
                    }
                    .user-edit-icon {
                        position: absolute;
                        right: 24rpx;
                        bottom: 12rpx;
                        opacity: 0.4;
                    }
                }
                .info-content-right {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    overflow: hidden;
                    .right-row {
                        display: flex;
                        align-items: center;
                        &:last-child {
                            margin-top: 14rpx;
                        }
                    }
                    
                }
            }
        }
        .mine-system {
            height: 68rpx;
            margin-top: 17.58rpx;
            .system-btn {
                font-size: 9rpx;
                color: #1690FF;
                display: flex;
                align-items: center;
            }
            .update {
                width: 10rpx;
                height: 10rpx;
                margin-left: 2.1rpx;
            }
            .system-content {
                display: flex; 
                margin-top: 16.44rpx;
                .system-content-left {
                    width: 85rpx;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    margin-left: 10rpx
                }
                .system-content-right {
                    display: flex;
                    align-items: center;
                    .new-version {
                        color: #1690FF;
                    }
                }
            }
        }
        .mine-btn {
            & > * {
                margin-top: 10rpx;
            }
        }
    }

    .password-popup {
        position: relative;
        .popup-title {
            margin-top: 10rpx;
            text-align: center;
            font-size: 13rpx
        }
        .password-form {
            padding: 35rpx 35rpx 55rpx;
            width: 350rpx;
        }
        .sure-btn {
            position: absolute;
            width: 100%;
            bottom: -1px;
        }
    }
}
</style>