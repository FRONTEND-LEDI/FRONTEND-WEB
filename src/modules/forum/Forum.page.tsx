import FilterForum from '../../common/components/forumComponents/filter';
import Popular from '../../common/components/forumComponents/mostPopular';
import SearchingBar from '../../common/components/forumComponents/searchBar';


export default function ForumPage(){
return(
    <div>
    <div className="mt-20 flex h-min-full bg-pink-500  justify-center items-center">
    <FilterForum/>
     </div>
    <div>
    <SearchingBar/>
    <Popular/>
    </div>
    </div>
)

}