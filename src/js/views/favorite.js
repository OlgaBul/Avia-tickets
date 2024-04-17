import currencyUI from "./currency";

class TicketFavUI {
  constructor(currency) {
    this.container = document.querySelector('.cart-modal__body');
    this.getCurrencySymbol = currency.getCurrencySymbol.bind(currency);
  }

  renderFavoriteTickets(tickets) {
    this.clearContainer();
    if (!tickets || Object.keys(tickets).length == 0) {
        this.showEmptyFavMsg();
        document.querySelector('.btn-clear').classList.add('hidden')
        return;
    } 
    if (Object.keys(tickets).length >= 2) {
      document.querySelector('.btn-clear').classList.remove('hidden')
    } else if (Object.keys(tickets).length < 2) document.querySelector('.btn-clear').classList.add('hidden')

    let fragment = '';
    const currency = this.getCurrencySymbol();

    console.log('tickets', tickets);
   
    Array.from(Object.values(tickets)).forEach(ticket => {
        const template = TicketFavUI.ticketFavTemplate(ticket, currency);
        fragment += template;
      });

    this.container.insertAdjacentHTML('afterbegin', fragment);
  }
    

  clearContainer() {
    this.container.innerHTML = '';
  }

  showEmptyFavMsg(){ 
    const template = TicketFavUI.emptyFavMsgTemplate();
    this.container.insertAdjacentHTML('beforeend', template);
  }

  static emptyFavMsgTemplate() {
    return `<div class="tickets-empty-res-fav">
    Нет избранных билетов.</div>`;
  }

  static ticketFavTemplate(ticket, currency) {
    return `
    <div class="cart-item">
      <div class="d-flex align-items-center-fav">
        <div class="ticket-airline d-flex align-items-center-fav">
          <img src="${ticket.airline_logo}" class="ticket-airline-img"/>
        </div>
        <div class="d-flex align-items-center-fav">
          <span class="ticket-airline-name-fav">${ticket.airline_name}</span>
        </div> 
        <div class="d-flex align-items-center-fav ml-auto right">
          <span class="ticket-price-fav">${ticket.price} ${currency}</span>
        </div>
      </div>
      <div class="ticket-destination d-flex align-items-center-fav top">
        <div class="d-flex align-items-center-fav mr-auto">
          <span class="ticket-city">${ticket.origin_name}</span>
          <i class="medium material-icons">flight_takeoff</i>
        </div>
        <div class="d-flex align-items-center-fav right">
          <i class="medium material-icons">flight_land</i>
          <span class="ticket-city">${ticket.destination_name}</span>
        </div>
      </div>
      <div class="ticket-time-price d-flex align-items-center-fav top">
        <span class="ticket-time-departure">${ticket.departure_at}</span>
      </div>
      <div class="d-flex align-items-center-fav justify-items-between ">
        <div class="ticket-additional-info d-flex align-items-center-fav">
          <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
        </div> 
        <div class="ticket-additional-info d-flex align-items-center-fav">
          <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
        </div>
        <div class="d-flex align-items-center-fav">
          <a class="btn-small red darken-3 delete-favorite ml-auto" data-id="${ticket.idSym} id="delete-favorite">Удалить</a>
        </div>
      </div>
    </div>`;
  }

}

const ticketsFavUI = new TicketFavUI(currencyUI);

export default ticketsFavUI;