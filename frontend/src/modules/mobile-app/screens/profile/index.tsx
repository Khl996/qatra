import { Layout } from '@/shared/components';
import { ProfileCard } from './ProfileCard';
import { Settings } from './Settings';

export const ProfileScreen = () => {
  return (
    <Layout title="حسابي">
      <div className="mb-6">
        <ProfileCard
          name="أحمد محمد"
          email="ahmed@example.com"
          userId="12345678"
          avatar="/assets/icons/avatar_icon.png"
        />
      </div>

      <div className="mb-20">
        <Settings />
      </div>
    </Layout>
  );
};
