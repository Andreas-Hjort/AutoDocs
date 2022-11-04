<script>
import axios from 'axios';
import { HollowDotsSpinner } from 'epic-spinners'

export default {
  name: 'GetDeals',
  components: {
    HollowDotsSpinner,
  },
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      query: '',
      contactList: [],
      loadingContacts: false,
      dealList: [],
      loadingDeals: false,
      apiError: '',
      testCSV: {
      }
    }
  },
  methods: {
    getContacts() {
      this.loadingContacts = true;
      this.apiError = ''
      this.contactList = []
      const contactUrl = `http://localhost:4000/hubspot/contacts/${this.query}`;
      console.log("Fetching contacts...");
      axios
        .get(contactUrl, {timeout: 50000})
        .then(response => {
          console.log("Fetch complete!");
          this.contactList = response.data;
          console.log(response.data);
          console.log(response.status);
        })
        .catch(error => {
          console.log(error)
          this.apiError = "Coudn't get data :( try again later maybe"
          } 
        )
        .finally(() => this.loadingContacts = false);
    },
    getDeals(contactId) {
      const dealUrl = `http://localhost:4000/hubspot/deals/${contactId}`;
      this.loadingDeals = true;
      this.apiError = ''
      this.dealList = []
      console.log("Fetching deals...");
      axios
        .get(dealUrl, {timeout: 5000})
        .then(response => {
          console.log("Vi har fået nye deals:");
          console.log(response.data);
          
          this.dealList = response.data;
        })
        .catch(error => {
          console.log(error)
          this.apiError = "Coudn't get data :( try again later maybe"
        })
        .finally(() => this.loadingDeals = false);
    }
  },
}

</script>



<template>
  <div class="greetings">
    <h1>SKER DER</h1>
    <h1 class="green">{{ msg }}</h1>
    <form action="submit" class="search-field">
      <label for="contactInput">Søg på contact</label>
      <br>
      <input type="text" v-model="query">
      <br>
      <button @click.prevent="getContacts">Søg i contacts</button>
    </form>
    <h2>Kontakter</h2>
    <div :class="loadingContacts ? 'show' : 'hide'">
      <HollowDotsSpinner/>
    </div>
    <ul>
      <li v-for="contact in this.contactList" v-bind:key="contact" @click="getDeals(contact.id)">{{ contact.name }} - {{ contact.id }} - {{ contact.email }} - {{ contact.tlf }}</li>
    </ul>
    
    
    <h2>Deals</h2>
    <div :class="loadingDeals ? 'show' : 'hide'">
      <HollowDotsSpinner/>
    </div>
    <ul>
      <li v-for="deal in this.dealList" v-bind:key="deal">{{ deal.name }} - {{ deal.amount }} - {{ deal.email }} - {{ deal.tlf }}</li>
    </ul>
    
    <h4>{{ apiError }}</h4>


    
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

.show {
  display: block;
}

.hide {
  display: none;
}

.hollow-dots-spinner, .hollow-dots-spinner * {
  box-sizing: border-box;
}

.hollow-dots-spinner {
  height: 15px;
  width: calc(30px * 3);
}

.hollow-dots-spinner .dot {
  width: 15px;
  height: 15px;
  margin: 0 calc(15px / 2);
  border: calc(15px / 5) solid #ff1d5e;
  border-radius: 50%;
  float: left;
  transform: scale(0);
  animation: hollow-dots-spinner-animation 1000ms ease infinite 0ms;
}

.hollow-dots-spinner .dot:nth-child(1) {
  animation-delay: calc(300ms * 1);
}

.hollow-dots-spinner .dot:nth-child(2) {
  animation-delay: calc(300ms * 2);
}

.hollow-dots-spinner .dot:nth-child(3) {
  animation-delay: calc(300ms * 3);

}

@keyframes hollow-dots-spinner-animation {
  50% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
