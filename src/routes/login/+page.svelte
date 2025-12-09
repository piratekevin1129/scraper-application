<script>
    import * as login from '$lib/scripts/login';
    import { onMount } from 'svelte';
    import Loader from '$lib/components/Loader.svelte';
    let loader_status = 'on';
    import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

    onMount(()=> {
        loader_status = 'off';
    })

    let form_response = {error:false,message:''};
    let btn_loading = false;

    function enviarFormulario({form,data,action,cancel}) {
        btn_loading = true;
        form_response.error = false;
        
        // validacion client side pendiente

        return async ({result,update}) => {
            // codigo luego de respuesta del servidor
            console.log(result.data)
            //poner boton dispoible para click
            btn_loading = false;
            if (result.data.success == true) {
                //form.reset();
                goto('/dashboard');
            }else{
                form_response.message = result.data.message;
                form_response.error = result.data.error;
            }
        };
    }

</script>

<div class="container">
    <div class="login-container d-flex">
        <section class="login-hidden-menu">
        </section>

        <section class="login-section d-flex column b-box p-10">
            <form method="post" use:enhance={enviarFormulario} id="formulario">
                <h1 class="login-title mb-4">Iniciar sesión</h1>
                <h2 class="login-subtitle mb-6">Bienvenido! Por favor diligencia tus datos de ingreso.</h2>
        
                <div class="login-form-group">
                    <input name="user" type="text" value="" autocomplete="off" class="px-4" on:focus="{login.focusLoginInput}" on:blur="{login.blurLoginInput}" />
                    <label class="d-flex" for="user">Correo electrónico</label>
                </div>
        
                <div class="login-form-group">
                    <input name="pass" type="password" value="" autocomplete="off" class="pl-4 pr-80" on:focus="{login.focusLoginInput}" on:blur="{login.blurLoginInput}" />
                    <label class="d-flex" for="pass">Contraseña</label>
                    <button type="button" aria-label="Ver/Ocultar contraseña" class="password-status-btn password-status-btn-hide" status="hide" on:click="{login.togglePasswordStatus}">
                        <i class="far fa-eye"></i>
                        <i class="far fa-eye-slash"></i>
                    </button>
                </div>
        
                <a href="/forgot-password" class="login-forgot my-6">Recordar contraseña</a>
                
                <div class="login-message-error" class:login-message-off={!form_response.error} class:login-message-on={form_response.error}>
                    <div class="login-message">
                        <i class="fas fa-exclamation"></i>
                        <span>{form_response.message}</span>
                    </div>
                </div>
        
                <button class="login-btn my-3" class:login-btn-disabled={btn_loading} class:login-btn-enabled={!btn_loading} class:login-btn-loading={btn_loading} type="submit" on:click={enviarFormulario}>
                    {#if btn_loading}
                        <i class="fas fa-circle-notch"></i>
                    {/if}
                    <span>Iniciar sesión</span>
                </button>
            </form>
        </section>
    
        <section class="particles-container">
            <video id="particles-video" autoplay loop playsinline muted>
                <source src="/media/particles_v2.mp4" type="video/mp4" />
            </video>
            <div class="particles-layer"></div>
        </section>
    </div>
</div>

<Loader loader_status={loader_status} />

