import React, {useEffect, useState} from 'react';
import { FlatList, StyleSheet, RefreshControl } from 'react-native';
import PostCard from '../components/PostCard';
import {getPosts, getOlderPosts, PAGE_SIZE, getNewerPosts} from '../lib/posts';
import SplashScreen from 'react-native-splash-screen';

function FeedScreen() {
    const [posts, setPosts] = useState(null);
    const [noMorePost, setNoMorePost] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        getPosts().then(setPosts);
    }, [posts]);

    const postsReady = posts !== null;
    useEffect(() => {
        if(postsReady) {
            SplashScreen.hide();
        }
    },[postsReady]);

    const onLoadMore = async () => {
        if (noMorePost || !posts | posts.length < PAGE_SIZE) {
            return;
        }
        const lastPost = posts[posts.length - 1];
        const olderPosts = await getOlderPosts(lastPost.id);
        if (olderPosts.length < PAGE_SIZE) {
            setNoMorePost(true);
        }
        setPosts(posts.concat(olderPosts));
    };

    const onRefresh = async () => {
        if (!posts || posts.length === 0 || refreshing) {
            return;
        }
        const firstPost = posts[0];
        setRefreshing(true);
        const newerPosts = await getNewerPosts(firstPost.id);
        setRefreshing(false);
        if (newerPosts.length === 0) {
            return;
        }
        setPosts(newerPosts.concat(posts));
    }

    return (
        <FlatList
            data={posts}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.container}
            onEndReached={onLoadMore}
            onEndReachedThreshold={0.75}
            refreshControl={
                <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
            }
        />
    ) 
}

const renderItem = ({item}) => (
    <PostCard
        createdAt={item.createdAt}
        description={item.description}
        id={item.id}
        user={item.user}
        photoURL={item.photoURL}
    />
)

const styles = StyleSheet.create({
    container: {
        paddingBottom: 48,
    }
})

export default FeedScreen;