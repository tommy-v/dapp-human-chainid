<template>
  <div id="app">
    <h1>HuChain</h1>
    <vue-form :state="formstate" @submit.prevent="onSubmit">
    <validate tag="label">
      <span>First name</span>
      <input v-model="model.form.firstName" required name="firstName" type="text" minlength="2"/>
    </validate>
    <br>
    <validate tag="label">
      <span>Last name</span>
      <input v-model="model.form.lastName" name="lastName" type="text" required minlength="2"/>
    </validate>
    <br>
    <validate tag="label">
      <span>Email</span>
      <input v-model="model.form.email" name="email" type="email" required minlength="2"/>
    </validate>
    <br>
    <validate tag="label">
      <span>Date of birth</span>
      <input v-model="model.form.dateBirth" name="dateBirth" type="date" required/>
    </validate>
    <br>
    <validate tag="label">
      <span>Place of birth</span>
      <input v-model="model.form.placeBirth" name="placeBirth" type="text" required minlength="2"/>
    </validate>
    <br>
    <button v-bind:disabled="this.formstate.$invalid" type="submit">Submit</button>
  </vue-form>
 </div>
</template>

<script>
// import hasher
import { hashString } from "./hasher";
import { web3 } from "./web3";
import data from "../../blockchain/build/contracts/HumainChainIdLogic";

alert(
    new web3.eth.Contract(
        data.abi,
        "0x1eb7d503d5193cbbc1e8280feac65f417765a0cb"
    )
);
// start
export default {
    name: "app",
    components: {},
    data: function() {
        return {
            formstate: {},
            model: {
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
                return;
            } else {
                alert(hashString(JSON.stringify(this.model.form)));
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
}
h1 {
    text-align: center;
    padding: 50px;
}
</style>


