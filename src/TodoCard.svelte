<script>
    import { slide } from "svelte/transition";
    export let 
        content, 
        listName, 
        onDelete, 
        onMoveLeft,
        onMoveRight; 
</script>
<div class="card mb-3" 
    transition:slide
    draggable="true"
    role="listitem"
    aria-label="Drag todo"
    on:dragstart={(e) =>
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ todo: content, fromList: listName })
    )
  }
>
    <div class="card-content">
        <div class="columns">
            <div class="column is-1">
                {#if listName != 'Tasks'}
                    <button  on:click={onMoveLeft}
                    class="icon-button" 
                    aria-label="Pindah ke Samping">
                        <i class="fa-solid fa-chevron-left">
                    </button>
                {/if}
            </div>
            <div class="column is-9">
                {content}
            </div>
            <div class="column is-1">
                <span class="icon has-text-danger">
                    <button  on:click={onDelete} 
                    class="icon-button" 
                    aria-label="Hapus">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </span>
            </div>
            <div class="column is-1">
                {#if listName != 'Done'}
                    <button  on:click={onMoveRight}
                    class="icon-button" 
                    aria-label="Pindah ke Samping">
                        <i class="fa-solid fa-chevron-right">
                    </button>
                {/if}
            </div>
        </div>
    </div>
</div>

<style>
  .icon-button {
    all: unset; /* Hapus semua default styling */
    cursor: pointer;
    color: #aaa;
    padding: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s ease;
  }

  .icon-button:hover {
    color: #f14668; /* Bulma danger */
  }

  .icon-button:focus {
    outline: 0px solid #f14668;
    outline-offset: 2px;
  }

  i.fa-trash {
    font-size: 0.9rem;
  }

  .card-content{
    cursor:grab;
  }
</style>
