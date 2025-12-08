<script>
    export let datos;
</script>

<style>
    @import '/css/tabla.css';
</style>

<div class="scraper-table-container mb-6">
    <table class="scraper-table {datos.column_sizes}" cellpadding="0" cellspacing="0" border="0">
        <thead>
            <tr>
                {#each datos.header as dato_header}
                    <th><span>{dato_header}</span></th>
                {/each}
            </tr>
        </thead>
        <tbody>
            <slot />
        </tbody>
    </table>
</div>