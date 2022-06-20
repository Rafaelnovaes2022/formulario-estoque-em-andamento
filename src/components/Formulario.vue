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
  
        <div class="card">
            <Carousel :value="products" :numVisible="3" :numScroll="3" :responsiveOptions="responsiveOptions">
                <template #header>
                    <h5>Basic</h5>
                </template>
                <template #item="slotProps">
                    <div class="product-item">
                        <div class="product-item-content">
                            <div class="mb-3">
                                <img src="https://images.tcdn.com.br/img/img_prod/673889/computador_completo_intel_i3_4gb_ram_monitor_18_5_1253_1_20190914113558.jpg" :alt="slotProps.data.name" class="product-image" />
                            </div>
                            <div>
                                <h4 class="mb-1">{{slotProps.data.name}}</h4>
                                <h6 class="mt-0 mb-3">${{slotProps.data.price}}</h6>
                                <span :class="'product-badge status-'+slotProps.data.inventoryStatus.toLowerCase()">{{slotProps.data.inventoryStatus}}</span>
                                <div class="car-buttons mt-5">
                                    <Button icon="pi pi-search" class="p-button p-button-rounded mr-2" />
                                    <Button icon="pi pi-star-fill" class="p-button-success p-button-rounded mr-2" />
                                    <Button icon="pi pi-cog" class="p-button-help p-button-rounded" />
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </Carousel>
        </div>
</template>

<script>
export default {};
</script>

<style>
</style>