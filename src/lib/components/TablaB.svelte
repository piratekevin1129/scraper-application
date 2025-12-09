<script>
    export let table_id;
    export let datos;
    export let buscador;

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

    let status_buscador_mensaje = 'off';

    function keyupBuscador(event){
        const texto = event.target.value
        //console.log(texto)
        filterData(texto.trim())
    }

    function filterData(texto){
        const txt = texto.toLowerCase();
        let tr_rows = document.getElementById(table_id).getElementsByTagName('tbody')[0].getElementsByTagName('tr');

        if(texto.length<=3){
            //dejar la tabla inicial
            for(let i = 0;i<tr_rows.length;i++){
                tr_rows[i].removeAttribute("class")
            }
            if(texto.length>0){
                status_buscador_mensaje = 'on';
            }else{
                status_buscador_mensaje = 'off';    
            }
        }else{            
            status_buscador_mensaje = 'off';
            //obtener todos los td del body
            const td_complete_rows = document.getElementById(table_id).getElementsByTagName('td')
            
            //todos los td que se les puede buscar texto
            let td_rows = [];
            for(let i = 0;i<td_complete_rows.length;i++){
                if(td_complete_rows[i].hasAttribute('filter')){
                    td_rows.push(td_complete_rows[i])   
                }
            }
            
            let tr_rows_visible = [];
    
            for(let i = 0;i<td_rows.length;i++){
                let span_obj = td_rows[i].getElementsByTagName('span')[0].innerHTML
                let span = span_obj.toLowerCase()
                let tr_row = td_rows[i].parentNode;
                let tr_id = tr_row.getAttribute('data-id');
                let texto_encontrado = false;
    
                //console.log(span+'...'+txt)
                if(span.indexOf(txt)!=-1){
                    texto_encontrado = true;
                }
    
                if(texto_encontrado){
                    if(!tr_rows_visible.includes(tr_id)){
                        console.log("agrega")
                        tr_rows_visible.push(tr_id)
                    }else{
                        console.log("no agrega")
                    }
                }
            }

            for(let i = 0;i<tr_rows.length;i++){
                let data_id = tr_rows[i].getAttribute('data-id')

                if(tr_rows_visible.includes(data_id)){
                    //poner visible
                    tr_rows[i].className = 'tr-filter-visible';
                }else{
                    //poner oculto
                    tr_rows[i].className = 'tr-filter-hidden';
                }
            }
        }
    }

</script>

<style>
    @import '/css/buscador.css';
    @import '/css/tabla.css';
</style>

{#if buscador}
    <div class="buscador-container">
        <div class="buscador-form-group buscador-form-group-out px-4">
            <div>
                <i class="fas fa-search"></i>
            </div>
            <input name="buscador" type="text" placeholder="Buscar perfiles o términos" autocomplete="off" on:focus="{focusBuscador}" on:blur="{blurBuscador}" on:keyup="{keyupBuscador}" />
        </div>
    </div>
    <div class="buscador-mensaje buscador-mensaje-{status_buscador_mensaje} mb-6">
        <p>Debes escribir al menos 3 caracteres</p>
    </div>
{/if}

<div class="scraper-table-wrap mb-6">
    <div class="scraper-table-wrapper">
        <div class="scraper-table-container">
            <table id="{table_id}" class="scraper-table {datos.column_sizes}" cellpadding="0" cellspacing="0" border="0">
                <thead>
                    <tr>
                        {#each datos.header as dato_header}
                            <th><span>{dato_header}</span></th>
                        {/each}
                    </tr>
                </thead>
                <slot />
            </table>
        </div>
    </div>
    <div class="scraper-table-shadow"></div>
</div>
