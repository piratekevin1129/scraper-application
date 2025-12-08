<script>
    function focusBuscador(event){
        const current_class = event.target.parentNode.className
        const new_class = current_class.replace('out','over')
        event.target.parentNode.className = new_class
    }
    
    function blurBuscador(event){
        const current_class = event.target.parentNode.className
        const new_class = current_class.replace('over','out')
        event.target.parentNode.className = new_class
    }
</script>

<style>
    @import '/css/buscador.css';
</style>

<div class="buscador-container mb-6">
    <div class="buscador-form-group buscador-form-group-out px-4">
        <div>
            <i class="fas fa-search"></i>
        </div>
        <input name="buscador" type="text" placeholder="Buscar perfiles o términos" autocomplete="off" on:focus="{focusBuscador}" on:blur="{blurBuscador}" />
    </div>
</div>