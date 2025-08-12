from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os
from werkzeug.security import generate_password_hash, check_password_hash
from enum import Enum
from decimal import Decimal
import datetime
app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(basedir, 'instance', 'peluqueria.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app)
db = SQLAlchemy(app)

class EstadoTurno(Enum):
    PENDIENTE = "pendiente"
    CONFIRMADO = "confirmado"
    COMPLETADO = "completado"
    CANCELADO = "cancelado"

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
    phone_number = db.Column(db.String(20), nullable=True, unique=True)
    genre = db.Column(db.String(20), nullable=True)
    
class Servicio(db.Model):
    __tablename__ = 'servicio'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    time = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)

class Turno(db.Model):
    __tablename__ = 'turno'
    
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    hour = db.Column(db.Time, nullable=False)
    state = db.Column(db.Enum(EstadoTurno), nullable=False)
    note = db.Column(db.String(200), nullable=True)
    
    empleado_id = db.Column(db.Integer, db.ForeignKey('empleado.id'), nullable=False)
    cliente_id = db.Column(db.Integer, db.ForeignKey('cliente.id'), nullable=False)
    servicio_id = db.Column(db.Integer, db.ForeignKey('servicio.id'), nullable=False)
    
    empleado = db.relationship('Empleado', backref='turnos')
    cliente = db.relationship('Cliente', backref='turnos')
    servicio = db.relationship('Servicio', backref='turnos')
    
# Creacion de la base datos y usuarios
# with app.app_context():
#     db.create_all()

#     admin_user = Empleado(email = "lucasabalos531@gmail.com", password_hashed = generate_password_hash("admin123", method="pbkdf2:sha256"), name = "Lucas", last_name = "Abalos", type = "user_admin")
#     empleado_user = Empleado(email = "joseperez@gmail.com", password_hashed = generate_password_hash("empleado123", method="pbkdf2:sha256"), name = "Jose", last_name = "Perez", type = "user_empleado")
#     cliente = Cliente(name = "Martin", last_name = "Gonzales", phone_number = "1123212354", genre="Masculino")
    
#     servicio1 = Servicio(name="corte de pelo", time=30, price=Decimal('8000.00'))
#     servicio2 = Servicio(name="teñirse el pelo", time=90, price=Decimal('16000.00'))
#     servicio3 = Servicio(name="lavado de pelo", time=15, price=Decimal('3000.00'))
    
#     turno = Turno(date=datetime.date(2025,8,30), hour=datetime.time(12,0,0), state=EstadoTurno.CONFIRMADO, note="", empleado_id=1, cliente_id=1, servicio_id=1)
    
#     db.session.add(admin_user)
#     db.session.add(empleado_user)
#     db.session.add(cliente)
#     db.session.add_all([servicio1,servicio2,servicio3])
#     db.session.add(turno)
#     db.session.commit()
#     print("base de datos y usuario creados correctamente")

#Endpoint para la autenticacion de usuarios
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





#Endpoints para los empleados
@app.route("/getWorkers", methods=['GET'])
def get_workers():
    empleados = Empleado.query.all()
    
    if not empleados:
        return jsonify({"success": False, "message": "No hay empleados en la base de datos"}),404

    workers = []
    
    for emp in empleados:
        workers.append({"id": emp.id, "correo": emp.email ,"nombre": emp.name, "apellido": emp.last_name, "rol": emp.type})
    
    return jsonify({"success": True, "data": workers}),200

@app.route("/addEmpleado", methods=['POST'])
def add_empleado():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    name = data.get("nombre")
    last_name = data.get("apellido")
    type = data.get("rol")
    
    if not email or not password or not name or not last_name or not type :
        return jsonify({"success": False, "message": "Los campos no pueden quedar vacios"}), 400
    
    user_exists = Empleado.query.filter_by(email = email).first()

    if user_exists:
        return jsonify({"success": False, "message": "El empleado ya existe"}), 409
    
    new_worker = Empleado(email = email, password_hashed = generate_password_hash(password, method="pbkdf2:sha256"), name = name, last_name = last_name, type = type)
    db.session.add(new_worker)
    db.session.commit()
   
    return jsonify({"success": True, "message": "El empleado se registro correctamente"}), 201

