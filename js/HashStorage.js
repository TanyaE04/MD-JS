class HashStorage {
    storage = {};
    addValue(key, value) {
      return (this.storage[key] = value); //added or undefined
    }
    getValue(key) {
      return this.storage[key]; //obj or undefined
    }
    deleteValue(key) {
      return this.storage[key]; //deleted or undefined
    }
    getKeys() {
      return Object.keys(this.storage); //obj or undefined
    }
  }

  function Cocktail(isAlc, ingredients, recipe) {
    this.isAlc = isAlc;
    this.ingredients = ingredients;
    this.recipe = recipe;
  }

  //создание объекта и наполнение
  let coctailsStorage = new HashStorage();

  coctailsStorage.addValue(
    "Маргарита",
    new Cocktail(
      true,
      [
        "Водка Finlandia 50мл",
        "Кофейный ликер 25мл",
        "Лед в кубиках 120 г",
      ],
      "Наполни стакан кубиками льда доверху, затем налей кофейный ликер 25 мл, водку 50 мл и размешай коктейльной ложкой."
    )
  );

  coctailsStorage.addValue(
    "Голубая лагуна",
    new Cocktail(
      true,
      [
        "Водка 50мл",
        "Ликер блю кюрасао Fruko Schulz 20мл",
        "Спрайт 150мл",
        "Ананас 30г",
        "Лед в кубиках 200г",
      ],
      `Наполни стакан кубиками льда доверху. Налей ликер блю кюрасао 20 мл и водку 50 мл. 
        Долей спрайт доверху и аккуратно размешай коктейльной ложкой. Укрась долькой ананаса.`
    )
  );

  coctailsStorage.addValue(
    "Пеликан",
    new Cocktail(
      false,
      [
        "Гренадин Monin 10мл",
        "Клубничный сироп Monin 10мл",
        "Персиковый сок 150мл",
        "Лимонный сок 15мл",
        "Банан 110г",
        "Клубника 50г",
        "Дробленый лед 60г",
      ],
      `Положи в блендер очищенную и нарезанную половинку банана и клубнику 2 ягоды. 
          Налей лимонный сок 15 мл, гренадин 10 мл, клубничный сироп 10 мл и персиковый сок 150 мл. 
          Добавь в блендер совок дробленого льда и взбей. Перелей в хайбол. Укрась кружком банана и половинкой клубники на коктейльной шпажке.`
    )
  );

  coctailsStorage.addValue(
    "Шмель",
    new Cocktail(
      false,
      [
        "Карамельный сироп 15мл",
        "Апельсиновый сок 100мл",
        "Кофе эспрессо 50мл",
        "Апельсин 40г",
        "Лед в кубиках 180г",
      ],
      `Наполни стакан кубиками льда доверху. Налей апельсиновый сок 100 мл и карамельный сироп 15 мл. 
        Добавь эспрессо 50 мл и аккуратно размешай коктейльной ложкой. Укрась долькой апельсина.`
    )
  );