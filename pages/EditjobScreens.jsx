import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import DatePicker from 'react-native-date-picker';
import {vw, vh} from 'react-native-viewport-units';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditjobScreens = ({route, navigation}) => {
  const [location, setLocation] = useState('Agra');
  const [profession, setProfession] = useState('actor');
  const [date, setDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const [requiredDate, setRequiredDate] = useState(new Date());
  const [openRequiredDate, setOpenRequiredDate] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [openStartTime, setOpenStartTime] = useState(false);
  const [endTime, setEndTime] = useState(new Date());
  const [openEndTime, setOpenEndTime] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [vacancy, setVacancy] = useState('');
  const [venue, setVenue] = useState('');
  const [eventType, setEventType] = useState('');
  const {job} = route.params;

  const cities = [
    'Agra',
    'Ahmedabad',
    'Amritsar',
    'Aurangabad',
    'Bengaluru',
    'Bhopal',
    'Bhubaneswar',
    'Burdwan',
    'Chandigarh',
    'Chennai',
    'Coimbatore',
    'Dehradun',
    'Delhi',
    'Dhanbad',
    'Durgapur',
    'Faridabad',
    'Ghaziabad',
    'Guwahati',
    'Gwalior',
    'Hyderabad',
    'Indore',
    'Jaipur',
    'Jamshedpur',
    'Jodhpur',
    'Kanpur',
    'Kochi',
    'Kolkata',
    'Lucknow',
    'Ludhiana',
    'Madurai',
    'Mangaluru',
    'Meerut',
    'Mumbai',
    'Mysuru',
    'Nagpur',
    'Nashik',
    'New Delhi',
    'Navi Mumbai',
    'Patna',
    'Prayagraj',
    'Puducherry',
    'Pune',
    'Raipur',
    'Rajkot',
    'Ranchi',
    'Siliguri',
    'Surat',
    'Thane',
    'Thiruvananthapuram',
    'Udaipur',
    'Vadodara',
    'Varanasi',
    'Vijayawada',
    'Visakhapatnam',
    'Warangal',
  ];

  const categories = [
    'Actor',
    'Actress',
    'Album Designer',
    'Anchor',
    'Babysitter',
    'Cinematographer',
    'Dancer',
    'Dance Teacher',
    'DJ',
    'Drawing Teacher',
    'Drone Operator',
    'Fashion Designer',
    'Graphics Designer',
    'Influencer',
    'Interior Designer',
    'Lyricist',
    'Maid',
    'Makeup Artist',
    'Mehendi Artist',
    'Model',
    'Musician',
    'Music Teacher',
    'Painter',
    'Photographer',
    'Photo Editor',
    'Private Tutor',
    'Video Editor',
    'Vocalist',
    'Voice Over Artist',
    'Web Developer',
  ];

  useEffect(() => {
    setTitle(job.title);
    setDescription(job.description);
    setBudget(job.budget.toString());
    setVacancy(job.vacancy.toString());
    setVenue(job.venue);
    setDate(new Date(job.date));
    setEventType(job.eventType);
  }, [job]);

  const updateJob = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${SERVER_URL}/job/edit/${job._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          location,
          venue,
          profession: jobProfession,
          budget,
          vacancy,
          dueDate: requiredDate,
          eventTime: JSON.stringify({startTime: startTime, endTime: endTime}),
          eventType,
          date,
        }),
      });
      const update = await res.json();
      navigation.navigate('posted-jobs');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
        rowGap: 3 * vh,
        backgroundColor: '#fff',
      }}>
      <View>
        <Text style={{fontSize: 6 * vw}} className="font-bold text-black">
          Post your requirement
        </Text>
      </View>
      <View className="self-stretch flex flex-col gap-y-2 mx-4">
        <Text
          style={{fontSize: 4.5 * vw}}
          className="font-bold text-black capitalize">
          title
        </Text>
        <TextInput
          placeholder="enter job title"
          inputMode="text"
          value={title}
          onChangeText={text => setTitle(text)}
          className="border border-neutral-400"
        />
      </View>
      <View className="self-stretch flex flex-col gap-y-2 mx-4">
        <Text
          style={{fontSize: 4.5 * vw}}
          className="font-bold text-black capitalize">
          description
        </Text>
        <TextInput
          placeholder="enter job description"
          inputMode="text"
          multiline
          value={description}
          onChangeText={text => setDescription(text)}
          className="border border-neutral-400 h-40"
          style={{textAlignVertical: 'top'}}
        />
      </View>
      <View className="self-stretch flex flex-col gap-y-2 mx-4">
        <Text
          style={{fontSize: 4.5 * vw}}
          className="font-bold text-black capitalize">
          budget
        </Text>
        <TextInput
          placeholder="enter job budget"
          inputMode="numeric"
          value={budget}
          onChangeText={text => setBudget(text)}
          className="border border-neutral-400"
        />
      </View>
      <View className="self-stretch flex flex-col gap-y-2 mx-4">
        <Text
          style={{fontSize: 4.5 * vw}}
          className="font-bold text-black capitalize">
          vacancy
        </Text>
        <TextInput
          placeholder="enter number of vacancies"
          inputMode="numeric"
          value={vacancy}
          onChangeText={text => setVacancy(text)}
          className="border border-neutral-400"
        />
      </View>
      <View className="self-stretch flex flex-col gap-y-2 mx-4">
        <Text
          style={{fontSize: 4.5 * vw}}
          className="font-bold text-black capitalize">
          venue {'('} location {')'}
        </Text>
        <TextInput
          placeholder="enter venue of event"
          inputMode="text"
          value={venue}
          onChangeText={text => setVenue(text)}
          className="border border-neutral-400"
        />
      </View>
      <View className="flex flex-col items-stretch gap-y-2 mx-4">
        <Text
          className="text-base font-semibold capitalize text-black"
          style={{fontSize: 4.5 * vw}}>
          location
        </Text>
        <SelectDropdown
          data={cities}
          buttonStyle={{
            width: '100%',
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderBottomColor: 'black',
          }}
          defaultButtonText={'select your city'}
          defaultValue={location}
          rowTextStyle={{textTransform: 'capitalize'}}
          buttonTextStyle={{
            fontSize: 15,
            color: 'rgb(115 115 115)',
            textAlign: 'left',
          }}
          onSelect={(selectedItem, index) => {
            setLocation(selectedItem.split(' ').join('_'));
          }}
          search={true}
          searchPlaceHolder={'enter city name'}
          renderSearchInputLeftIcon={() => (
            <Iconsearch name="search1" size={20} color="#000000" />
          )}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
          }}
        />
      </View>
      <View className="flex flex-col items-stretch gap-y-2 mx-4">
        <Text
          className="text-base font-semibold capitalize text-black"
          style={{fontSize: 4.5 * vw}}>
          profession
        </Text>
        <SelectDropdown
          data={categories}
          buttonStyle={{
            width: '100%',
            backgroundColor: 'transparent',
            borderWidth: 1,
          }}
          defaultButtonText={'select your freelance category'}
          rowTextStyle={{textTransform: 'capitalize'}}
          buttonTextStyle={{
            fontSize: 15,
            color: 'rgb(115 115 115)',
            textAlign: 'left',
          }}
          defaultValue={profession
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')}
          onSelect={(selectedItem, index) => {
            setProfession(selectedItem.split(' ').join('_').toLowerCase());
          }}
          search={true}
          searchPlaceHolder={'enter freelancer category'}
          renderSearchInputLeftIcon={() => (
            <Iconsearch name="search1" size={20} color="#000000" />
          )}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
          }}
        />
      </View>
      <View className="flex flex-col gap-y-2 self-stretch mx-4">
        <Text
          style={{fontSize: 4 * vw}}
          className="text-black font-semibold capitalize">
          Last date for apply
        </Text>
        <TouchableOpacity
          onPress={() => setOpenDate(true)}
          className="border py-2 px-1">
          <Text className="text-neutral-600 font-semibold capitalize">
            {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
          </Text>
        </TouchableOpacity>
        <DatePicker
          modal
          date={date}
          open={openDate}
          onConfirm={date => {
            setOpenDate(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpenDate(false);
          }}
          mode="date"
        />
      </View>
      <View className="flex flex-col gap-y-2 self-stretch mx-4">
        <Text
          style={{fontSize: 4 * vw}}
          className="text-black font-semibold capitalize">
          Required date
        </Text>
        <TouchableOpacity
          onPress={() => setOpenRequiredDate(true)}
          className="border py-2 px-1">
          <Text className="text-neutral-600 font-semibold capitalize">
            {requiredDate.getDate()}/{requiredDate.getMonth() + 1}/
            {requiredDate.getFullYear()}
          </Text>
        </TouchableOpacity>
        <DatePicker
          modal
          date={requiredDate}
          open={openRequiredDate}
          onConfirm={date => {
            setOpenRequiredDate(false);
            setRequiredDate(date);
          }}
          onCancel={() => {
            setOpenRequiredDate(false);
          }}
          mode="date"
        />
      </View>
      <View className="flex flex-col gap-y-2 self-stretch mx-4">
        <Text
          style={{fontSize: 4 * vw}}
          className="text-black font-semibold capitalize">
          start time
        </Text>
        <TouchableOpacity
          onPress={() => setOpenStartTime(true)}
          className="border py-2 px-1">
          <Text className="text-neutral-600 font-semibold capitalize">
            {startTime.getHours()}:{startTime.getMinutes()}
          </Text>
        </TouchableOpacity>
        <DatePicker
          modal
          date={startTime}
          open={openStartTime}
          onConfirm={date => {
            setOpenStartTime(false);
            setStartTime(date);
          }}
          onCancel={() => {
            setOpenStartTime(false);
          }}
          mode="time"
        />
      </View>
      <View className="flex flex-col gap-y-2 self-stretch mx-4">
        <Text
          style={{fontSize: 4 * vw}}
          className="text-black font-semibold capitalize">
          end time
        </Text>
        <TouchableOpacity
          onPress={() => setOpenEndTime(true)}
          className="border py-2 px-1">
          <Text className="text-neutral-600 font-semibold capitalize">
            {endTime.getHours()}:{endTime.getMinutes()}
          </Text>
        </TouchableOpacity>
        <DatePicker
          modal
          date={endTime}
          open={openEndTime}
          onConfirm={date => {
            setOpenEndTime(false);
            setEndTime(date);
          }}
          onCancel={() => {
            setOpenEndTime(false);
          }}
          mode="time"
        />
      </View>
      <View className="self-stretch flex flex-col gap-y-2 mx-4">
        <Text
          style={{fontSize: 4.5 * vw}}
          className="font-bold text-black capitalize">
          event type
        </Text>
        <TextInput
          placeholder="enter event type"
          inputMode="text"
          value={eventType}
          onChangeText={text => setEventType(text)}
          className="border border-neutral-400"
        />
      </View>
      <TouchableOpacity
        className="bg-blue-500 px-4 py-2 rounded-md"
        onPress={updateJob}>
        <Text
          style={{fontSize: 5 * vw}}
          className="text-white font-semibold capitalize">
          submit
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditjobScreens;

const styles = StyleSheet.create({});
