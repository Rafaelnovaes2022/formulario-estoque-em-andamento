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
        <div class="grid p-fluid" />
        <div class="col-12 md:col-12">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-shopping-bag"></i>
            </span>
            <InputText placeholder="Nome do Produto" />
          </div>
        </div>
        <div>
           <div class="col-12 mb-2 lg:col-4 lg:mb-0"/>
          <MultiSelect v-model="selectedCountries" :options="produtos" optionLabel="name" placeholder="Select Countries" :filter="true" class="multiselect-custom">
            <template #value="slotProps">
                <div class="country-item country-item-value" v-for="option of slotProps.value" :key="option.code">
                    <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" class="mr-2" width="18" />
                    <div>{{option.name}}</div>
                </div>
                <template v-if="!slotProps.value || slotProps.value.length === 0">
                    Select Products
                </template>
            </template>
            <template #option="slotProps">
                <div class="country-item">
                    <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" class="mr-2" width="18" />
                    <div>{{slotProps.option.name}}</div>
                </div>
            </template>
        </MultiSelect>
        </div>
        <div>
          <div class="col-12 mb-2 lg:col-11 lg:mt-25" ></div>
          Descrição
          <div class="col-12 mb-2 lg:col-11 lg:mt-25" ></div>
         
          <Textarea v-model="value2" :autoResize="true" rows="5" cols="30" />
        </div>
        <div class="col-12 mb-2 lg:col-11 lg:mt-25" ></div>
          
            <div class="grid p-fluid">
            <div class="field col-12 md:col-11">
                <label for="stacked">Preço</label>
                <InputNumber id="stacked" v-model="value17" showButtons mode="currency" currency="BRL" />
            </div>
            <div>
              <div class="col-12 mb-2 lg:col-11 lg:mt-25" ></div>
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
export default {
    data() {
        return {
          val1: null,
          val2: 3,
            selectedCities1: null,
            selectedCities2: null,
            selectedCountries: null,
            selectedGroupedCities: null,
            selectedItems: null,
            selectAll: false,          
            produtos: [
                {name: 'HUB USB', code: 'RTX 3060 Ti'},
                {name: 'HeadSetGamer', code: 'HyperX'},
                {name: 'Monitor Gamer', code: 'ASUS'},
                
            ],
            
            items: Array.from({ length: 1000 }, (_, i) => ({ label: `Item #${i}`, value: i }))
        }
    },
    methods: {
        onSelectAllChange(event) {
            this.selectedItems = event.checked ? this.items.map((item) => item.value) : [];
            this.selectAll = event.checked;
        },
        onChange(event) {
            this.selectAll = event.value.length === this.items.length
        }
        
    }
}
</script>

<style lang="scss" scoped>
.p-multiselect {
    width: 18rem;
}

::v-deep(.multiselect-custom) {
    .p-multiselect-label:not(.p-placeholder) {
        padding-top: .25rem;
        padding-bottom: .25rem;
    }

    .country-item-value {
        padding: .25rem .5rem;
        border-radius: 3px;
        display: inline-flex;
        margin-right: .5rem;
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