const ModalPlugin = (function () {
  
  class ModalView {

    constructor(container) {
      this.container = container;
      this.btnSave = this.container.querySelector("#modal-save");
    }

    changeModal(data) {
      const modal = this.container.querySelector("#" + data.id);
      const title = modal.querySelector("header > h2");
      title.innerHTML = data.title;
      const content = modal.querySelector(".modal__content");
      content.innerHTML = data.content;
      this.toggleModal(data.id);
    }

    showDefaultModal(data) {
      const div = document.createElement("div");
      div.id = data.id;
      div.classList.add("modal_default");
      this.container.append(div);
      const header = document.createElement("header");
      header.classList.add("modal_default__header");
      header.innerHTML = data.title;
      div.append(header);
      const content = document.createElement("main");
      content.classList.add("modal_default__content");
      content.innerHTML = data.content;
      div.append(content);
      const footer = document.createElement("footer");
      footer.classList.add("modal_default__footer");
      footer.innerHTML =
        '<button class="modal__cancel" title="Отмена">Ok</button>';
      div.append(footer);
    }

    toggleModal(id) {
      this.container.querySelector("#" + id).classList.toggle("modal_hide");
    }

    disableBtnSave(state) {
      this.btnSave.disabled = state;
    }

    resetForm() {
      const inputs = this.container.querySelectorAll(".form-field > input");
      for (let input of inputs) {
        input.value = "";
      }
      this.disableBtnSave(true);
    }
  }

  class ModalModel {

    constructor(view) {
      this.view = view;
    }

    checkData(data) {
      if (data.title && data.content) {
        data.isExisted
          ? this.view.changeModal(data)
          : this.view.showDefaultModal(data);
      } else {
        this.view.toggleModal(data.id);
      }
    }

    toggleModal(id) {
      this.view.toggleModal(id);
    }

    saveData(formData) {
      localStorage.setItem("LogicMinds", JSON.stringify(formData));
      this.view.resetForm();
    }

    checkInput(formData) {
      for (let item in formData) {
        if (!formData[item].trim()) {
          this.view.disableBtnSave(true);
          return;
        } else {
          this.view.disableBtnSave(false);
        }
      }
    }
  }

  class ModalController {
    formData = {};

    constructor(model, container) {
      this.model = model;
      this.container = container;
    }

    init() {
      const allHrefs = document.querySelectorAll("[data-supermodal]");
      for (let a of allHrefs) {
        a.addEventListener("click", (event) => {
          event.preventDefault();
          const el = this.container.querySelector("#" + a.dataset.supermodal);
          this.model.checkData({
            id: a.dataset.supermodal,
            title: a.dataset.supermodalTitle,
            content: a.dataset.supermodalContent,
            isExisted: el != undefined,
          });
        });
      }

      this.container.addEventListener("click", (event) => {
        event.preventDefault();
        if (
          event.target.classList.contains("modal__close") ||
          event.target.classList.contains("modal__cancel")
        ) {
          this.model.toggleModal(event.target.closest("div").id);
        }
      });

      this.container.addEventListener("input", (event) => {
        event.preventDefault();
        const inputs = event.target.closest(".form-field").querySelectorAll("input");
        for (let input of inputs) {
          this.formData[input.id] = input.value;
        }
        this.model.checkInput(this.formData);
      })

      const btnSave = this.container.querySelector("#modal-save");
      btnSave.addEventListener("click", (event) => {
        event.preventDefault();
        this.model.saveData(this.formData);
        this.model.toggleModal(event.target.closest("div").id);
      });
    }
  }

  return {
    init: function (container) {
      const view = new ModalView(container);
      const model = new ModalModel(view);
      const controller = new ModalController(model, container);

      controller.init();
    },
  };
})();
