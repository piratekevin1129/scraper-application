<script>
    import Menu from '$lib/components/Menu.svelte';
    import Modal from '$lib/components/Modal.svelte';
    let ModalInstance;
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

    let api_icon_status = 'far fa-clock';
    let api_result_status = 'Not connected';

    let btn_loading = false;
    function actualizarApi({form,data,action,cancel}){
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
                modal_data.title = 'API Key actualizada';
                modal_data.type = 'success';
                modal_data.loading = false;
                modal_data.loadingtext = '';

                modal_text = 'Todo salió bien';
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
</script>

<style>
    @import '/css/settings.css';
    @import '/css/form.css';
</style>

<div class="container">
    <section id="app-container" class="app-container-open">
        <div class="p-relative w100 mb-4">
            <div class="col-title">
                <h1 class="scraper-title mb-1">Ajustes y Administración</h1>
                <p class="scraper-subtitle">Gestiona tus API, usuario y ajustes de cuenta</p>
            </div>
        </div>

        <h1 class="scraper-title2 mb-2">Integración de API</h1>
        <p class="scraper-subtitle mb-4">Conecta tus datos para comenzar con el scrap de las redes sociales</p>

        <div class="api-section-container mb-6">
            <form class="formulario-basico" method="post" use:enhance={actualizarApi} id="formulario">
                <div class="api-section-body p-6">
                    <div class="api-section-logo">
                        <div>
                            <span>API</span>
                            <!--<img src="/images/apify-logo.svg" alt="apify logo" />-->
                        </div>
                    </div>
                    <div class="api-section-information">
                        <h2 class="mb-2">Default</h2>
                        <p>Web Scraping and automation platform with ready-made Actors.</p>
                        <br>
                        <div class="form-group">
                            <label for="key">API Key</label>
                            <input class="api-section-input" type="password" name="key" value="123" autocomplete="off" />
                        </div>
                    </div>
                </div>
                <div class="api-section-footer p-4 d-flex j-between a-center">
                    <div class="api-section-footer-status">
                        <i class="{api_icon_status}"></i>
                        <p>{api_result_status}</p>
                    </div>
                    <div class="api-section-footer-button">
                        <button 
                            class="scraper-button api-section-button" 
                            class:scraper-button-disabled={btn_loading} 
                            class:scraper-button-enabled={!btn_loading} 
                            class:scraper-button-loading={btn_loading} 
                            type="submit"
                            on:click={actualizarApi}
                        >
                            {#if btn_loading}
                                <i class="fas fa-circle-notch"></i>
                            {/if}
                            <span><i class="fas fa-share-square"></i> Guardar</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>

    </section>

    <Menu user_id={user} user_permissions={permissions} active="settings" />

    <Modal modal_data={modal_data} bind:this={ModalInstance}>
        <p slot="body">
            {@html modal_text}
        </p>
        <button type="button" aria-label="cerrar modal" class="scraper-button2 scraper-button2-enabled mx-auto" on:click={()=>{ModalInstance.cerrarModal()}}>
            <span>Aceptar</span>
        </button>
    </Modal>
</div>