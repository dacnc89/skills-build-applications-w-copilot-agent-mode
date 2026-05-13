from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Team, Activity, Leaderboard, Workout

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
	id = serializers.CharField(source='_id', read_only=True)
	class Meta:
		model = User
		fields = ['id', 'username', 'email']

class TeamSerializer(serializers.ModelSerializer):
	class Meta:
		model = Team
		fields = ['id', 'name']

class ActivitySerializer(serializers.ModelSerializer):
	user = serializers.StringRelatedField()
	class Meta:
		model = Activity
		fields = ['id', 'user', 'type', 'duration']

class LeaderboardSerializer(serializers.ModelSerializer):
	user = serializers.StringRelatedField()
	class Meta:
		model = Leaderboard
		fields = ['id', 'user', 'points']

class WorkoutSerializer(serializers.ModelSerializer):
	class Meta:
		model = Workout
		fields = ['id', 'name', 'difficulty']
