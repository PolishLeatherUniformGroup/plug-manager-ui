import { MyData } from '../../components/profile/my-data';
import { Member } from '../../models/members';

export default async function ProfilePage() {
    const member:Member = {}as Member;
    return (
        <div className="w-full">
            <MyData  data={member}/>
        </div>);

}