from contextlib import contextmanager
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker, scoped_session

Base = declarative_base()

_engine = None
_SessionFactory = None
_session = None

def init_db(app):
    global _engine, _SessionFactory, _session
    db_uri = app.config["SQLALCHEMY_DATABASE_URI"]
    engine_opts = app.config.get("SQLALCHEMY_ENGINE_OPTIONS", {})
    
    _engine = create_engine(db_uri, **engine_opts)
    _SessionFactory = sessionmaker(bind=_engine, autocommit=False, autoflush=False)
    _session = scoped_session(_SessionFactory)
    
    # Register teardown to remove session at end of request
    @app.teardown_appcontext
    def shutdown_session(exception=None):
        if _session is not None:
            _session.remove()
            
    return _engine

def get_engine():
    return _engine

def get_session():
    if _session is None:
        raise RuntimeError("Database has not been initialized. Call init_db(app) first.")
    return _session

@contextmanager
def transaction():
    """Transactional scope helper with automatic rollback on error."""
    session = get_session()
    try:
        yield session
        session.commit()
    except Exception:
        session.rollback()
        raise
