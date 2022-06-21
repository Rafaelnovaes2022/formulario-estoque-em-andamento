<template>
  <div>
    <Card style="width: 25rem">
      <template #header>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiIRQpEDQrbM5MVru8_KJ_XWDfpDbGyCaW2g&usqp=CAU"
          style="height: 15rem"
        />
      </template>
      <template #title> Formulario </template>
      <template #subtitle> Estoque </template>
      <template #content>
        <div>
          <div class="p-field">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-shopping-bag"></i>
              </span>
              <InputText placeholder="Nome do Produto" />
            </div>
          </div>
          <br />
          <div class="p-field">
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
                  class="country-item country-item-value"
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
            <div class="p-fiuid">
              <br />

              <div class="fluid col-12 mr:col-10">
                <label for="minmax">Quantidade</label><br />

                <InputNumber
                  id="Quantidade"
                  v-model="value4"
                  mode="decimal"
                  :min="0"
                  :max="100"
                />
              </div>
            </div>
          </div>

          <br />
          <div class="p-field">
            <label for="">Descrição</label><br />
            <Textarea v-model="value2" :autoResize="true" rows="5" cols="30" />
          </div>
        </div>

        <div class="p-fluid">
          <div class="field col-12 md:col-11">
            <label for="stacked">Preço</label>
            <InputNumber
              id="stacked"
              v-model="valor"
              showButtons
              mode="currency"
              currency="BRL"
            />
          </div>
          <div>
            <div class="col-12 mb-2 lg:col-11 lg:mt-25"></div>
            <Rating v-model="val1" />
          </div>
        </div>
      </template>
      <template #footer>
        <Button icon="pi pi-check" label="Confirm" />
        <Button
          icon="pi pi-times"
          label="Cancel"
          class="p-button-secondary"
          style="margin-left: 0.5em"
        />
      </template>
    </Card>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      Quantidade: null,
      selectedProdutos: null,
      val1: null,
      val2: 3,
      value2: null,
      value4: true,
      valor: null,
      produtos: [
        { name: "HUB USB", code: "RTX 3060 Ti" },
        { name: "HeadSetGamer", code: "HyperX" },
        { name: "Monitor Gamer", code: "ASUS" },
      ],

      items: Array.from({ length: 1000 }, (_, i) => ({
        label: `Item #${i}`,
        value: i,
      })),
      validations() {
        return {
          produtos: { required },
          valor: { required },
        }; // Matches this.firstName
      },
    };
  },
  methods: {
    confirm: null,
    onSelectAllChange(event) {
      this.selectedItems = event.checked
        ? this.items.map((item) => item.value)
        : [];
      this.selectAll = event.checked;
    },
    onChange(event) {
      this.selectAll = event.value.length === this.items.length;
    },
  },
};
</script>

<style lang="scss" scoped>
.p-multiselect {
  width: 20rem;
}

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