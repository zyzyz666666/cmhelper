"ui";
// 创建UI
ui.layout(
    <vertical padding="16">
        <text id="countdownText" textSize="24sp" marginTop="16" gravity="center" />
    </vertical>
);

// 获取界面上的TextView
var countdownText = ui.countdownText;

// 设置倒计时的目标时间（示例：2023年9月1日 08:00:00）
var targetTime = new Date(2023, 7, 25, 12, 0, 0).getTime();

// 更新UI中的倒计时显示
function updateCountdown() {
    var currentTime = new Date().getTime();
    var remainingTime = targetTime - currentTime;

    // 倒计时结束时的操作
    if (remainingTime <= 0) {
        countdownText.setText("自己去：微信——扫一扫");
       
    }

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

// 使用定时器循环更新UI中的倒计时显示
setInterval(updateCountdown, 1000); // 每秒更新一次
