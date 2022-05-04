import { useState, useCallback } from 'react';
import { getNewerPosts, getOlderPosts, PAGE_SIZE } from '../lib/posts';

export default function usePosts(userId) {
    const [posts, setPosts] = useState(null);
    const [noMorePost, setNoMorePost] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const onLoadMore = async () => {
        if (noMorePost || !posts || posts.length < PAGE_SIZE) {
            return;
        }
        const lastPost = posts[posts.length -1];
        const olderPosts = await getOlderPosts(lastPost.id, userId);
        if (olderPosts.length < PAGE_SIZE) {
            setNoMorePost(true);
        }
        setPosts(posts.concat(olderPosts));
    }

    const onRefresh = useCallback(async () => {
        if (!posts || posts.length === 0 || refreshing) {
            return;
        }
        const firstPost = posts[0];
        setRefreshing(true);
        const newerPosts = await getNewerPosts(firstPost.id, userId);
        setRefreshing(false);
        if (newerPosts.length === 0) {
            return;
        }
        setPosts(newerPosts.concat(posts));
    }, [posts, userId, refreshing]);



    return {
        posts,
        noMorePost,
        refreshing,
        onLoadMore,
        onRefresh
    }
}