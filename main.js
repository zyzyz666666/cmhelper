"ui";

ui.layout(
    <frame>
        <vertical bg="#eef2fb">
            <appbar>
                <toolbar id="toolbar" bg="#FFC0CB" title="测码助手" />
                {/* <tabs id="tabs" bg="#01C7FE" /> */}
            </appbar>
            <horizontal >
                <Switch id="autoService" text="无障碍服务" checked="{{auto.service != null}}" textSize="15sp" />
                <Switch margin="12 0" id="floatyService" text="悬浮窗权限" checked="{{(new android.provider.Settings).canDrawOverlays(context)}}" />
            </horizontal>
            <horizontal w="*" h="1sp" margin="0 10 0 0" bg='#E2E2E2'></horizontal>     //透明条
            <viewpager id="viewpager">
                <ScrollView>
                    <vertical>
                        <horizontal w="*" h="1sp" margin="0 10 0 0" bg='#E2E2E2'></horizontal>     //透明条
                        <horizontal w="*" h="1sp" margin="0 10 0 0" bg='#E2E2E2'></horizontal>     //透明条
                        <linear >
                            <button text="下载本月脚本" id="download" />
                            <text id="loadyes" text="已解析✅" />
                            <text id="loadno" text="未解析❌" />
                            <button text="刷" id="downloadf5" />
                            <button text="卸" id="deletedown" />
                            <button text="adb" id="adb" />
                        </linear>
                        <button id="START" text="开始" textSize="28sp" />
                    </vertical>
                </ScrollView>
                {/* <ScrollView>//
                <vertical padding="16">
                    <frame height="200" gravity="center">
                        <linear>
                            <text textSize="22sp" textColor="black" text="账号文本: " /> <input id="账号文本" text="" hint="账号----密码" />
                        </linear>
                    </frame>
                </vertical>
            </ScrollView> */}

            </viewpager>
        </vertical>
        {/* <fab id="add" w="auto" h="auto" src="@drawable/ic_vpn_key_black_48dp"
            margin="16" layout_gravity="bottom|right" tint="#ffffff" /> */}
    </frame>

);



ui.loadyes.setVisibility(android.view.View.INVISIBLE);
ui.loadno.setVisibility(android.view.View.VISIBLE);


ui.START.on("click", function () {
    engines.execScriptFile("xfc.js")
});



////////////////////////////////////////////////////////////////////////////ksjs
var DMi = 0;
var DM;
var filePathDM = '/sdcard/DM.js';
ui.download.on("click", function () {
    toastLog("开始解析DM脚本");
    //
    function 解析DM() {
        let url = [
            'https://ghproxy.com/https://raw.githubusercontent.com/zyzyz666666/DaMai/main/最新测试',
        ];
        for (var i = 0; i < 2; i++) {
            try {
                let res = http.get(url[i], {
                    timeout: 10000 // 设置超时时间为10秒
                });
                console.log(res.statusCode);
                if (res.statusCode == 200) {
                    DM = res.body.string();
                    if (DM.indexOf('"uiiv"') == 0) {
                        DMi = 1;
                        toastLog('大麦' + '解析成功✅');
                        alert('大麦' + '解析成功✅')
                        //log("开始加载KSJS");
                        //engines.execScript("KSJS", KSJS);
                        break;
                    };
                } else {
                    toastLog('大麦' + '解析链接失败❌');
                    alert('大麦' + '解析链接失败❌')
                }
            } catch (error) {
                if (error instanceof java.net.SocketTimeoutException) {
                    toastLog('大麦' + '解析超时❌');
                    alert('大麦' + '解析超时❌')
                    continue; // 继续下一次循环请求
                } else {
                    toastLog('大麦' + '解析失败❌' + error)//，错误：' + error);
                    alert('大麦' + '解析失败❌')
                };
            };

        }

    };

    threads.start(function () { // 创建新的子线程
        解析DM();
    });
    //
    if (DMi == 1) {
        toastLog("正在保存大麦");
        if (files.exists(filePathDM)) {
            files.remove(filePathDM);
        };
        files.write(filePathDM, DM);
        toastLog("大麦 已保存");
        ui.loadyes.setVisibility(android.view.View.VISIBLE);
        ui.loadno.setVisibility(android.view.View.INVISIBLE);
    };
});


ui.downloadf5.on("click", function () {
    if (DMi == 1) {
        if (files.exists(filePathDM)) {
            files.remove(filePathDM);
        };
        files.write(filePathDM, DM);
        toastLog("大麦 已保存");
        ui.loadyes.setVisibility(android.view.View.VISIBLE);
        ui.loadno.setVisibility(android.view.View.INVISIBLE);
    } else if (DMi == 0) {
        ui.loadyes.setVisibility(android.view.View.INVISIBLE);
        ui.loadno.setVisibility(android.view.View.VISIBLE);
    };
});


ui.deletedown.on("click", function () {
    if (files.exists(filePathDM)) {
        files.remove(filePathDM);
    };
    alert('大麦' + '已卸载')
    DMi = 0;
    ui.loadyes.setVisibility(android.view.View.INVISIBLE);
    ui.loadno.setVisibility(android.view.View.VISIBLE);
});

ui.adb.on("click", function () {
    app.startActivity("console")
});
/////////////////////////////////////////////////////////////////////////////ks
