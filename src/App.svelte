<script>
  import CardList from "./CardList.svelte";
  
  let taskCardsLocalStorage = JSON.parse(localStorage.getItem('Taskcards'))
  let inProgresCardLocalStorage = JSON.parse(localStorage.getItem('inProgresCard'))
  let doneCardsLocalStorage = JSON.parse(localStorage.getItem('doneCards'))

  let Taskcards = taskCardsLocalStorage ? taskCardsLocalStorage : []
  let inProgresCard = inProgresCardLocalStorage ? inProgresCardLocalStorage : []
  let doneCards = doneCardsLocalStorage ? doneCardsLocalStorage : []

  function handleAddCard({ todo, listName}){
    if (listName === 'Tasks'){
      Taskcards = [...Taskcards, {todo}];
      localStorage.setItem('Taskcards', JSON.stringify(Taskcards))
    } else if (listName === 'In Progress') {
      inProgresCard = [...inProgresCard, {todo}];
      localStorage.setItem('inProgresCard', JSON.stringify(inProgresCard))
    } else if (listName === 'Done') {
      doneCards = [...doneCards, { todo }];
      localStorage.setItem('doneCards', JSON.stringify(doneCards))
    }
  }

  function handleDeleteCard(index, listName) {
    if (listName === "Tasks") {
      Taskcards = Taskcards.filter((_, i) => i !== index);
      localStorage.setItem('Taskcards', JSON.stringify(Taskcards))
    } else if (listName === "In Progress") {
      inProgresCard = inProgresCard.filter((_, i) => i !== index);
      localStorage.setItem('inProgresCard', JSON.stringify(inProgresCard))
    } else if (listName === "Done") {
      doneCards = doneCards.filter((_, i) => i !== index);
      localStorage.setItem('doneCards', JSON.stringify(doneCards))
    }
  }

  // ini buat mindahin data listName dari kiri kekanan / sebaliknya
  function handleMoveCard(index, fromList, direction) {
  let item;
  
  if (fromList === 'Tasks') {
    item = Taskcards[index];
    Taskcards = Taskcards.filter((_, i) => i !== index);

    if (direction === 'right') {
      inProgresCard = [...inProgresCard, item];
      localStorage.setItem('Taskcards', JSON.stringify(Taskcards))
      localStorage.setItem('inProgresCard', JSON.stringify(inProgresCard))
    }
  }

  else if (fromList === 'In Progress') {
    item = inProgresCard[index];
    inProgresCard = inProgresCard.filter((_, i) => i !== index);

    if (direction === 'right') {
      doneCards = [...doneCards, item];
      localStorage.setItem('inProgresCard', JSON.stringify(inProgresCard))
      localStorage.setItem('doneCards', JSON.stringify(doneCards))
    } else if (direction === 'left') {
      Taskcards = [...Taskcards, item];
      localStorage.setItem('inProgresCard', JSON.stringify(inProgresCard))
      localStorage.setItem('Taskcards', JSON.stringify(Taskcards))
    }
  }

  else if (fromList === 'Done') {
    item = doneCards[index];
    doneCards = doneCards.filter((_, i) => i !== index);

    if (direction === 'left') {
      inProgresCard = [...inProgresCard, item];
      localStorage.setItem('doneCards', JSON.stringify(doneCards))
      localStorage.setItem('inProgresCard', JSON.stringify(inProgresCard))
    }
  }
}

function handleDropCard(data, targetList) {
    const item = JSON.parse(data);
    const { todo, fromList } = item;

    if (fromList === targetList) return;

    // Hapus dari list lama
    if (fromList === 'Tasks') {Taskcards = Taskcards.filter(t => t.todo !== todo);
      localStorage.setItem('Taskcards', JSON.stringify(Taskcards));
      } else if (fromList === 'In Progress') {inProgresCard = inProgresCard.filter(t => t.todo !== todo);
        localStorage.setItem('inProgresCard', JSON.stringify(inProgresCard));
        } else if (fromList === 'Done') {doneCards = doneCards.filter(t => t.todo !== todo);
          localStorage.setItem('doneCards', JSON.stringify(doneCards));
        }

    // Tambah ke list baru
    if (targetList === 'Tasks') {Taskcards = [...Taskcards, { todo }];
      localStorage.setItem('Taskcards', JSON.stringify(Taskcards));
      } else if (targetList === 'In Progress') {inProgresCard = [...inProgresCard, { todo }];
        localStorage.setItem('inProgresCard', JSON.stringify(inProgresCard));
        } else if (targetList === 'Done') {doneCards = [...doneCards, { todo }];
          localStorage.setItem('doneCards', JSON.stringify(doneCards));
      }
  }

function handleRemoveCard({ todo, listName }) {
    if (listName === "Tasks") {
      Taskcards = Taskcards.filter((item) => item.todo !== todo);
    } else if (listName === "In Progress") {
      inProgresCard = inProgresCard.filter((item) => item.todo !== todo);
    } else if (listName === "Done") {
      doneCards = doneCards.filter((item) => item.todo !== todo);
    }
  }
  
</script>

<div class="container is-fluid">
  <h1 class="is-size-1">Todo - App</h1>
  <div class="columns">
    <!-- Ini buat nampilin data yang udah diinput di CardList -->
    <CardList 
      cards={Taskcards} 
      listName="Tasks" 
      addCard={handleAddCard} 
      deleteCard={handleDeleteCard}
      moveCard={handleMoveCard}
      onDropCard={handleDropCard}
      removeCard={handleRemoveCard}/>
    <CardList 
      cards={inProgresCard} 
      listName="In Progress" 
      addCard={handleAddCard} 
      deleteCard={handleDeleteCard}
      moveCard={handleMoveCard}
      onDropCard={handleDropCard}
      removeCard={handleRemoveCard}/>
    <CardList 
      cards={doneCards} 
      listName="Done" 
      addCard={handleAddCard} 
      deleteCard={handleDeleteCard}
      moveCard={handleMoveCard}
      onDropCard={handleDropCard}
      removeCard={handleRemoveCard}/>
  </div>
</div>

<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css">
</svelte:head>
