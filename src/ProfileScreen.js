import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Octicons, MaterialIcons } from 'react-native-vector-icons';

const ProfileScreen = ({ navigation }) => {
    const auth = getAuth();
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        const checkAuthState = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                if (!token) {
                    navigation.navigate('LoginScreen');
                }
            } catch (error) {
                console.error('Error checking auth state:', error);
            }
        };

        checkAuthState();
    }, []);

    const handleNavigateToQuiz = () => {
        navigation.navigate('QuizScreen');
    };

    const handleLogout = () => {
        setShowConfirmation(true);
    };

    const confirmLogout = () => {
        signOut(auth)
            .then(() => {
                AsyncStorage.removeItem('userToken');
                navigation.navigate('LoginScreen');
            })
            .catch((error) => {
                console.error('Error signing out:', error);
            });
    };

    const cancelLogout = () => {
        setShowConfirmation(false);
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.container}>
                <View style={styles.quizContainer}>
                    <TouchableOpacity style={styles.quizButton} onPress={handleNavigateToQuiz}>
                        <Text>Start Quiz</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.logoutContainer}>
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Octicons name="sign-out" size={24} color="black" />
                        <Text>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                <MaterialIcons name="arrow-back-ios" size={18} color="black" />
            </TouchableOpacity>

            {/* Confirmation Modal */}
            <Modal
                visible={showConfirmation}
                animationType="fade"
                transparent={true}
                onRequestClose={cancelLogout}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Are you sure you want to logout?</Text>
                        <View style={styles.modalButtonsContainer}>
                            <TouchableOpacity style={styles.modalButton} onPress={cancelLogout}>
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={confirmLogout}>
                                <Text style={styles.modalButtonText}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        borderWidth: 1.5,
        borderRadius: 10,
        borderRightWidth: 6,
        borderBottomWidth: 5,
        backgroundColor: '#f5f5f5',
        marginBottom: 15,
    },
    quizContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    logoutButton: {
        backgroundColor: '#fadede',
        width: '40%',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderRightWidth: 5,
        borderBottomWidth: 6,
        borderColor: 'black',
        padding: 12,
        paddingLeft: 16,
        paddingRight: 16,
    },
    quizButton: {
        backgroundColor: '#a7dbd8',
        width: '40%',
        height: 50,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderRightWidth: 5,
        borderBottomWidth: 6,
        borderColor: 'black',
        padding: 10,
        paddingLeft: 16,
        paddingRight: 16,
    },
    backButton: {
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#fdfd96',
        borderWidth: 1.5,
        borderColor: 'black',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 10,
        borderRightWidth: 4,
        borderBottomWidth: 5,
        opacity: 1,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 8,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
    },
    modalButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    modalButton: {
        backgroundColor: '#fadede',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 4,
        borderWidth: 1.5,
        borderColor: 'black',
        borderBottomWidth: 5,
        borderRightWidth: 4,
    },
    modalButtonText: {
        fontSize: 16,
    },
});

export default ProfileScreen;
