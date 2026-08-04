# 💈 BookMyStyle

Sistema de gestión integral para peluquerías y salones de estética. Permite administrar **clientes, empleados, servicios y turnos**, visualizar la agenda en un **calendario interactivo**, consultar el **historial de atenciones** y analizar el rendimiento del negocio a través de **métricas e indicadores**.

---

## ✨ Características

- **Autenticación con roles**: inicio de sesión seguro con contraseñas encriptadas y permisos diferenciados (`user_admin` y `user_empleado`).
- **Gestión de empleados**: alta, edición y baja de empleados con asignación de roles.
- **Gestión de clientes**: registro, edición y eliminación de clientes con datos de contacto y género.
- **Gestión de servicios**: creación, edición y baja de servicios con duración y precio.
- **Gestión de turnos**:
  - Creación, edición, confirmación, cancelación y marcado como completado.
  - **Calendario interactivo** (FullCalendar) para visualizar la agenda.
  - Validación de solapamientos de turnos por empleado y fechas pasadas.
- **Historial de turnos**: consulta de turnos completados con filtros por empleado, cliente y fecha.
- **Configuración de horarios**: días y horas de atención de la peluquería.
- **Métricas y gráficos**:
  - Desempeño de empleados (cantidad de turnos e ingresos generados).
  - Top de clientes por cantidad de atenciones y distribución por género.
  - Facturación por servicio, por día de la semana y comparativa mensual.
- **Interfaz moderna y responsive** con notificaciones amigables (SweetAlert2).

---

## 🛠️ Stack tecnológico

| Capa | Tecnologías |
| --- | --- |
| **Frontend** | React 19, Vite 7, React Router 7, FullCalendar, Recharts, SweetAlert2, React Icons |
| **Backend** | Flask, Flask-SQLAlchemy, Flask-CORS, Werkzeug, Gunicorn |
| **Base de datos** | SQLite |
| **Deploy** | Vercel (frontend) · Render (backend) |

---

## 📁 Estructura del proyecto

```
BookMyStyle/
├── Backend/
│   ├── app.py              # API REST (Flask) con todos los endpoints
│   ├── requirements.txt    # Dependencias de Python
│   └── instance/
│       └── peluqueria.db   # Base de datos SQLite
├── FrontEnd/
│   ├── src/
│   │   ├── Components/     # Componentes reutilizables (modales, tarjetas, etc.)
│   │   ├── Pages/          # Vistas principales de la aplicación
│   │   └── assets/         # Imágenes y recursos
│   ├── public/             # Archivos públicos (iconos)
│   ├── vercel.json         # Configuración de rutas para Vercel
│   ├── vite.config.js
│   └── package.json
├── BookMyStyle.excalidraw  # Mockups / wireframes
├── DER.drawio              # Diagrama entidad-relación
└── README.md
```

---

## 🗄️ Modelo de datos

| Entidad | Descripción | Campos principales |
| --- | --- | --- |
| **Empleado** | Usuarios del sistema | email, password_hashed, name, last_name, type |
| **Cliente** | Clientes del local | name, last_name, phone_number, genre |
| **Servicio** | Servicios ofrecidos | name, time (min), price |
| **Turno** | Citas agendadas | date, hour, state, note, empleado, cliente, servicio |

**Estados de un turno:**

```
PENDIENTE → CONFIRMADO → COMPLETADO
     ↘        ↗
    CANCELADO
```

---

## 🔌 API principal

La API se encuentra en `https://bookmystyle.onrender.com`.

| Método | Endpoint | Descripción |
| --- | --- | --- |
| `POST` | `/login` | Autenticación de usuarios |
| `GET` | `/getWorkers` | Listar empleados |
| `POST` | `/addEmpleado` | Registrar empleado |
| `PUT` | `/editarEmpleado/<id>` | Editar empleado |
| `DELETE` | `/eliminarEmpleado/<id>` | Eliminar empleado |
| `GET` | `/getClients` | Listar clientes |
| `GET` | `/getCliente/<telefono>` | Buscar cliente por teléfono |
| `POST` | `/addClient` | Registrar cliente |
| `PUT` | `/editarCliente/<id>` | Editar cliente |
| `DELETE` | `/eliminarCliente/<id>` | Eliminar cliente |
| `GET` | `/getServices` | Listar servicios |
| `POST` | `/addServices` | Crear servicio |
| `PUT` | `/editServices/<id>` | Editar servicio |
| `DELETE` | `/deleteServices/<id>` | Eliminar servicio |
| `GET` | `/getTurnos` | Listar turnos |
| `POST` | `/addTurno` | Crear turno |
| `PUT` | `/editTurno/<id>` | Editar turno |
| `DELETE` | `/deleteTurno/<id>` | Eliminar turno |
| `PATCH` | `/completarTurno/<id>` | Marcar turno como completado |
| `PATCH` | `/cancelarTurno/<id>` | Cancelar turno |
| `GET` | `/getNextTurno/<cliente_id>` | Próximo turno de un cliente |
| `GET` | `/turnos/historial` | Historial de turnos completados (filtrable) |
| `GET` | `/metricas/empleados` | Métricas de empleados |
| `GET` | `/metricas/clientes` | Métricas de clientes |
| `GET` | `/metricas/servicios` | Métricas de servicios |
| `GET` | `/metricas/ingresos` | Métricas de ingresos |

---

## 🚀 Ejecución local

### Requisitos previos

- **Node.js** (v18 o superior) y **npm**
- **Python** (3.9 o superior)

### Backend

```bash
cd Backend
python -m venv venv

# Windows
venv\Scripts\activate
# Linux / macOS
source venv/bin/activate

pip install -r requirements.txt
python app.py
```

El servidor quedará disponible en `http://localhost:5000`.

> **Nota:** para usar el frontend en local contra el backend local, reemplaza `https://bookmystyle.onrender.com` por `http://localhost:5000` en las llamadas `fetch` del frontend.

### Frontend

```bash
cd FrontEnd
npm install
npm run dev
```

La aplicación estará disponible en la URL que indique Vite (por defecto `http://localhost:5173`).

---

## 🌐 Deployment

- **Frontend**: desplegado en **Vercel** (SPA con `vercel.json` para el manejo de rutas).
- **Backend**: desplegado en **Render (plan gratuito)**, por lo que el servidor puede tardar **~1 minuto** en "despertar" al realizar la primera petición tras un periodo de inactividad.

---

## 🔑 Credenciales de prueba

| Rol | Correo | Contraseña |
| --- | --- | --- |
| Administrador | `lucasabalos531@gmail.com` | `admin123` |
