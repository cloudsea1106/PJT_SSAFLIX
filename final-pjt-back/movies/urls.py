from django.urls import path
from . import views

app_name = 'movies'

urlpatterns = [
    path('', views.movie_list),
    path('recommend/genre/<int:movie_genre>/', views.movie_genre),
    path('<int:movie_pk>/', views.movie_detail),
    path('<int:movie_pk>/like/', views.like_movie),
    path('<int:movie_pk>/reviews/', views.create_review),
    path('<int:movie_pk>/reviews/<int:review_pk>/', views.review_update_or_delete),
]