@app.route("/editarEmpleado/<int:id>", methods=['PUT'])
def editar_empleado(id):
    data = request.get_json()
    new_email = data.get("email")
    new_password = data.get("password")
    new_name = data.get("nombre")
    new_last_name = data.get("apellido")
    new_type = data.get("rol")
    
    if not new_email or not new_password or not new_name or not new_last_name or not new_type :
        return jsonify({"success": False, "message": "Los campos no pueden quedar vacios"}), 400
    
    existing_user = Empleado.query.filter_by(email=new_email).first()
    if existing_user and existing_user.id != id:
        return jsonify({"success": False, "message": "Ya existe un empleado con ese email"}), 409
    
    empleado = Empleado.query.get(id)
    
    if not empleado:
        return jsonify({"success": False, "message": "El empleado no existe, por lo tanto no se puede editar"}),409
    
    empleado.email = new_email
    empleado.password = generate_password_hash(new_password, method="pbkdf2:sha256")
    empleado.name = new_name
    empleado.last_name = new_last_name
    empleado.type = new_type
    
    db.session.commit()

    return jsonify({"success": True, "message": "El empleado fue editado correctamente"}),200

@app.route("/eliminarEmpleado/<int:id>", methods=['DELETE'])
def eliminar_empleado(id):    
    empleado = Empleado.query.get(id)
    
    if not empleado:
        return jsonify({"success": False, "message": "El empleado no existe, por lo tanto no se puede eliminar"}),409
    
    db.session.delete(empleado)
    db.session.commit()
    
    return jsonify({"success": True, "message": "El empleado fue eliminado correctamente"}),200





#Endpoints para los clientes
@app.route("/getClients", methods=['GET'])
def get_clients():
    clientes = Cliente.query.all()

    if not clientes:
        return jsonify({"success": False, "message": "No se encontro ningun cliente en la base de datos"}), 404

    clients = []

    for client in clientes:
        clients.append({"id": client.id, "nombre": client.name, "apellido": client.last_name, "telefono": client.phone_number, "genero": client.genre})
           
    return jsonify({"success": True, "data": clients}),200

@app.route("/addClient", methods=['POST'])
def add_client():
    data = request.get_json()
    name = data.get("nombre")
    last_name = data.get("apellido")
    phone_number = data.get("telefono")
    genre = data.get("genero")
    
    if not name or not last_name or not phone_number or not genre:
        return jsonify({"success": False, "message": "Los campos no pueden quedar vacios"}), 400
    
    client_exists = Cliente.query.filter_by( phone_number = phone_number).first()
    
    if client_exists:
        return jsonify({"success": False, "message": "El cliente ya se encuentra registrado"}), 409

    new_client = Cliente(name = name, last_name = last_name, phone_number = phone_number, genre = genre)
    db.session.add(new_client)
    db.session.commit()
    
    return jsonify({"success": True, "message": "El cliente se registro correctamente"}), 201

@app.route("/editarCliente/<int:id>", methods=['PUT'])
def editar_cliente(id):
    data = request.get_json()
    new_name = data.get("nombre")
    new_last_name = data.get("apellido")
    new_phone_number = data.get("telefono")
    new_genre = data.get("genero")
    
    if not new_name or not new_last_name or not new_phone_number or not new_genre:
        return jsonify({"success": False, "message": "Los campos no pueden quedar vacios"}), 400
    
    client = Cliente.query.get(id)
    
    if not client:
        return jsonify({"success": False, "message": "El cliente no existe, por lo tanto no se puede editar"}),409
    
    client.name = new_name
    client.last_name = new_last_name
    client.phone_number = new_phone_number
    client.genre = new_genre
    
    db.session.commit()

    return jsonify({"success": True, "message": "El cliente fue editado correctamente"}),200

@app.route("/eliminarCliente/<int:id>", methods=['DELETE'])
def eliminar_cliente(id):    
    client = Cliente.query.get(id)
    
    if not client:
        return jsonify({"success": False, "message": "El cliente no existe, por lo tanto no se puede eliminar"}),409
    
    db.session.delete(client)
    db.session.commit()
    
    return jsonify({"success": True, "message": "El cliente fue eliminado correctamente"}),200





#Endpoints para los turnos
@app.route("/getTurnos", methods=['GET'])
def getTurnos():
    getAppointments = Turno.query.all()
    
    if not getAppointments:
        return jsonify({"success": True, "data": "No hay ningun turno registrado en la base de datos"}),200
    
    Appointments = []
    
    for Appointment in getAppointments:
        Appointments.append({"id": Appointment.id, 
                             "fecha": Appointment.date.strftime("%Y-%m-%d"), 
                             "hora": Appointment.hour.strftime("%H:%M"),
                             "estado": Appointment.state.value,
                             "note": Appointment.note,
                             "empleado": Appointment.empleado_id,
                             "cliente": Appointment.cliente_id,
                             "servicio": Appointment.servicio_id
                             })
    
    return jsonify({"success": True, "data": Appointments}),200

