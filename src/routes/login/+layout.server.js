import { fail,redirect } from '@sveltejs/kit';

export const load = ({cookies}) => {
    //si ya hay una sesión, lo manda para el dashboard
    const session = cookies.get('session');
    if(session){
        throw redirect(303, '/dashboard');
    }
}