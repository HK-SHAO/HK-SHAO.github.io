---
title: 简历
editLink: false
sidebar: false
lastUpdated: true
contributors: false
---

<div class="paper-pages">
  <img src="./resume_1.svg" alt="resume_1" class="paper01">
  <img src="./resume_2.svg" alt="resume_2">
</div>


<style>
.page .theme-default-content {
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    padding: 0;
    margin: 0;
}

.paper01 {
    z-index: 1;
}

.paper-pages {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0;
    width: 100%;
}

.paper-pages img {
    display: block;
    width: 100%;
    height: auto;
}

@media (min-width: 901px) {
    .paper-pages {
        width: 100%;
        margin-left: 50%;
        transform: translateX(-50%);
    }

    .paper-pages img + img {
        margin-left: -8%;
    }
}

@media (max-width: 900px) {
    .paper-pages {
        grid-template-columns: 1fr;
        width: 100%;
        margin-left: 0;
        transform: none;
    }

    .paper-pages img + img {
        margin-left: 0;
    }
}
</style>
