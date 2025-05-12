<!-- Ini file yang buat data kotaknya (Cards) -->
<script>
  import TodoCard from "./TodoCard.svelte";
  export let cards, listName, addCard, deleteCard, moveCard, onDropCard, removeCard;
  
  // ini fungsi buat nambahin tugas baru di input
  let todo = ""
  function handleAddCard(){
    addCard({ todo, listName });
    todo=""
  }

  // ini fungsi buat drag & drop aplikasi
  function handleDrop(event) {
    const data = event.dataTransfer.getData("text/plain");
    const { todo, fromList } = JSON.parse(data);

    // Hindari duplikat: hanya tambahkan kalau bukan dari list yang sama
    if (fromList !== listName) {
      onDropCard(data, listName);
      removeCard({ todo, listName: fromList }); // hapus dari list asal;
    }
  }

</script>

<div class="column is-4 is-multiline"
  on:dragover|preventDefault
  on:drop={handleDrop}
  role="list">
    <div class="card">
        <div class="card-header pb-0">
          <p class="card-header-title pl-5 pb-2 is-size-5">{listName}</p>
        </div>
        <div class="card-content pt-2 pl-3">

          <!-- Ini buat nampilin data yang udah diinput tadi sesuai kerjaan
           content itu buat nama tugas yang diinput, kalau listName itu buat jenis kerjaannya sesuai judul 
           diatas mau Tasks, In Progres atau Done -->
          {#each cards as card, index }
            <TodoCard
            content={card.todo}
            listName={listName}
            onDelete={() => deleteCard(index, listName)}
            onMoveLeft={() => moveCard(index, listName, 'left')}
            onMoveRight={() => moveCard(index, listName, 'right')}
            />
          {/each}

          <!-- Ini buat input data kerjaan baru -->
          <input type="text" class="input m-1 mt-2" bind:value={todo}>
          <button on:click={handleAddCard} class="button is-primary m-1 mt-2 mb-3">Tambah Kerjaan</button>
        </div>
    </div>
</div>

<style>
    @media screen and (min-width: 1200px) {
    .card-header-title {
      font-size: 25px !important;
    }
  }

  @media screen and (max-width: 600px) {
    .card-header-title {
      font-size: 20px !important;
      padding: 8px;
    }
  }
</style>