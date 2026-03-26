from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.user_login_view, name='login'),
    path('admin-login/', views.admin_login_view, name='admin_login'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('admin-dashboard/', views.admin_dashboard, name='admin_dashboard'),
    path('logout/', views.logout_view, name='logout'),
]