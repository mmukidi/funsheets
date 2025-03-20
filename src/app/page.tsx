import ResponsiveLayout from './components/ResponsiveLayout';
import UserDetailsForm from './components/UserDetailsForm';

export default function Home() {
  return (
    <ResponsiveLayout>
      <div className="space-y-8">
        <UserDetailsForm />
      </div>
    </ResponsiveLayout>
  );
}
