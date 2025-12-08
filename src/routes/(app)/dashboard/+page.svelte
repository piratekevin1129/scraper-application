<script>
    import Menu from '$lib/components/Menu.svelte';
    import Select from '$lib/components/Select.svelte';
    
    //datos traidos del backend antes de cargar
    export let data;
    //console.log(data);

    //nombre del usuario para imprimir en cualquier parte de las vistas
    const user = data.session_user;
    //permisos para validar si se pintan algunos botones o no
    const permissions = data.session_permissions;
    
</script>

<div class="container">
    <section id="app-container" class="app-container-open">
        <div class="p-relative w100 d-flex j-between md_j-center a-center mb-4">
            <div class="col-title-button">
                <h1 class="scraper-title mb-1">Bienvenido, {user}!</h1>
                <p class="scraper-subtitle">Aquí encontaras un resumen de tu actividad social</p>
            </div>

            <Select />
        </div>

        <div class="cards-container mb-6">
            <div class="scraper-card w-4_g-20">
                <h6>Total Profiles tracked</h6>
                <h2>1,204</h2>
                <h5 class="scraper-card-positive">+5.2%</h5>
            </div>
            <div class="scraper-card w-4_g-20">
                <h6>Total Profiles tracked</h6>
                <h2>1,204</h2>
                <h5 class="scraper-card-positive">+5.2%</h5>
            </div>
            <div class="scraper-card w-4_g-20">
                <h6>Total Profiles tracked</h6>
                <h2>1,204</h2>
                <h5 class="scraper-card-negative">-5.2%</h5>
            </div>
            <div class="scraper-card w-4_g-20">
                <h6>Total Profiles tracked</h6>
                <h2>1,204</h2>
                <h5 class="scraper-card-neutral">0%</h5>
            </div>
        </div>

        <h1 class="scraper-title2 mb-4">Connected Sources</h1>

        <div class="cards-container mb-6">
            <div class="scraper-card2 w-4_g-20">
                <div class="scraper-card2-icon">
                    <div>
                        <i class="fab fa-facebook-square"></i>
                    </div>
                    <p>Facebook</p>
                </div>
                <div class="scraper-card2-status healhty">
                    <p>
                        <i class="fas fa-circle"></i>
                        <span>Healthy</span>
                    </p>
                </div>
                <button class="scraper-button2 scraper-card2-btn" type="button">
                    <span>Quick Scrape</span>
                </button>
            </div>
            <div class="scraper-card2 w-4_g-20">
                <div class="scraper-card2-icon">
                    <div>
                        <i class="fab fa-instagram-square"></i>
                    </div>
                    <p>Instagram</p>
                </div>
                <div class="scraper-card2-status healhty">
                    <p>
                        <i class="fas fa-circle"></i>
                        <span>Healthy</span>
                    </p>
                </div>
                <button class="scraper-button2 scraper-card2-btn" type="button">
                    <span>Quick Scrape</span>
                </button>
            </div>
            <div class="scraper-card2 w-4_g-20">
                <div class="scraper-card2-icon">
                    <div>
                        <i class="fas fa-hashtag"></i>
                    </div>
                    <p>X (Twitter)</p>
                </div>
                <div class="scraper-card2-status warning">
                    <p>
                        <i class="fas fa-circle"></i>
                        <span>Warning</span>
                    </p>
                </div>
                <button class="scraper-button2 scraper-card2-btn" type="button">
                    <span>Quick Scrape</span>
                </button>
            </div>
            <div class="scraper-card2 w-4_g-20">
                <div class="scraper-card2-icon">
                    <div>
                        <i class="fab fa-google-plus-square"></i>
                    </div>
                    <p>Google Ads</p>
                </div>
                <div class="scraper-card2-status error">
                    <p>
                        <i class="fas fa-circle"></i>
                        <span>Error</span>
                    </p>
                </div>
                <button class="scraper-button2 scraper-card2-btn" type="button">
                    <span>Quick Scrape</span>
                </button>
            </div>
        </div>

    </section>

    <Menu user_id={user} user_permissions={permissions} active="dashboard" />
</div>