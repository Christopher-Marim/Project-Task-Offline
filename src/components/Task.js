import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import moment from 'moment';
import 'moment/locale/pt-br';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import commonStyles from '../commonStyles';

export default (props) => {
  const doneOrNotStyle =
    props.doneAt != null ? {textDecorationLine: 'line-through'} : {};

  const date = props.dateAt ? props.doneAt : props.estimateAt;
  const formatteddate = moment(date).locale('pt-br').format('ddd, D [de] MMMM');

  const getRightContent = () => {
    return (
      <TouchableOpacity style={styles.right} onPress={() => props.onDelete && props.onDelete(props.id)}>
        <Icon name="trash" size={30} color="white" />
      </TouchableOpacity>
    );
  };

  const getLeftContent = () => {
    return (
      <View style={styles.left}>
        <Icon name='trash' size={20} color='#FFF' style={styles.excludeIcon}/>
        <Text style={styles.excludeText}>Excluir</Text>

      </View>
    );
  };

  return (
    <Swipeable renderRightActions={getRightContent}
               renderLeftActions={getLeftContent} 
               onSwipeableLeftWillOpen={() =>props.onDelete && props.onDelete(props.id) }
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => props.toggleTask(props.id)}>
          <View style={styles.checkContainer}>
            {getCheckView(props.doneAt)}
          </View>
        </TouchableWithoutFeedback>
        <View>
          <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
          <Text style={styles.date}>{formatteddate}</Text>
        </View>
      </View>
    </Swipeable>
  );
};

function getCheckView(doneAt) {
  if (doneAt != null) {
    return (
      <View style={styles.done}>
        <Icon name="check" size={20} color={'white'}></Icon>
      </View>
    );
  } else {
    return <View style={styles.pending}></View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderColor: '#AAA',
    borderBottomWidth: 1,
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingVertical: 10,
    backgroundColor:'#FFF'
  },
  checkContainer: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pending: {
    height: 25,
    width: 25,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#555',
  },
  done: {
    height: 25,
    width: 25,
    borderRadius: 13,
    borderWidth: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  desc: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.color.mainText,
    fontSize: 15,
  },
  date: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.color.subText,
    fontSize: 12,
  },
  right: {
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  left:{
    flex:1,
    flexDirection:'row',
    backgroundColor:'red',
    alignItems:'center',
   


  },
  excludeText:{
    color:'white',
    fontFamily: commonStyles.fontFamily,
    fontSize:20,
    margin: 10,
  },
  excludeIcon :{
    marginLeft: 10
  }
});
