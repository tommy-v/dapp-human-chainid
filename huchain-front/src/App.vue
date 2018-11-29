<template>
  <div id="app">
    <h1>HuChain</h1>
    <vue-form :state="formstate" @submit.prevent="onSubmit">
      <validate tag="label">
        <span>First name</span>
        <input v-model="model.form.firstName" required name="firstName" type="text" minlength="2">
      </validate>
      <br>
      <validate tag="label">
        <span>Last name</span>
        <input v-model="model.form.lastName" name="lastName" type="text" required minlength="2">
      </validate>
      <br>
      <validate tag="label">
        <span>Email</span>
        <input v-model="model.form.email" name="email" type="email" required minlength="2">
      </validate>
      <br>
      <validate tag="label">
        <span>Date of birth</span>
        <input v-model="model.form.dateBirth" name="dateBirth" type="date" required>
      </validate>
      <br>
      <validate tag="label">
        <span>Place of birth</span>
        <input v-model="model.form.placeBirth" name="placeBirth" type="text" required minlength="2">
      </validate>
      <br>
      <button v-bind:disabled="this.formstate.$invalid" type="submit">Submit</button>
    </vue-form>
    <p>{{ model.errormsg }}</p>
    <p>{{ model.resultmsg }}</p>
  </div>
</template>

<script>
import Web3 from "web3";
import data from "../../blockchain/build/contracts/HumainChainIdLogic";
import { createHashString } from "./hasher";
//initiate contract
const web3 = new Web3("http://0.0.0.0:8545");
window.ethereum.enable();
web3.eth.defaultAccount = web3.eth.accounts[0];
const huchainContract = new web3.eth.Contract(
  data.abi,
  "0x072e3b8b9682a7215316843818acb834706f0b5a"
);
// start
export default {
  name: "app",
  components: {},
  data: function() {
    return {
      formstate: {},
      model: {
        errormsg: "",
        resultmsg: "",
        form: {
          firstName: "",
          lastName: "",
          email: "",
          dateBirth: null,
          placeBirth: ""
        }
      }
    };
  },
  methods: {
    onSubmit: function() {
      if (this.formstate.$invalid) {
        this.model.errormsg = "Form is invalid";
      } else {
        // create unique string to person
        let formString = `${this.model.form.firstName
          .toLowerCase()
          .replace(/\s/g, "")}${this.model.form.lastName
          .toLowerCase()
          .replace(/\s/g, "")}${String(this.model.form.dateBirth)
          .toLowerCase()
          .replace(
            /\s/g,
            ""
          )}${this.model.form.placeBirth.toLowerCase().replace(/\s/g, "")}`;
        // send string to hasher to register in shmart contwact
        let hash = createHashString(formString);
        huchainContract.methods.register(hash).call((err, result) => {
          if (result) {
            this.model.resultmsg = `Result: ${JSON.stringify(result)}`;
          } else {
            if (err) {
              this.model.errormsg = `Error: ${JSON.stringify(err)}`;
            }
          }
        });
      }
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  text-align: center;
}
h1 {
  text-align: center;
  padding: 50px;
}
input {
  margin: 5px;
}
</style>


