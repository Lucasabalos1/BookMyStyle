from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(basedir, 'instance', 'peluqueria.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app)
db = SQLAlchemy(app)

class Empleado(db.Model):
    __tablename__ = 'empleado'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100),  nullable=False, unique=True)
    password_hashed = db.Column(db.String(100), nullable=False)
    name = db.Column(db.String(100),  nullable=False)
    last_name = db.Column(db.String(100),  nullable=False)
    type = db.Column(db.String(50), nullable=False) 

# Creacion de la base datos y usuarios
# with app.app_context():
#     db.create_all()

#     admin_user = Empleado(email = "lucasabalos531@gmail.com", password_hashed = generate_password_hash("admin123", method="pbkdf2:sha256"), name = "Lucas", last_name = "Abalos", type = "user_admin")
#     db.session.add(admin_user)
#     db.session.commit()
#     print("base de datos y usuario creados correctamente")

@app.route("/")
def index():
    return jsonify({"message": "Backend funcionando correctamente"})

if __name__ == "__main__":
    app.run(debug=True)