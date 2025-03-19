import ResponsiveLayout from './components/ResponsiveLayout';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';

export default function Home() {
  return (
    <ResponsiveLayout>
      <div className="space-y-8">
        <FileUpload />
        <FileList />
      </div>
    </ResponsiveLayout>
  );
}
