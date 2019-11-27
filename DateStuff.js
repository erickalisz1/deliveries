import React from 'react';
import moment from 'moment';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';

export default function App() {

  const today = Date.now();
  const day = moment(today).format('dddd');
  const date = moment(today).format('MMMM D, YYYY');

  state = {
    birthday: '20200229'
  };

  const { birthday } = this.state;
  const a = moment();
  const b = moment(birthday);
  const dateDiff = b.diff(a, 'days');
  const daysLeft = dateDiff !== null && !isNaN(dateDiff) ? (
    <Text style={styles.birthday}>{dateDiff} Days until your birthday</Text>) : null;

  const c = moment(birthday).isLeapYear() ? (<Text>Yay, birthday</Text>) : (<Text>no</Text>);

  const sub = moment(birthday).subtract(10, 'months').calendar();

  const DATA = [
    {
      id: '1',
      value: '290.93',
    },
    {
      id: '2',
      value: '190.02',
    },
    {
      id: '3',
      value: '523.98',
    },
  ];

  function Item({ value }) {
    return (
      <View style={styles.item}>
        <Text style={styles.value}> ${value} </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.text} >Today: {day}</Text>
        <Text style={styles.text} >{date}</Text>
        <Text style={styles.text} >{daysLeft}</Text>
        <Text style={styles.text} >{moment(birthday).fromNow()}</Text>
        <Text style={styles.text} >Is a leap year? {c}</Text>
        {/* <Text style={styles.text} >{moment(sub).format('DD/MM/Y')}</Text> commented because of warning */}


        <FlatList
        style={styles.list}
          data={DATA}
          renderItem={({ item }) => <Item value={item.value} />}
          keyExtractor={item => item.id}
        />

      </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontStyle: 'italic'
  },
  item: {
    backgroundColor: '#00ccbc',
    marginVertical: 1,
    minWidth:'90%',
    padding:20
  },
  value: {
    fontSize: 32,
  },
  list:{

  }
});
