<template>
  <div class="flex justify-content-center">
    <Card style="width: 60rem">
      <template #header>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiIRQpEDQrbM5MVru8_KJ_XWDfpDbGyCaW2g&usqp=CAU"
          style="width: 21rem"
        />
      </template>
      <template #title> Formulario </template>
      <template #subtitle> Estoque </template>
      <template #content>
        <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
          <!--INICIO LINHA 1-->
          <div class="p-fluid grid">
            <div class="field col-12 md:col-6">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <i class="pi pi-shopping-bag"></i>
                </span>
                <InputText
                  v-model="v$.product.name.$model"
                  :class="{
                    'p-invalid': v$.product.name.$invalid && submitted,
                  }"
                  placeholder="Nome do Produto"
                />
              </div>
              <small
                class="p-error"
                v-if="v$.product.name.$invalid && submitted"
                >Campo obrigatório</small
              >
            </div>
            <div class="field col-12 md:col-3">
              <InputNumber
                id="integeronly"
                v-model="v$.product.code.$model"
                placeholder="Código do Produto"
                :class="{
                  'p-invalid': v$.product.code.$invalid && submitted,
                }"
              />
              <small
                class="p-error"
                v-if="v$.product.code.$invalid && submitted"
                >Campo obrigatório</small
              >
            </div>
            <div class="field col-12 md:col-3">
              <Dropdown
                v-model="product.category"
                :class="{
                  'p-invalid': v$.product.category.$invalid && submitted,
                }"
                :options="produtos"
                optionLabel="name"
                optionValue="code"
                placeholder="Selecione Categoria"
              />
              <small
                class="p-error"
                v-if="v$.product.category.$invalid && submitted"
                >Campo obrigatório</small
              >
            </div>
          </div>
          <!--FIM LINHA 1-->

          <!--INICIO LINHA 2-->
          <div class="p-fluid">
            <label for="">Descrição</label>
            <Textarea
              v-model="v$.product.description.$model"
              :class="{
                'p-invalid': v$.product.description.$invalid && submitted,
              }"
              :autoResize="true"
              rows="5"
              cols="30"
            />
            <small
              class="p-error"
              v-if="v$.product.description.$invalid && submitted"
              >Campo obrigatório</small
            >
          </div>
          <!--FIM LINHA 2-->

          <!--INICIO LINHA 3-->
          <div class="p-fluid m-3">
            <span class="p-fluid-label">
              <label for="quantidade">Quantidade</label>
              <Dropdown
                id="tquantidade"
                v-model="v$.product.quantity.$model"
                :class="{
                  'p-invalid': v$.product.quantity.$invalid && submitted,
                }"
                :options="optionQuantity"
                optionLabel="name"
              />
              <small
                class="p-error"
                v-if="v$.product.quantity.$invalid && submitted"
                >Campo obrigatório</small
              >
            </span>
          </div>
          <!--LINHA LINHA 3-->

          <!--INICIO LINHA 4-->
          <div class="p-fluid">
            <div class="field col-12 md:col-11 m-3">
              <label for="stacked">Preço</label>
              <InputNumber
                id="vpreço"
                v-model="v$.product.price.$model"
                :class="{ 'p-invalid': v$.product.price.$invalid && submitted }"
                showButtons
                mode="currency"
                currency="BRL"
              />
              <small
                class="p-error"
                v-if="v$.product.price.$invalid && submitted"
                >Campo obrigatório</small
              >
            </div>

            <div>
              <div class="col-12 mb-2 lg:col-11 lg:mt-25"></div>
              <Rating
                v-model="v$.product.rating.$model"
                :class="{
                  'p-invalid': v$.product.rating.$invalid && submitted,
                }"
              />
              <small
                class="p-error"
                v-if="v$.product.rating.$invalid && submitted"
                >Campo obrigatório</small
              >
            </div>
          </div>
          <!--FIM LINHA 4-->

          <!--INICIO LINHA 5 (BUTTON)-->
          <div class="p-fluid">
            <div class="field col-12 md:col-3">
              <Button type="submit" icon="pi pi-check" label="Confirm" />
              </div>
              
              <div class="field col-12 md:col-3 ">
                 <Button
              icon="pi pi-times"
              label="Cancel"
              class="p-button-secondary"
              style="margin-left: 0em"
            />
              
           
            </div>
            
          </div>

          <!--FIM LINHA 5 (BUTTON)-->
        </form>
      </template>
    </Card>
  </div>
</template>



<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  setup: () => ({ v$: useVuelidate() }),

  data() {
    return {
      product: {
        id: null,
        code: null,
        name: null,
        price: null,
        rating: null,
        category: null,
        description: null,
        quantity: null,
        inventoryStatus: null,
        image: null,
      },

      submitted: false,
      optionQuantity:[
        { name: "Em estoque" },
        { name:  "Fora de estoque" },
        { name: "Em Alta" },
      ],
      produtos: [
        { name: "Tijolo", code: "TJ" },
        { name: "Cimento", code: "CI" },
        { name: "Lajotas", code: "LA" },
      ],
    };
  },

  validations() {
    return {
      product: {
        code: { required },
        name: { required },
        price: { required },
        rating: { required },
        category: { required },
        description: { required },
        quantity: { required },
        inventoryStatus: { required },
      },
    };
  },

  methods: {
    handleSubmit(isFormValid) {
      this.submitted = true;

      if (!isFormValid) {
        return;
      }

      this.resetForm();
    },

    resetForm() {
      this.name = "";
      this.email = "";
      this.password = "";
      this.date = null;
      this.country = null;
      this.accept = null;
      this.submitted = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>