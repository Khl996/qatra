export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  STORE_MANAGER = 'STORE_MANAGER',
  STAFF = 'STAFF'
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  module: 'stores' | 'users' | 'offers' | 'reports';
  actions: ('view' | 'create' | 'edit' | 'delete')[];
}

export interface Role {
  id: string;
  name: string;
  permissions: string[]; // Permission IDs
}
