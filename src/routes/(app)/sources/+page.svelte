<script>
    import Menu from '$lib/components/Menu.svelte';
    import TablaB from '$lib/components/TablaB.svelte';
    import Modal from '$lib/components/Modal.svelte';
    let ModalInstance;
    import * as utils from '$lib/scripts/utils';
    import * as paginador from '$lib/scripts/paginador';

    import { enhance } from '$app/forms';

    //datos para el modal al ver crear el job
    let modal_data = {
        status:false,
        size:'normal',
        icon:'',
        title:'',
        type:'neutral',
        loading:false,
        loadingtext:''
    };
    let modal_text;

    //datos traidos del backend antes de cargar
    export let data;
    //console.log(data);

    //nombre del usuario para imprimir en cualquier parte de la vista
    const user = data.session_user;
    //permisos para validar si se pintan algunos botones o no
    const permissions = data.session_permissions;
    //lista de los jobs
    let jobs = data.jobs;
    
    //datos para la tabla
    const datos = {
        header:['Job Id','Fecha de creación','Estado',''],
        column_sizes: 'col1-3 col2-3 col3-3_5 col4-0_5',
        body:[]
    }

    //al darle click se abre un modal de tipo loader, mientras se carga la información del job
    function clickVerJob(job_id){
        modal_data.status = true;
        modal_data.size = 'normal';
        modal_data.icon = '';
        modal_data.title = '';
        modal_data.type = 'neutral';
        modal_data.loading = true;
        modal_data.loadingtext = 'Cargando información del Job';

        clickVerJobDetails(job_id);
    }

    //función que consume el servicio de la información del job
    async function clickVerJobDetails(job_id){
        const res_job = await fetch(`/api/job?id=${job_id}`);
        const data_job = await res_job.json();

        console.log(data_job)
        modal_data.icon = 'fas fa-info-circle';
        modal_data.title = 'Acerca del Job';
        modal_data.type = 'success';
        modal_data.loading = false;
        modal_data.loadingtext = '';

        modal_text = `Estado: ${data_job.status} <br> Fecha de creación: ${utils.decodeFecha(data_job.created_at)}`;
    }

    //funcion que consume el servicio para crear un job
    let btn_loading = false;
    function crearJob({form,data,action,cancel}) {
        btn_loading = true;

        return async ({result,update}) => {
            // codigo luego de respuesta del servidor
            console.log(result.data)
            //poner boton disponible para click
            btn_loading = false;
            modal_job_status = false;
            
            if (result.data.success == true) {
                modal_data.status = true;
                modal_data.size = 'normal';
                modal_data.icon = 'far fa-check-circle';
                modal_data.title = 'Job Creado correctamente';
                modal_data.type = 'success';
                modal_data.loading = false;
                modal_data.loadingtext = '';

                modal_text = `Estado: ${result.data.result.status} <br> Fecha de creación: ${utils.decodeFecha(result.data.result.created_at)}`;

                jobs = [{
                    created_at:result.data.result.created_at,
                    job_id:result.data.result.job_id,
                    status:result.data.result.status
                }, ...jobs];
                jobs_collection = paginador.setPaginadorCollection(jobs,limit_paginador);
            }else{
                modal_data.status = true;
                modal_data.size = 'normal';
                modal_data.icon = 'fas fa-exclamation-triangle';
                modal_data.title = 'Ha ocurrido un error';
                modal_data.type = 'warning';
                modal_data.loading = false;
                modal_data.loadingtext = '';
                
                modal_text = result.data.error;
                console.log(result.data.error)
            }
        };
    }

    //abre el modal con un formulario para crear el job 
    let modal_job_status = false;
    function openCrearJob(){
        modal_job_status = true;
    }

    //organizar array jobs para paginador
    let limit_paginador = 5;
    let page_paginador = 0;

    //separar array de jobs por tandas
    let jobs_collection = paginador.setPaginadorCollection(jobs,limit_paginador);
    

    function pagePaginador(p){
        page_paginador = p;
    }
    function prevPaginador(){
        if(page_paginador>0){
            page_paginador--;
        }
    }
    function nextPaginador(){
        if(page_paginador<(jobs_collection.length-1)){
            page_paginador++;
        }
    }
    
</script>

<style>
    @import '/css/paginador.css';
    @import '/css/modal.css';
    @import '/css/form.css';
</style>

