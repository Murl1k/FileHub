from django.core.cache import cache
from django.contrib.auth import get_user_model

User = get_user_model()


def get_cached_users_count() -> int:
    """Gets users_count from cache. If there isn't users_count, it counts all users and caches it for 60 seconds"""

    cached_users_count = cache.get('users_count')

    if not cached_users_count:
        users_count = User.objects.all().count()
        cache.set('users_count', users_count, 60)

    return cached_users_count or users_count
