module.exports = {
    app: {
        name: 'futu5_ipo',
        version: '1.0.0',
        domain: 'ipo.futu5.com'
    },
    server: {
        port: 5665
    },
    template: {
        path: 'server/views',
        options: {
            map: {html: 'ejs'}
        }
    },
    i18n: {
        cookie:'locale',
        directory: 'server/locales',
        locales: ['zh-cn', 'zh-hk','en-us']
    },
    staticDir: {
        root: 'static',
        options: {}
    },
    redis: {
        host: '172.28.15.123',
        password: 'crs-bqfhb3a9:bqfhb3a9',
        port: 6379,
        autoResendUnfulfilledCommands: false//不自动重新发送
    },
    endPoint:{
        cash: {
            cmlbId: 5675
        },
        ipo:{
            cmlbId: 5675
        }
    },
    uls:{
        cmd: 153,
        verifyCmd: 1,
        ipoCmd:2,
        cashCmd: 3,
        optionCmd: 4,
        feCmd: 100
    },
    render:{
        cmlbId: 7337,
        uri: 'api/render',
        cache: 5 * 60 * 1000,
        timeout: 2000
    },
    lang:{
        'zh-cn': 0,
        'zh-hk': 1,
        'en-us': 2
    }
};
