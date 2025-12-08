<script>
    import Menu from '$lib/components/Menu.svelte';
    import TablaB from '$lib/components/TablaB.svelte';
    import Modal from '$lib/components/Modal.svelte';
    let ModalInstance;
    import * as utils from '$lib/scripts/utils';

    import { enhance } from '$app/forms';

    //datos para el modal al ver detalles del job
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

    //nombre del usuario para imprimir en cualquier parte de las vistas
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

    function statusData(job_status){
        const status = String(job_status).toLowerCase();
        let clase_status = 'error';
        let percent = 0;
        if(status=='running'){
            clase_status = 'running';
            percent = 50;
        }else if(status=='done'){
            clase_status = 'done';
            percent = 100;
        }
        return {clase_status:clase_status,percent:percent}
    }

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

    //crear job
    let btn_loading = false;
    function crearJob({form,data,action,cancel}) {
        //si el botón esta cargando no puede hacer click
        //if(!btn_loading){
            btn_loading = true;
    
            return async ({result,update}) => {
                // codigo luego de respuesta del servidor
                console.log(result.data)
                //poner boton disponible para click
                btn_loading = false;
                
                if (result.data.success == true) {
                    modal_data.status = true;
                    modal_data.size = 'normal';
                    modal_data.icon = 'far fa-check-circle';
                    modal_data.title = 'Job Creado correctamente';
                    modal_data.type = 'success';
                    modal_data.loading = false;
                    modal_data.loadingtext = '';

                    modal_text = `Estado: ${result.data.result.status} <br> Fecha de creación: ${utils.decodeFecha(result.data.result.created_at)}`;

                    jobs = [...jobs,{
                        created_at:result.data.result.created_at,
                        job_id:result.data.result.job_id,
                        status:result.data.result.status
                    }];
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
        //}
    }

</script>

<div class="container">
    <section id="app-container" class="app-container-open">
        <div class="p-relative w100 d-flex j-between md_j-center a-center mb-4">
            <div class="col-title-button">
                <h1 class="scraper-title">Scraper Manager</h1>
            </div>
            <form class="col-btn" method="post" use:enhance={crearJob} id="formulario">
                <button 
                    class="scraper-button" 
                    class:scraper-button-disabled={btn_loading} 
                    class:scraper-button-enabled={!btn_loading} 
                    class:scraper-button-loading={btn_loading} 
                    type="submit"
                    on:click={crearJob}
                >
                    {#if btn_loading}
                        <i class="fas fa-circle-notch"></i>
                    {/if}
                    <span><i class="fas fa-plus-circle"></i> Add New Source</span>
                </button>
                <!--<input type="hidden" name="connector_type" value="fake_api" />-->
            </form>
        </div>

        <TablaB table_id={'tabla_jobs'} datos={datos} buscador={true} paginador={true}>
            {#each jobs as job,index}
                <tr id="{'tabla_jobs_tr_'+index}" data-id="{index}">
                    <td filter>
                        <span>{job.job_id}</span>
                    </td>
                    <td filter>
                        <span>{utils.decodeFecha(job.created_at)}</span>
                    </td>
                    <td>
                        <div class="status-container status-container-{statusData(job.status).clase_status}">
                            <span class="status-tag">{job.status.toLowerCase()}</span>
                            <div class="status-progressbar">
                                <div style="width:{statusData(job.status).percent}%"></div>
                            </div>
                            <span class="status-percent">{statusData(job.status).percent}%</span>
                        </div>
                    </td>
                    <td class="md_px-0" align="middle">
                        <button class="table-options-btn" aria-label="opciones" on:click={()=>clickVerJob(job.job_id)}>
                            <i class="fas fa-ellipsis-v"></i>
                            <!--<div class="table-options-btn-box">
                                <div><span>Actualizar<span></div>
                                <div><span>Ver</span></div>
                            </div>-->
                        </button>
                    </td>
                </tr>
            {/each}
        </TablaB>
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
</div>