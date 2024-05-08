import currencyUI from "./currency";

class TicketUI {
  constructor(currency, id) {
    this.container = document.querySelector('.tickets-sections .row');
    this.getCurrencySymbol = currency.getCurrencySymbol.bind(currency);
  }

  renderTickets(tickets) {
    this.clearContainer();
    if (!tickets.length) {
        this.showEmptyMsg();
        return;
    }

    let fragment = '';
    const currency = this.getCurrencySymbol();


    Array.from(tickets).forEach(ticket => {
        const template = TicketUI.ticketTemplate(ticket, currency);
        // const template = TicketUI.ticketTemplate(ticket, this.getCurrencySymbol);
        fragment += template;
      });

    this.container.insertAdjacentHTML('afterbegin', fragment);
  }


  clearContainer() {
    this.container.innerHTML = '';
  }

  showEmptyMsg(){
    const template = TicketUI.emptyMsgTemplate();
    this.container.insertAdjacentHTML('afterbegin', template);
  }

  static emptyMsgTemplate() {
    return `<div class="tickets-empty-res-msg">
    По вашему запросу билетов не найдено.
  </div>`;
  }

  static ticketTemplate(ticket, currency) {
    return `
    <div class="col s12 m6">
    <div class="card ticket-card">
      <div class="d-flex align-items-center">
        <div class="ticket-airline d-flex align-items-center">
          <img src="${ticket.airline_logo}" class="ticket-airline-img"/>
        </div>
        <div class="d-flex align-items-center">
          <span class="ticket-airline-name">${ticket.airline_name}</span>
        </div>
        <div class="d-flex align-items-center ml-auto">
          <span class="ticket-price ">${ticket.price} ${currency}</span>
        </div>
      </div>
      <div class="ticket-destination d-flex align-items-center">
        <div class="d-flex align-items-center mr-auto">
          <span class="ticket-city">${ticket.origin_name}</span>
          <i class="medium material-icons">flight_takeoff</i>
        </div>
        <div class="d-flex align-items-center">
          <i class="medium material-icons">flight_land</i>
          <span class="ticket-city">${ticket.destination_name}</span>
        </div>
      </div>
      <div class="ticket-time-price d-flex align-items-center tops">
        <span class="ticket-time-departure">${ticket.departure_at}</span>
      </div>
      <div class="ticket-destination d-flex align-items-center">
        <div class="d-flex align-items-center mr-auto">
          <span class="ticket-city">${ticket.destination_name}</span>
          <i class="medium material-icons">flight_takeoff</i>
        </div>
        <div class="d-flex align-items-center">
          <i class="medium material-icons">flight_land</i>
          <span class="ticket-city">${ticket.origin_name}</span>
        </div>
      </div>
      <div class="ticket-time-price d-flex align-items-center tops">
        <span class="ticket-time-departure">${ticket.return_at}</span>
      </div>
      <div class="d-flex align-items-center justify-items-between">
        <div class="ticket-additional-info d-flex align-items-center">
          <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
        </div>
        <div class="ticket-additional-info d-flex align-items-center">
          <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
        </div>
        <div class="d-flex align-items-center">
          <a class="btn-small green darken-1 add-favorite mx-auto" data-id="${ticket.idSym}" id="add-favorite">В избранное</a>
        </div>
      </div>
    </div>
  </div>`;
  }

}

const ticketsUI = new TicketUI(currencyUI);

export default ticketsUI;