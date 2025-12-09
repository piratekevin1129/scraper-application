import { fail,redirect } from '@sveltejs/kit';
import { permission } from 'process';

export const actions = {
    default: async ({request,cookies,fetch }) => {
        const form = await request.formData();
        const { user, pass } = Object.fromEntries(form);

        //validacion extra
        //const user = String(form.get('user') ?? '').trim();
        //const password = String(form.get('password') ?? '').trim();

        //if (!username || !password) {
            //return fail(400, {error: 'Usuario y contraseña requeridos'});
        //}

        const res_loging = await fetch('https://klolyketkc.execute-api.us-east-1.amazonaws.com/prod/login',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({user_id:user,password:pass})
        });

        const data = await res_loging.json();
        const { token, user_id, expires_in_days, message } = data;

        if (!res_loging.ok) {
            //return fail(res_loging.status, {error: data?.message ?? 'Ocurrió un error validando los datos'});
            return {error: data?.message ?? 'Ocurrió un error validando los datos'}
        }else{
            if(data?.statusCode){
                return {success: false, error: true, message: 'Correo o contraseña incorrecta. Intente nuevamente'};
            }else{
                //validar roles/permisos del usuario

                const res_roles = await fetch('https://klolyketkc.execute-api.us-east-1.amazonaws.com/prod/users/me',{
                    method:'GET',
                    headers: {
                        'Authorization':`Bearer ${token}`,
                        'Content-Type':'application/json'
                    },
                });

                const data_user = await res_roles.json();

                const { permissions,api_keys } = data_user;

                cookies.set('session',JSON.stringify({
                    'token':token,
                    'user_id':user_id
                }),{
                    httpOnly:true,
                    path:'/',
                    maxAge:(60*60*24*expires_in_days)
                });

                cookies.set('session_user',user_id,{
                    httpOnly:false,
                    path:'/',
                    maxAge:(60*60*24*expires_in_days)
                });
                cookies.set('session_permissions',JSON.stringify({
                    'permissions':permissions
                }),{
                    httpOnly:false,
                    path:'/',
                    maxAge:(60*60*24*expires_in_days)
                });

                cookies.set('session_keys',JSON.stringify({
                    'keys':api_keys
                }),{
                    httpOnly:false,
                    path:'/',
                    maxAge:(60*60*24*expires_in_days)
                });

                return {
                    success: true,
                    user_id:user_id,
                    permissions:permissions,
                    api_keys:api_keys
                };
                //throw redirect(303, '/dashboard');
            }
        }
    }
};
