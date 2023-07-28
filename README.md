<h1 align="center">Phoenix Websocket Notifier</h1>

<p align="center">
  <a href="https://github.com/Karthikmani345/phoenix-websocket-notifier/actions"><img alt="GitHub Workflow Status" src="https://img.shields.io/github/workflow/status/Karthikmani345/phoenix-websocket-notifier/Node.js%20CI?style=for-the-badge"></a>
  </a>
  <a href="https://github.com/Karthikmani345/phoenix-websocket-notifier/blob/main/LICENSE"><img alt="GitHub" src="https://img.shields.io/github/license/Karthikmani345/phoenix-websocket-notifier?style=for-the-badge"></a>
</p>

<p align="center">
  <b>A high-performance real-time notification system built with Node.js, Express, Socket.io, and Redis.</b><br>
</p>

## 🛠️ Prerequisites

Before you begin, ensure you have met the following requirements:

- Docker and Docker-compose
- Node.js 14.0 or higher
- Redis 6.0 or higher

## 🚀 Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/Karthikmani345/phoenix-websocket-notifier.git
cd phoenix-websocket-notifier
npm install
```

### 🔧 Local Setup

Create a `.env` file in your root directory and provide your local setup configurations as per the `.env.example` file in the repository.

After configuring the environment variables, you can start the server in development mode:

```bash
npm run start:dev
```

To access the app, navigate to [`localhost:4000`](http://localhost:4000) from your browser.

For running the Redis server locally, you may need to install Redis on your machine and start the Redis server:

```bash
redis-server
```

### 🐳 Docker Setup

Build and start the Docker containers:

```bash
docker-compose up --build
```

### 🐞 Debugging

For debugging, you can use:

```bash
npm run debug:vs
```

You can then attach a debugger to your running app on the port specified in your `.env` file.

## 🎮 Usage

Use the following commands as per your requirements:

- Clean the dist directory: `npm run clean`

## 🧪 Testing

Test cases and relevant documentation are in progress and will be updated soon.

## 🤝 How to Contribute

Love this project? Great! We're open to contributions. To start, you can:

1. Fork this repository
2. Create your branch: `git checkout -b my-feature`
3. Commit your changes: `git commit -m "Add my feature"`
4. Push to your branch: `git push origin my-feature`
5. Create a pull request!

Read our [contributing guide](./CONTRIBUTING.md) for more info.

## 📜 License

Phoenix Websocket Notifier is [ISC licensed](./LICENSE).
