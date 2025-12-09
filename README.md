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
            * cookie (httpOnly:true) llamada "session" solo para el servidor, aqui se guarda el token y el nombre de usuario.
            * cookie llamada "session_user" se guarda el nombre de usuario.
            * cookie llamada "session_permissions" se guarda un json con un array con los roles o permisos.
            * cookie llamada "session_keys" se guarda un json con un array con las keys.
        -> luego de guardar las cookies, se manda una señal a la vista para redirigir a /dashboard.
    /page.svelte
        -> se importa el componente "Loader" ya que esta vista carga un video de 3.9M.
        -> se importan funciones javascript "scripts/login.js" para el comportamiento de los input y otras cositas.


(app) -> se meten todas las otras vistas en esta carpeta para que carguen todas el mismo layout, ya que el layout del login es muy distinto.
    /layout.server.js
        -> se detecta si ya hay una sesión, si hay lo deja pasar, si no hay lo redirige al /login.
        -> a su vez, obtiene 3 cookies de la sesión que se usan en casi toda la aplicación y las exporta para que sean usadas en la vista:
            * nombre de usuario.
            * array de los permisos/roles.
            * array de las apikeys.
    /layout.svelte
        -> carga archivos css que se van a usar en casi toda la aplicación, por ejemplo botones, select, mensajes, etc...
    /page.svelte
        -> se creó por defecto, pero no tiene nada, si se elimina a veces sale un error.

/dashboard
    /page.server.js
        -> función que se ejecuta al cargar la página, extrae la lista de jobs.
        -> OJO! los jobs se extraen del archivo /lib/jobs.js ya que todavía no hay un servicio para traerlos todos.
        -> los jobs se exportan y se mezclan automáticamente con lo que exporta (app)/layout.server.js y asi pueden ser usados en la vista.
    /page.svelte
        -> vista de dashboard, nada inusual

/sources
    /page.server.js
        -> función que se ejecuta al cargar la página, extrae la lista de jobs.
        -> OJO! los jobs se extraen del archivo /lib/jobs.js ya que todavía no hay un servicio para traerlos todos.
        -> los jobs se exportan y se mezclan automáticamente con lo que exporta (app)/layout.server.js y asi pueden ser usados en la vista.
        -> función default para el login que llega por medio del <form> de la vista.
        -> dicha función ejecuta el servicio #2, OJO! No se reciben los datos del formulario ya que el servicio no los pide.
    /page.svelte
        -> vista de sources