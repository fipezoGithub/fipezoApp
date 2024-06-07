import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {vw} from 'react-native-viewport-units';

const FreelancersCategory = () => {
  const navigation = useNavigation();
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{marginVertical: 24}}>
      <View className="flex flex-col items-center gap-y-2">
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('freelancer-category', {category: 'actor'})
          }
          className="flex flex-col items-center justify-center gap-y-2 mx-4">
          <Image
            source={require('../assets/actor-cat.png')}
            style={{width: 15 * vw, height: 15 * vw}}
            resizeMode="contain"
          />
          <Text className="text-base font-medium text-black">Actor</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('freelancer-category', {category: 'actress'})
          }
          className="flex flex-col items-center justify-center gap-y-2 mx-4">
          <Image
            source={require('../assets/actress-cat.png')}
            style={{width: 15 * vw, height: 15 * vw}}
            resizeMode="contain"
          />
          <Text className="text-base font-medium text-black">Actress</Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-col items-center gap-y-2">
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('freelancer-category', {category: 'anchor'})
          }
          className="flex flex-col items-center justify-center gap-y-2 mx-4">
          <Image
            source={require('../assets/anchor-cat.png')}
            style={{width: 15 * vw, height: 15 * vw}}
            resizeMode="contain"
          />
          <Text className="text-base font-medium text-black">Anchor</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('freelancer-category', {
              category: 'album_designer',
            })
          }
          className="flex flex-col items-center justify-center gap-y-2 mx-4">
          <Image
            source={require('../assets/album-designer-cat.png')}
            style={{width: 15 * vw, height: 15 * vw}}
            resizeMode="contain"
          />
          <Text className="text-base font-medium text-black">Album Designer</Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-col items-center gap-y-2">
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('freelancer-category', {category: 'babysitter'})
          }
          className="flex flex-col items-center justify-center gap-y-2 mx-4">
          <Image
            source={require('../assets/babysitter-cat.png')}
            style={{width: 15 * vw, height: 15 * vw}}
            resizeMode="contain"
          />
          <Text className="text-base font-medium text-black">Babysitter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('freelancer-category', {
              category: 'cinematographer',
            })
          }
          className="flex flex-col items-center justify-center gap-y-2 mx-4">
          <Image
            source={require('../assets/cinematographer-cat.png')}
            style={{width: 15 * vw, height: 15 * vw}}
            resizeMode="contain"
          />
          <Text className="text-base font-medium text-black">
            Cinematographer
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-col items-center gap-y-2">
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('freelancer-category', {category: 'dancer'})
          }
          className="flex flex-col items-center justify-center gap-y-2 mx-4">
          <Image
            source={require('../assets/dancer-cat.png')}
            style={{width: 15 * vw, height: 15 * vw}}
            resizeMode="contain"
          />
          <Text className="text-base font-medium text-black">Dancer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('freelancer-category', {
              category: 'dance_teacher',
            })
          }
          className="flex flex-col items-center justify-center gap-y-2 mx-4">
          <Image
            source={require('../assets/dance-teacher-cat.png')}
            style={{width: 15 * vw, height: 15 * vw}}
            resizeMode="contain"
          />
          <Text className="text-base font-medium text-black">Dance Teacher</Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-col items-center gap-y-2">
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('freelancer-category', {
              category: 'drawing_teacher',
            })
          }
          className="flex flex-col items-center justify-center gap-y-2 mx-4">
          <Image
            source={require('../assets/drawing-teacher-cat.png')}
            style={{width: 15 * vw, height: 15 * vw}}
            resizeMode="contain"
          />
          <Text className="text-base font-medium text-black">
            Drawing Teacher
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('freelancer-category', {category: 'dj'})
          }
          className="flex flex-col items-center justify-center gap-y-2 mx-4">
          <Image
            source={require('../assets/dj-cat.png')}
            style={{width: 15 * vw, height: 15 * vw}}
            resizeMode="contain"
          />
          <Text className="text-base font-medium text-black">DJ</Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-col items-center gap-y-2">
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('freelancer-category', {
              category: 'drone_operator',
            })
          }
          className="flex flex-col items-center justify-center gap-y-2 mx-4">
          <Image
            source={require('../assets/drone-operator-cat.png')}
            style={{width: 15 * vw, height: 15 * vw}}
            resizeMode="contain"
          />
          <Text className="text-base font-medium text-black">Drone Operator</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('freelancer-category', {
              category: 'fashion_designer',
            })
          }
          className="flex flex-col items-center justify-center gap-y-2 mx-4">
          <Image
            source={require('../assets/fashion-designer-cat.png')}
            style={{width: 15 * vw, height: 15 * vw}}
            resizeMode="contain"
          />
          <Text className="text-base font-medium text-black">
            Fashion Designer
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-col items-center gap-y-2">
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('freelancer-category', {
              category: 'graphics_designer',
            })
          }
          className="flex flex-col items-center justify-center gap-y-2 mx-4">
          <Image
            source={require('../assets/graphics-designer-cat.png')}
            style={{width: 15 * vw, height: 15 * vw}}
            resizeMode="contain"
          />
          <Text className="text-base font-medium text-black">
            Graphics Designer
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('freelancer-category', {category: 'influencer'})
          }
          className="flex flex-col items-center justify-center gap-y-2 mx-4">
          <Image
            source={require('../assets/influencer-cat.png')}
            style={{width: 15 * vw, height: 15 * vw}}
            resizeMode="contain"
          />
          <Text className="text-base font-medium text-black">Influencer</Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-col items-center gap-y-2">
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('freelancer-category', {
              category: 'interior_designer',
            })
          }
          className="flex flex-col items-center justify-center gap-y-2 mx-4">
          <Image
            source={require('../assets/interior-designer-cat.png')}
            style={{width: 15 * vw, height: 15 * vw}}
            resizeMode="contain"
          />
          <Text className="text-base font-medium text-black">
            Interior Designer
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('freelancer-category', {category: 'lyricist'})
          }
          className="flex flex-col items-center justify-center gap-y-2 mx-4">
          <Image
            source={require('../assets/lyricist-cat.png')}
            style={{width: 15 * vw, height: 15 * vw}}
            resizeMode="contain"
          />
          <Text className="text-base font-medium text-black">Lyricist</Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-col items-center gap-y-2">
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('freelancer-category', {
              category: 'maid',
            })
          }
          className="flex flex-col items-center justify-center gap-y-2 mx-4">
          <Image
            source={require('../assets/maid-cat.png')}
            style={{width: 15 * vw, height: 15 * vw}}
            resizeMode="contain"
          />
          <Text className="text-base font-medium text-black">Maid</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('freelancer-category', {
              category: 'makeup_artist',
            })
          }
          className="flex flex-col items-center justify-center gap-y-2 mx-4">
          <Image
            source={require('../assets/Makeup-artist-cat.png')}
            style={{width: 15 * vw, height: 15 * vw}}
            resizeMode="contain"
          />
          <Text className="text-base font-medium text-black">Make up Artist</Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-col items-center gap-y-2">
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('freelancer-category', {
              category: 'mehendi_artist',
            })
          }
          className="flex flex-col items-center justify-center gap-y-2 mx-4">
          <Image
            source={require('../assets/Mehendi-artist-cat.png')}
            style={{width: 15 * vw, height: 15 * vw}}
            resizeMode="contain"
          />
          <Text className="text-base font-medium text-black">Mehendi Artist</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('freelancer-category', {
              category: 'model',
            })
          }
          className="flex flex-col items-center justify-center gap-y-2 mx-4">
          <Image
            source={require('../assets/model-cat.png')}
            style={{width: 15 * vw, height: 15 * vw}}
            resizeMode="contain"
          />
          <Text className="text-base font-medium text-black">Model</Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-col items-center gap-y-2">
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('freelancer-category', {
              category: 'musician',
            })
          }
          className="flex flex-col items-center justify-center gap-y-2 mx-4">
          <Image
            source={require('../assets/musician-cat.png')}
            style={{width: 15 * vw, height: 15 * vw}}
            resizeMode="contain"
          />
          <Text className="text-base font-medium text-black">Musician</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('freelancer-category', {
              category: 'music_teacher',
            })
          }
          className="flex flex-col items-center justify-center gap-y-2 mx-4">
          <Image
            source={require('../assets/music-teacher-cat.png')}
            style={{width: 15 * vw, height: 15 * vw}}
            resizeMode="contain"
          />
          <Text className="text-base font-medium text-black">Music Teacher</Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-col items-center gap-y-2">
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('freelancer-category', {
              category: 'painter',
            })
          }
          className="flex flex-col items-center justify-center gap-y-2 mx-4">
          <Image
            source={require('../assets/painter-cat.png')}
            style={{width: 15 * vw, height: 15 * vw}}
            resizeMode="contain"
          />
          <Text className="text-base font-medium text-black">Painter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('freelancer-category', {
              category: 'photographer',
            })
          }
          className="flex flex-col items-center justify-center gap-y-2 mx-4">
          <Image
            source={require('../assets/photographer-cat.png')}
            style={{width: 15 * vw, height: 15 * vw}}
            resizeMode="contain"
          />
          <Text className="text-base font-medium text-black">Photographer</Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-col items-center gap-y-2">
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('freelancer-category', {
              category: 'photo_editor',
            })
          }
          className="flex flex-col items-center justify-center gap-y-2 mx-4">
          <Image
            source={require('../assets/photo-editor-cat.png')}
            style={{width: 15 * vw, height: 15 * vw}}
            resizeMode="contain"
          />
          <Text className="text-base font-medium text-black">Photo Editor</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('freelancer-category', {
              category: 'private_tutor',
            })
          }
          className="flex flex-col items-center justify-center gap-y-2 mx-4">
          <Image
            source={require('../assets/private-tutor-cat.png')}
            style={{width: 15 * vw, height: 15 * vw}}
            resizeMode="contain"
          />
          <Text className="text-base font-medium text-black">Private Tutor</Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-col items-center gap-y-2">
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('freelancer-category', {
              category: 'video_editor',
            })
          }
          className="flex flex-col items-center justify-center gap-y-2 mx-4">
          <Image
            source={require('../assets/video-editor-cat.png')}
            style={{width: 15 * vw, height: 15 * vw}}
            resizeMode="contain"
          />
          <Text className="text-base font-medium text-black">Video Editor</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('freelancer-category', {
              category: 'vocalist',
            })
          }
          className="flex flex-col items-center justify-center gap-y-2 mx-4">
          <Image
            source={require('../assets/vocalist-cat.png')}
            style={{width: 15 * vw, height: 15 * vw}}
            resizeMode="contain"
          />
          <Text className="text-base font-medium text-black">Vocalist</Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-col items-center gap-y-2">
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('freelancer-category', {
              category: 'voice_over_artist',
            })
          }
          className="flex flex-col items-center justify-center gap-y-2 mx-4">
          <Image
            source={require('../assets/voice-over-artist-cat.png')}
            style={{width: 15 * vw, height: 15 * vw}}
            resizeMode="contain"
          />
          <Text className="text-base font-medium text-black">
            Voice Over Artist
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('freelancer-category', {
              category: 'web_developer',
            })
          }
          className="flex flex-col items-center justify-center gap-y-2 mx-4">
          <Image
            source={require('../assets/web-developer-cat.png')}
            style={{width: 15 * vw, height: 15 * vw}}
            resizeMode="contain"
          />
          <Text className="text-base font-medium text-black">Web Developer</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default FreelancersCategory;

const styles = StyleSheet.create({});
