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
    return {
        jobs:data_jobs
    }; 
}