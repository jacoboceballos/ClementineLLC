import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'mssql+pyodbc://ThriftStore:Clementine123!@clementine.database.windows.net/ClementineDatabase?driver=ODBC+Driver+17+for+SQL+Server')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv('SECRET_KEY', 'supersecretkey')

