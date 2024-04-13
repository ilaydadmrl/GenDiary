import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PostTemplate = ({ username, pimage, image, description }) => {
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [showAllComments, setShowAllComments] = useState(false);
  const commentInputRef = useRef(null);

  const handleLikePress = () => {
    setLiked(!liked);
  };

  const handleCommentChange = (text) => {
    setComment(text);
  };

  const handleAddComment = () => {
    if (comment.trim() !== '') {
      const newComments = [...comments, comment];
      setComments(newComments);
      setComment('');
    }
  };

  const toggleShowAllComments = () => {
    setShowAllComments(!showAllComments);
  };

  const handleCommentIconPress = () => {
    commentInputRef.current.focus();
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {image && <Image source={image} style={styles.image} />}
        {pimage && (
          <TouchableOpacity style={styles.pimageWrapper}>
            <Image source={pimage} style={styles.pimage} />
          </TouchableOpacity>
        )}
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={handleLikePress}>
            <Ionicons
              name={liked ? 'md-heart' : 'md-heart-outline'}
              size={24}
              color={liked ? 'red' : 'white'}
              style={[styles.icon, styles.shadow]}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCommentIconPress}>
            <Ionicons name="md-chatbubble-outline" size={24} color="white" style={[styles.icon, styles.shadow]} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="md-share-outline" size={24} color="white" style={[styles.icon, styles.shadow]} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.username}>
        {username}: <Text style={styles.description}>{description}</Text>
      </Text>
      {comments.length > 2 && (
        <TouchableOpacity onPress={toggleShowAllComments} style={styles.showAllCommentsButton}>
          <Text style={styles.showAllCommentsText}>View All Comments ({comments.length})</Text>
        </TouchableOpacity>
      )}
      {!showAllComments ? (
        <View>
          {comments.slice(0, 2).map((commentText, index) => (
            <Text key={index} style={styles.commentText}>
              {commentText}
            </Text>
          ))}
          <View style={styles.commentInputContainer}>
            <TextInput
              ref={commentInputRef}
              placeholder="Add Your Comment"
              value={comment}
              onChangeText={handleCommentChange}
              style={styles.commentInput}
            />
            <TouchableOpacity onPress={handleAddComment} style={styles.sendButton}>
              <Ionicons name="md-send" size={24} color="#09333f" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          {comments.map((commentText, index) => (
            <Text key={index} style={styles.commentText}>
              {commentText}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 400, // Yükseklik değerini 2 katına çıkardık
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: '100%', // Yükseklik değerini 2 katına çıkardık
  },
  pimageWrapper: {
    position: 'absolute',
    top: 8,
    left: 8,
    borderRadius: 100,
    borderWidth: 1,
    width: 50,
    height: 50,
    zIndex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    // Platform seçimi buraya gelecek
  },
  pimage: {
    width: 48,
    height: 48,
    borderRadius: 100,
  },
  iconContainer: {
    position: 'absolute',
    flexDirection: 'column', // Simgelerin yan yana olması için row
    alignItems: 'center', // Dikey hizalama
    bottom: 16, // Yükseltmek için bottom değerini değiştirebilirsiniz
    right: 16,
    zIndex: 1,
  },
  
  icon: {
    marginBottom: 8, // Simgeler arasında boşluk bıraktık
  },
  shadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.7)', // Gölge rengi
    textShadowOffset: { width: 0, height: 1 }, // Gölge konumu
    textShadowRadius: 2, // Gölge yumuşaklığı
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontWeight: 'normal', // Kalın yazı tipinden normal yazı tipine değiştirdik
  },
  showAllCommentsButton: {
    alignItems: 'center',
    marginTop: 8,
  },
  showAllCommentsText: {
    color: '#09333f',
    fontWeight: 'bold',

  },
  commentText: {
    marginBottom: 4,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentIcon: {
    padding: 8,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    flex: 1,
  },
  sendButton: {
    marginLeft: 8,
    padding: 8,
  },
});

export default PostTemplate;
