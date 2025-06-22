from .config import config

__all__ = ["config"]

"""
When someone does from config import *, only config will be imported from your package.
Other names (like Config, DevelopmentConfig) won’t be imported with * unless added to __all__.
"""