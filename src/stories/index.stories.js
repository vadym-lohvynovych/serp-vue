import Vue from 'vue';
import Pagination from './Pagination.vue';
import '../app/scss/tailwind.scss';

export default { title: 'Pagination' };

export const lessThanSixPages = () => '<Pagination limit="20" total="100" />';

export const moreThanSixPages = () => '<Pagination limit="20" total="248" />';
