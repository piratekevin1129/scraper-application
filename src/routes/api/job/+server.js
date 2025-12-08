export async function GET({url,cookies}){
    const session = cookies.get('session');
    if(!session){
        return new Response(JSON.stringify({success:false, error:'Sesión expirada'}),{status:401});
    }else{
        const token = JSON.parse(session).token;
        const id = url.searchParams.get('id');

        const res = await fetch(`https://klolyketkc.execute-api.us-east-1.amazonaws.com/prod/jobs/${id}`, {
            headers:{
                'Authorization':`Bearer ${token}`,
                'Content-Type':'application/json'
            }
        });

        if(!res.ok) {
            return new Response(JSON.stringify({error:'Ocurrió un error verificando el job'}),{status:401});
        }else{
            const data = await res.json();
            if(data?.error){
                return new Response(JSON.stringify({error:'No se pudo obtener información del job'}),{status:401});
            }else{
                return new Response(JSON.stringify(data),{
                    headers:{
                        'Content-Type':'application/json'
                    }
                })
            }
        }
    }
}