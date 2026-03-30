# Fleet Dispatch Frontend Setup Guide

## 🎯 Quick Start

Your React Vite frontend is ready! Here's how to set it up and run it.

## 📋 Prerequisites

- ✅ Node.js (already installed - check with `node --version`)
- ✅ npm (comes with Node.js)
- ✅ Django backend running on `http://localhost:8000`

## 🚀 Getting Started

### 1. Navigate to Frontend Directory
```powershell
cd c:\Users\Acer\Fleet_Dispatch\frontend
```

### 2. Install Dependencies (if not done)
```powershell
npm install
```

### 3. Start Development Server
```powershell
npm run dev
```

The app will start at: **http://localhost:5173/**

## 🖼️ Adding Your Images

**Step 1:** Place your image files in:
```
frontend/public/assets/images/
```

**Step 2:** Required images:
- `car.png` - Main vehicle image (400x350px or larger)
- `dap-logo.png` - Company logo (100x100px or square)

**Detailed guide:** See `IMAGES_GUIDE.md` in the frontend folder

## 🔧 Backend API Configuration

### Update Login Endpoints

Edit `frontend/src/components/Login.jsx` (line ~25):
```javascript
const response = await fetch('http://localhost:8000/api/login/', {
```

Edit `frontend/src/components/AdminLogin.jsx` (line ~18):
```javascript
const response = await fetch('http://localhost:8000/api/admin-login/', {
```

Change these URLs to match your Django backend routes.

## 🌐 CORS Setup (Important!)

If you get CORS errors, add this to your Django `core/settings.py`:

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',  # Add this
    'accounts',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Add this at the top
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    # ... rest of middleware
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
```

Then install corsheaders:
```powershell
pip install django-cors-headers
```

## 📱 Available Routes

- **`/`** - User Login Page
- **`/admin-login`** - Admin Login Page

## 🎨 UI Features

✅ Modern responsive design  
✅ Green & yellow color scheme  
✅ Password visibility toggle  
✅ Remember me checkbox  
✅ Loading states  
✅ Error messages  
✅ Smooth animations  
✅ Mobile-friendly  

## 🔌 Connecting to Django Backend

### Update Django URLs

In `core/urls.py`, add API endpoints:

```python
from django.contrib import admin
from django.urls import path, include
from accounts import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('accounts.urls')),
    
    # API endpoints for frontend
    path('api/login/', views.api_login, name='api_login'),
    path('api/admin-login/', views.api_admin_login, name='api_admin_login'),
]
```

### Create API Views in `accounts/views.py`

```python
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.contrib.auth import authenticate
import json

@require_http_methods(["POST"])
def api_login(request):
    try:
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            # Generate token or session
            return JsonResponse({
                'success': True,
                'token': 'your_token_here',
                'user_id': user.id
            })
        else:
            return JsonResponse({
                'success': False,
                'error': 'Invalid credentials'
            }, status=401)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

@require_http_methods(["POST"])
def api_admin_login(request):
    try:
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        
        user = authenticate(request, username=username, password=password)
        
        if user is not None and user.is_staff:
            return JsonResponse({
                'success': True,
                'token': 'admin_token_here',
                'user_id': user.id
            })
        else:
            return JsonResponse({
                'success': False,
                'error': 'Invalid admin credentials'
            }, status=401)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)
```

## 📦 Available Scripts

```powershell
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code (if configured)
npm run lint
```

## 🐛 Troubleshooting

### Frontend won't load
- Check if port 5173 is available
- Try: `npm run dev -- --port 5174`

### Backend API calls failing
- Make sure Django is running on port 8000
- Check CORS configuration
- Verify API endpoints in your Django urls.py

### Images not showing
- Place images in `frontend/public/assets/images/`
- Use exact filenames: `car.png` and `dap-logo.png`
- Check browser console for 404 errors

### Port already in use
```powershell
# Use a different port
npm run dev -- --port 5174
```

## 📂 Project Structure

```
frontend/
├── public/
│   └── assets/
│       └── images/           ← Your images here
├── src/
│   ├── components/
│   │   ├── Login.jsx         ← User login
│   │   └── AdminLogin.jsx    ← Admin login
│   ├── styles/
│   │   ├── Login.css
│   │   └── AdminLogin.css
│   ├── App.jsx               ← Main routing
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

## 🎯 Next Steps

1. ✅ Frontend created and running
2. ⏭️ Add your images (`car.png`, `dap-logo.png`)
3. ⏭️ Update Django API endpoints
4. ⏭️ Set up CORS in Django
5. ⏭️ Test login functionality
6. ⏭️ Connect to backend authentication

## 💡 Tips

- Keep both Django (8000) and Vite (5173) running during development
- Use browser DevTools to debug API calls
- Check the Console tab for errors
- Images with fallback text if files are missing

## 🆘 Need Help?

Check the logs:
```powershell
# Terminal shows detailed error messages
# Check browser console (F12) for frontend errors
# Check Django console for backend errors
```

---

**Your frontend is ready to go! 🚀**

Start the server with: `npm run dev`
