import os
import sys

from dotenv import load_dotenv
from sqlalchemy import URL, create_engine
from sqlalchemy.orm import declarative_base, scoped_session, sessionmaker

is_production = "--prod" in sys.argv


if is_production:
    load_dotenv(".env.production.local")
    print("Using production environment")
else:
    load_dotenv(".env.development.local")
    print("Using test environment")

ENVIRONMENT = "production" if is_production else "test"

connection_string = URL.create(
    "postgresql",
    username=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    host=os.getenv("DB_HOST"),
    database=os.getenv("DB_NAME"),
    query={"sslmode": "require"},
)

engine = create_engine(connection_string)
Session = sessionmaker(bind=engine)
db_session = scoped_session(Session)

Base = declarative_base()


def init_db():
    # verify that the schema is up to date, don't create tables at all
    Base.metadata.reflect(bind=engine)
    print(f"Database initialized in {ENVIRONMENT} environment")
