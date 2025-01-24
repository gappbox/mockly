# Mockly

## Overview:

Mockly is an easy-to-use tool for generating and managing synthetic (mock) data. Built for developers, testers, and product teams, it provides a straightforward way to create realistic data for:

- Testing application functionality.
- Prototyping and showcasing user interfaces.
- Speeding up development workflows.

## Key Features:

- **Custom Fields:** Define data fields with categories and types that fit your needs.
- **Mock Data Generation:** Generate structured JSON data that looks realistic.
- **Adjustable Output:** Set the exact number of records to generate.
- **Export Options:** Easily export the data for use in other tools or applications.

Mockly streamlines the creation and management of test data, allowing teams to focus on building and testing their applications.

## 🛠️ Self-Hosting with Docker

Mockly can be easily self-hosted using Docker. A pre-built Docker image is available on [Docker Hub](https://hub.docker.com/r/gappbox/mockly), so you can get started quickly.

### Prerequisites

Ensure you have Docker installed on your machine:
- [Docker](https://docs.docker.com/get-docker/) (v20.10+)

### Steps to Self-Host:

#### Pull the Docker Image

Download the latest Mockly image from Docker Hub:

```bash
  docker pull gappbox/mockly:latest
```

#### Run the Docker Container

Start the container using the following command:

```bash
  docker run -d -p 5174:5174 --name mockly gappbox/mockly:latest
```

#### Using Docker Compose (Optional)

If you prefer Docker Compose, use this configuration:

```yaml
services:
  mockly:
    container_name: mockly
    image: gappbox/mockly:latest
    ports:
      - "5174:5174"
    restart: always
```
1.	Save the configuration as docker-compose.yml
2.	Start the container: `docker-compose up -d`
3.	Access Mockly at http://localhost:5174