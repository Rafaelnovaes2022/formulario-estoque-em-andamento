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
          <div class="p-fluid grid">
            <div class="field col-12 md:col-6">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <i class="pi pi-shopping-bag"></i>
                </span>
                <InputText
                  v-model="v$.nome.$model"
                  :class="{ 'p-invalid': v$.nome.$invalid && submitted }"
                  placeholder="Nome do Produto"
                />
                
              </div>
              <small class="p-error" v-if="v$.nome.$invalid && submitted">Campo obrigatório</small>
            </div>
            <div class="field col-12 md:col-6">
              <MultiSelect
                v-model="selectedProdutos"
                :options="produtos"
                optionLabel="name"
                placeholder="Selecione Produtos"
                :filter="true"
                class="multiselect-custom"
              >
                <template #value="slotProps">
                  <div
                    class="produto-item produto-item-value"
                    v-for="option of slotProps.value"
                    :key="option.code"
                  >
                    <img
                      src="https://s.tmimgcdn.com/scr/1200x627/126100/modelo-de-logotipo-de-comercio-eletronico_126139-original.png"
                      class="mr-5"
                      width="18"
                    />
                    <div>{{ option.name }}</div>
                  </div>
                  <template
                    v-if="!slotProps.value || slotProps.value.length === 0"
                  >
                    Select Products
                  </template>
                </template>
                <template #option="slotProps">
                  <div class="country-item">
                    <img
                      src="https://s.tmimgcdn.com/scr/1200x627/126100/modelo-de-logotipo-de-comercio-eletronico_126139-original.png"
                      class="mr-2"
                      width="18"
                    />
                    <div>{{ slotProps.option.name }}</div>
                  </div>
                </template>
              </MultiSelect>
            </div>
          </div>

          <div class="p-fluid">
            <label for="">Descrição</label>
            <Textarea
              v-model="descrição"
              :autoResize="true"
              rows="5"
              cols="30"
            />
          </div>

          <!--<div class="field col-12 md:col-4">
          <div class="fluid col-12 mr:col-10">
            <label for="minmax">Quantidade</label>
            <InputNumber
              id="Quantidade"
              v-model="quantidade"
              mode="decimal"
              :min="0"
              :max="100"
            />
          </div>
        </div>-->

          <div class="p-fluid m-3">
            <span class="p-fluid-label">
              <label for="quantidade">Quantidade</label>
              <Dropdown
                id="tquantidade"
                v-model="quantidade"
                :options="produtos1"
                optionLabel="name"
              />
            </span>
          </div>

          <div class="p-fluid">
            <div class="field col-12 md:col-11 m-3">
              <label for="stacked">Preço</label>
              <InputNumber
                id="vpreço"
                v-model="preço"
                showButtons
                mode="currency"
                currency="BRL"
              />
            </div>

            <div>
              <div class="col-12 mb-2 lg:col-11 lg:mt-25"></div>
              <Rating v-model="preço" />
            </div>
          </div>
          <Button type="submit" icon="pi pi-check" label="Confirm" />
          <Button
            icon="pi pi-times"
            label="Cancel"
            class="p-button-secondary"
            style="margin-left: 0.5em"
          />
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
      nome: null,
      preço: null,
      selectedProdutos: null,
      descrição: null,
      produtos1: null,
      quantidade: null,
      submitted: false,
      produtos: [
        { name: "HUB USB", code: "RTX 3060 Ti" },
        { name: "HeadSet", code: "HyperX" },
        { name: "Monitor", code: "ASUS" },
      ],

      items: Array.from({ length: 1000 }, (_, i) => ({
        label: `Item #${i}`,
        value: i,
      })),
    };
  },

  validations() {
    return {
      nome: { required },
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
::v-deep(.multiselect-custom) {
  .p-multiselect-label:not(.p-placeholder) {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
  }

  .country-item-value {
    padding: 0.25rem 0.5rem;
    border-radius: 10px;
    display: inline-flex;
    margin-right: 0.5rem;
    background-color: var(--primary-color);
    color: var(--primary-color-text);

    img.flag {
      width: 17px;
    }
  }
}

@media screen and (max-width: 640px) {
  .p-multiselect {
    width: 100%;
  }
}
</style>