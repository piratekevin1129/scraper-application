import { fail,redirect } from '@sveltejs/kit';

//export async function load({cookies}) {
export const load = ({cookies}) => {
    cookies.set('session','',{path:'/',maxAge:0});
    cookies.set('session_user','',{path:'/',maxAge:0});
    throw redirect(303, '/login')
}