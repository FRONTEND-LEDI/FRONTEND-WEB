import Navbar from '../../common/components/navbar';
import Footer from '../../common/components/Footer';
import ContainerProfile from '../../common/components/profile/containerprofile';
import Archievements from '../../common/components/profile/archivements';
import ProgressBox from '../../common/components/profile/containprogress';

export default function Profile() {
  return (
  <div className="flex flex-col min-h-screen">
  <Navbar />

  <main className="flex-grow pt-24 px-4 justify-center items-center">
    <div className="flex gap-8 justify-center ">
      <div className="flex flex-col  gap-2">
        <ContainerProfile />
        <Archievements />
      </div>
      <div className="w-[300px]">
        <ProgressBox />
      </div>
    </div>
  </main>

  <Footer />
</div>

  );
}
