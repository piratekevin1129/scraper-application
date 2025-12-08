<script>
    function focusSelect(event){
        const btn = event.currentTarget;
        const alto_options = btn.parentNode.getElementsByClassName('scraper-select-options')[0].offsetHeight
        btn.parentNode.getElementsByClassName('scraper-select-options-wrap')[0].style.height = alto_options+'px'
    }
    function blurSelect(event){
        const btn = event.currentTarget;
        btn.parentNode.getElementsByClassName('scraper-select-options-wrap')[0].style.height = '0px'
    }
    function clickSelectOption(event){
        if(event.type=='click'){
            const btn = event.currentTarget;
            //capturar value
            const value = btn.getElementsByTagName('span')[0].innerHTML
            //colocar clase selected
            const opciones = btn.parentNode.getElementsByClassName('scraper-select-option')
            for(let i = 0;i<opciones.length;i++){
                opciones[i].className = 'scraper-select-option'
            }
            btn.className = 'scraper-select-option selected'
            //save value to button
            const button_select = btn.parentNode.parentNode.parentNode
            button_select.setAttribute('value',value)
            //set value to label
            const label = button_select.getElementsByTagName('p')[0]
            label.innerHTML = value
        
            button_select.blur()
        }
    }
</script>

<style>
    @import '/css/select.css';
</style>

<button type="button" class="scraper-select" value="Últimos 7 días" on:focus="{focusSelect}" on:blur="{blurSelect}">
    <div class="scraper-select-text">
        <div><i class="far fa-calendar"></i></div>
        <p>Últimos 7 días</p>
        <i class="fas fa-angle-down"></i>
    </div>
    <div class="scraper-select-options-wrap">
        <div class="scraper-select-options">
            <div
                class="scraper-select-option selected"
            >
                <span>Últimos 7 días</span>
            </div>
            <div 
                class="scraper-select-option"
            >
                <span>Hace 1 mes</span>
            </div>
        </div>
    </div>
</button>
