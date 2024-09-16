import os

from dotenv import load_dotenv
from sqlalchemy import URL, create_engine
from sqlalchemy.orm import declarative_base, scoped_session, sessionmaker

load_dotenv()

connection_string = URL.create(
    "postgresql",
    username="registry_owner",
    password=os.getenv("DATABASE_PASSWORD"),
    host="ep-flat-water-a2a5rbh0.eu-central-1.aws.neon.tech",
    database="registry",
    query={"sslmode": "require"},
)

engine = create_engine(connection_string)
Session = sessionmaker(bind=engine)
db_session = scoped_session(Session)

Base = declarative_base()


def init_db():
    # verify that the schema is up to date, don't create tables at all
    Base.metadata.reflect(bind=engine)
    print("Database initialized")
