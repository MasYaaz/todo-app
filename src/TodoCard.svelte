<script>
    import { slide } from "svelte/transition";
    export let 
        content, 
        listName, 
        onDelete, 
        onMoveLeft,
        onMoveRight; 
</script>
<div class="card mb-3 is-size-5" 
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
        <div class="columns is-multiline is-mobile">
            <div class="tombol column is-1">
              <span class="icon has-text-danger">
                {#if listName != 'Tasks'}
                    <button  on:click={onMoveLeft}
                    class="icon-button" 
                    aria-label="Pindah ke Samping">
                        <i class="fa-solid fa-chevron-left fa-xs">
                    </button>
                {/if}
              </span>
            </div>
            <div class="text column is-9">
                {content}
            </div>
            <div class="tombol column is-1">
                <span class="icon has-text-danger">
                    <button  on:click={onDelete} 
                    class="icon-button" 
                    aria-label="Hapus">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </span>
            </div>
            <div class="tombol column is-1">
              <span class="icon has-text-danger">
                {#if listName != 'Done'}
                    <button  on:click={onMoveRight}
                    class="icon-button" 
                    aria-label="Pindah ke Samping">
                        <i class="fa-solid fa-chevron-right">
                    </button>
                {/if}
                </span>
            </div>
        </div>
    </div>
</div>

<style>
  .icon-button {
    all: unset; /* Hapus semua default styling */
    cursor: pointer;
    color: #aaa;
    padding: 0.2rem;
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

  .card-content{
    cursor:grab;
  }

   @media screen and (max-width: 600px) {
    .icon i {
      font-size: 15px !important;
    }

    .text{
      font-size:large;
      padding: 1px;
    }

    .tombol{
      padding: 0 !important;
    }

  }

  @media screen and (min-width: 601px) {
    .icon i {
      font-size: 15px !important;
    }
  }

    @media screen and (min-width: 1200px) {
    .icon i {
      font-size: 20px !important;
    }
  }
</style>
