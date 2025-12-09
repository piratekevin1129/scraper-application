SEVICIOS:
#1 -> validar contraseña y usuario
#2 -> crear un job
#3 -> obtener información de un job
#4 -> obtener roles/permisos del usuario
#5 -> actualizar api key del usuario


login/
    /layout.server.js
        -> se detecta si ya hay una sesión y lo redirige al /dashboard, si no entonces no.
    /page.server.js
        -> función default para el login que llega por medio del <form> de la vista.
        -> la función llama al servicio #1.
        -> No hay validación de datos vacios (pendiente para más seguridad).
        -> si todo sale bien con el login, se consume inmediatamente el servicio #4.
        -> si todo sale bien se guardan los siguientes datos en cookies, asi:
            * cookie (httpOnly:true) llamada "session" solo para el servidor, aqui se guarda el token y el nombre de usuario
            * cookie llamada "session_user" se guarda el nombre de usuario
            * cookie llamada "session_permissions" se guarda un json con un array con los roles o permisos
            * cookie llamada "session_keys" se guarda un json con un array con las keys
        -> luego de guardar las cookies, se manda una señal a la vista para redirigir a /dashboard
    /page.svelte
        -> se importa el componente "Loader" ya que esta vista carga un video de 3.9M
        -> se importan funciones javascript "scripts/login.js" para el comportamiento de los input y otras cositas
