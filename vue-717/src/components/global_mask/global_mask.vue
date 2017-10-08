<template>
    <div class="mask" :class="{'active':isActive}">
        <h1>loading...</h1>
    </div>
</template>
<script>
export default {
    // name: 'mask-view',
    props: ['isActive']
}
</script>
<style lang="scss" scoped>
.mask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    display: none;
    h1 {
        color: #fff;
        transform: translate3d(-50%, -50%, 0);
        position: absolute;
        left: 50%;
        top: 50%;
    }
}

.active {
    display: block;
}
</style>

