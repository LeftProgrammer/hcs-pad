import { useToast } from '@/utils/modals';
import { baseURL } from '@/configs/request.js';
import { getAppInfoUrl } from '@/api/common/index.js';
import { fileBaseSrc, isUrl, calculateFileSize } from '@/utils/utils/index';

// tips:是否弹出提示； isUpdate： 是否进行更新
export default async function appUpdate({ tips = false, isUpdate = true }) {
    uni.onNetworkStatusChange((res) => {
        console.error('res', res);
        if (!res.isConnected) {
            return;
        }
    });

    if (!isUrl(baseURL)) {
        console.log("BASE_URL地址配置为空，不进行 appUpdate ！");
        return;
    }

    try {
        const res = await uni.request({
            url: getAppInfoUrl,
            data: {
                appId: '__UNI__B052981' || plus.runtime.appid,
                t: new Date().getTime()
            }
        });

        if (res.statusCode !== 200) {
            console.error("appUpdate 请求响应异常", res);
            useToast('网络异常');
            return;
        }

        const { code, result } = res.data || {};
        if (code !== 200) {
            console.error("appUpdate 请求结果异常", res);
            useToast('网络异常');
            return;
        }

        const resdata = result || {};
        console.error('resdata', res);

        const isIos = uni.getSystemInfoSync().platform === 'ios';
        const wgtinfo = await new Promise((resolve) => {
            plus.runtime.getProperty(plus.runtime.appid, resolve);
        });

        resdata.nowVersion = wgtinfo.version;
        uni.setStorageSync('versionInfo', JSON.stringify(resdata));

        if (!isUpdate) return

        const flagUpdate = resdata.nowVersion.split(".").splice(0, 2).join(".") < resdata.version.split(".").splice(0, 2).join(".");
        const flagHot = (Number(resdata.nowVersion.split(".")[2]) < Number(resdata.version.split(".")[2])) && !flagUpdate;
        if (tips && !flagUpdate && !flagHot) {
            useToast(`当前已是最新版本无需更新,版本：${resdata.nowVersion}`);
            return;
        }
        if (flagUpdate && !isIos) {
            await handleFullUpdate(resdata);
        } else if (flagHot) {
            await handleHotUpdate(resdata);
        }
    } catch (err) {
        console.error("appUpdate 请求响应异常", err.message, JSON.stringify(err));
        useToast('网络异常');
    }
}

async function handleFullUpdate(resdata) {
    const totalSize = calculateFileSize(resdata.apkSize);
    const showResult = await uni.showModal({
        title: '更新提示',
        content: `${resdata.note || "版本更新"}\n\n版本号：${resdata.version}，大小：${totalSize}，立即进行新版本下载？`
    });

    if (showResult.confirm) {
        useToast("正在准备环境，请稍等!");
        let url = resdata.url;
        if (!isUrl(url)) {
            const uploadFileArr = resdata?.url ? resdata?.url?.split('|') : [];
            if (uploadFileArr.length > 0) {
                url = fileBaseSrc + uploadFileArr[0];
            } else {
                console.error('文件地址错误');
                return;
            }
        }

        try {
            const dtask = plus.downloader.createDownload(url, {
                method: 'GET',
                filename: '_doc/innovate/update/'
            });
            dtask.start();

            const showLoading = plus.nativeUI.showWaiting("正在下载");
            dtask.addEventListener('statechanged', function (task, status) {
                switch (task.state) {
                    case 1:
                        showLoading.setTitle("正在下载");
                        break;
                    case 2:
                        showLoading.setTitle("已连接到服务器");
                        break;
                    case 3:
                        const title = totalSize ? `正在下载：${parseInt((parseFloat(task.downloadedSize) / totalSize) * 100)}%` : `已下载：${calculateFileSize(task.downloadedSize)}`;
                        showLoading.setTitle(title);
                        break;
                    case 4:
                        plus.nativeUI.closeWaiting();
                        if (status === 200) {
                            plus.runtime.install(task.filename);
                        } else {
                            plus.nativeUI.alert('版本更新失败:' + status);
                        }
                        break;
                }
            });
        } catch (err) {
            plus.nativeUI.closeWaiting();
            uni.showToast({
                title: '更新失败',
                mask: false,
                duration: 1500
            });
        }
    }
}

async function handleHotUpdate(resdata) {
    const totalSize = calculateFileSize(resdata.wgtSize);
    const showResult = await uni.showModal({
        title: '更新提示',
        content: `${resdata.note || "版本更新"}\n\n版本号：${resdata.version}，大小：${totalSize}，立即进行新版本下载？`
    });

    if (showResult.confirm) {
        const wgtLoading = plus.nativeUI.showWaiting('正在准备环境，请稍等!');
        let url = resdata.wgtUrl;
        if (!isUrl(url)) {
            const uploadFileArr = resdata?.url ? resdata?.url?.split('|') : [];
            if (uploadFileArr.length > 0) {
                url = fileBaseSrc + uploadFileArr[0];
            } else {
                console.error('文件地址错误');
                return;
            }
        }

        const downloadTask = uni.downloadFile({
            url: url,
            success: async (downloadResult) => {
                console.error('downloadResult========>', downloadResult);
                if (downloadResult.statusCode === 200) {
                    const system = uni.getSystemInfoSync().platform;
                    try {
                        await plus.runtime.install(downloadResult.tempFilePath, { force: false });
                        wgtLoading.setTitle("热更新成功，正在重启应用");
                        plus.runtime.restart();
                        plus.push.clear();
                    } catch (e) {
                        console.error("热更新失败", e);
                        useToast(`热更新失败，code:${e.code}，错误消息：${e.message}`);
                    }
                }

                plus.nativeUI.closeWaiting();
            },
            fail: (err) => {
                console.error("下载失败", err);
                useToast('下载失败，请重试');
                plus.nativeUI.closeWaiting();
            }
        });

        downloadTask.onProgressUpdate((resPro) => {
            console.log("下载进度", resPro.progress);
            wgtLoading.setTitle(`已下载：${resPro.progress}%`);
        });
    }
}
