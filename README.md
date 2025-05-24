#  Docker Setup

## 🚀 Run the Server

```bash
docker compose up --build -d
```

• App will be available at: http://localhost:3000  
• `--build` ensures the image is rebuilt with your latest code  
• `-d` runs in the background

---

## 🔄 Live Code Sync

Changes in your local files are reflected immediately inside the container via volume mapping.

---

## 📦 Common Commands

```bash
docker compose up -d
docker compose down
docker logs -f backend
docker compose exec backend npm install
```

