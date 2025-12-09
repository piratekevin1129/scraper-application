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

</script>

<div class="container">
    <section id="app-container" class="app-container-open">
        <div class="p-relative w100 mb-4">
            <div class="col-title">
                <h1 class="scraper-title mb-1">Bienvenido, {user}!</h1>
                <p class="scraper-subtitle">Aquí encontaras un resumen del estado de los jobs</p>
            </div>
        </div>

        <div class="cards-container mb-6">
            {#each jobs as job}
                <div class="scraper-card2 w-4_g-20">
                    <div class="scraper-card2-icon">
                        <div>
                            <i class="fas fa-hashtag"></i>
                        </div>
                        <p>Job Scraper</p>
                    </div>
                    <div class="scraper-card2-status {utils.statusData(job.status).clase_status}">
                        <p>
                            <i class="fas fa-circle"></i>
                            <span>{job.status.toLowerCase()}</span>
                        </p>
                    </div>
                    <h5 class="scraper-card-{utils.statusData(job.status).clase_status}">
                        {utils.statusData(job.status).percent}%
                    </h5>
                </div>
            {/each}
        </div>

        <!--<h1 class="scraper-title2 mb-4">Connected Sources</h1>-->

    </section>

    <Menu user_id={user} user_permissions={permissions} active="dashboard" />
</div>