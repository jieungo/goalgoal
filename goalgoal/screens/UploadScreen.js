import { useRoute, useNavigation } from '@react-navigation/native';
import React, {useEffect, useRef, useState, useCallback} from 'react';
import { StyleSheet, View, TextInput, Image, useWindowDimensions, Animated, Keyboard, Platform, KeyboardAvoidingView } from 'react-native';
import UseCamera from '../components/UseCamera';
import IconRightButton from '../components/IconRightButton';
import storage from '@react-native-firebase/storage';
import {useUserContext} from '../contexts/UserContext';
import {v4} from 'uuid';
import {createPost} from '../lib/posts';

function UploadScreen() {
    const route = useRoute();
    const {res} = route.params || {};
    const {width} = useWindowDimensions();
    const animation = useRef(new Animated.Value(width)).current;
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
    const [description, setDescription] = useState('');
    const navigation = useNavigation();
    const {user} = useUserContext();
    
    const onSubmit = useCallback(async() => {
        navigation.pop();
        const asset = res.assets[0];

        const extension = asset.fileName.split('.').pop();
        const reference = storage().ref(`/photo/${user.id}/${v4()}.${extension}`);
        if (Platform.OS === 'android') {
            await reference.putString(asset.base64, 'base64', {
                contentType: asset.type,
            })
        } else {
            await reference.putFile(asset.uri);
        }
        const photoURL = await reference.getDownloadURL();
        await createPost({description, photoURL, user});
    }, [res, user, description, navigation]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <IconRightButton onPress={onSubmit} name="check" />,
        })
    }, [navigation, onSubmit]);

    useEffect(() => {
        const didShow = Keyboard.addListener('keyboardDidShow', () => setIsKeyboardOpen(true));
        const didHide = Keyboard.addListener('keyboardDidHide', () => setIsKeyboardOpen(false));

        return () => {
            didShow.remove();
            didHide.remove();
        }
    }, []);

    useEffect(() => {
        Animated.timing(animation, {
            toValue: isKeyboardOpen ? 0 : width,
            useNativeDriver: false,
            duration: 150,
            delay: 100,
        }).start();
    }, [isKeyboardOpen, width, animation]);

    return (
        <KeyboardAvoidingView
            behavior={Platform.select({ios: 'height'})}
            style={styles.block}
            keyboardVerticalOffset={Platform.select({
                ios: 180,
            })}
        >
            <View style={styles.block}>
                {res ? (
                    <Animated.Image
                    source={{uri: res.assets[0]?.uri}}
                    style={[styles.image, {height: animation}]}
                    resizeMode="cover"
                    />
                    ):(
                        <UseCamera />
                        )}
                <TextInput
                    style={styles.input}
                    multiline={true}
                    placeholder="오늘의 소감을 적어주세요 :)"
                    textAlignVertical='top'
                    value={description}
                    onChangeText={setDescription}
                    />
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    block: {
        flex: 1,
    },
    input: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 16,
        flex: 1,
        fontSize: 16,
    },
    image: {width: '100%'},
})

export default UploadScreen;