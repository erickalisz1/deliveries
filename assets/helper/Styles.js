import { StyleSheet, Platform } from 'react-native';
import Colours from '../constants/darkTheme';

export const myStyles = StyleSheet.create({
    //update
    input:{
        borderBottomColor: Colours.selected,
        borderBottomWidth: 1,
        marginHorizontal: 5,
        padding: 5,
        textAlign: "center",
        fontSize: 17,
        color: Colours.primaryText,
        minWidth:60,
        maxWidth:120
    },
    //main list
    sortLabel: {
        textAlign: 'center',
        fontSize: 20,
        marginHorizontal:10,
        color: Colours.primaryText
    },
    topContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop: Platform.OS === 'ios' ? 15 : 35,
        marginBottom: 15,
    },
    //filter modal
    horizontalContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '100%',
    },
    verticalContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '35%',
    },
    pickerWrapper: {
        height: 50,
        width: '40%',
        borderRadius: 5,
        borderWidth: Platform.OS === 'ios' ? 0 : 1,
        borderColor: Colours.primaryText,
        backgroundColor: Platform.OS === 'ios' ? Colours.transparent : Colours.primaryText,
        marginBottom: Platform.OS === 'ios' ? 150 : 20,
        marginTop: Platform.OS === 'ios' ? -50 : 0,
        marginHorizontal: 10
    },
    columnPickerWrapper: {
        height: 50,
        width: '95%',
        borderRadius: 5,
        borderWidth: Platform.OS === 'ios' ? 0 : 1,
        borderColor: Colours.primaryText,
        backgroundColor: Platform.OS === 'ios' ? Colours.transparent : Colours.primaryText,
        marginBottom: Platform.OS === 'ios' ? 150 : 20,
        marginTop: Platform.OS === 'ios' ? -50 : 0,
        marginHorizontal: 10
    },
    //lists
    listItem: {
        marginVertical: 1,
        minWidth: '95%',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: Colours.accent,
    },
    listItemRow: {
        marginVertical: 3,
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colours.backgroundLight,
        minWidth:'95%',
        justifyContent:'space-between'
    },
    listItemColumn: {
        marginHorizontal:10
    },
    listItemValueLarge: {
        fontSize: 20,
        color: Colours.primaryText,
    },
    listItemValue: {
        fontSize: 15,
        color: Colours.primaryText,
        textAlign: 'left'
    },
    //modals
    modalContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 15,
    },
    modalColumn: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        marginHorizontal:20
    },
    modalRow: {
        paddingHorizontal: 25,
        margin: 0
    },
    modalDescription: {
        color: Colours.primaryText,
        fontSize: 16,
        textAlign: 'center'
    },
    modalDescriptionLarge: {
        color: Colours.primaryText,
        fontSize: 20,
        textAlign: 'center'
    }
  });