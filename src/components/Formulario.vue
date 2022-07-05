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
            <div class="field col-12 md:col-3">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <i class="pi pi-circle-fill"></i>
                </span>
                <InputText
                  type="text"
                  v-model="v$.product.code.$model"
                  placeholder="Código do Produto"
                  :class="{
                    'p-invalid': v$.product.code.$invalid && submitted,
                  }"
                />
              </div>
              <small
                class="p-error"
                v-if="v$.product.code.$invalid && submitted"
                >Campo obrigatório</small
              >
            </div>
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
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <i class="pi pi-chevron-down"></i>
                </span>
                <Dropdown
                  v-model="v$.product.category.$model"
                  :class="{
                    'p-invalid': v$.product.category.$invalid && submitted,
                  }"
                  :options="produtos"
                  optionLabel="name"
                  optionValue="code"
                  placeholder="Selecione Categoria"
                />
              </div>
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
          <div class="p-fluid m-3">
            <span class="p-fluid-label">
              <label for="quantidade">Quantidade</label>
              <InputNumber
                id="tquantidade"
                v-model="v$.product.quantity.$model"
                :class="{
                  'p-invalid': v$.product.quantity.$invalid && submitted,
                }"
              />
              <small
                class="p-error"
                v-if="v$.product.quantity.$invalid && submitted"
                >Campo obrigatório</small
              >
            </span>
          </div>
          <!--INICIO LINHA 3-->
          <div class="p-fluid m-3">
            <span class="p-fluid-label">
              <label for="quantidade">Estoque</label>
              <Dropdown
                id="tquantidade"
                v-model="v$.product.inventoryStatus.$model"
                :class="{
                  'p-invalid': v$.product.inventoryStatus.$invalid && submitted,
                }"
                :options="optionEstoque"
                optionLabel="name"
              />
              <small
                class="p-error"
                v-if="v$.product.inventoryStatus.$invalid && submitted"
                >Campo obrigatório</small
              >
            </span>
          </div>
          <!--LINHA LINHA 3-->

          <!--INICIO LINHA 4-->
          <div class="p-fluid">
            <div class="p-fluid">
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
            <!--UPLOAD DE IMAGEM-->
            <div class="p-fluid">
              <div class="field mt-4">
                <FileUpload
                  name="demo[]"
                  url="./upload.php"
                  @upload="onUpload"
                  :multiple="true"
                  accept="image/*"
                  :maxFileSize="1000000"
                  chooseLabel="Anexar"
                  :showUploadButton="false"
                  cancelLabel= "Cancelar"
                  
                >
                  <template #empty>
                    <p>Arraste os itens para esse campo.</p>
                  </template>
                </FileUpload>
              </div>
            </div>
            <div>
              <div class="p-fluid col-12 md:col-2"></div>
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

            <div class="field col-12 md:col-3">
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
      <Toast />
    </Card>
  </div>
</template>



<script>
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
import ProductService from "../service/ProductService";

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

      listproducts: [],
      itemName: "",

      submitted: false,
      optionEstoque: [
        { name: "Em estoque" },
        { name: "Fora de estoque" },
        { name: "Em Alta" },
      ],
      produtos: [
        { name: "Tijolo", code: "TJ" },
        { name: "Cimento", code: "CI" },
        { name: "Lajotas", code: "LA" },
      ],
    };
  },
  productService: null,

  validations() {
    return {
      product: {
        code: { required, minLength: minLength(5), maxLength: maxLength(10) },
        name: { required, minLength: minLength(3), maxLength: maxLength(255) },
        price: { required },
        rating: { required },
        category: { required },
        description: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(255),
        },
        quantity: { required },
        inventoryStatus: { required },
      },
    };
  },
  created() {
    this.productService = new ProductService();
  },
  methods: {
    handleSubmit(isFormValid) {
      this.submitted = true;
      console.log("teste");
      //console.log(this.productService.getAllProducts());
      if (!isFormValid) {
        //console.log(this.product);
        return this.$toast.add({
          severity: "error",
          summary: "Erro",
          detail: "Campos obrigatórios!",
          life: 3000,
        });
      } else {
        this.productService.create(this.product).then((res) => {
          if (res.status === 201) {
            this.$toast.add({
              severity: "success",
              summary: "Sucesso",
              detail: "Formulário ok!",
              life: 3000,
            });
          }
        });
        this.resetForm();
      }
    },

    upload(element){
      this.product.image = element.files[0].objectURL;
    },
    //on double clicking the item, it will call removeItem(id) method
    /*   removeItem(id) {
      axios.delete(`http://localhost:3000/products/${id}`);
      this.products = this.items.filter((item) => item.id !== id);
    },
    //method for adding items in the list
    async addItem() {
      const res = await axios.post(`http://localhost:3000/products`, {
        name: this.itemName,
      });
      this.items = [...this.items, res.data];
      this.itemName = "";
    }, */
    resetForm() {
      this.product = {
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
      };
      this.submitted = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>