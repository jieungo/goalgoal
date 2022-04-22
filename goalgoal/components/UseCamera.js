import React, { useState } from 'react';
import {View, StyleSheet, Platform, TouchableOpacity, Text, ActionSheetIOS} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import UploadModal from './UploadModal';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import ActionSheetModal from './ActionSheetModal';

function UseCamera() {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    const imagePickerOption = {
        mediaType: 'photo',
        maxWidth: 768,
        maxHeight: 768,
        includeBase64: Platform.OS === 'android',
    };

    const onPickImage = (res) => {
        if (res.didCancel || !res) {
            return;
        }
        navigation.navigate('Upload', {res});
    };

    const onLaunchCamera = () => {
        launchCamera(imagePickerOption, onPickImage);
    };

    const onLaunchImageLibrary = () => {
        launchImageLibrary(imagePickerOption, onPickImage);
    }

    const onPress = () => {
        if (Platform.OS === 'android') {
            setModalVisible(true);
            return;
        }
        
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ['카메라로 촬영하기', '사진 선택하기', '취소'],
                cancelButtonIndex: 2,
            },
            (buttonIndex) => {
                if (buttonIndex === 0) {
                    onLaunchCamera();
                } else if (buttonIndex === 1) {
                    onLaunchImageLibrary();
                }
            }
        )
    }

    return (
        <>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.imageUpload}>
                    <Icon name="image" size={90} color="white" />
                    <Text style={styles.uploadText}>클릭하여 이미지 업로드하기</Text>
                </View>
            </TouchableOpacity>
            <ActionSheetModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                actions={[
                    {
                        icon: 'camera-alt',
                        text: '카메라로 촬영하기',
                        onPress: onLaunchCamera,
                    },
                    {
                        icon: 'photo',
                        text: '사진 선택하기',
                        onPress: onLaunchImageLibrary,
                    }
                ]}
            />
        </>
    )
}

const styles = StyleSheet.create({
    imageUpload: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        paddingVertical: 40,
    },
    uploadText: {
        fontWeight: 'bold',
        color: '#FF7C44',
        textDecorationLine: 'underline',
    }
})

export default UseCamera;