<!-- <script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'
</script>

<main>
  <div>
    <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
      <img src={viteLogo} class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
  <h1>Vite + Svelte</h1>

  <div class="card">
    <Counter />
  </div>

  <p>
    Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank" rel="noreferrer">SvelteKit</a>, the official Svelte app framework powered by Vite!
  </p>

  <p class="read-the-docs">
    Click on the Vite and Svelte logos to learn more
  </p>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style> -->

<script lang="ts">
  import { onMount } from "svelte";

  type Post = {
    title: String;
    content: String;
  };

  let posts: Post[] = [];
  let newPost = {
    title: "",
    content: "",
  };

  onMount(async () => {
    const res = await fetch(`http://localhost:8200/posts`);
    posts = await res.json();
  });
</script>

<main>
  <h1>Welcome to Anon</h1>
  <section class="input-section">
    <input placeholder="Post title" />
    <textarea placeholder="Post content" rows="4" />
    <button>Add</button>
  </section>
  {#each posts as post}
    <ul>
      <li class="card">
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <button id="deleteBtn">delete</button>
      </li>
    </ul>
  {:else}
    <p>Loading...</p>
  {/each}
</main>

<style>
  button {
    width: 100px;
    height: 40px;
    background-color: green;
    color: white;
    margin-top: 12px;
  }
  .card {
    width: 100%;
    height: 200px;
    border: 1px solid lightgrey;
    border-radius: 12px;
    padding: 6px;
  }

  #deleteBtn {
    width: 80px;
    height: 32px;
    background-color: red;
    color: yellow;
    text-align: center;
  }

  input {
    margin-bottom: 10px;
  }

  .input-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  li {
    list-style-type: none;
  }
</style>
