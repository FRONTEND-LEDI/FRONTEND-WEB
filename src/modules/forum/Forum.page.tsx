import FilterForum from '../../common/components/forumComponents/filter';
import Popular from '../../common/components/forumComponents/mostPopular';
import SearchingBar from '../../common/components/forumComponents/searchBar';

export default function ForumPage() {
  return (
    <div className="mt-20 flex h-screen">
      <div className="w-1/4  flex p-4 justify-center items-center">
        <FilterForum />
      </div>
      <div className="divider divider-horizontal "></div>
      <div className="flex-1 p-6 justify-center align-middle items-center  bg-white">
        <SearchingBar />
        <Popular />
      </div>
    </div>
  );
}
