import requests
from bs4 import BeautifulSoup as bs
import re
import time
import html2text
import os

# CSDN 博客 URL
CSDN_URL = "https://blog.csdn.net/weixin_51636531/article/details/143275510?spm=1001.2014.3001.5501"

def scrape_csdn_blog():
    """抓取 CSDN 博客内容并转换为 Markdown"""
    
    try:
        print("正在抓取 CSDN 博客内容...")
        
        # 设置请求头模拟浏览器
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
        }
        
        # 发送请求
        response = requests.get(CSDN_URL, headers=headers, timeout=10)
        response.raise_for_status()
        response.encoding = 'utf-8'
        
        print(f"请求状态码: {response.status_code}")
        
        # 解析 HTML
        soup = bs(response.text, "html.parser")
        
        # 尝试不同的选择器来获取文章内容
        selectors = [
            "#content_views",
            ".article_content", 
            ".blog-content-box",
            ".markdown_views",
            "article"
        ]
        
        article_content = None
        used_selector = None
        
        for selector in selectors:
            element = soup.select_one(selector)
            if element:
                print(f"使用选择器: {selector}")
                article_content = element
                used_selector = selector
                break
        
        if not article_content:
            raise Exception("无法找到文章内容")
        
        # 清理不需要的元素
        for unwanted in article_content.select('script, style, .ad, .advertisement, .csdn-side-toolbar, .tool-box, .comment-box, .recommend-box, .hljs-button'):
            unwanted.decompose()
        
        # 获取文章标题
        title_element = soup.select_one('h1.title-article, .article-title, h1')
        article_title = title_element.get_text().strip() if title_element else "RDK X5超新手入门教程"
        
        print(f"文章标题: {article_title}")
        
        # 转换为 Markdown
        h = html2text.HTML2Text()
        h.ignore_links = False
        h.ignore_images = False
        h.ignore_emphasis = False
        h.body_width = 0  # 不限制行宽
        
        # 获取 HTML 内容
        html_content = str(article_content)
        markdown_content = h.handle(html_content)
        
        # 清理 Markdown 内容
        markdown_content = re.sub(r'\n{3,}', '\n\n', markdown_content)  # 移除多余空行
        markdown_content = re.sub(r'[ \t]+\n', '\n', markdown_content)  # 移除行尾空格
        
        # 创建最终的 Markdown 内容
        final_content = f"""# {article_title}

{markdown_content.strip()}

---

**原文链接：** [{CSDN_URL}]({CSDN_URL})

**抓取时间：** {time.strftime('%Y-%m-%d %H:%M:%S')}

**抓取说明：** 本内容通过爬虫自动从 CSDN 博客抓取并转换为 Markdown 格式。
"""

        # 确保输出目录存在
        output_dir = os.path.join(os.path.dirname(__file__), "..", "src", "data", "blogs", "rdk-x5-tutorial")
        os.makedirs(output_dir, exist_ok=True)
        
        # 保存到文件
        output_path = os.path.join(output_dir, "content.md")
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(final_content)
        
        print("博客内容抓取成功！")
        print(f"内容已保存到: {output_path}")
        print(f"内容长度: {len(final_content)} 字符")
        print(f"使用的选择器: {used_selector}")
        
        return True
        
    except requests.RequestException as e:
        print(f"网络请求失败: {e}")
        return False
    except Exception as e:
        print(f"抓取失败: {e}")
        return False

def create_fallback_content():
    """创建备用内容模板"""
    
    fallback_content = f"""# RDK X5超新手入门教程：从系统烧录到yolov5物体识别-RDKX5地瓜机器人

> **注意：** 由于网络限制或反爬虫机制，无法自动抓取完整内容。请手动访问原文并复制内容。

## 原文链接
[{CSDN_URL}]({CSDN_URL})

## 手动操作指南

1. 点击上方原文链接访问 CSDN 博客
2. 复制文章的主要内容
3. 粘贴到此文件中替换此模板

## 文章结构模板

### 前期准备
*请从原文复制此部分内容*

### 系统烧录步骤
*请从原文复制此部分内容*

### 系统启动与配置
*请从原文复制此部分内容*

### YOLOv5 环境配置
*请从原文复制此部分内容*

### YOLOv5 物体识别运行
*请从原文复制此部分内容*

### 问题排查
*请从原文复制此部分内容*

### 总结
*请从原文复制此部分内容*

---

**原文链接：** [{CSDN_URL}]({CSDN_URL})

**创建时间：** {time.strftime('%Y-%m-%d %H:%M:%S')}

**状态：** 需要手动填充内容
"""

    # 确保输出目录存在
    output_dir = os.path.join(os.path.dirname(__file__), "..", "src", "data", "blogs", "rdk-x5-tutorial")
    os.makedirs(output_dir, exist_ok=True)
    
    # 保存备用内容
    output_path = os.path.join(output_dir, "content.md")
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(fallback_content)
    
    print("已创建备用内容模板")
    print(f"文件位置: {output_path}")

if __name__ == "__main__":
    print("开始抓取 CSDN 博客内容...")
    print(f"目标URL: {CSDN_URL}")
    print("-" * 50)
    
    # 尝试抓取内容
    success = scrape_csdn_blog()
    
    if not success:
        print("\n 自动抓取失败，创建备用模板...")
        create_fallback_content()
        print("\n 建议手动访问原文复制内容到生成的模板中")
    
    print("\n 脚本执行完成！")
