import { Perfil } from './Perfil';

export interface PeriodicElement {
  username?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  perfil?: Perfil;
}
