import { jobs } from '$lib/jobs.js';
import { json } from '@sveltejs/kit';

export async function load({cookies,fetch,parent}) {
    const res_jobs = await fetch('/api/jobs',{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        }
    });
    
    const data_jobs = await res_jobs.json();

    /*const { data } = await parent();
    if(!data){
        return {
            jobs:[],
            session_user:"",
            session_permissions:[],
            error:'No se pudo combinar los datos'
        }
    }else{
        return {
            jobs:data_jobs,
            session_user:data.session_user,
            session_permissions:data.session_permissions,
            error:''
        }
    }*/
    return {
        jobs:data_jobs
    }; 
}

export const actions = {
    default: async ({request,cookies,fetch }) => {
        const form = await request.formData();

        const session = cookies.get('session');
        if(!session){
            return {success:false, error:'Sesión expirada'};
        }else{
            const connector_type = 'fake_api';
            const params = {"limit":5};
            const token = JSON.parse(session).token;
            
            const res_job = await fetch('https://klolyketkc.execute-api.us-east-1.amazonaws.com/prod/jobs',{
                method:'POST',
                headers:{
                    'Authorization':`Bearer ${token}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({connector_type:connector_type,params:params})
            });
    
            const data = await res_job.json();
    
            if (!res_job.ok) {
                //return fail(res_loging.status, {error:data?.message ?? 'Ocurrió un error validando los datos'});
                return {error: 'Ocurrió un error creando el job'}
            }else{
                if(data?.error){
                    return {success: false, error: 'No se pudo crear el job'};
                }else{
                    return {success: true, result:data};
                }
            }
        }
    }
};