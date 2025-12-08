export const actions = {
    default: async ({request,cookies,fetch }) => {
        const form = await request.formData();
        const { key } = Object.fromEntries(form);

        const session = cookies.get('session');
        if(!session){
            return {success:false, error:'Sesión expirada'};
        }else{
            const token = JSON.parse(session).token;
            
            const res_api = await fetch('https://klolyketkc.execute-api.us-east-1.amazonaws.com/prod/users/me',{
                method:'PATCH',
                headers:{
                    'Authorization':`Bearer ${token}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({api_keys:[
                    {'name':"default",'key':key}
                ]})
            });
            
            const data = await res_api.json();
    
            if (!res_api.ok) {
                //return fail(res_loging.status, {error:data?.message ?? 'Ocurrió un error validando los datos'});
                return {error: 'Ocurrió un error actualizando la api key'}
            }else{
                if(data?.error){
                    return {success: false, error: 'No se pudo actualizar la api key'};
                }else{
                    return {success: true, result:data};
                }
            }
        }
    }
};