<div class="container">
    <section id="app-container" class="app-container-open">
        <div class="p-relative w100 d-flex j-between md_j-center a-center mb-4">
            <div class="col-title-button">
                <h1 class="scraper-title">Gestionar Jobs</h1>
            </div>
            
            <button class="scraper-button scraper-button-enabled" type="button" on:click={openCrearJob}>
                <span><i class="fas fa-plus-circle"></i> Agregar Job</span>
            </button>
        </div>

        <TablaB table_id={'tabla_jobs'} datos={datos} buscador={true} paginador={true}>
            <tbody id={'tabla_body_jobs'}>
            {#each jobs_collection[page_paginador] as job,index}
                <tr id="{'tabla_jobs_tr_'+index}" data-id="{index}">
                    <td filter>
                        <span>{job.job_id}</span>
                    </td>
                    <td filter>
                        <span>{utils.decodeFecha(job.created_at)}</span>
                    </td>
                    <td>
                        <div class="status-container status-container-{utils.statusData(job.status).clase_status}">
                            <span class="status-tag">{job.status.toLowerCase()}</span>
                            <div class="status-progressbar">
                                <div style="width:{utils.statusData(job.status).percent}%"></div>
                            </div>
                            <span class="status-percent">{utils.statusData(job.status).percent}%</span>
                        </div>
                    </td>
                    <td class="md_px-0" align="middle">
                        <button class="table-options-btn" aria-label="opciones" on:click={()=>clickVerJob(job.job_id)}>
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                    </td>
                </tr>
            {/each}
            </tbody>
        </TablaB>

        <div class="scraper-paginador-container">
            <div id="scraper-paginador">
                <button class="scraper-paginador-btn" aria-label="anterior" on:click={prevPaginador}>
                    <i class="fas fa-angle-left"></i>
                </button>
                <div class="scraper-pages">
                    {#each jobs_collection as job_coll,index}
                    <button aria-label="pagina {index + 1}" class="scraper-paginador-btn" class:active={index==page_paginador} on:click={()=>{pagePaginador(index)}}>
                        <span>{index + 1}</span>
                    </button>
                    {/each}
                </div>
                <button aria-label="siguiente" class="scraper-paginador-btn" on:click={nextPaginador}>
                    <i class="fas fa-angle-right"></i>
                </button> 
            </div>
        </div>
    </section>

    <Menu user_id={user} user_permissions={permissions} active="source" />

    <Modal modal_data={modal_data} bind:this={ModalInstance}>
        <p slot="body">
            {@html modal_text}
        </p>
        <button type="button" aria-label="cerrar modal" class="scraper-button2 scraper-button2-enabled mx-auto" on:click={()=>{ModalInstance.cerrarModal()}}>
            <span>Aceptar</span>
        </button>
    </Modal>

    <!--Modal exclusivo para crear Job-->
    <!--Trae un formulario demo, por ahora no hace nada, pero a futuro si-->
    <div id="modal_job" class="modal" class:modal-off={!modal_job_status} class:modal-on={modal_job_status}>
        <div class="modal-box modal-box-normal modal-normal">
            <form class="formulario-basico" method="post" use:enhance={crearJob} id="formulario">
                <div class="modal-content p-8">
                    <div class="modal-icon mb-4">
                        <i class="fas fa-file-signature"></i>
                    </div>
                    <div class="modal-title w100 mb-6">
                        <h2>Datos para crear el Job</h2>
                    </div>
                    <div class="modal-data">
                        <div class="form-group">
                            <label for="redsocial">Nombre del Job</label>
                            <input placeholder="Job #1" type="text" name="nombre" value="" autocomplete="off" />
                        </div>
                        <div class="form-group">
                            <label for="redsocial">Red Social</label>
                            <input placeholder="facebook" type="text" name="redsocial" value="" autocomplete="off" />
                        </div>
                    </div>
                </div>
                <div class="modal-footer p-4">
                    <button 
                        type="submit" 
                        aria-label="crear job" 
                        class="scraper-button2 mx-auto" 
                        class:scraper-button2-disabled={btn_loading} 
                        class:scraper-button2-enabled={!btn_loading} 
                        class:scraper-button2-loading={btn_loading} 
                        on:click={crearJob}
                    >
                        {#if btn_loading}
                            <i class="fas fa-circle-notch"></i>
                        {/if}
                        <span>Crear</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>