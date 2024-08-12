from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)

# Configuration for connecting to Azure SQL Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'mssql+pyodbc://ThriftStore:Clementine123!@clementine.database.windows.net/ClementineDatabase?driver=ODBC+Driver+17+for+SQL+Server'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

CORS(app)

from routes import main as routes_blueprint
app.register_blueprint(routes_blueprint)

if __name__ == '__main__':
    app.run(debug=True)

