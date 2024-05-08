import "../css/style.css";
import "./plugins";
import locations from "./store/locations";
import formUI from "./views/form";
import ticketsUI from "./views/tickets";
import ticketsFavUI from "./views/favorite";
import currencyUI from "./views/currency";

document.addEventListener("DOMContentLoaded", (e) => {
  initApp();
  const form = formUI.form;
  const cartBtn = document.querySelector("#favorites");

  // Events
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    onFormSubmit();
  });

  // add to favorite
  document.querySelector(".tickets-sections").addEventListener("click", (e) => {
    const ticketFromLS = JSON.parse(localStorage.getItem("ticketsLS" || []));
    if (e.target.classList.contains("add-favorite")) {
      if (e.target.classList.contains("delete")) {
        e.target.classList.remove("delete", "blue-grey", "darken-3");
        e.target.classList.add("green", "darken-1");
        e.target.textContent = "В избранное";
        const id = e.target.getAttribute("data-id");
        const ticketFromLS = JSON.parse(localStorage.getItem("ticketsLS"));
        delete ticketFromLS[id];
        localStorage.setItem("ticketsLS", JSON.stringify(ticketFromLS));
      } else {
        e.target.classList.remove("green", "darken-1");
        e.target.classList.add("delete", "blue-grey", "darken-3");
        e.target.textContent = "Удалить из избранного";
        const id = e.target.getAttribute("data-id");
        const favoriteTicket = locations.lastSearch.filter(
          (ticket) => ticket.idSym === id
        );
        if (ticketFromLS) {
          ticketFromLS[id] = favoriteTicket[0];
        }
        const objOfTicket = favoriteTicket.reduce((acc, ticket) => {
          acc[ticket.idSym] = ticket;
          return acc;
        }, {});
        localStorage.setItem(
          "ticketsLS",
          JSON.stringify(ticketFromLS || objOfTicket)
        );
      }
    }
  });

  // del ticket from favorite tickets
  document.querySelector(".cart-modal__body").addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-favorite")) {
      const id = e.target.getAttribute("data-id").slice(0, -4);
      const ticketFromLS = JSON.parse(localStorage.getItem("ticketsLS"));
      delete ticketFromLS[id];
      localStorage.setItem("ticketsLS", JSON.stringify(ticketFromLS));
      ticketsFavUI.renderFavoriteTickets(ticketFromLS);
      if (document.querySelector(".delete")) {
        const returnBtn = document.querySelector(".delete");
        returnBtn.classList.remove("delete", "blue-grey", "darken-3");
        returnBtn.classList.add("green", "darken-1");
        returnBtn.textContent = "В избранное";
      }
    }
  });

  //clear favorite tickets
  document.querySelector(".btn-clear").addEventListener("click", () => {
    localStorage.removeItem("ticketsLS");
    const dataLS = localStorage.getItem("ticketsLS");
    ticketsFavUI.renderFavoriteTickets(JSON.parse(dataLS));
    ticketsUI.renderTickets(locations.lastSearch);
  });

  // show favorite tickets
  cartBtn.addEventListener("click", (e) => {
    const dataLS = localStorage.getItem("ticketsLS");
    ticketsFavUI.renderFavoriteTickets(JSON.parse(dataLS));
  });

  // change currency
  document.querySelector(".currency-select").addEventListener("change", (e) => {
    onFormSubmit();
  });

  // Modal window with favorite tickets
  const modalFunc = () => {
    const modal = document.querySelector(".cart-modal__overlay");

    const openModal = () => {
      modal.classList.add("open");
      document.querySelector(".currency-select").classList.add("hidden");
    };

    const closeModal = () => {
      modal.classList.remove("open");
      document.querySelector(".currency-select").classList.remove("hidden");
    };

    cartBtn.addEventListener("click", openModal);
    modal.addEventListener("click", (event) => {
      if (
        event.target.classList.contains("cart-modal__overlay") ||
        event.target.closest(".cart-modal__header--close")
      ) {
        closeModal();
      }
    });
  };

  //Handlers
  async function initApp() {
    await locations.init();
    formUI.setAutocompleteData(locations.shortCities);
  }

  async function onFormSubmit() {
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currencyValue;
    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });
    ticketsUI.renderTickets(locations.lastSearch);
    console.log("locations.lastSearch:", locations.lastSearch.currency);
  }

  modalFunc();
});

// scroll up
const btnUp = {
  el: document.querySelector(".btn-up"),
  show() {
    this.el.classList.remove("btn-up_hide");
  },
  hide() {
    this.el.classList.add("btn-up_hide");
  },
  addEventListener() {
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      scrollY > 400 ? this.show() : this.hide();
    });
    document.querySelector(".btn-up").onclick = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    };
  },
};

btnUp.addEventListener();
