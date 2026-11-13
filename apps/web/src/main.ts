import './styles.css';
import { mountConverter } from './converter-form';

const root = document.getElementById('converter');
if (root) mountConverter(root);
