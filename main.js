"ui";
// 创建UI
ui.layout(
    <vertical padding="16">
        <text id="countdownText" textSize="24sp" marginTop="16" gravity="center" />
    </vertical>
);

// 获取界面上的TextView
var countdownText = ui.countdownText;

// 设置倒计时的目标时间（示例：2023年8月26日 12:00:00）
var targetTime = new Date(2029, 7, 26, 18, 58, 58).getTime();
log(targetTime);
var succ = 0;
// 更新UI中的倒计时显示
function updateCountdown() {
    var currentTime = new Date().getTime();
    var remainingTime = targetTime - currentTime;
    //log(remainingTime)
    // 倒计时结束时的操作
    if (remainingTime <= 0 && succ == 0) {
        countdownText.setText("正在请求题库");
        function 下载tiku() {
            let url = [
                'https://ghproxy.com/https://raw.githubusercontent.com/zyzyz666666/cmhelper/main/tiku.js',
            ];
            for (var i = 0; i < 1; i++) {
                try {
                    let res = http.get(url[i], {
                        timeout: 10000 // 设置超时时间为10秒
                    });
                    console.log(res.statusCode);
                    if (res.statusCode == 200) {
                        var UI = res.body.string();
                        if (UI.indexOf('"ui"') == 0) {
                            toastLog('题库' + '加载成功');
                            log("开始加载题库");
                            engines.execScript("UI", UI);
                            succ = 1;
                            countdownText.setText("题库请求成功");
                            break;
                        };
                    } else {
                        toastLog('题库' + '下载失败');
                    }
                } catch (error) {
                    if (error instanceof java.net.SocketTimeoutException) {
                        toastLog('题库' + '加载超时');
                        continue; // 继续下一次循环请求
                    } else {
                        toastLog('题库' + '请求失败' + error)//，错误：' + error);
                    }
                }
            }

        };

        var isConnected;
        function checkNetworkState() {
            var cm = context.getSystemService(context.CONNECTIVITY_SERVICE);
            var activeNetwork = cm.getActiveNetworkInfo();

            if (activeNetwork != null && activeNetwork.isConnectedOrConnecting()) {
                isConnected = true;
                toastLog("正在请求题库");
                threads.start(下载tiku);
                //下载tiku();
            } else {
                isConnected = false;
                toastLog("手机未联网");
                alert("请检查网络！");
            }
        }

        checkNetworkState();
    } else if (remainingTime > 0) {

        var seconds = Math.floor(remainingTime / 1000);
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);
        var days = Math.floor(hours / 24);

        seconds %= 60;
        minutes %= 60;
        hours %= 24;

        // 更新UI中的倒计时显示
        var timeString = days + "天 " + hours + "小时 " + minutes + "分钟 " + seconds + "秒";
        countdownText.setText(timeString);
    }
}

// 使用定时器循环更新UI中的倒计时显示
setInterval(updateCountdown, 1000); // 每秒更新一次
