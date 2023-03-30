<template>
    <LogoComponent />
    <div class="container m-8">
        <div class="row">
            <div class="col-4"></div>
            <div class="col-4">
                <router-view />
            </div>
            <div class="col-4"></div>
        </div>
    </div>
</template>

<script>
import LogoComponent from './components/LogoComponent'

export default {
    name: 'App',
    components: LogoComponent
}
</script>
