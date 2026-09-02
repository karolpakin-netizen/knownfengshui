# Known Feng Shui 静态网站

可直接部署的多页面静态站，技术栈为 HTML5、Tailwind CSS v3 和原生 JavaScript。无后端、无数据库、无站内支付、无购物车。

## 项目结构

```text
knownfengshui-site/
├─ index.html
├─ products.html
├─ product-detail.html
├─ blog.html
├─ blog-article.html
├─ about.html
├─ faq.html
├─ contact.html
├─ privacy.html
├─ 404.html
├─ assets/
│  ├─ css/styles.css
│  └─ js/site.js
├─ public/
│  ├─ _headers
│  ├─ robots.txt
│  └─ sitemap.xml
├─ scripts/
│  ├─ build.mjs
│  └─ dev.mjs
├─ src/input.css
├─ package.json
├─ tailwind.config.js
└─ README.md
```

## 上线前必须替换

1. 在 `products.html` 和 `product-detail.html` 中，把 `https://gumroad.com/`、`https://www.sendowl.com/` 替换成每个商品的真实结账链接。
2. 将所有 `https://placehold.co/...` 图片占位链接替换成你拥有使用权的图片。保留原有宽高比例和有意义的 `alt` 文本。
3. 联系表单和邮件订阅表单目前提交到 `contact@knownfengshui.com`。如使用其他收件邮箱，请在 `index.html` 与 `contact.html` 的 FormSubmit `action` 中同时替换。
4. 第一次测试提交后，FormSubmit 会向收件邮箱发送激活邮件；完成激活后表单才会正式转发。
5. `privacy.html` 是启动用隐私声明占位稿。根据经营主体、所在地、邮件服务和实际数据处理方式请专业人士复核。
6. 产品价格、退款说明和外部平台条款需与 Gumroad / SendOwl 的实际商品设置保持一致。

## 本地开发与构建

需要 Node.js 18 或更高版本。

```bash
npm install
npm run dev
```

访问 `http://127.0.0.1:4173`。

生成生产文件：

```bash
npm run build
```

构建结果位于 `dist/`，可直接作为静态网站上传。

## 部署到 Cloudflare Pages（推荐：Git 自动部署）

1. 将整个 `knownfengshui-site` 文件夹作为仓库根目录提交到 GitHub 或 GitLab。
2. 登录 Cloudflare，进入 **Workers & Pages**，创建 Pages 项目并连接 Git 仓库。
3. 构建配置：
   - Framework preset：`None`
   - Build command：`npm run build`
   - Build output directory：`dist`
   - Root directory：如果本文件夹就是仓库根目录则留空；如果它在单体仓库子目录中，填写该子目录路径。
4. 点击 **Save and Deploy**。Cloudflare 会给出一个 `*.pages.dev` 预览域名；先检查全部页面、外链与表单。
5. 以后每次推送到生产分支，Pages 会自动重新构建和发布。

Cloudflare 官方参考：[Git integration](https://developers.cloudflare.com/pages/get-started/git-integration/) · [Build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/)

## 绑定 knownfengshui.com

1. 确保 `knownfengshui.com` 已添加到同一个 Cloudflare 账号，并把域名注册商处的 nameserver 改成 Cloudflare 提供的 nameserver。
2. 进入 **Workers & Pages → 你的 Pages 项目 → Custom domains → Set up a domain**。
3. 输入 `knownfengshui.com` 并确认。根域名位于同一 Cloudflare 区域时，系统通常会自动创建所需 DNS 记录。
4. 如需 `www.knownfengshui.com`，在同一位置再添加该子域名，并通过 Cloudflare Redirect Rules 将 `www` 统一 301 跳转到主域名，避免重复内容。
5. 等待状态变为 Active，再检查 HTTPS、所有页面、表单回跳地址、`robots.txt` 与 `sitemap.xml`。

必须先在 Pages 的 **Custom domains** 中关联域名，不要只手动添加 CNAME。Cloudflare 官方参考：[Custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/)

## 直接上传（不连接 Git）

先执行 `npm run build`，然后在 Cloudflare Pages 选择 Direct Upload，把 `dist/` 内的全部文件上传。Direct Upload 与 Git integration 是两种不同项目模式；如需要持续自动发布，优先使用 Git integration。

官方参考：[Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/)
