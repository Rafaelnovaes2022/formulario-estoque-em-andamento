<template>
  <div>
    <toolbar class="mb-3">
      <template #start>
        <Button
          label="Cadastrar"
          icon="pi pi-plus"
          class="mr-2"
          @click="openConfirmation"
        />
      </template>
    </toolbar>
  </div>
  <div>
    <DataTable
      :value="products"
      v-model:selection="selectedProducts"
      :paginator="true"
      :rows="10"
      responsiveLayout="scroll"
    >
      <Column field="code" header="Code"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="category" header="Category"></Column>
      <Column field="quantity" header="Quantity"></Column>

      <!--Inicio Coluna Editar e deletar-->
      <Column :exportable="false" style="min-width: 8rem">
        <template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            class="p-button-rounded p-button-success mr-2"
            @click="openDialogAlterar(slotProps.data)"
          />
          <Button
            icon="pi pi-trash"
            class="p-button-rounded p-button-warning"
            @click="openDialogDelete(slotProps.data)"
          />
        </template>
      </Column>
      <!--Fim Coluna Editar e deletar-->
    </DataTable>
  </div>
  <!--Inicio dialog formulario-->
  <div>
    <Dialog
      header=""
      v-model:visible="displayConfirmation"
      :style="{ width: '50%' }"
      @hide="resetForm()"
      :modal="true"
    >
      <div class="flex">
        <Card style="width: 60rem">
          <template #header> </template>
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

              <!--FIM LINHA 2-->
              <div class="p-fluid grid">
                <div class="field col-12 md:col-3 mt-3">
                  <span class="p-fluid-label">
                    <InputNumber
                      placeholder="Quantidade"
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
                <div class="field col-12 md:col-6 mt-3">
                  <span class="p-fluid-label">
                    <Dropdown
                      placeholder="Quantidade"
                      id="tquantidade"
                      v-model="v$.product.inventoryStatus.$model"
                      :class="{
                        'p-invalid':
                          v$.product.inventoryStatus.$invalid && submitted,
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
                <div class="field col-12 md:col-3 mt-3">
                  <div class="p-fluid">
                    <InputNumber
                      placeholder="Preço"
                      id="vpreço"
                      v-model="v$.product.price.$model"
                      :class="{
                        'p-invalid': v$.product.price.$invalid && submitted,
                      }"
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
                </div>
              </div>

              <!--INICIO LINHA 2-->
              <div class="p-fluid grid">
                <div class="field col-12">
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
              </div>

              <!--UPLOAD DE IMAGEM-->
              <div class="p-fluid grid">
                <div class="field col-12">
                  <FileUpload
                    name="demo[]"
                    url="./upload.php"
                    :multiple="true"
                    accept="image/*"
                    :maxFileSize="1000000"
                    :customUpload="true"
                    :auto="true"
                    @uploader="upload"
                    chooseLabel="Anexar"
                    :showUploadButton="false"
                    cancelLabel="Cancelar"
                  >
                    <template #empty>
                      <p>Arraste os itens para esse campo.</p>
                    </template>
                  </FileUpload>
                </div>
              </div>

              <div class="p-fluid grid text-center">
                <div class="field col-12">
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
              <div class="p-fluid flex justify-content-end flex-wrap mt-6">
                <div class="field col-12 md:col-3">
                  <Button type="submit" icon="pi pi-check" label="Confirm" />
                </div>

                <div class="field col-12 md:col-3">
                  <Button
                    @click="closeConfirmation"
                    icon="pi pi-times"
                    label="Cancel "
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
    </Dialog>
  </div>
  <!--Final dialog formulario-->

  <!--Inicio dialog alterar-->
   <Dialog
      header=""
      v-model:visible="displayAlterar"
      :style="{ width: '50%' }"
      @hide="resetForm()"
      :modal="true"
    >
      <div class="flex">
        <Card style="width: 60rem">
          <template #header> </template>
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

              <!--FIM LINHA 2-->
              <div class="p-fluid grid">
                <div class="field col-12 md:col-3 mt-3">
                  <span class="p-fluid-label">
                    <InputNumber
                      placeholder="Quantidade"
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
                <div class="field col-12 md:col-6 mt-3">
                  <span class="p-fluid-label">
                    <Dropdown
                      placeholder="Quantidade"
                      id="tquantidade"
                      v-model="v$.product.inventoryStatus.$model"
                      :class="{
                        'p-invalid':
                          v$.product.inventoryStatus.$invalid && submitted,
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
                <div class="field col-12 md:col-3 mt-3">
                  <div class="p-fluid">
                    <InputNumber
                      placeholder="Preço"
                      id="vpreço"
                      v-model="v$.product.price.$model"
                      :class="{
                        'p-invalid': v$.product.price.$invalid && submitted,
                      }"
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
                </div>
              </div>

              <!--INICIO LINHA 2-->
              <div class="p-fluid grid">
                <div class="field col-12">
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
              </div>

              <!--UPLOAD DE IMAGEM-->
              <div class="p-fluid grid">
                <div class="field col-12">
                  <FileUpload
                    name="demo[]"
                    url="./upload.php"
                    :multiple="true"
                    accept="image/*"
                    :maxFileSize="1000000"
                    :customUpload="true"
                    :auto="true"
                    @uploader="upload"
                    chooseLabel="Anexar"
                    :showUploadButton="false"
                    cancelLabel="Cancelar"
                  >
                    <template #empty>
                      <p>Arraste os itens para esse campo.</p>
                    </template>
                  </FileUpload>
                </div>
              </div>

              <div class="p-fluid grid text-center">
                <div class="field col-12">
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
              

              <!--FIM LINHA 5 (BUTTON)-->
            </form>
          </template>
          <Toast />
        </Card>
      </div>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="closeDialogAlterar"/>
                <Button label="Save" icon="pi pi-check" class="p-button-text" @click="alterarProdutos" />

      </template>

    </Dialog>

  <!--Inicio dialogDelete-->
  <Dialog
    header="Mensagem de Confirmação!"
    v-model:visible="deleteDialogProduct"
    :style="{ width: '50%' }"

    @hide="resetForm()"
    :modal="true"
  >
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <span v-if="product"
        >você tem certeza que deseja deletar o produto?</span
      >
    </div>
    <template #footer>
      <Button
        label="No"
        icon="pi pi-times"
        class="p-button-text"
        @click="closeDialogDelete"
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        class="p-button-text"
        @click="removerItem()"
      />
    </template>
  </Dialog>
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
      products: [],
      dados: [],

      displayAlterar: false,
      selectedProducts: null,
      displayConfirmation: false,
      deleteDialogProduct: false,
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

  mounted() {
    this.listarProdutos();
  },
  methods: {
    removerItem() {
      this.productService.remover(this.product.id).then((res) => {
        if (res.status === 200) {
          this.closeDialogDelete();
          this.listarProdutos();
          this.$toast.add({
            severity: "success",
            summary: "alerta",
            detail: "Produto excluido com Sucesso",
            life: 2000,
          });
        }
      });
    },
    alterarProdutos() {
      this.submitted = true;
      this.dados = {
        id: this.product.id,
        code: this.product.code,
        name: this.product.name,
        price: this.product.price,
        rating: this.product.rating,
        category: this.product.category,
        description: this.product.description,
        quantity: this.product.quantity,
        inventoryStatus: this.product.inventoryStatus,
        image: this.product.image,
      }
      this.productService.alterar(this.product.id, this.dados).then((res) => {
        if (res.status === 200) {
          this.displayAlterar = false;
          this.$toast.add({
            severity: "info",
            detail: "Produto alterado com Sucesso",
            life: 2000,
          });
          this.listarProdutos();          
          this.resetForm();
          
        }
      }) ;
    },

    listarProdutos() {
      this.productService.getAllProducts().then((res) => {
        this.products = res;
      });
    },

    openConfirmation() {
      this.displayConfirmation = true;
    },

    closeConfirmation() {
      this.displayConfirmation = false;
    },

    openDialogDelete(product) {
      this.product = product;
      this.deleteDialogProduct = true;
    },

    closeDialogDelete() {
      this.deleteDialogProduct = false;
      return;
    },

    closeDialogAlterar(){
      this.displayAlterar = false;
      return;
    },

    openDialogAlterar(product){
      this.product = product;
      this.displayAlterar = true;
      return;
    },

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
            this.closeConfirmation();
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

    upload(element) {
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