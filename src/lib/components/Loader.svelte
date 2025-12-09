<script>
    export let loader_status;
    export function unsetLoader(){
        loaderRef.className = 'loader-off'
    }
    export function setLoader(){
        loaderRef.className = 'loader-on'
    }
</script>

<style>
    @import '/css/loader.css';
</style>

<div id="loader" class="loader-{loader_status}">
    <div id="loader-box">
        <!--<div id="loader-ball"></div>
        <div id="loader-mask"></div>
        <p>Cargando</p>-->
        <i class="fas fa-circle-notch"></i>
    </div>
</div>