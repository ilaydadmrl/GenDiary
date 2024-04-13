import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ProfileTemplate = ({ username, pfp }) => {
  return (
    <View style={styles.container}>
      <Image source={pfp} style={styles.pfp} resizeMode="cover" />
      <View style={styles.topOverlay}>
        <TouchableOpacity style={styles.iconTopRight}>
          <Ionicons name="settings-outline" size={24} color="white" style={[styles.icon, styles.shadow]} />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomOverlay}>
        <Text style={[styles.username, styles.shadow]}>{username}</Text>
        <TouchableOpacity style={styles.iconBottomRight}>
          <Ionicons name="md-share-outline" size={24} color="white" style={[styles.icon, styles.shadow]} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
  },
  pfp: {
    width: '100%',
    height: 250,
  },
  topOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
  },
  bottomOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  icon: {
    textShadowColor: 'rgba(0, 0, 0, 0)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  iconTopRight: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 5,
    borderRadius: 5,
  },
  iconBottomRight: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    padding: 5,
    borderRadius: 5,
  },
  shadow: {
    textShadowColor: 'rgba(0, 0, 0, 10)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

export default ProfileTemplate;
