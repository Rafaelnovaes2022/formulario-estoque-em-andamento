import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config';

import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Image from 'primevue/image';
import Password from 'primevue/password';
import MegaMenu from 'primevue/megamenu';
import Steps from 'primevue/steps';
import InputText from 'primevue/inputtext';
import Accordion from 'primevue/accordion';
import Checkbox from 'primevue/checkbox';
import InputMask from 'primevue/inputmask';
import Panel from 'primevue/panel';
import Dropdown from 'primevue/dropdown';
import RadioButton from 'primevue/radiobutton';
import TreeSelect from 'primevue/treeselect';
import Calendar from 'primevue/calendar';
import ToastService from 'primevue/toastservice';
import DialogService from 'primevue/dialogservice';
import Carousel from 'primevue/carousel';
import MultiSelect from 'primevue/multiselect';
import InputNumber from 'primevue/inputnumber';
import Rating from 'primevue/rating';
import Ripple from 'primevue/ripple';
import ProgressBar from 'primevue/progressbar';
import Message from 'primevue/message';
import Textarea from 'primevue/textarea';
import FileUpload from 'primevue/fileupload';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';     //optional for column grouping
import Row from 'primevue/row';                     //optional for row
import Toolbar from 'primevue/toolbar';

import 'primevue/resources/themes/saga-blue/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css'
import '/node_modules/primeflex/primeflex.css' //
import Toast from 'primevue/toast';




const app = createApp(App);

app.use(PrimeVue);
app.use(ToastService);
app.use(DialogService);

app.component('Dialog', Dialog);
app.component('Button', Button);
app.component('Card', Card);
app.component('Image', Image);
app.component('Password', Password);
app.component('MegaMenu', MegaMenu);
app.component('Steps', Steps);
app.component('InputText', InputText);
app.component('Accordion, Menu', Accordion);
app.component('Toast', Toast);
app.component('Checkbox', Checkbox);
app.component('InputMask', InputMask);
app.component('Panel', Panel);
app.component('Dropdown', Dropdown);
app.component('RadioButton', RadioButton);
app.component('TreeSelect', TreeSelect);
app.component('Calendar', Calendar);
app.component('DialogService', DialogService);
app.component('Carousel', Carousel);
app.component('MultiSelect',MultiSelect);
app.component('InputNumber',InputNumber);
app.component('Rating',Rating);
app.component('FileUpload',FileUpload);
app.component('Ripple',Ripple);
app.component('ProgressBar',ProgressBar);
app.component('Message',Message);
app.component('Textarea', Textarea);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('Row', Row);
app.component('Toolbar', Toolbar);

app.mount('#app')
