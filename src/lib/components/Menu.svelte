<script>
    export let user_id;
    export let user_permissions;
    export let active;
</script>

<style>
    @import '/css/menu.css';
</style>

<section id="menu-lateral-container" class="menu-lateral-open">
    <div class="menu-lateral-coltop">
        <div class="menu-lateral-logo">
            <img src="/images/logo.png" alt="logo" />
            <h1>SocialScraper</h1>
            <!--<button  aria-label="ocultar menú" type="button" class="menu-lateral-back-btn">
                <i class="fas fa-arrow-left"></i>
            </button>-->
        </div>
        <nav id="menu-lateral">
            <ul>
                <li>
                    <a href="/dashboard" class="menu-lateral-btn" class:menu-lateral-btn-active={active=='dashboard'}>
                        <i class="fas fa-border-all"></i>
                        <span>Dashboard</span>
                    </a>
                </li>
                {#if user_permissions.includes('run_jobs')}
                    <li>
                        <a href="/sources" class="menu-lateral-btn" class:menu-lateral-btn-active={active=='source'}>
                            <i class="fas fa-link"></i>
                            <span>Sources</span>
                        </a>
                    </li>
                {/if}
                <!--<li>
                    <a href="/analytics" class="menu-lateral-btn">
                        <i class="fas fa-chart-line"></i>
                        <span>Perfil</span>
                    </a>
                </li>-->
            </ul>
        </nav>
    </div>
    <div class="menu-lateral-colbot">
        <a href="/settings" class="menu-lateral-btn" class:menu-lateral-btn-active={active=='settings'}>
            <i class="fas fa-cog"></i>
            <span>Settings</span>
        </a>
        <a href="/logout" class="menu-lateral-btn">
            <i class="fas fa-sign-out-alt"></i>
            <span>Log out</span>
        </a>
        <div class="menu-lateral-profile">
            <div class="profile-photo">
                <img src="/images/profile-picture.png" alt="Foto de perfil" />
            </div>
            <div class="profile-info">
                <p class="profile-info-name">{user_id}</p>
                <p class="profile-info-email">joejonas@scraper.com</p>
            </div>
        </div>
    </div>
</section>