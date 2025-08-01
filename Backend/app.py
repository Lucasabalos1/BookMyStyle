from flask import Flask, jsonify, request
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

class Cliente(db.Model):
    __tablename__ = 'cliente'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    phone_number = db.Column(db.String(20), nullable=True)
    genre = db.Column(db.String(20), nullable=True)

# Creacion de la base datos y usuarios
# with app.app_context():
#     db.create_all()

#     admin_user = Empleado(email = "lucasabalos531@gmail.com", password_hashed = generate_password_hash("admin123", method="pbkdf2:sha256"), name = "Lucas", last_name = "Abalos", type = "user_admin")
#     empleado_user = Empleado(email = "joseperez@gmail.com", password_hashed = generate_password_hash("empleado123", method="pbkdf2:sha256"), name = "Jose", last_name = "Perez", type = "user_empleado")
#     cliente = Cliente(name = "Martin", last_name = "Gonzales", phone_number = "1123212354", genre="Masculino")
    
#     db.session.add(admin_user)
#     db.session.add(empleado_user)
#     db.session.add(cliente)
#     db.session.commit()
#     print("base de datos y usuario creados correctamente")

@app.route("/login", methods=['GET', 'POST'])
def login():
    data = request.get_json()
    user_email = data.get('email')
    user_password = data.get('password')
    user = Empleado.query.filter_by(email = user_email).first()
    
    if not user:
        return jsonify({"success": False, "message": "Credenciales invalidas"}), 401
        
    if user and not check_password_hash(user.password_hashed, user_password):
        return jsonify({"success": False, "message": "La contraseña es incorrecta"}), 401
    elif user and check_password_hash(user.password_hashed, user_password):
        return jsonify({"success":True, "usuario": f"{user.name} {user.last_name}", "rol": user.type}),200


@app.route("/getWorkers", methods=['GET'])
def get_workers():
    empleados = Empleado.query.all()
    
    if not empleados:
        return jsonify({"success": False, "message": "No hay empleados en la base de datos"}),404

    workers = []
    
    for emp in empleados:
        workers.append({"id": emp.id, "correo": emp.email ,"nombre": emp.name, "apellido": emp.last_name, "rol": emp.type})
    
    return jsonify({"success": True, "data": workers}),200

@app.route("/getClients", methods=['GET'])
def get_clients():
    clientes = Cliente.query.all()

    if not clientes:
        return jsonify({"success": False, "message": "No se encontro ningun cliente en la base de datos"}), 404

    clients = []

    for client in clientes:
        clients.append({"id": client.id, "nombre": client.name, "apellido": client.last_name, "telefono": client.phone_number, "genero": client.genre})
           
    return jsonify({"success": True, "data": clients}),200

@app.route("/")
def index():
    return jsonify({"message": "Backend funcionando correctamente"})

if __name__ == "__main__":
    app.run(debug=True)