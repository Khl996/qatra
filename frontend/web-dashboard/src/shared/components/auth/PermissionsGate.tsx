import { ReactNode } from 'react';

interface Permission {
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'manage';
}

interface PermissionsGateProps {
  children: ReactNode;
  permissions?: Permission[];
  userPermissions?: Permission[];
  fallback?: ReactNode;
}

const PermissionsGate = ({
  children,
  permissions = [],
  userPermissions = [],
  fallback = null
}: PermissionsGateProps) => {
  const hasPermission = () => {
    if (permissions.length === 0) return true;
    
    return permissions.every(permission => 
      userPermissions.some(userPerm => 
        userPerm.resource === permission.resource && 
        userPerm.action === permission.action
      )
    );
  };

  return hasPermission() ? <>{children}</> : <>{fallback}</>;
};

export default PermissionsGate;
