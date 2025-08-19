import Navbar from '../../common/components/navbar';
import Footer from '../../common/components/Footer';
import ContainerProfile from '../../common/components/profile/containerprofile';
import Archievements from '../../common/components/profile/archivements';
import ProgressBox from '../../common/components/profile/containprogress';

export default function Profile() {
  return (
    <div className="flex min-h-screen">
      <Navbar />
      <main className="flex-grow flex-row pt-24">
      <div className='flex flex-col'>
<ContainerProfile />
 <Archievements />
        </div>
        <ProgressBox />
      </main>

      <Footer />
    </div>
  );
}
