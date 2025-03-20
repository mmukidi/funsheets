import ResponsiveLayout from './components/ResponsiveLayout';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';
import TabNavigation from './components/TabNavigation';
import UserDetailsForm from './components/UserDetailsForm';

export default function Home() {
  const tabs = [
    {
      id: 'files',
      label: 'My Files',
      content: <FileList />
    },
    {
      id: 'upload',
      label: 'Upload',
      content: <FileUpload />
    }
  ];

  return (
    <ResponsiveLayout>
      <div className="space-y-8">
        <UserDetailsForm />
        <TabNavigation tabs={tabs} />
      </div>
    </ResponsiveLayout>
  );
}
