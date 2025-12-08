<script>
    let loaderRef; 
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

<div bind:this={loaderRef} id="loader" class="loader-off">
    <div id="loader-box">
        <div id="loader-ball"></div>
        <div id="loader-mask"></div>
        <!--<p>Cargando</p>-->
    </div>
</div>