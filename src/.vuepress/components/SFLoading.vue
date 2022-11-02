<template>
    <div class="my-loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
</template>

<style scoped>
.my-loading {
    width: 100px;
    height: 100px;
    position: relative;
    margin: 0 auto;
}

.my-loading span {
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--c-tip);
    position: absolute;
    animation: load 1.04s ease infinite;
}

@keyframes load {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0.2;
    }
}

.my-loading span:nth-child(1) {
    left: 0;
    top: 50%;
    margin-top: -8px;
    animation-delay: 0.13s;
}

.my-loading span:nth-child(2) {
    left: 14px;
    top: 14px;
    animation-delay: 0.26s;
}

.my-loading span:nth-child(3) {
    left: 50%;
    top: 0;
    margin-left: -8px;
    animation-delay: 0.39s;
}

.my-loading span:nth-child(4) {
    top: 14px;
    right: 14px;
    animation-delay: 0.52s;
}

.my-loading span:nth-child(5) {
    right: 0;
    top: 50%;
    margin-top: -8px;
    animation-delay: 0.65s;
}

.my-loading span:nth-child(6) {
    right: 14px;
    bottom: 14px;
    animation-delay: 0.78s;
}

.my-loading span:nth-child(7) {
    bottom: 0;
    left: 50%;
    margin-left: -8px;
    animation-delay: 0.91s;
}

.my-loading span:nth-child(8) {
    bottom: 14px;
    left: 14px;
    animation-delay: 1.04s;
}
</style>