from django.urls import path
from . import views

app_name = 'accounts'

urlpatterns = [
    path('profile/<username>/', views.profile),
    path('<int:user_pk>/follow/', views.follow),
    path('recommend/follow/', views.movie_follow),
]