<script>
    export let modal_data;

    export function cerrarModal(){
        modal_data.status = false;
    }
</script>

<style>
    @import '/css/modal.css';
</style>

<div class="modal" class:modal-off={!modal_data.status} class:modal-on={modal_data.status}>
    <div class="modal-box modal-box-{modal_data.size} modal-{modal_data.type}">
        <div class="modal-content p-8" class:modal-section-hide={modal_data.loading}>
            <div class="modal-icon mb-4">
                <i class="{modal_data.icon}"></i>
            </div>
            <div class="modal-title w100 mb-6">
                <h2>{modal_data.title}</h2>
            </div>
            <div class="modal-text w100 px-4">
                <slot name="body" />
            </div>
        </div>
        <div class="modal-footer p-4" class:modal-section-hide={modal_data.loading}>
            <slot />
        </div>
        <div class="modal-loading p-8" class:modal-section-show={modal_data.loading}>
            <i class="fas fa-circle-notch"></i>
            <p>{modal_data.loadingtext}</p>
        </div>
    </div>
</div>