@app.route("/addTurno", methods=['POST'])
def add_turno():
    data = request.get_json()
    dateStr = data.get("fecha")
    hourStr = data.get("hora")
    state = data.get("estado")
    note = data.get("nota")
    empleado_id = data.get("empleado")
    cliente_id = data.get("cliente")
    servicio_id = data.get("servicio")
    
    if not dateStr or not hourStr or not state or not empleado_id or not cliente_id or not servicio_id:
        return jsonify({"success": False, "message": "Los campos no quedan quedar vacios"}),400
    
    date = datetime.datetime.strptime(dateStr,"%Y-%m-%d").date()
    hour = datetime.datetime.strptime(hourStr,"%H:%M").time()
    
    AppointmentExist = Turno.query.filter_by(date = date, hour = hour, empleado_id = empleado_id).first()
    
    if AppointmentExist:
        return jsonify({"success": False, "message": "El Turno ya se encuentra registrado"}),409
    
    appointment_datetime = datetime.datetime.combine(date, hour)

    if appointment_datetime < datetime.datetime.now():
        return jsonify({"success": False, "message": "La fecha y hora debe de ser mayor o igual a la actual"}),409
    
    Appointment = Turno(date=date, hour=hour, state=EstadoTurno(state), note=note, empleado_id=empleado_id, cliente_id=cliente_id, servicio_id=servicio_id)
    
    db.session.add(Appointment)
    db.session.commit()
    
    return jsonify({"success": True, "message": "El turno fue asignado con exito"}),201

@app.route("/editTurno/<int:id>", methods=["PUT"])
def editTurno(id):
    data = request.get_json()
    dateStr = data.get("fecha")
    hourStr = data.get("hora")
    state = data.get("estado")
    note = data.get("nota")
    empleado_id = data.get("empleado")
    cliente_id = data.get("cliente")
    servicio_id = data.get("servicio")
    
    if not dateStr or not hourStr or not state or not empleado_id or not cliente_id or not servicio_id:
        return jsonify({"success": False, "message": "Los campos no pueden quedar vacios"}),400
    
    date = datetime.datetime.strptime(dateStr,"%Y-%m-%d").date()
    hour = datetime.datetime.strptime(hourStr,"%H:%M").time()
    
    AppointmentExist = Turno.query.filter(Turno.date == date,Turno.hour == hour,Turno.empleado_id == empleado_id,Turno.id != id).first()    
    
    if AppointmentExist:
        return jsonify({"success": False, "message": "El Turno ya se encuentra registrado"}),409
    
    appointment_datetime = datetime.datetime.combine(date, hour)

    if appointment_datetime < datetime.datetime.now():
        return jsonify({"success": False, "message": "La fecha y hora debe de ser mayor o igual a la actual"}),409
    
    appointment = Turno.query.get(id)
    
    if not appointment:
        return jsonify({"success": False, "message": "El turno no existe"}), 404
    
    appointment.date = date
    appointment.hour = hour
    appointment.state = EstadoTurno(state)
    appointment.note = note
    
    appointment.empleado_id = empleado_id
    appointment.cliente_id = cliente_id
    appointment.servicio_id = servicio_id
    
    db.session.commit()
    
    return jsonify({"success": True, "message": "El turno fue editado con exito"}),200

@app.route("/deleteTurno/<int:id>", methods=["DELETE"])
def deleteTurno(id):
    appointment = Turno.query.get(id)
    
    if not appointment:
        return jsonify({"success": False, "message": "El turno no existe, por lo tanto no se puede eliminar"}),404
    
    if appointment.state == EstadoTurno.COMPLETADO:
        return jsonify({"success": False, "message": "El turno ya fue completado, por lo tanto no puede ser eliminado"}),400
        

    db.session.delete(appointment)
    db.session.commit()
    
    return jsonify({"success": True, "message": "El turno fue eliminado correctamente"}),200

@app.route("/completarTurno/<int:id>", methods=["PATCH"])
def completar_turno(id):
    appointment = Turno.query.get(id)
    
    if not appointment:
        return jsonify({"success": False, "message": "El turno que se desea completar no existe"}),404
    
    if appointment.state == EstadoTurno.COMPLETADO:
        return jsonify({"success": False, "message": "El turno ya se encuentra completado"}),409
    
    appointment.state = EstadoTurno.COMPLETADO
    
    db.session.commit()
    
    return jsonify({"success": True, "message": "El turno se marco como completado con exito"}),200
    

@app.route("/")
def index():
    return jsonify({"message": "Backend funcionando correctamente"})


if __name__ == "__main__":
    app.run(debug=True)