import { Box, useMediaQuery } from '@mui/material';
import Navbar from "pages/navbar";
import UserWidget from 'pages/widgets/UserWidget'
import MyPostWidget from 'pages/widgets/MyPostWidget'
import PostWidget from 'pages/widgets/PostWidget';
import PostsWidget from 'pages/widgets/PostsWidget';
import { useSelector } from 'react-redux';
import AdvertWidget from 'pages/widgets/AdvertWidget';
import FriendListWidget from 'pages/widgets/FriendsList';
const HomePage = () => {
    const { _id, picturePath } = useSelector((state) => state.user);
    // console.log(_id);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    return <Box><Navbar />
        <Box width="100%" padding="2rem 6%" display={isNonMobileScreens ? "flex" : "block"} gap="0.5rem" justifyContent="space-between">
            <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                <UserWidget userId={_id} />
            </Box>
            <Box flexBasis={isNonMobileScreens ? "42%" : undefined} mt={isNonMobileScreens ? undefined : "2rem"}>
                <MyPostWidget picturePath={picturePath} />
                <PostsWidget userId={_id} isProfile={false} />
            </Box>
            {isNonMobileScreens && <Box flexBasis="26%">
                <AdvertWidget />
                <Box m="2rem 0"><FriendListWidget userId={_id} /></Box>

            </Box>}
        </Box>
    </Box>;
}

export default HomePage;