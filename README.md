# 🎯 Mockly

[![GitHub Stars](https://img.shields.io/github/stars/gappbox/mockly?style=social)](https://github.com/gappbox/mockly/stargazers)
[![License](https://img.shields.io/github/license/gappbox/mockly)](LICENSE)
[![Docker Pulls](https://img.shields.io/docker/pulls/gappbox/mockly?logo=docker)](https://hub.docker.com/r/gappbox/mockly)
[![Version](https://img.shields.io/docker/v/gappbox/mockly/latest?logo=docker)](https://hub.docker.com/r/gappbox/mockly/tags)
[![Docker Image Size](https://img.shields.io/docker/image-size/gappbox/mockly/latest?logo=docker&label=image%20size)](https://hub.docker.com/r/gappbox/mockly)

> Effortless mock data generation for testing, development, and prototyping.

---

## 🌟 Overview

Mockly is your powerful companion for generating and managing synthetic (mock) data.

Designed for:
- 🛠️ **Testing** your application functionality
- 🎨 **Prototyping** and showcasing UIs
- ⚡ **Speeding up** your development workflows

Mockly helps you stop wasting time on manual data creation — and focus on building what matters.


---

## ✨ Features

| Feature                     | Description                                                                |
|-----------------------------|----------------------------------------------------------------------------|
| 🔧 **Custom Fields**        | Define data fields with categories and types that fit your needs.          |
| 🧩 **Field Templates**      | Use pre-configured templates to quickly apply common setups and save time. |
| 🧪 **Mock Data Generation** | Generate structured JSON data that looks realistic.                        |
| 🎯 **Adjustable Output**    | Set the exact number of records to generate.                               |
| 📤 **Export Options**       | Easily export the data for use in other tools or applications.             |
| 🌓 **Light & Dark Themes**  | Seamlessly switch between light and dark modes for a better UX.            |

---

## 🐳 Self-Hosting

Easily run Mockly anywhere with **Docker** — perfect for local development, testing, or private use.

### 🚀 Launch in Seconds

**1. Pull the latest Mockly image:**

```bash
docker pull gappbox/mockly:latest
```

**2. Run the container:**
```bash
docker run -d -p 5174:5174 --name mockly gappbox/mockly:latest
```

### 📦 Docker Compose Setup

If you prefer Docker Compose for easier management:

```yaml
services:
  mockly:
    container_name: mockly
    image: gappbox/mockly:latest
    ports:
      - "5174:5174"
    restart: always
```
**Steps:**

1.	Save the configuration as docker-compose.yml
2.	Start the container: `docker-compose up -d`
3.	Access Mockly at http://localhost:5174

---

### 📄 License

_Distributed under the MIT License. Feel free to use, modify, and contribute!_