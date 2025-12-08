import { jobs } from '$lib/jobs.js';
import { json } from '@sveltejs/kit';

export function GET(){
    return new Response(JSON.stringify(jobs),{
        headers:{
            'Content-Type': 'application/json'
        }
    });
    //return json(jobs);
}

export async function POST(requestEvent) {
    const { request } = requestEvent;
    const { job_id,status,created_at } = await request.json();

    const new_job = {
        job_id,
        nombre,
        edad
    }
    jobs.push(new_job)
    return new Response(JSON.stringify(new_job), {status:201});
}