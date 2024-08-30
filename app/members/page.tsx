import CreatePost from "../../components/members/create-post";
import PostsToolbar from "../../components/members/posts-toolbar";
import Post from "../../components/members/post";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { features } from "../../config/features";

const MembersPage = withPageAuthRequired(async () => {
    
    return (
        <div>
            <CreatePost />
            <PostsToolbar />
            <Post />
        </div>
    );
});
export default MembersPage;
