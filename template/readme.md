# futu ipo
futu5--新股认购 Node.js 前端接入层。

文档： [技术文档](./doc/ipo.md)

host: `ipo.futu5.com`

```
server{
    listen 443;
    server_name ipo.futu5.com;

    ssl_certificate  ~/work/conf/https/futu5.com.crt;
    ssl_certificate_key  ~/work/conf/https/futu5.com.key;

    index index.html index.htm;
    error_log ~/work/logs/error_ipo.futu5.com.log;
    access_log ~/work/logs/access_ipo.futu5.com.log combined;

    location / {
        proxy_store off;
        proxy_redirect off;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $http_host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Remote-Host $remote_addr;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_pass http://127.0.0.1:5665/;
        proxy_read_timeout 60s;
    }
}
```

host: `ipo5.futunn.com`

```
server{
    listen 443;
    server_name ipo5.futunn.com;

    ssl_certificate         ~/conf/https/futunn.com.crt;
    ssl_certificate_key     ~/conf/https/futunn.com.key;

    index index.html index.htm;
    error_log ~/logs/error_common5.futunn.com.log;
    access_log ~/logs/access_common5.futunn.com.log combined;

    location / {
        proxy_store off;
        proxy_redirect off;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $http_host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Remote-Host $remote_addr;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_pass http://127.0.0.1:5665/;
        proxy_read_timeout 60s;
    }
}
```

全局安装
```
npm install -g webpack webpack-cli
```

```
npm install
```

```
webpack
```

测试环境:

```
webpack
```

正式环境：

```
webpack --config=webpack.prod.config.js
```

## 后端
```
npm run develop
```

测试：

```
npm run release:test  / npm run release:develop
```

正式/发布

```
npm run release:prod
```

## 上线发布

依赖服务

- cash服务  simple
- ipo服务  Arvlin
- option服务  jedi

## 步骤
- 机器申请  cmlb.server.com
- 软件安装  cmlb.server.com
- 基础组件安装 tars.server.com
- 依赖服务资源申请  cmlb.server.com
- 对外服务上架   cmdb.server.com
- 发布配置     walle.oa.com
- monitor配置  monitor.server.com
- 域名配置     8000.oa.com