import { fail,redirect } from '@sveltejs/kit';

//export async function load({cookies,url}) {
export const load = ({cookies,url}) => {
    const session = cookies.get('session');
    //si no se encuentra la sessión, lo manda para le login
    if(!session){
        throw redirect(303, '/login');
    }else{
        //valores que optenemos de la cookie de sesión para todas las paginas del proyecto, excepto el login
        //nombre de usuario y permisos

        const cookie_user = cookies.get('session_user');
        const cookie_permissions = cookies.get('session_permissions');
        
        //por defecto son estos valores
        let session_user = 'Usuario';
        let session_permissions = [];
    
        if(cookie_user){
            session_user = cookie_user;
        }
        if(cookie_permissions){
            session_permissions = JSON.parse(cookie_permissions).permissions;
        }

        //si la ruta es /sources, hacer una validación extra con los permisos 
        if(url.pathname=='/sources'){
            //si no tiene los permisos suficientes, lo manda al dashboard
            if(!session_permissions.includes('run_jobs')){
                throw redirect(303, '/dashboard');
            }
        }

        return {
            session_user:session_user,
            session_permissions:session_permissions
        };
    }

}