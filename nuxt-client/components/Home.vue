<template>
<main class="main">
<h1>Anon</h1>
<form class="form-widget">
<div>
<label for="title">Title</label>
<input id="title" type="text" />
</div>
<div>
<label for="content">Content</label>
<textarea id="content"></textarea>
</div>
<div>
<input type="submit" value="add" />
</div>
</form>
</main>
</template>

<script setup></script>

<style>

div {
    margin: 8px;
}

.main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>